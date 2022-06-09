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
        overflow: "auto",
        width: props.width,
        height: "90%",
      }}
    >
      {rooms.map((room) => {
        return <ChatItem room={room} setClick={props.setClick} />;
      })}
    </List>
  );
};

export default ChatWindow;
