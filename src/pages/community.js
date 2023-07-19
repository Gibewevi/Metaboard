import { useState } from 'react';
import SharedAccount from "@/components/sharedAccount/SharedAccount";
import jwt from 'jsonwebtoken';
require('dotenv').config();

export default function Community({accounts, userId}) {
  const [sharedAccounts, setSharedAccounts] = useState(accounts);

  const ListSharedAccounts = () => {
    return sharedAccounts.map((account, key) => {
      return (<SharedAccount account={account} key={key} user_id={userId}/>)
    });
  }


  return (
    <div className="w-full h-10">
      <div className="max-w-7xl mx-auto">
        <div className='flex flex-row gap-x-4'>
          <ListSharedAccounts />
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
  // récupérer les comptes partagés
  const res = await fetch(`${API_URL}/api/accounts/shared`, {
    method: 'GET',
    credentials: 'include' // Ajoutez cette ligne
  });

  // Changez le nom de la variable ici
  const data = await res.json();
  
  return {
    props: {accounts: data.accounts, userId}
  }
}

