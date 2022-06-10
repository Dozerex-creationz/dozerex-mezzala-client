import React from "react";
import ChatItem from "./ChatItem";
import List from "@mui/material/List";
import { useSelector } from "react-redux";
const ChatWindow = (props) => {
  const rooms = useSelector((state) => state.user.credential.rooms);
  return (
    <List
      sx={{
        background: "transparent",
        overflow: props.scroll,
        width: props.width,
        height: "90%",
      }}
    >
      {rooms.map((room) => {
        return <ChatItem room={room} setClick={props.setClick} setScroll={props.setScroll}/>;
      })}
    </List>
  );
};

export default ChatWindow;
