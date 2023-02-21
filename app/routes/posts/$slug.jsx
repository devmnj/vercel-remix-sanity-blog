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
  console.error(error);
  return (
    <div>
      <h2>Oh snap!</h2>
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
  if (data[0]?._id && data[0]?.view) {
    client
      .patch(data[0]?._id)
      .inc({ view: 1 })
      .commit()
      .then((updatedPost) => {
        console.log("Hurray, the Post is updated! New document:");
        console.log(updatedPost);
      });
  }

  return (
    <>
      <div className="max-w-7xl text-base-content py-16 px-16 mx-auto">
        <article>
          <div className="">
            <h1
              className="text-2xl text-neutral-content font-bold md:tracking-tight pb-3 md:text-2xl
        l"
            >
              {data && data[0]?.title}
            </h1>
            <div />
            <div className="flex flex-col items-start text-base-content justify-between w-full md:flex-row md:items-center ">
              {/* <div className="flex my-2 items-center md:space-x-2">
                  <img
                    src="https://avatars.githubusercontent.com/u/28762625?v=4/?face&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                    className="f w-12 h-12  border rounded-md "
                  />

                  <p className="  flex justify-items-stretch">
                    <span className="text-lg"> <a href="https://github.com/devmnj">Devmnj   </a></span>
                  </p>
                </div> */}
              <p className="flex-shrink-0 mt-3 text-sm md:mt-0" />
            </div>
          </div>
          <div className="place-content-center flex">
            <img
              className="rounded  object-fill h-2/6 w-3/6"
              src={`${urlFor(data[0]?.featured_image)}`}
              alt=" "
            />

            <blockquote className="p-2 text-xl italic font-semibold text-gray-900 dark:text-white">
              <svg
                aria-hidden="true"
                className="w-10 h-10 text-gray-400 dark:text-gray-600"
                viewBox="0 0 24 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                  fill="currentColor"
                />
              </svg>
              <p className="text-2xl text-blue-200 font-black">
                {data[0]?.summary}
              </p>
            </blockquote>
          </div>
          <div className="" id="article">
            <PortableText
              value={data[0].content}
              components={myPortableComponents}
            />
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
                readOnly
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
