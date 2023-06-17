import ContentHeader from "@/components/contentHeader/contentHeader";
import jwt from 'jsonwebtoken';
import Account from "@/components/account/Account";
import { useState } from "react";
import FormAccount from "@/components/account/FormAccount";
require('dotenv').config();

export default function Accounts({ auth, API_URL, accounts }) {
  const [newAccountIsVisible, setNewAccountIsVisible] = useState(false);
  const user = auth;
  console.log('accounts : ', accounts);
  const AccountFormVisible = () => {
    setNewAccountIsVisible(!newAccountIsVisible);
  };

  const addAccountToDatabase = async (account, API_URL) => {
    try {
      const response = await fetch(`${API_URL}/api/createAccount`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(account)
      });

    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className="w-full h-10">
      <div className="max-w-7xl mx-auto">
        <ContentHeader />
        <div className="flex flex-col gap-y-5 w-full p-4 relative">
          <div onClick={AccountFormVisible} className="flex justify-center items-center w-full h-[90px] border border-1 border-[#35E2F7] transition-all ease-in duration-800 rounded-md hover:border-2 hover:scale-105">
            <div className="flex flex-row items-center justify-center gap-x-2">
              <img src={'CarbonAdd.svg'} className="w-[35px] z-10" />
              <span className="font-bold text-2xl z-10">New account</span>
            </div>
          </div>
          <FormAccount isVisible={newAccountIsVisible} submit={addAccountToDatabase} user={user} API_URL={API_URL} />
          <Account identifiant={222654} strategy={'Open Range Break-out'} balance={'251 234,45 $US'} pl={'51 234,45 $US'} plPercent={'25.62%'} orders={'125'} />
          <Account identifiant={222655} strategy={'Scalp M15'} balance={'202 851,16 $US'} pl={'2 851, 16 $US'} plPercent={'1.43%'} orders={'88'} />
          <Account identifiant={222656} strategy={'Chart pattern'} balance={'1,000,000 $US'} pl={'1,188,542.95 $US'} plPercent={'18.85%'} orders={'348'} />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const token = context.req.cookies['jwt'];
  let auth;
  const API_URL = process.env.API_URL;

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


  const response = await fetch(`${API_URL}/api/accounts?email=${auth.email}`, {
    method: 'GET',
  });

  const data = await response.json();
  const accounts = data.accounts;

  // Si la vérification du token est un succès, continuez comme d'habitude
  return {
    props: { auth, API_URL, accounts }, // Remplacez ceci par les props dont votre page a besoin
  }
}
