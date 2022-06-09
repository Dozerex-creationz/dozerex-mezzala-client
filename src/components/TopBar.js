import React, { useState } from "react";
import ProfileButton from "./subComponents/topBarComponents/ProfileButton";
import TextField from "@mui/material/TextField";
import CustomButton from "./subComponents/global/CustomButton";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
const addUser = (room, setRoom, user, dispatch, socket) => {
  var timeStamp = Date();
  timeStamp += " ";
  if (room === "") {
  } else {
    console.log(user);
    socket.emit("addUser", {
      cred: user,
      roomName: room,
      timeStamp: timeStamp,
    });
    socket.once("addedUser", (data) => {
      if (data === "user already in the room") {
        return;
      }
      dispatch({ type: "refresh", credential: data });
      setRoom("");
    });
  }
};
const search = (room, setRoom, user, dispatch, socket) => {
  return (
    <>
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
          label="Enter Room name and click join"
          variant="outlined"
          sx={{ width: "100%" }}
          value={room}
          onChange={(e) => {
            if (user.userName !== "No User") {
              setRoom(e.target.value);
            } else {
              setRoom("");
            }
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              if (e.key === "Enter" && room !== "") {
                addUser(room, setRoom, user, dispatch, socket);
              }
            }
          }}
        />
        <CustomButton
          name={"Join"}
          sx={{ width: "27%", height: "100%" }}
          onClick={() => {
            addUser(room, setRoom, user, dispatch, socket);
          }}
        />
      </Box>
    </>
  );
};
const TopBar = (props) => {
  const [room, setRoom] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.credential);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "30vh",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          height: "15vh",
          width: "100vw",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column wrap",
          padding: "auto",
          fontSize: "3.5em",
        }}
      >
        <span
          style={{
            width: "100%",
            height: "100%",
            display: "inline-flex",
            justifyContent: "flex-start",
          }}
        >
          <ProfileButton />
        </span>
        <span
          style={{
            width: "100%",
            textAlign: "center",
            position: "absolute",
          }}
        >
          MEZZALA
        </span>
      </Box>
      <Box
        sx={{
          height: "15vh",
          display: "flex ",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            padding: "auto",
            width: "75vw",
          }}
        >
          {search(room, setRoom, user, dispatch, props.socket)}
        </Box>
      </Box>
    </Box>
  );
};

export default TopBar;
