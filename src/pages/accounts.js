import ContentHeader from "@/components/contentHeader/contentHeader";
import jwt from 'jsonwebtoken';
import Account from "@/components/account/Account";
import FavoriteAccount from "@/components/account/FavoriteAccounts";
import { useState } from "react";
import FormAccount from "@/components/account/FormAccount";
require('dotenv').config();


export default function Accounts({ auth, API_URL, accounts, favoriteAccounts }) {
  const [newAccountIsVisible, setNewAccountIsVisible] = useState(false);
  const user = auth;

  const MyFavoriteAccounts = () => {
    if (favoriteAccounts.length > 0) {
      return favoriteAccounts.map((account, key) => {
        return (
          <FavoriteAccount key={key} accountData={account.account} />
        )
      });
    }
  }


  const AccountsComponent = () => {
    if (accounts.length > 0) {
      return accounts.map((account, key) => {
        return (
          <Account key={key} accountData={account} />
        )
      });
    }
  }
  const AccountFormVisible = () => {
    setNewAccountIsVisible(!newAccountIsVisible);
  };

  const addAccountToDatabase = async (account, API_URL) => {
    console.log(API_URL);
    try {
      const response = await fetch(`/api/createAccount`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(account)
      });

      // Check if the account was successfully created
      if (response.ok) {
        // Reload the page
        console.log('rechargement de la page');
        window.location.reload();
      } else {
        console.error('Account creation failed.');
      }
    } catch (error) {
      console.error(error);
    }
  }



  return (
    <div className="w-full h-10">
      <div className="max-w-7xl mx-auto">
        <ContentHeader icon={'CarbonHomeBlue.svg'} title={'Accounts overview'} />
        <div className="flex flex-col gap-y-5 w-full p-4 relative">
          <div onClick={AccountFormVisible} className="flex justify-center items-center w-full h-[90px] border border-1 border-[#35E2F7] transition-all ease-in duration-800 rounded-md hover:border-2 hover:scale-105">
            <div className="flex flex-row items-center justify-center gap-x-2">
              <img src={'CarbonAdd.svg'} className="w-[35px] z-10" />
              <span className="font-bold text-2xl z-10 text-white">New account</span>
            </div>
          </div>
          <FormAccount isVisible={newAccountIsVisible} submit={addAccountToDatabase} user={user} API_URL={API_URL} />
          <div className="flex flex-col gap-y-4">
            <span className="text-xl text-slate-300">My accounts</span>
            <AccountsComponent />
          </div>
          <div className="flex flex-col gap-y-4">
            <span className="text-xl text-slate-300">My favorite</span>
            <MyFavoriteAccounts />
          </div>
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
  };

  const resAccounts = await fetch(`${API_URL}/api/accounts?user_id=${auth.user_id}`, {
    method: 'GET',
    credentials: 'include' // Ajoutez cette ligne
  });

  const dataAccounts = await resAccounts.json();
  const accounts = dataAccounts.accounts;

  const resFavoriteAccounts = await fetch(`${API_URL}/api/user/${auth.user_id}/my-favorites`, {
    method: 'GET',
    credentials: 'include' // Ajoutez cette ligne
  });

  const favoriteAccounts = await resFavoriteAccounts.json();

  // Si la vérification du token est un succès, continuez comme d'habitude
  return {
    props: { auth, API_URL, accounts, favoriteAccounts },
  }
}