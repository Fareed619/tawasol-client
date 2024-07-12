import { combineReducers } from "redux";
import users from "./users";
import prfiles from "./profiles";
import posts from "./posts";
import alerts from "./alerts";



export default combineReducers ( {
    users, alerts, prfiles, posts
});