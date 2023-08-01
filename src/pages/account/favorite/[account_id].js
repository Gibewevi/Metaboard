
import PublicAccountAnalytic from "@/components/account/public-analytic/PublicAccountAnalytic";
import jwt from 'jsonwebtoken';
require('dotenv').config();

export default function Performance({ analytic }) {
    return (
        <>
            <PublicAccountAnalytic analytic={analytic} headerTitle={'Favorite account'} />
        </>
    )
}

export async function getServerSideProps(context) {
    const token = context.req.cookies['jwt'];
    let auth;  
    auth = jwt.verify(token, process.env.SECRET_KEY);
    const user_id = auth.user_id;
    const account_id = context.query.account_id;
    
    const API_URL = process.env.API_URL;
    
    const resViews = await fetch(`${API_URL}/api/accounts/${account_id}/views`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id }),
    });
    const views = await resViews.json();

    const resAnalytic = await fetch(`${API_URL}/api/account/analytics?account_id=${account_id}`, {
        method: 'GET'
    });
    const analytic = await resAnalytic.json();
    analytic.account.views = views;

    return {
        props: {
            analytic
        }
    };
}