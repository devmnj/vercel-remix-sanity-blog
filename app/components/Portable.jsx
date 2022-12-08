import { urlFor } from '~/ImageBuilder';
import Code from '~/components/Code';
export  const myPortableComponents = {
    block: {
      h1: ({ children }) => (
        <h1 className="text-secondary-focus font-bold mt-3 mb-3">
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h1 className="text-3xl text-secondary-focus font-bold mt-3 mb-3">
          {children}
        </h1>
      ),
  
      normal: ({ children }) => <p className="my-3">{children}</p>,
    },
    types: {
      code: ({ value }) => <Code>{value?.code}</Code>,
      image: ({ value }) => (
        <div className="place-content-center flex w-5/6 h-3/5">
          <img src={`${urlFor(value)}`} alt="media"/>
        </div>
      ),
    },
  };


