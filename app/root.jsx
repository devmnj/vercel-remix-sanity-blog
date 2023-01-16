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
  title: "Devtalk",
  viewport: "width=device-width,initial-scale=1",
  "google-site-verification":"6r8yq6e_GqZ3mR4Me1xxwv"

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
    <div className="">
    <Navbar/>
    <div className="items-center overflow-auto">     
      {children}
    </div>
    <Footer/>
    </div>
    
  );
}