import React from "react";
import Box from "@mui/material/Box";
import { Card, CardHeader, CardContent } from "@material-ui/core";
import { CardActionArea } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AccessTimeTwoToneIcon from "@mui/icons-material/AccessTimeTwoTone";
import Tooltip from "@mui/material/Tooltip";
import { useSelector } from "react-redux";
const Message = (props) => {
  const user = useSelector((state) => state.user.credential.userName);
  const msg = props.msg;
  const time = String(msg.timeStamp);
  return (
    <Box
      sx={{
        width: "70%",
        marginBottom: "3vh",
        float: "right ",
      }}
    >
      <Card>
        <CardHeader
          subheader={user === msg.sender ? "You" : msg.sender}
          action={
            <Tooltip title={time}>
              <IconButton aria-label="settings">
                <AccessTimeTwoToneIcon />
              </IconButton>
            </Tooltip>
          }
        />{" "}
        <CardActionArea>
          <CardContent>{msg.message}</CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default Message;
