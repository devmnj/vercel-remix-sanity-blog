import {
  Links,
  Link,
  LiveReload,
  useLocation,
  useLoaderData,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import {useEffect} from 'react'
import styles from './styles/app.css'
 
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { json } from "@remix-run/node";


import * as gtag from "~/utils/gtags.client";

/**
 * @description
 * If you would like to include the development env values in your browser bundle AKA
 * set some global values on the window object, take a look at these docs here:
 * https://remix.run/guides/envvars#server-environment-variables
 */
// export async function loader() {
//   return json({
//     ENV: {
//       APP_ENV: process.env.NODE_ENV,
//     },
//   });
// }

// Load the GA tracking id from the .env
export const loader = async () => { 
  return json({ gaTrackingId: process.env.GA_TRACKING_ID });
};



export function links() {
  return [{ rel: "stylesheet", href: styles }]
}
export const meta = () => ({
  charset: "utf-8",
  title: "Devguides",
  viewport: "width=device-width,initial-scale=1",
  "google-site-verification":"6r8yq6e_GqZ3mR4Me1xxwvwiyrj1Fgnsq4xJCU5317I"
  
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

   const location = useLocation();
  const { gaTrackingId } = useLoaderData ();
  console.log(gaTrackingId);
  useEffect(() => {
    if (gaTrackingId?.length) {
      gtag.pageview(location.pathname, gaTrackingId);
    }
  }, [location, gaTrackingId]);
  return (
   <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
            {process.env.NODE_ENV === "development" || !gaTrackingId ? null : (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}
            />
            <script
              async
              id="gtag-init"
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${gaTrackingId}', {
                  page_path: window.location.pathname,
                });
              `,
              }}
            />
          </>
        )}
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        
      </body>
      
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