import { userController } from "@/server/controllers/userController";

export default async function handler(req, res) {
  const account = req.body;

  try {
    await userController.insertUser(account);
    res.status(200).json({ message: "User added successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while adding the user." });
  }
}






