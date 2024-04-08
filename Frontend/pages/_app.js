import './App.Module.css';
import GlobalContextProvider from "../store";
import Link from "next/link";


export default function App({Component, pageProps}) {
    return (//<>
            //<h1>Hello world</h1>
          //  <Component {...pageProps} /></>

        <GlobalContextProvider>
            <Link href={"/users/PeterParker"}>Yo Peter </Link>
            <Component {...pageProps} />
        </GlobalContextProvider>


        // <GlobalContextProvider>
        //   <Layout>
        //     <Component {...pageProps} />
        //     <ToastContainer />
        //   </Layout>
        // </GlobalContextProvider>
    )
}
