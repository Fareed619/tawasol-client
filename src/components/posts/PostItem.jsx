import React from "react";
import { addLike, removeLike, deletePost } from "../../redux/modules/posts";
import { connect } from "react-redux";
import { formatData, getProfileImage } from "../../utils";
import { Link } from "react-router-dom";

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  users,
  eachPost: { text, _id, name, user, likes, comments, date },
  showActions = true,
}) => {
  return (
    <div className="post-card">
      <div className="row">
        <div className="column">
          <img src={getProfileImage(user)} alt="" className="profile" />
          <p>{name}</p>
        </div>
        <div
          className="column"
          style={{ width: "75%", textAlign: "left", marginTop: 10 }}
        >
          <p>{text}</p>
          <small style={{ color: "gray" }}>Posted at {formatData(date)}</small>

          {showActions && (
            <div>
              <button
                className="btn btn-light"
                type="button"
                onClick={() => {
                  addLike(_id);
                }}
              >
                <i className="fas fa-thumbs-up" />
                <span>
                  {likes.length > 0 && <span> {likes.length}</span>}
                </span>{" "}
              </button>
              <button
                className="btn btn-light"
                type="button"
                onClick={() => {
                  removeLike(_id);
                }}
              >
                <i className="fas fa-thumbs-down" />
              </button>

              <Link to={`/posts/${_id}`} className="btn btn-primary">
                Discussion{" "}
                {comments.length > 0 && (
                  <span className="comment-count">{comments.length}</span>
                )}
              </Link>
              {!users.loading && user === users.user._id && (
                <button
                  className="btn btn-light"
                  onClick={() => {
                    deletePost(_id);
                  }}
                >
                  <i className="fas fa-trash"></i>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});
export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
