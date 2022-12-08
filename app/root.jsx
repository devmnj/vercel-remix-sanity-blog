import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from './styles/app.css'
 
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
export function links() {
  return [{ rel: "stylesheet", href: styles }]
}
export const meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (<>
    <Document>
    <Layout>
      <Outlet />
    </Layout>
    
  </Document>
 
  </> 
  );
}



function Document({ children }) {
  return (
   <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        
      </body>
      {/* <Footer/> */}
    </html>
    
    
  );
}


function Layout({ children }) {
  return (
    <>
    <Navbar/>
    <div className="bg-base-100   overflow-auto flex place-content-center m-2 p-2">     
      {children}
    </div>
    </>
    
  );
}