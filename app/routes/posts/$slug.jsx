/* eslint-disable jsx-a11y/img-redundant-alt */
import { useLoaderData, Form } from "@remix-run/react";
import client from "~/sanity";
import { PortableText } from "@portabletext/react";
import { Comments } from "~/components/Comment";
import { urlFor } from "~/ImageBuilder";
import { redirect } from "@remix-run/node";
import { myPortableComponents } from "~/components/Portable";
import { RecommendedPosts } from "~/components/Recommended";
 
export function ErrorBoundary({ error }) {
  return (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
    </div>
  );
}

export const action = async ({ request }) => {
  const formData = await request.formData();
  const name = formData?.get("commentedBy");
  const comment = formData?.get("comment");
  const email = formData?.get("email");
  const id = formData?.get("post");
  if (name && comment) {
    const doc = {
      _type: "comment",
      post: {
        _type: "reference",
        _ref: id,
      },
      approved: true,
      name: name,
      email: email,
      comment: comment,
    };
    // console.log(Id);
    // console.log(doc);
    client.create(doc).then((res) => {
      console.log("Success:" + JSON.stringify(res));
    });
  }

  return redirect("/");
};

export const loader = async ({ params }) => {
  const res = await client.fetch(
    `*[_type == "post" && slug.current =='${params.slug}']{title,_id,content,featured_image,summary,tags,_createdAt,view,references[],recommended[]->{
      title,
      summary,
      tags,
      featured_image,
      _createdAt,
      slug
     },
     'comments':*[_type == "comment" && post._ref == ^._id && approved == true]{
      _id, 
      name, 
      email, 
      comment, 
      _createdAta
     }
    
    }`
  );
  const data = await res;
 
  return data;
};

export default function Post() {
  const data = useLoaderData();

  return (
    <>
      <div className=" max-w-7xl  text-base-content py-16 mx-auto space-y-8">
        <article className="flex lg:prose-xl">
          <div>
            <div className="">
              <h1 className=" ">{data && data[0]?.title}</h1>
              <div />
              <div className="flex flex-col items-start text-base-content justify-between w-full md:flex-row md:items-center ">
                <div className="flex my-2 items-center md:space-x-2">
                  <img
                    src="https://avatars.githubusercontent.com/u/28762625?v=4/?face&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                    className="f w-12 h-12  border rounded-md "
                  />

                  <p className="  flex justify-items-stretch">
                    <span className="text-lg"> Manoj AP </span>
                  </p>
                </div>
                <p className="flex-shrink-0 mt-3 text-sm md:mt-0" />
              </div>
            </div>
            <div className="place-content-center flex">
              <img
                className="rounded w-9/12 h-1/4"
                src={`${urlFor(data[0]?.featured_image)}`}
                alt=" "
              />
            </div>

            <div className="" id="article">
              <PortableText
                value={data[0].content}
                components={myPortableComponents}
              />
            </div>
          </div>
        </article>

        {/* <!-- Tags --> */}
        <div className="">
          {data[0]?.tags?.map((t) => (
            <div
              key={t}
              className="uppercase mx-2 text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-600 text-white rounded-full"
            >
              {t}
            </div>
          ))}
        </div>

        {/* Recommended posts */}

        <div className="space-y-2 mt-3 ">
          <RecommendedPosts posts={data[0]?.recommended} />
        </div>

        {/* Comments       */}
        <Comments data={data[0]?.comments} />
        <div className="space-y-2">
          <div className="mx-auto max-w-screen-sm px-4">
            <h1 className="mt-6 text-xl font-bold sm:mb-6 sm:text-3xl">
              Write your comment
            </h1>
            <Form
              method="post"
              className="-ml-20 flex p-4 text-left text-gray-700"
            >
              <input
                name="post"
                defaultValue={data[0]?._id}
                type="text"
                className="hidden"
                readonly
              ></input>
              <img
                className="mr-5 h-12 w-12 rounded-full"
                src={`https://ui-avatars.com/api/?name=Dev`}
                alt=""
              />

              <div className="w-full space-y-3 text-gray-700">
                <div className="">
                  <input
                    name="commentedBy"
                    type="text"
                    placeholder="name"
                    className="h-12 w-full max-w-full rounded-md border bg-white px-5 text-sm outline-none focus:ring"
                  />
                </div>
                <div className="">
                  <input
                    name="email"
                    type="text"
                    placeholder="Email"
                    className="h-12 w-full max-w-full rounded-md border bg-white px-5 text-sm outline-none focus:ring"
                  />
                </div>
                <div className="">
                  <textarea
                    name="comment"
                    id=""
                    placeholder="Write your comment here"
                    className="h-40 w-full min-w-full max-w-full overflow-auto whitespace-pre-wrap rounded-md border bg-white p-5 text-sm font-normal normal-case text-gray-600 opacity-100 outline-none focus:text-gray-600 focus:opacity-100 focus:ring"
                  />
                </div>
                <div className="float-right">
                  <input
                    type="submit"
                    value="Post Comment"
                    className="relative inline-flex h-10 w-auto max-w-full cursor-pointer items-center justify-center overflow-hidden whitespace-pre rounded-md bg-blue-700 px-4 text-center text-sm font-medium normal-case text-white opacity-100 outline-none focus:ring"
                  />
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
