import { accountController } from "@/server/controllers/accountController";
import { auth } from "@/middleware/authentificationJWT";

export default async function handler(req, res) {
    const token = req.cookies['jwt'];
    console.log(token)
    await auth(req, res, async () => {
        if (req.method === 'POST') {
            const account = req.body;
            const response = await accountController.insertAccount(account);
            res.status(200).json(response);
        } else {
            res.status(405).json({ message: 'Method not allowed' });
        }
    });
}


