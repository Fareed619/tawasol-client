
import { deleteComment } from "../../redux/modules/posts";
import { connect } from "react-redux";
import { formatData, getProfileImage } from "../../utils";
import { Link } from "react-router-dom";

const CommentItem = ({
  deleteComment,
  users,
  comment: { text, _id, name, user, date },
  postId,
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

          {!users.loading && user === users.user._id && (
            <div>
              <button
                type="button"
                className="btn btn-light"
                onClick={() => {
                  deleteComment(postId, _id);
                }}
              >
                <i className="fas fa-trash"></i>
              </button>
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
export default connect(mapStateToProps, { deleteComment })(CommentItem);
