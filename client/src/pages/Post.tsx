import { useGetAllPostsQuery } from "../services/api/apiQuery";
const Post = () => {
  const { data, error, isLoading } = useGetAllPostsQuery("");
  console.log(data);

  return <div>{isLoading ? <h1>loading</h1> : <h1>posts</h1>}</div>;
};

export default Post;
