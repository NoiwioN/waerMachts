import './App.Module.css';
import GlobalContextProvider from "../store";
import {ToastContainer} from "react-toastify";

export default function App({Component, pageProps}) {
    return (//<>
            //<h1>Hello world</h1>
          //  <Component {...pageProps} /></>
        <GlobalContextProvider>
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
