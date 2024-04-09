import './App.Module.css';
import '../styles/global.css'
import GlobalContextProvider from "../store";
import "@fortawesome/fontawesome-svg-core/styles.css"
import {config} from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;
import "@fortawesome/free-solid-svg-icons"
import Link from "next/link";
import Layout from "../Components/Layout";
import {ToastContainer} from "react-toastify";


export default function App({Component, pageProps}) {
    return (//<>
        //<h1>Hello world</h1>
        //  <Component {...pageProps} /></>

        <GlobalContextProvider>
            <Layout>

                <Component {...pageProps} />
                <ToastContainer/>
            </Layout>
        </GlobalContextProvider>


        // <GlobalContextProvider>
        //   <Layout>
        //     <Component {...pageProps} />
        //     <ToastContainer />
        //   </Layout>
        // </GlobalContextProvider>
    )
}
