import React from 'react'
import { useLoaderData } from "@remix-run/react";  

export const loader = ({request}) => {
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

    // handle "GET" request
    // set up our text content that will be returned in the response
        const robotText = `
        User-agent: Googlebot
        Disallow: /nogooglebot/
    
        User-agent: *
        Allow: /
    
        Sitemap: ${domain}/sitemap.xml
        `
      // return the text content, a status 200 success response, and set the content type to text/plain 
        return new Response(robotText,{
          status: 200,
          headers: {
            "Content-Type": "text/plain",
          }
        });
    };
    