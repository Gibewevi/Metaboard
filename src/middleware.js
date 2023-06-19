// const { jwtVerify } = require('jose');
const { NextResponse } = require('next/server');

const verifAuth = (token, req) => {
  const secret = process.env.SECRET_KEY;
  try {
    const verified = jwtVerify(token, new TextEncoder().encode(secret));
    if (verified) {
      return NextResponse.next();
    }
  } catch (error) {
    // return NextResponse.redirect(('/signin', req.url))
  }
};

export function middleware(req) {
  // console.log('middleware');
  // let cookie = req.cookies.get('jwt')?.value;
  // return NextResponse.redirect(new URL('/signin', req.url))
  // if (cookie) {
  //   verifAuth(cookie, req);
  // };
  // return NextResponse.redirect(('/signin', req.url))
}
