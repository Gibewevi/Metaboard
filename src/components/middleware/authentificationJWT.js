// export async function getServerSideProps(context) {
//     const token = context.req.cookies['jwt'];
//     let auth;
//     const API_URL = process.env.API_URL;
  
//     try {
//       // Utilisez votre librairie JWT pour vérifier le token
//       auth = jwt.verify(token, process.env.SECRET_KEY);
//     } catch (e) {
//       return {
//         redirect: {
//           destination: '/signin',
//           permanent: false,
//         },
//       }
//     }
  
//     // Si la vérification du token est un succès, continuez comme d'habitude
//     return {
//       props: { auth, API_URL }, // Remplacez ceci par les props dont votre page a besoin
//     }
//   }
  