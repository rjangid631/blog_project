import React, { useState } from "react";
import axios from "axios";

function CommentForm({ postId, onCommentSubmit }) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);  // Loading state
  const [error, setError] = useState("");        // Error state

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true
    setError("");    // Reset any previous error message

    axios
      .post("http://127.0.0.1:8000/api/comments/", { content: comment, post: postId })
      .then((response) => {
        onCommentSubmit(response.data); // Update the UI with new comment
        setComment(""); // Reset form
        setLoading(false); // Reset loading state
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to post comment. Please try again."); // Set error message
        setLoading(false); // Reset loading state
      });
  };

  return (
    <form onSubmit={handleCommentSubmit}>
      <textarea
        value={comment}
        onChange={handleCommentChange}
        required
        placeholder="Add a comment..."
      ></textarea>
      <br />
      {error && <p style={{ color: "red" }}>{error}</p>}  {/* Display error message */}
      <button type="submit" disabled={loading}>
        {loading ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
}

export default CommentForm;
