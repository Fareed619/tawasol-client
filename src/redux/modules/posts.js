import { api } from "../../utils";
import { showAlertMessage } from "./alerts";

// ACTION TYPE

export const GET_POSTS = "posts/GET_POSTS";
export const GET_POST = "posts/GET_POST";
export const POST_ERROR = "posts/POST_ERROR";
export const DELETE_POST = "posts/DELETE_POST";
export const UPDATE_LIKES = "posts/UPDATE_LIKES";
export const ADD_POST = "posts/ADD_POST";
export const ADD_COMMENT = "posts/ADD_COMMENT";
export const DELETE_COMMENT = "posts/DELETE_COMMENT";
// ACTION  CREATORS

// TO GET ALL POSTS
export const getPosts = () => async (dispatch) => {
  try {
    const res = await api.get("/posts");
    console.log(res.data);
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// TO UPDATE LIKES
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await api.put(`/posts/like/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
// TO REMOVE LIKE
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await api.put(`/posts/unlike/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// REMOVE POST
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.delete(`/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
    dispatch(showAlertMessage("Post Deleted ", "success"));
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// ADD POST
export const addPost = (formData) => async (dispatch) => {
  try {
    const res = await api.post("posts", formData);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(showAlertMessage("Post Created", "success"));
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
// GET SPICEFIC POST
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/posts/${id}`);
    console.log(res.data);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
// ADD COMMENT
export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const res = await api.post(`/posts/comment/${postId}`, formData);
    console.log(res.data);
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(showAlertMessage("Comment Added", "success"));
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await api.delete(`/posts/comment/${postId}/${commentId}`);
    dispatch({
      type: DELETE_COMMENT,
      payload: commentId,
    });
    dispatch(showAlertMessage("Comment Removed", "success"));
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// REDUCER
const initialState = {
  posts: [],
  error: {},
  post: null,
  loading: true,
};
const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        loading: false,
        posts: payload,
      };
    case GET_POST:
      return {
        ...state,
        loading: false,
        post: payload,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, payload],
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
        loading: false,
      };

    default:
      return state;
  }
};
export default reducer;
