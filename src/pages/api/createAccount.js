import { accountController } from "@/server/controllers/accountController";

export default async function handler(req, res) {
    const account = req.body;
    const response = await accountController.insertAccount(account);
}





