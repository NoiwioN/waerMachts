import Header from "../components/Header";
import Footer from "./Footer";
import Bewertung from "./Bewertung";


export default function Layout({children}) {
    return (
        <>

            <Header />
            <Bewertung/>
            <main style={{ minHeight: '100vh', position: 'relative', margin: '0'}}>
                <div>
                    {children}
                </div>


            </main>
            <Footer />



        </>
    );
}
