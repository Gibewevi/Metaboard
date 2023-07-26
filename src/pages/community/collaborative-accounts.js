import { useState } from 'react';
import SharedAccount from "@/components/sharedAccount/SharedAccount";
import ReturnButton from '@/components/button/ReturnButton';
import jwt from 'jsonwebtoken';
import React from "react";

require('dotenv').config();

export default function CollaborativeAccounts({ accounts, userId }) {
    const [sharedAccounts, setsharedAccounts] = useState(accounts.shared)

    const ListSharedAccounts = () => {
        return sharedAccounts.map((account, key) => {
            return (<SharedAccount account={account} key={key} user_id={userId} link={`/community/collaborative-accounts/${account.account_id}`} />)
        });
    }


    return (
        <div className="w-full h-10">
            <div className="flex flex-col gap-y-3 max-w-7xl mx-auto">

                <div className='flex flex-col justify-center items-center relative'>
                    <ReturnButton link={'/community'} title={'Community'} css='absolute left-5' />
                    <div className='flex flex-row justify-center items-center gap-x-2 fill-[#00cfe8]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 32 32"><path d="M31 30h-2v-3a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3v3h-2v-3a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5zm-7-18a3 3 0 1 1-3 3a3 3 0 0 1 3-3m0-2a5 5 0 1 0 5 5a5 5 0 0 0-5-5zm-9 12h-2v-3a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v3H1v-3a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5zM8 4a3 3 0 1 1-3 3a3 3 0 0 1 3-3m0-2a5 5 0 1 0 5 5a5 5 0 0 0-5-5z" /></svg>
                        <h2 className='text-3xl text-[#D2D6DB]'>Collaborative Trading</h2>
                    </div>
                </div>
                <div className='p-3 text-md text-[#D2D6DB]'>
                    <span className='text-md text-[#D2D6DB]'>Dive into the world of Shared Trading Accounts: learn together, share your strategies, and experiment in a dynamic environment. Progress and collaboration, at the heart of our concept.</span>
                </div>

                <div className='grid grid-cols-4 gap-y-4 gap-x-3 items-center justify-items-center'>
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

