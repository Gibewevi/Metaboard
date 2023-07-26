import { useState } from 'react';
import SharedAccount from "@/components/sharedAccount/SharedAccount";
import ReturnButton from '@/components/button/ReturnButton';
import jwt from 'jsonwebtoken';
import React from "react";

require('dotenv').config();

export default function CertifiedAccounts({ accounts, userId }) {
    const [certifiedAccount, setCertifiedAccount] = useState(accounts.certified)

    const ListCertifiedAccounts = () => {
        return certifiedAccount.map((account, key) => {
            return (<SharedAccount account={account} key={key} user_id={userId} link={`/community/certified-accounts/${account.account_id}`}/>)
        });
    }


    return (
        <div className="w-full h-10">
            <div className="flex flex-col gap-y-3 max-w-7xl mx-auto">

                <div className='flex flex-col justify-center items-center relative'>
                    <ReturnButton link={'/community'} title={'Community'} css='absolute left-5' />
                    <div className='flex flex-row justify-center items-center gap-x-1 fill-[#00cfe8]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 0 0 1.745-.723a3.066 3.066 0 0 1 3.976 0a3.066 3.066 0 0 0 1.745.723a3.066 3.066 0 0 1 2.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 0 1 0 3.976a3.066 3.066 0 0 0-.723 1.745a3.066 3.066 0 0 1-2.812 2.812a3.066 3.066 0 0 0-1.745.723a3.066 3.066 0 0 1-3.976 0a3.066 3.066 0 0 0-1.745-.723a3.066 3.066 0 0 1-2.812-2.812a3.066 3.066 0 0 0-.723-1.745a3.066 3.066 0 0 1 0-3.976a3.066 3.066 0 0 0 .723-1.745a3.066 3.066 0 0 1 2.812-2.812Zm7.44 5.252a1 1 0 0 0-1.414-1.414L9 10.586L7.707 9.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd" /></svg>
                        <h2 className='text-3xl text-[#D2D6DB]'>Certified Trading</h2>
                    </div>
                </div>
                <div className='p-3 text-md text-[#D2D6DB]'>
                    <span className='text-md text-[#D2D6DB]'>Explore Certified Trading Accounts: absolute transparency to progress effectively. Learn from the best, refine your strategy, and trade with confidence. The reliability of results is our commitment.</span>
                </div>

                <div className='grid grid-cols-4 gap-y-4 gap-x-3 items-center justify-items-center'>
                    <ListCertifiedAccounts />
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

