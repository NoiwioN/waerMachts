import './App.Module.css';
import GlobalContextProvider from "../store";
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;


export default function App({Component, pageProps}) {
    return (//<>
            //<h1>Hello world</h1>
          //  <Component {...pageProps} /></>
        <GlobalContextProvider>

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
