import { useState } from 'react';
import SharedAccount from "@/components/sharedAccount/SharedAccount";
import jwt from 'jsonwebtoken';
import React from "react";
import CommunityButton from "@/components/button/CommunityButton";

require('dotenv').config();

export default function Community({ accounts, userId }) {
  const [sharedAccounts, setSharedAccounts] = useState(accounts.shared);
  const [certifiedAccount, setCertifiedAccount] = useState(accounts.certified)

  const ListSharedAccounts = () => {
    return sharedAccounts.map((account, key) => {
      if (key < 4) {
        return (<SharedAccount account={account} key={key} user_id={userId} link={`/community/collaborative-accounts/${account.account_id}`} />)
      }
    });
  }

  const ListCertifiedAccounts = () => {
    return certifiedAccount.map((account, key) => {
      if (key < 4) {
        return (<SharedAccount account={account} key={key} user_id={userId} link={`/community/certified-accounts/${account.account_id}`} />)
      }
    });
  }


  return (
    <div className="max-w-7xl mx-auto">
      <div className='flex flex-col gap-x-4'>

        <div className='flex flex-col gap-y-6 p-10 w-full'>

          <div className='flex flex-col gap-y-2'>

            <div className='flex flex-row items-center gap-x-2 fill-[#00cfe8]'>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 0 0 1.745-.723a3.066 3.066 0 0 1 3.976 0a3.066 3.066 0 0 0 1.745.723a3.066 3.066 0 0 1 2.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 0 1 0 3.976a3.066 3.066 0 0 0-.723 1.745a3.066 3.066 0 0 1-2.812 2.812a3.066 3.066 0 0 0-1.745.723a3.066 3.066 0 0 1-3.976 0a3.066 3.066 0 0 0-1.745-.723a3.066 3.066 0 0 1-2.812-2.812a3.066 3.066 0 0 0-.723-1.745a3.066 3.066 0 0 1 0-3.976a3.066 3.066 0 0 0 .723-1.745a3.066 3.066 0 0 1 2.812-2.812Zm7.44 5.252a1 1 0 0 0-1.414-1.414L9 10.586L7.707 9.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd" /></svg>
              <h2 className='text-2xl text-[#D2D6DB]'>Certified Trading</h2>
            </div>
            <span className='text-md text-[#D2D6DB]'>Explore Certified Trading Accounts: absolute transparency to progress effectively. Learn from the best, refine your strategy, and trade with confidence. The reliability of results is our commitment.</span>
          </div>
          <CommunityButton link={'/community/certified-accounts'} />
          <div className='grid grid-cols-4 gap-y-4 gap-x-3 items-center justify-items-center'>
            <ListCertifiedAccounts />
          </div>

        </div>

        <div className='flex flex-col gap-y-6 p-10 w-full'>
          <div className='flex flex-col gap-y-2'>
            <div className='flex flex-row items-center gap-x-2 fill-[#00cfe8]'>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M31 30h-2v-3a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3v3h-2v-3a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5zm-7-18a3 3 0 1 1-3 3a3 3 0 0 1 3-3m0-2a5 5 0 1 0 5 5a5 5 0 0 0-5-5zm-9 12h-2v-3a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v3H1v-3a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5zM8 4a3 3 0 1 1-3 3a3 3 0 0 1 3-3m0-2a5 5 0 1 0 5 5a5 5 0 0 0-5-5z" /></svg>
              <h2 className='text-2xl text-[#D2D6DB]'>Collaborative Trading</h2>
            </div>
            <span className='text-md text-[#D2D6DB]'>Dive into the world of Shared Trading Accounts: learn together, share your strategies, and experiment in a dynamic environment. Progress and collaboration, at the heart of our concept.</span>
          </div>
          <CommunityButton link={'/community/collaborative-accounts'} />
          <div className='grid grid-cols-4 gap-y-6 gap-x-8 items-center justify-items-center'>
            <ListSharedAccounts />
          </div>
        </div>

      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const token = context.req.cookies['jwt'];
  let auth;
  auth = jwt.verify(token, process.env.SECRET_KEY);
  const userId = parseInt(auth.user_id);

  const API_URL = process.env.API_URL;
  // récupérer les favoris de l'utilisateur

  // récupérer les comptes partagés
  const resAccountsShared = await fetch(`${API_URL}/api/accounts/shared?userId=${userId}`, {
    method: 'GET',
    credentials: 'include' // Ajoutez cette ligne
  });

  // Changez le nom de la variable ici
  const accountsShared = await resAccountsShared.json();

  return {
    props: { accounts: accountsShared.accounts, userId }
  }
}

