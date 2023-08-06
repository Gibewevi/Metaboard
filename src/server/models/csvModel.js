const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const importCsvParseIntoDataBase = async (csvData, currency, timeframe) => {
    try {
        // Mapping des données pour correspondre au format de l'insertion Prisma
        const recordsToInsert = csvData.map(record => {
            // Accès aux valeurs via les clés de l'objet
            const { timestamp, open, high, low, close, volume } = record;

            // Conversion des valeurs numériques
            const openDecimal = parseFloat(open);
            const highDecimal = parseFloat(high);
            const lowDecimal = parseFloat(low);
            const closeDecimal = parseFloat(close);

            // Conversion du timestamp en objet Date
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

        // Effectuer une transaction pour insérer toutes les données
        await prisma.$transaction(
            recordsToInsert.map(record => prisma.currency_assets.create({ data: record }))
        );

        // Vous pouvez renvoyer un message de succès ou d'autres informations si nécessaire
        return { message: "Importation réussie" };
    } catch (error) {
        console.error("Erreur lors de l'importation des données", error);

        // Renvoyer un message d'erreur ou répercuter l'erreur
        // Ceci dépend de la manière dont vous gérez les erreurs dans votre application
        return { message: "Erreur lors de l'importation des données", error };
    }
};


export const csvModel = {
    importCsvParseIntoDataBase
}