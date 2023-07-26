
import PublicAccountAnalytic from "@/components/account/public-analytic/PublicAccountAnalytic";

export default function Performance({ analytic }) {
    return (
        <>
            <PublicAccountAnalytic analytic={analytic} />
        </>
    )
}

export async function getServerSideProps(context) {
    const account_id = context.query.account_id;
    const API_URL = process.env.API_URL;
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