import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';
import { csvController } from '@/server/controllers/csvController';

export default async function handler(req, res) {
    // Obtenez le chemin vers le dossier "currency" dans le dossier "public"
    const directoryPath = path.join(process.cwd(), 'public', 'currency');

    // Lire le contenu du dossier
    const files = fs.readdirSync(directoryPath);

    for (const file of files) {
        // Obtenir le chemin complet vers le fichier
        const filePath = path.join(directoryPath, file);

        // Lire le contenu du fichier
        const content = fs.readFileSync(filePath);

        // Parser le contenu CSV
        parse(content, { columns: false, skip_empty_lines: true }, async function (err, records) {
            if (err) {
                console.error(err);
                return;
            }

            // Extraire la devise et le délai à partir du nom du fichier
            const [currency, timeframeWithExtension] = file.split('_');
            const [timeframe] = timeframeWithExtension.split('.');
            console.log('currency : ', currency);
            console.log('timeframe : ', timeframe);
            
            // Créer un tableau pour stocker les données
            const data = [];

            // Parcourir chaque enregistrement et afficher les données
            for (const record of records) {
                // Affecter les valeurs à des variables en fonction de leur ordre dans le fichier CSV
                const [timestamp, open, high, low, close, volume] = record;

                // Conversion des valeurs numériques
                const openDecimal = parseFloat(open);
                const highDecimal = parseFloat(high);
                const lowDecimal = parseFloat(low);
                const closeDecimal = parseFloat(close);

                // Assurez-vous que volume est un entier valide, sinon utilisez une valeur par défaut
                const volumeInt = !isNaN(volume) ? parseInt(volume, 10) : 0;

                // Conversion du timestamp en objet Date
                const timestampDate = new Date(timestamp);

                // Ajouter l'objet de données au tableau
                data.push({
                    timestamp: timestampDate,
                    open: openDecimal,
                    high: highDecimal,
                    low: lowDecimal,
                    close: closeDecimal,
                    volume: volumeInt,
                    currency: currency,
                    timeframe: timeframe
                });
            }

            // Passer le tableau complet au contrôleur
            const result = await csvController.importCSVintoDataBase(data, currency, timeframe);
        });
    }
    res.status(200).json({ message: 'Parcours terminé' });
}
