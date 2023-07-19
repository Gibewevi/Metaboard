export default async function handler(req, res) {
    const {
        query: { userId, accountId },
    } = req;
    console.log('userId : ',userId);
    console.log('accountId : ',accountId);
    // Traiter la requête en fonction de `req.method` (par exemple, GET, POST, etc.)
    switch (req.method) {
        case 'POST':
            // Ajoutez le compte aux favoris de l'utilisateur ici.
            break;
        // Gérez les autres méthodes HTTP au besoin.
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
