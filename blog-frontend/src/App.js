import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentForm from "./CommentForm"; // Import the comment form component

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  // Fetch posts when the component mounts
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/posts/")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Handle new post form submission
  const handlePostSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/posts/", newPost)
      .then((response) => {
        setPosts((prevPosts) => [...prevPosts, response.data]); // Use functional state update
        setNewPost({ title: "", content: "" }); // Reset form after submission
      })
      .catch((error) => console.error(error));
  };

  // Handle changes to new post form fields
  const handlePostChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  // Handle new comment submission
  const handleNewComment = (newComment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === newComment.post
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );
  };

  return (
    <div>
      <h1>Blog Posts</h1>

      {/* New Post Form */}
      <form onSubmit={handlePostSubmit}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={newPost.title}
          onChange={handlePostChange}
          required
        />
        <br />
        <label>Content</label>
        <textarea
          name="content"
          value={newPost.content}
          onChange={handlePostChange}
          required
        ></textarea>
        <br />
        <button type="submit">Create Post</button>
      </form>

      <h2>Existing Posts</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>

          {/* Comment Form */}
          <CommentForm postId={post.id} onCommentSubmit={handleNewComment} />

          {/* Display Comments */}
          <div>
            <h4>Comments:</h4>
            {post.comments &&
              post.comments.map((comment) => (
                <p key={comment.id}>{comment.content}</p>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
