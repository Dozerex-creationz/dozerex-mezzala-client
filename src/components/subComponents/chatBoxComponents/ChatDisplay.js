import React from "react";
import Box from "@mui/material/Box";
import Message from "./Message";
import MessageBox from "./MessageBox";
import ChatTopBar from "./ChatTopBar";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import "./../../../Stylesheets/background.css";
import Backdrop from "@mui/material/Backdrop";
const renderDisp = (room, messages, socket, props) => {
  if (room.roomName === "dummyClient") {
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
            Click on a Classroom to proceed, if no rooms exists....try joining "Welcome Friends"
          </Paper>
        </Backdrop>
      </>
    );
  }
  if (messages.length > 0) {
    return (
      <>
        <Box
          sx={{
            position: "absolute",
            top: "0",
            width: "100%",
            overflow: "hidden",
            borderRadius: "1%",
            marginTop: "1vh",
          }}
        >
          <ChatTopBar setClick={props.setClick} setScroll={props.setScroll}/>
        </Box>
        <div style={{ overflow: "auto", width: "100%", height: "100%" }}>
          <List
            sx={{
              position: "absolute",
              bottom: "10vh",
              marginTop:"5vh",
              width: "100%",
              height: "90%",
              display: "flex",
              flexFlow: "column-reverse",
              overflow: "auto",
              paddingTop: "12vh",
            }}
          >
            {messages
              .slice()
              .reverse()
              .map((msg) => {
                return <Message msg={msg} />;
              })}
          </List>
        </div>
        <Box sx={{ position: "absolute", bottom: "0", width: "100% " }}>
          <MessageBox socket={socket} />
        </Box>
      </>
    );
  }
};
const ChatDisplay = (props) => {
  const room = useSelector((state) => state.room);
  const messages = room.chats;
  return (
    <Box
      sx={{
        position: "relative",
        width: props.width,
        height: "1",
      }}
    >
      {renderDisp(room, messages, props.socket, props)}
    </Box>
  );
};

export default ChatDisplay;
