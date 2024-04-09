import Header from "../components/Header";
import Footer from "./Footer";


export default function Layout({children}) {
    return (
        <>

            <Header />
            <main style={{ minHeight: '100vh', position: 'relative' , paddingTop:'40px'}}>
                <div style={{ minHeight: '990px'}}>
                    {children}
                </div>

                <Footer />
            </main>



        </>
    );
}
