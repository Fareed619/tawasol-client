import { connect } from "react-redux";
import { addPost } from "../../redux/modules/posts";
import { useState } from "react";
const PostForm = ({ addPost }) => {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    addPost({ text });
    setText("");
  };
  return (
    <div className="post-card">
      <p className="form-title center">Create Post</p>
      <hr />
      <form action="" onSubmit={onSubmit}>
        <div>
          <textarea
            name="text"
            value={text}
            required
            onChange={(e) => {
              setText(e.target.value);
            }}
            placeholder="What's on your mind?"
            id=""
          ></textarea>
        </div>
        <input type="submit" value="Post" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default connect(null, { addPost })(PostForm);
