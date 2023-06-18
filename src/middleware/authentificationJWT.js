import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
   
    const token = req.cookies['jwt'];
    console.log(token);
    if (!token) {
        return res.redirect('/signin');
    }

    try {
        const auth = jwt.verify(token, process.env.SECRET_KEY);
        req.auth = auth;
        console.log(req.auth);
        next();
    } catch (e) {
        return res.redirect('/signin');
    }
};
