import { connect } from "react-redux";
import { addComment } from "../../redux/modules/posts";
import { useState } from "react";
const CommentForm = ({ addComment, postId }) => {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    addComment(postId, { text });
    setText("");
  };
  return (
    <div className="post-card">
      <p className="form-title center">Leave a comment</p>
      <hr />
      <form action="" onSubmit={onSubmit}>
        <div>
          <textarea
            name="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            placeholder="Enter your comment"
            id=""
          ></textarea>
        </div>
        <input type="submit" value="post" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default connect(null, { addComment })(CommentForm);
