import './App.Module.css';
import GlobalContextProvider from "../store";


export default function App({Component, pageProps}) {
    return (//<>
            //<h1>Hello world</h1>
          //  <Component {...pageProps} /></>
        <GlobalContextProvider>
            <h1>Hello world</h1>
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
