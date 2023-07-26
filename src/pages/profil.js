import jwt from 'jsonwebtoken';
export default function Profil() {
    return (
        <div className="max-w-7xl w-full mx-auto">
            <div className='bg-[#1A1D1F] h-[400px] rounded-xl'>
                {/* profil */}
                <div className='flex flex-col w-[300px] h-full p-9'>
                    <div className='w-[250px] h-[250px] rounded-full bg-white'></div>
                    <div className='flex flex-col justify-center items-center'>
                        <span>likes</span>
                        <span>friends</span>
                        <span>number accounts</span>
                    </div>
                </div>

                {/* graphique */}
                <div className='flex flex-1'></div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const token = context.req.cookies['jwt'];
    let auth;
    auth = jwt.verify(token, process.env.SECRET_KEY);
    const userId = parseInt(auth.user_id);

    const API_URL = process.env.API_URL;

    // récupérer les comptes de l'utilisateur avec tous les profits.
    //-> récupérer les comptes avec les ordres
    //-> recuperer les comptes avec les profits
    // retourner une table accounts qui possede les comptes avec leurs profits.

    //PROFIT
    //-> récupérer le nombre de like total
    //-> récupérer la liste des amis
    //-> récupérer les comptes avec profits

    // A REFLECHIR
    //-> profit moyen / jour
    //-> afficher seulement 5 courbes sur le profil
    //-> pseudonyme

    return {
        props: { userId }
    }
}
