import { userController } from "@/server/controllers/userController";

export default async function handler(req, res) {
  const account = req.body;
    const response = await userController.insertUser(account);

    if (response.error) {
      res.status(400).json({ message: response.error });
    } else {
      res.status(200).json({ message: "User added successfully." });
    }

}






