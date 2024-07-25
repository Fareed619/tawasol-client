import { useEffect } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { getPosts } from "../../redux/modules/posts";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
const Posts = ({ getPosts, posts: { posts } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <div className="home">
      <div>
        <PostForm />
        <div>
          {posts.map((post) => (
            <PostItem key={uuidv4()} eachPost={post} />
          ))}
        </div>
      </div>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

export default connect(mapStateToProps, { getPosts })(Posts);
