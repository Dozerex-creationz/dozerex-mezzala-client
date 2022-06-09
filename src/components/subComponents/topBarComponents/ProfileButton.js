import React, { useState } from "react";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import { Card, CardHeader } from "@material-ui/core";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useSelector } from "react-redux";
const ProfileButton = () => {
  const [open, setOpen] = useState(false);
  var credential = useSelector((state) => state.user.credential);
  var userName = credential.userName;
  const handleClose = () => {
    setOpen(false);
  };

  if (open) {
    return (
      <Backdrop
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          color: "#fff",
          zIndex: 5,
        }}
        open={open}
        onClick={handleClose}
      >
        <Card
          sx={{
            padding: "2vw",
            textAlign: "center",
          }}
        >
          <CardHeader title="WELCOME" subheader={userName} />
        </Card>
      </Backdrop>
    );
  }
  return (

      <Button
        sx={{
          borderRadius: "50%",
          height: "50%",
          zIndex: "2",
          opacity: "0.8",
        }}
        onClick={() => {
          setOpen("true");
        }}
      >
        <AccountBoxIcon sx={{ color: "white", fontSize: "3.5em" }} />
      </Button>
  );
};

export default ProfileButton;
