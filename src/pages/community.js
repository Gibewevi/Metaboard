import { useState } from 'react';
import SharedAccount from "@/components/sharedAccount/SharedAccount";
require('dotenv').config();

export default function Community({ accounts }) {
  const [sharedAccounts, setSharedAccounts] = useState(accounts);

  const ListSharedAccounts = () => {
    return sharedAccounts.map((account, key) => {
      return (<SharedAccount account={account} key={key} />)
    });
  }


  return (
    <div className="w-full h-10">
      <div className="max-w-7xl mx-auto">
        <div className='grid grid-cols-4 gap-x-8'>
          <ListSharedAccounts />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const API_URL = process.env.API_URL;
  // récupérer les comptes partagés
  const res = await fetch(`${API_URL}/api/accounts/shared`, {
    method: 'GET',
    credentials: 'include' // Ajoutez cette ligne
  });
  const accounts = await res.json();
  return {
    props: accounts,
  }
}
