import { userController } from "@/server/controllers/userController";
const { serialize } = require('cookie');


export default async function handler(req, res) {
  const userAccount = req.body;
  const email = userAccount.email;
  const [isSignedIn, token] = await userController.signin(userAccount);
  if (isSignedIn) {
    const cookie = {
      httpOnly: true, // Le cookie ne peut pas être accédé par des scripts côté client
      secure: false, // Permet l'utilisation en HTTP pour le développement sur localhost
      sameSite: 'strict', // Restriction du partage du cookie entre les sites
      path: '/', // Le cookie est accessible depuis toutes les URL du site
    };
    const cookieJWT = serialize('jwt', token, cookie);
    res.setHeader('Set-Cookie', cookieJWT);
    res.status(200).send({ token, email }); // Envoie le token dans le corps de la réponse
  } else {
    res.status(401).send({ error: 'authenficiation failed' });
  }
}





