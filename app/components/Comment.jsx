import client from "~/sanity";
const Comment = (props) => {
  return (
    <div className="space-y-4 mb-2">
      <div className="flex">
        <div className="flex-shrink-0 mr-3">
          <img
            className="hover:ring ring-accent mt-2 rounded-full w-10 h-10 sm:w-10 sm:h-10"
            src="https://source.unsplash.com/random/?face&fit=facearea&facepad=2&w=276&h=280&q=80"
            alt=""
          />
        </div>
        <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
          <strong>{props?.name}</strong>
          <span className="pl-2 text-xs  text-base-content">{props?.date}</span>
          <p className="text-sm">{props?.comment}</p>
        </div>
      </div>
    </div>
  );
};

const Comments = (props) => {
  //  console.log(props.data);
  if (props?.data?.length > 0) {
    return (
      <div className="antialiased mx-auto max-w-screen-sm">
        <h3 className="mb-4 text-lg font-semibold ">Comments</h3>
        {props?.data?.map((com) => (
          //  <div>{comment.name}</div>
          <Comment
            key={com?._id}
            name={com?.name}
            comment={com?.comment}
            date={new Date(com?._createdAt)?.toTimeString()}
          />
        ))}
      </div>
    );
  }
};


function CommentBox() {
  return (
    <div className="mx-auto max-w-screen-sm px-4">
      <h1 className="mt-6 text-xl font-bold sm:mb-6 sm:text-3xl">
        Write your comment
      </h1>
        
      <CommentForm/>
    </div>
  );
}

export { Comments, CommentBox };
