import SocialIcons from "./SocialIcons";

export default function Footer() {
  const date = new Date();
  const year = date?.getFullYear();
  return (
    <footer className="bg-base-300 ">
    <div className="container p-6 mx-auto">
      <div className="lg:flex">
        <div className="w-full -mx-6 lg:w-2/5">
          <div className="px-6">
            <div>
              <a
                href="/"
                className="text-xl font-bold  text-base-content  hover:text-gray-700 dark:hover:text-gray-300"
                >DevTalk</a
              >
            </div>
  
            <p className="max-w-sm mt-2 ">
              This is a developer community blog
            </p>
            <div className="mt-2"><SocialIcons/></div>
         
          </div>
        </div>
  
        <div className="mt-6 lg:mt-0 lg:flex-1">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div>
              <div className="text-primary-focus uppercase ">About</div>
              <a href="https://github.com/devmnj" className="block mt-2 text-sm  hover:underline"
                >Github Profile</a
              >
               
            </div>
  
            <div>
              <div className="text-primary-focus uppercase">Contributions</div>
              <a href="https://javascriptsu.wordpress.com" className="block mt-2 text-sm   hover:underline"
                >WordPress Blog</a
              >
              <a href="https://javascriptsu.wordpress.com/portfolio/nuxt-prismic-headless-cms-blog/" className="block mt-2 text-sm  hover:underline"
                >Prismic Blog (Nuxt)</a
              >
              <a href="https://javascriptsu.wordpress.com/portfolio/covid-dashboard/" className="block mt-2 text-sm  hover:underline"
                >Covid Dashboard (Py)</a
              >
            </div>
  
            <div>
              <div className="text-primary-focus uppercase ">Projects</div>
              <a href="https://github.com/devmnj/remix-mdx-blog-app" className="block mt-2 text-sm  hover:underline"
                >Remix MD Blog</a
              >
              <a href="https://github.com/devmnj/sveltekit-prismic-headless-cms-blog" className="block mt-2 text-sm  hover:underline"
                >Sveltekit Primic Blog</a
              >
              <a href="https://github.com/devmnj/react-css-loaders" className="block mt-2 text-sm  hover:underline"
                >React loaders</a
              >
            </div>
  
            <div>
              <div className="text-primary-focus uppercase">Contact</div>
              <span className="block mt-2 text-sm  hover:underline"
                >+1 526 654 8965</span
              >
              <span className="block mt-2 text-sm   hover:underline"
                >codehat@outlook.com</span
              >
            </div>
          </div>
        </div>
      </div>
  
      <hr className="h-px my-6 bg-gray-200 border-none dark:bg-gray-700" />
  
      <div>
        <p className="text-center ">© DevTalk { year} - All rights reserved</p>
      </div>
    </div>
  </footer>
  );
}
