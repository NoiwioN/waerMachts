import './App.Module.css';


export default function App({Component, pageProps}) {
    return (<>
            <h1>Hello world</h1>
            <Component {...pageProps} /></>

        // <GlobalContextProvider>
        //   <Layout>
        //     <Component {...pageProps} />
        //     <ToastContainer />
        //   </Layout>
        // </GlobalContextProvider>
    )
}
