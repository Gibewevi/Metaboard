const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fonction pour découper un tableau en lots
function chunkArray(array, size) {
    var result = [];
    for (let i = 0; i < array.length; i += size) {
        let chunk = array.slice(i, i + size);
        result.push(chunk);
    }
    return result;
}

const importCsvParseIntoDataBase = async (csvData, currency, timeframe) => {
    try {
        // 1. Récupérer la date la plus récente pour la currency et timeframe données
        const latestEntry = await prisma.currency_assets.findFirst({
            where: {
                currency: currency,
                timeframe: timeframe
            },
            orderBy: {
                timestamp: 'desc'
            }
        });

        let lastTimestamp = null;
        if (latestEntry) {
            lastTimestamp = latestEntry.timestamp;
        }

        // 2. Filtrer csvData pour ne conserver que les enregistrements postérieurs à lastTimestamp
        const filteredRecords = lastTimestamp
            ? csvData.filter(record => new Date(`${record.timestamp}:00Z`) > lastTimestamp)
            : csvData;

        // Si après filtrage, il n'y a pas de nouveaux enregistrements à ajouter, retourner un message
        if (filteredRecords.length === 0) {
            return { message: "Aucun nouvel enregistrement à importer." };
        }

        // Traitement des enregistrements pour les préparer à l'insertion
        const recordsToInsert = filteredRecords.map(record => {
            const { timestamp, open, high, low, close, volume } = record;
            const openDecimal = parseFloat(open);
            const highDecimal = parseFloat(high);
            const lowDecimal = parseFloat(low);
            const closeDecimal = parseFloat(close);
            const timestampDate = new Date(`${timestamp}:00Z`);

            return {
                timestamp: timestampDate,
                open: openDecimal,
                high: highDecimal,
                low: lowDecimal,
                close: closeDecimal,
                volume: parseInt(volume, 10),
                currency: currency,
                timeframe: timeframe
            };
        });

        // Découpage et insertion par lots de 100 comme précédemment
        const recordChunks = chunkArray(recordsToInsert, 100);

        for (let chunk of recordChunks) {
            await prisma.$transaction(
                chunk.map(record => prisma.currency_assets.create({ data: record }))
            );
        }

        return { message: "Importation réussie" };

    } catch (error) {
        console.error("Erreur lors de l'importation des données", error);
        return { message: "Erreur lors de l'importation des données", error };
    }
};



export const csvModel = {
    importCsvParseIntoDataBase
}
