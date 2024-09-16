import "@/styles/globals.css";
import { AuthProvider } from "../context/AuthContext";
import Head from 'next/head';
import NavBar from './components/navrbar.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 


export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Head>
        <title>BINUS ASO SCHOOL OF ENGINEERING LABORATORY WEBSITE</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="BINUS ASO LAB WEBSITE"
        />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <div className="bg-texture-custom min-vw-100 min-vh-100">
        <NavBar />
        <div className="container">
          <Component {...pageProps} />
        </div>
        <br />
      </div>
    </AuthProvider>
  );
}