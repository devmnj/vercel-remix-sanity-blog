import React from 'react'
import { useLoaderData } from "@remix-run/react";  
import client from "~/sanity";

 
export function ErrorBoundary({ error }) {
 
  console.error(error);
 return (
   <div>
     <h2>Oh snap!</h2>
    
   </div>
 );
}



export const loader = async ({request} ) => {
  const res = await client.fetch(
    `*[_type == "post"]{title,_createdAt,slug,_id,summary,featured_image} | order(_createdAt desc)`
  );

  const data = await res;
   
  const postList=data?.map((p)=>
  `<url>
  <loc>https://localhost:3000/${p?.slug?.current}</loc>
  <changefreq>daily</changefreq>
  <priority>0.7</priority>)
  </url>
  `);
  const host =
    request?.headers.get("X-Forwarded-Host") ??
    request?.headers.get("host");
  if (!host) {
    throw new Error("Could not determine domain URL.");
  }
  const protocol = host.includes("localhost")
    ? "http"
    : "https";
  const domain = `${protocol}://${host}`;
  const postUrl = `${domain}`;

  const xmlstring =  `<?xml version="1.0" encoding="UTF-8" ?>
    <urlset
      xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xhtml="https://www.w3.org/1999/xhtml"
      xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
      xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
      xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
    >
      <url>
        <loc>https://${postUrl}</loc>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>       
      </url> 
       ${postList}
    </urlset>`;

    return new Response(
      xmlstring,
      {
        status:200,
        headers: {
          "Content-Type": "application/xml",
          "xml-version": "1.0",
        "encoding": "UTF-8"
        }
      }
    )

}; 
