// defiend actions

// I have one action to show alert

const SHOW_ALERT_MESSAGE = "alerts/SHOW_ALERT_MESSAGE";

// actino creator fucnction

export function showAlertMessage(msg, type = "info") {
  return function showAlertMessageThunk(dispatch) {
    dispatch({
      type: SHOW_ALERT_MESSAGE,
      payload: {
        show: true,
        msg,
        type,
      },
    });
  };
}

// when showAlertMessage is called that will make dispatch => reducer will carry out

// reducer

const initialState = {
  show: false,
  msg: "",
  type: "info",
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_ALERT_MESSAGE:
      return {
        ...state,
        show: true,
        msg: action.payload.msg,
        type: action.payload.type,
      };
    default:
      return state;
  }
}
