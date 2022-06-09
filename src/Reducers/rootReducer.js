import { combineReducers } from "redux";
const initState = {
  credential: {
    userName: "No User",
    emailId: "dummy@fake.com",
    rooms: [],
  },
};
const roomState = {
  roomName: "dummyClient",
  chats: [
    {
      message: "This room was Created, but this room is not real",
      sender: "System",
      timeStamp: String(Date()),
    },
  ],
};

const userReducer = (state = initState, action) => {
  if (action.type === "credential") {
    return {
      credential: action.credential.data,
    };
  }
  if (action.type === "logout") {
    return {
      credential: action.credential,
    };
  }
  if (action.type === "refresh") {
    return {
      credential: action.credential,
    };
  }
  if (action.type === "refreshFromStart") {
    return {
      credential: action.credential,
    };
  }
  return state;
};

const roomReducer = (state = roomState, action) => {
  if (action.type === "roomHistory") {
    var data = action.data.data;
    return {
      roomName: data.roomName,
      chats: data.chats,
    };
  }
  if (action.type === "update") {
    data = action.data;
    return {
      roomName: data.roomName,
      chats: data.chats,
    };
  }
  return state;
};

const rootReducer = combineReducers({
  user: userReducer,
  room: roomReducer,
});

export default rootReducer;
