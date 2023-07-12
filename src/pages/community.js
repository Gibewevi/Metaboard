import { useState } from 'react';
require('dotenv').config();

export default function Community({accounts}) {
  const [sharedAccounts, setSharedAccounts] = useState(accounts);

  const ListAccount = () => {
    return sharedAccounts.forEach((account,key) => {
      
    });
  }

  return (
    <div className="w-full h-10">
      <div className="max-w-7xl mx-auto">
        <div className='grid grid-cols-5 gap-x-3'>

        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const API_URL = process.env.API_URL;
  console.log('API : ', API_URL)
    // récupérer les comptes partagés
    const res = await fetch(`${API_URL}/api/accounts/shared`, {
      method: 'GET',
      credentials: 'include' // Ajoutez cette ligne
    });
    const sharedAccounts = await res.json();
    return {
      props: { accounts : sharedAccounts }, 
    }
  }
