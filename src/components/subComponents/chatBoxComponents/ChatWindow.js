import React from "react";
import ChatItem from "./ChatItem";
import List from "@mui/material/List";
import { useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import Paper from "@mui/material/Paper";
const ChatWindow = (props) => {
  const rooms = useSelector((state) => state.user.credential.rooms);
  if (rooms.length === 0) {
    return (
      <>
        <Backdrop
          sx={{
            position: "inherit",
            width: "100%",
            height: "100%",
            zIndex: 3,
          }}
          open={() => {}}
          onClick={() => {}}
        >
          <Paper
            sx={{ backgroundColor: "#e0ce7e", padding: "2rem" }}
            elevation={6}
          >
            ...try joining "Welcome Friends", by entering the room name in the search bar
          </Paper>
        </Backdrop>
      </>
    );
  }
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
