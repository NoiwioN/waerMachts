import './App.Module.css';
import '../styles/global.css'
import GlobalContextProvider from "../store";
import {ToastContainer} from "react-toastify";
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import "@fortawesome/free-solid-svg-icons"
import Link from "next/link";


export default function App({Component, pageProps}) {
    return (//<>
            //<h1>Hello world</h1>
          //  <Component {...pageProps} /></>

        <GlobalContextProvider>
            <Link href={"/users/PeterParker"}>Yo Peter </Link>
            <Component {...pageProps} />
            <ToastContainer />
        </GlobalContextProvider>


        // <GlobalContextProvider>
        //   <Layout>
        //     <Component {...pageProps} />
        //   </Layout>
        // </GlobalContextProvider>
    )
}
