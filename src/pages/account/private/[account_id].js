
import PrivateAccountAnalytic from "@/components/account/private-analytic/PrivateAccountAnalytic";

export default function Performance({ analytic }) {

    return (
        <>
            <PrivateAccountAnalytic analytic={analytic} headerTitle={'Personnal account'} />
        </>
    )
}

export async function getServerSideProps(context) {
    const API_URL = process.env.API_URL;
    const account_id = context.query.account_id;

    const resAnalytic = await fetch(`${API_URL}/api/account/analytics?account_id=${account_id}`, {
        method: 'GET'
    });

    const analytic = await resAnalytic.json();
    return {
        props: {
            analytic
        }
    };
}