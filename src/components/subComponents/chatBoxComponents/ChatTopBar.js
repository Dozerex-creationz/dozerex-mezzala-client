import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
const ChatTopBar = (props) => {
  const chats = useSelector((state) => state.room);
  const roomName = chats.roomName;
  const callProps = () => {
    console.log("hi im call Props");
    props.setClick(false);
    props.setScroll("auto");
  };
  const renderBack = () => {
    if (props.setClick !== null) {
      return (
        <Tooltip title={"Go Back to Room list"}>
          <Button sx={{ alignContent: "center", backgroundColor: "#257C44"}} onClick={() => callProps()}>
            <ArrowBackOutlinedIcon />
          </Button>
        </Tooltip>
      );
    }
  };
  return (
    <Toolbar
      sx={{
        backgroundColor: "#257C44",
        width: "95%",
        margin: "2%",
        padding: "1%",
        zIndex: 1,
        color: "white",
        borderRadius:"1%"
      }}
    >
      <Typography variant="h6" component="div">
        {roomName}
      </Typography>
      <span
        style={{
          display: "inline-flex",
          width: "80%",
          justifyContent: "flex-end",
        }}
      >
        <ButtonGroup
          sx={{ alignContent: "center" }}
          variant="contained"
          aria-label="outlined primary button group"
        >
          {renderBack()}
        </ButtonGroup>
      </span>
    </Toolbar>
  );
};

export default ChatTopBar;
