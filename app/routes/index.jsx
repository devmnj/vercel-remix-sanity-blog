import { useLoaderData } from "@remix-run/react";  
 import Card from "~/components/Card"; 
import client from "~/sanity";
import {urlFor} from "~/ImageBuilder";


export const loader = async () => {
  const res = await client.fetch(
    `*[_type == "post"]{title,_createdAt,slug,_id,summary,featured_image} | order(_createdAt desc)`
  );

  const data = await res;
  return data;
};


export default function Index() {
 
  const posts = useLoaderData();
  return (
    <div>
<main>
    
      <div className="grid justify-center grid-cols-1 gap-6 my-5 sm:grid-cols-1 lg:grid-cols-1">
          <section className="  rounded-lg">
            <div className="container px-6 py-10 mx-auto">
              <h1 className="text-3xl font-semibold  capitalize lg:text-4xl ">
                From the blog
              </h1>
              <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
                {  posts?.map(
                    (p) => (
                      <Card
                      key={p?._id}
                        date={new Date(p?._createdAt)?.toDateString()}
                        title={p?.title}
                        slug={p?.slug?.current}
                        cover={`${urlFor(p?.featured_image)}`}
                      /> 
                    )
                  )
                }
              </div>
            </div>
          </section>
        </div>
      </main> 
      </div>
  );
}
