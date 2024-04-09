import Header from "../components/Header";
import Footer from "./Footer";


export default function Layout({children}) {
    return (
        <>

            <Header />
            <main style={{ minHeight: '100vh', position: 'relative', margin: '0'}}>
                <div style={{ minHeight: '990px'}}>
                    {children}
                </div>


            </main>
            <Footer />



        </>
    );
}
