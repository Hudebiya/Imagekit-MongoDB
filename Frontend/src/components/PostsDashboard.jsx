
import { useState, useEffect } from "react";
import axios from "axios";

const PostsDashboard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/posts")
      .then((res) => {
        console.log("API Response:", res.data);
        setPosts(res.data.post);
      })
      .catch((err) => {
        console.log("Fetch Error", err);
      });
  }, []);

  return (
    <div>
      <h1>My Posts</h1>

      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.desc}</p>
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              width="200"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default PostsDashboard;
