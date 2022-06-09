import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CustomButton from "./../global/CustomButton";
import { useSelector, useDispatch } from "react-redux";
const MessageBox = (props) => {
  const [msg, setMsg] = useState("");
  const userName = useSelector((state) => state.user.credential.userName);
  const chats = useSelector((state) => state.room);
  const dispatch = useDispatch();
  const roomName = chats.roomName;
  const socket = props.socket;
  socket.on("updatedDB", (data) => {
    dispatch({ type: "update", data: data });
    socket.off("updateDB");
    return;
  });
  const validate = async (msg) => {
    var timeStamp = Date();
    timeStamp += " ";
    var data = {
      msg: msg,
      sender: userName,
      roomName: roomName,
      timeStamp: timeStamp,
    };
    socket.emit("sendMsg", { data: data });
    setMsg("");
  };
  return (
    <Box
      sx={{
        width: "100%",
        margin: "1vh",
        display: "inline-flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <TextField
        id="outlined-basic"
        label="What's Your Message"
        variant="outlined"
        sx={{ width: "83%" }}
        value={msg}
        onChange={(e) => {
          setMsg(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            if (e.key === "Enter" && msg !== "") {
              validate(msg);
            }
          }
        }}
      />
      <CustomButton
        name={"send"}
        sx={{ width: "27%", height: "100%" }}
        onClick={() => {
          if (msg === "") {
          } else {
            validate(msg);
          }
        }}
      />
    </Box>
  );
};

export default MessageBox;
