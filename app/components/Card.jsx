export default function Card(props) {
    
    return (
      <div className="lg:flex">
     
      <img
          className="object-fit w-2/6 h-2/6 md:h-4/6 md:w-5/6 rounded-lg lg:w-2/6 lg:h-5/6"
          src= {props?.cover}
          alt=""
      />
  
      <div className="flex flex-col justify-between py-6 lg:mx-6">
          <a
              href={`/posts/${props?.slug}`}
              className="text-xl font-semibold text-base-content  hover:underline "
          >
          {props?.title}
          </a>
          <p>{props?.summary}</p>
          <span className="text-sm text-base-content">Published On  <strong>{props.date}</strong> </span>
      </div>
  </div>
  )
  }