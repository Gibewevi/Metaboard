import ContentHeader from "@/components/contentHeader/contentHeader";
import jwt from 'jsonwebtoken';
import Account from "@/components/account/Account";
export default function Accounts({ auth }) {
  console.log('auth : ', auth);

  return (
    <div className="w-full h-10">
      <div className="max-w-7xl mx-auto">
        <ContentHeader />
        <div className="flex flex-col gap-y-5 w-full p-4">
          <div className="flex justify-center items-center w-full h-[90px] border border-1 border-[#35E2F7] transition-all ease-in duration-800 rounded-md hover:border-2 hover:scale-105">
            <div className="flex flex-row items-center justify-center gap-x-2">
              <img src={'CarbonAdd.svg'} className="w-[35px] z-10"/>
              <span className="font-bold text-2xl z-10">New account</span>
            </div>
          </div>
           <Account identifiant={222654} strategy={'Open Range Break-out'} balance={'251 234,45 $US'} pl={'51 234,45 $US'} plPercent={'25.62%'} orders={'125'}/>
           <Account identifiant={222655} strategy={'Scalp M15'} balance={'202 851,16 $US'} pl={'2 851, 16 $US'} plPercent={'1.43%'} orders={'88'}/>
           <Account identifiant={222656} strategy={'Chart pattern'} balance={'1,000,000 $US'} pl={'1,188,542.95 $US'} plPercent={'18.85%'} orders={'348'}/>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const token = context.req.cookies['jwt'];
  console.log(token);
  let auth;
  try {
    // Utilisez votre librairie JWT pour vérifier le token
    auth = jwt.verify(token, process.env.SECRET_KEY);
  } catch (e) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }

  // Si la vérification du token est un succès, continuez comme d'habitude
  return {
    props: { auth }, // Remplacez ceci par les props dont votre page a besoin
  }
}
