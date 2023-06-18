import ContentHeader from "@/components/contentHeader/contentHeader";
import ButtonBlueAdd from "@/components/button/buttonBlueAdd";
export default function Orders(account_id) {

    return (
        <div className="w-full h-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-row items-center">
                    <ContentHeader icon={'/CarbonHomeBlue.svg'} title={'Open range break 129540'} />
                </div>
                <div className="w-full flex flex-col bg-[#1A1D1F] h-[500px] p-5">
                    <div className="flex flex-row items-center justify-between">
                        <div>
                            <span>Trading account history</span>
                        </div>
                        <ButtonBlueAdd title={'new order'} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const account_id = context.query.account_id;
    try {

    } catch {

    }
    // récupération des données du compte
    // récupération des trades du compte
    return { props: { account_id } };
}
