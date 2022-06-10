import React from "react";
import { Card, CardHeader } from "@material-ui/core";
import { CardActionArea } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import { useDispatch } from "react-redux";
import axios from "axios";
import * as Constants from "./../../Constants";
const ChatItem = (props) => {
  const dispatch = useDispatch();
  const room = props.room;
  const openChat = (roomName) => {
    if (props.setClick !== null) props.setClick(true);
    if (props.setScroll !== null) props.setClick("hidden");
    var timeStamp = Date();
    timeStamp += " ";
    axios({
      method: "Post",
      url: Constants.URL + "/askMsg",
      data: { roomName: roomName, timeStamp: timeStamp },
    }).then((data) => {
      dispatch({ type: "roomHistory", data: data });
    });
  };
  return (
    <ListItem sx={{ width: "100%" }}>
      <CardActionArea
        onClick={() => {
          openChat(room.roomName);
        }}
      >
        <Card sx={{ width: "100%" }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "red" }}>
                {room.roomName.slice(0, 1).toUpperCase()}
              </Avatar>
            }
            title={room.roomName}
          />
        </Card>
      </CardActionArea>
    </ListItem>
  );
};

export default ChatItem;
