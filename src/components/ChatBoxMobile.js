import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ChatWindow from "./subComponents/chatBoxComponents/ChatWindow";
import ChatDisplay from "./subComponents/chatBoxComponents/ChatDisplay";
import Backdrop from "@mui/material/Backdrop";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import ReactCardFlip from "react-card-flip";
import * as Constants from "./Constants";
const ChatBoxMobile = (props) => {
  /*global google*/
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [click, setClick] = useState(false);
  const handleClose = () => {};
  const checkForLocal = () => {
    var credential = JSON.parse(localStorage.getItem("credential"));
    if (credential === null) {
      return true;
    } else {
      console.log("HI it checks for local");
      credential = credential.data;
      console.log(credential);
      return false;
    }
  };
  const logOut = () => {
    const credentials = {
      userName: "No User",
      emailId: "dummy@fake.com",
      rooms: [],
    };
    dispatch({ type: "logout", credential: credentials });
    localStorage.removeItem("credential");
    setOpen(true);
    props.socket.disconnect();
    window.location.reload();
  };

  const handleGoogleCallBack = async (res) => {
    var creds = jwt_decode(res.credential);
    var credential = await axios({
      method: "Post",
      url: Constants.URL + "/login",
      data: creds,
    });
    dispatch({ type: "credential", credential: credential });
    localStorage.setItem("credential", JSON.stringify(credential));
    setOpen(false);
    return;
  };

  const initGoogle = () => {
    if (checkForLocal()) {
      google.accounts.id.initialize({
        client_id:
          "707676129648-bfmkg6vcvouog7mogu3evtff35vqv47n.apps.googleusercontent.com",
        callback: handleGoogleCallBack,
      });
      google.accounts.id.renderButton(document.getElementById("login"), {
        theme: "outline",
        size: "large",
      });
    } else {
      var credential = JSON.parse(localStorage.getItem("credential"));
      console.log("oh shit why did it reach here!!");
      credential = credential.data;
      console.log(credential);
      dispatch({ type: "refreshFromStart", credential: credential });
      setOpen(false);
      return;
    }
  };
  useEffect(() => {
    initGoogle();
    // eslint-disable-next-line
  }, []);
  if (open) {
    return (
      <>
        <Box
          className="chatBoxBG"
          sx={{
            width: "90%",
            height: "60%",
            display: "flex",
            flexDirection: "row",
            border: "solid black 2px",
            overflow: "hidden",
            marginBottom: "2vh",
          }}
        >
          <Backdrop
            sx={{
              position: "inherit",
              width: "100%",
              height: "100%",
              zIndex: 3,
            }}
            open={open}
            onClick={handleClose}
          >
            <div id="login"></div>
          </Backdrop>
        </Box>
      </>
    );
  }
  return (
    <>
      <Box
        className="flexBox colAlign"
        sx={{
          width: "90%",
          height: "60vh",
          marginBottom: "5vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            border: "solid black 2px",
            overflow: "hidden",
            marginBottom: "2vh",
          }}
        >
          <ReactCardFlip
            isFlipped={click}
            flipDirection="horizontal"
            containerStyle={{ width: "100%", overflow: "auto" }}
          >
            <ChatWindow setClick={setClick} width={"100%"} />
            <ChatDisplay
              socket={props.socket}
              width={"100%"}
              setClick={setClick}
            />
          </ReactCardFlip>
        </Box>
        <div
          style={{
            margin: "2vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            sx={{ margin: "1vh" }}
            variant="contained"
            color="warning"
            onClick={logOut}
          >
            Logout
          </Button>
        </div>
      </Box>
    </>
  );
};

export default ChatBoxMobile;
