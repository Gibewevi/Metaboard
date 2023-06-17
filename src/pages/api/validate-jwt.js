import { userController } from "@/server/controllers/userController";
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    // Récupérer le header Authorization
    const authHeader = req.headers['authorization'];

    // Extraire le JWT
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
        try {
            const auth = jwt.verify(token, process.env.SECRET_KEY);
            res.status(200).send({ auth: true });
        } catch {
            res.status(401).send({ auth: false, message: "Token expired" });
        }
    } else {
        res.status(401).send({ auth: false, message: "No token provided" });
    }

}



