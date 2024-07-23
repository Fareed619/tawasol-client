/* eslint-disable no-undef */
import { api, setAuthToken } from "../../utils";
import { showAlertMessage } from "./alerts";
import store from "../store";

// actions

export const GET_PROFILE = "profiles/GET_PROFILE";
export const GET_PROFILES = "profiles/GET_PROFILES";
export const UPDATE_PROFILE = "profiles/UPDATE_PROFILE";
export const PROFILE_ERROR = "profiles/PROFILE_ERROR";
export const UPLOAD_PROFILE_IMAGE = "profiles/UPLOAD_PROFILE_IMAGE";
export const PROFILE_CLEAR = "profiles/PROFILE_CLEAR";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await api.get("/profiles/me");
    console.log(res.data);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    console.error("/me", error.response.data.msg);

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
// create or update profile

export const createProfile =
  (formData, navigate, edit = false) =>
  async (dispatch) => {
    console.log("edit => ", edit);
    console.log(
      "form data to create or update profiles it will sent to server",
      formData
    );

    try {
      const res = await api.post("/profiles", formData);
      console.log("res.data =>", res.data);
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });

      dispatch(
        showAlertMessage(
          edit ? "profile Updated" : "profile Created",
          "success"
        )
      );

      if (!edit) {
        navigate("/home");
      }
    } catch (error) {
      const errors = error.response.data.errors;
      console.log("In create profile", error);

      if (errors) {
        errors.forEach((error) =>
          dispatch(showAlertMessage(error.msg, "error"))
        );
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };

export const uploadProfileImage = (data) => async (dispatch) => {
  try {
    const res = await api.post("/profiles/upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch({
      type: UPLOAD_PROFILE_IMAGE,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProfiles = () => async (dispatch) => {
  try {
    const res = await api.get("/profiles");
    console.log("res", res)
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await api.get(`/profiles/user/${userId}`);
   
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const addExperience = (formData, navigate) => async (dispatch) => {
  try {
    const res = await api.put("/profiles/experience", formData);
    console.log("experenice respnose ===>>>0", res.data);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(showAlertMessage("Experience added", "success"));
    navigate("/home");
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((err) => dispatch(showAlertMessage(err.msg, "error")));
    }
  }

  dispatch({
    type: PROFILE_ERROR,
    payload: { msg: "error in adding experience" },
  });
};

export const addEducation = (formData, navigate) => async (dispatch) => {
  try {
    const res = await api.put("/profiles/education", formData);
    console.log(res.data);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(showAlertMessage("Education added", "success"));
    navigate("/home");
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((err) => dispatch(showAlertMessage(err.msg, "error")));
    }
  }

  dispatch({
    type: PROFILE_ERROR,
    payload: { msg: "there is error in adding education" },
  });
};

export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/profiles/experience/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(showAlertMessage("Experience Removed", "success"));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const deleteEducation = (id) => async (dispatch) => {
  dispatch({
    type: PROFILE_CLEAR,
  });
  try {
    const res = await api.delete(`/profiles/education/${id}`);
    console.log("response in delete education", res);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(showAlertMessage("Education Removed", "success"));
    console.log(store.getState());
  } catch (error) {
    console.log("error in education delete", error);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
// reducer

const initialState = {
  profile: null,
  loading: true,
  error: {},
  image: null,
  profiles: [],
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      setAuthToken(localStorage.getItem("token"));
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };
    case UPLOAD_PROFILE_IMAGE:
      setAuthToken(localStorage.getItem("token"));

      return {
        ...state,
        imgae: payload,
      };

    case PROFILE_CLEAR:
      return {
        ...state,
        profile: null,
      };
    default:
      return state;
  }
}
