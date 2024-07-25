import { connect } from "react-redux";
import { getPost } from "../../redux/modules/posts";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import PostItem from "./PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const Post = ({ getPost, posts: { post, loading } }) => {
  let { id } = useParams();
  useEffect(() => {
    getPost(id);
  }, [getPost, id]);
  return loading || post === null ? null : (
    <div className="home">
      <div>
        <PostItem showActions={false} eachPost={post} />
        <CommentForm postId={post._id} />
      </div>
      {post.comments.map((comment) => (
        <CommentItem comment={comment} postId={post._id} key={comment._id} />
      ))}
    </div>
  );
};
const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default connect(mapStateToProps, { getPost })(Post);
