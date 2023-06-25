import { userController } from "@/server/controllers/userController";
const { serialize } = require('cookie');


export default async function handler(req, res) {
  const userAccount = req.body;
  const email = userAccount.email;

  const [isSignedIn, token] = await userController.signin(userAccount);
console.log('isSignedIn ',isSignedIn);
console.log('token ',token);
  if (isSignedIn) {
    const cookie = {
      httpOnly: false,
      secure: false,
      sameSite: 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000, // Durée de 7 jours en millisecondes
    };

    const cookieJWT = serialize('jwt', token, cookie);
    console.log(' cookieJWT ', cookieJWT);
    res.setHeader('Set-Cookie', cookieJWT);
    res.status(200).send({ token, email }); // Envoie le token dans le corps de la réponse
  } else {
    res.status(401).send({ error: 'authenficiation failed' });
  }
}





