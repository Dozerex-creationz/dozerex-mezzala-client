import "./Stylesheets/App.css";
import TopBar from "./components/TopBar";
import TopBarMobile from "./components/TopBarMobile";
import ChatBox from "./components/ChatBox";
import ChatBoxMobile from "./components/ChatBoxMobile";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { BrowserView, MobileView } from "react-device-detect";
import * as Constants from "./components/Constants";
const App = () => {
  const socket = io(Constants.URL);
  var data = useSelector((state) => state.user.credential);
  if (data.emailId !== "dummy@fake.com") {
    socket.on("connect", () => {
      socket.emit("userData", {
        data: data,
      });
      socket.on("welcome", (data) => {});
    });
  } else {
    socket.disconnect();
  }
  return (
    <>
      <div className="bgMain body flexbox colAlign">
        <BrowserView className="body flexbox colAlign">
          <TopBar socket={socket} />
          <ChatBox socket={socket} />
        </BrowserView>
        <MobileView
          className="body flexbox colAlign"
          sx={{ padding: "2vw", overflow: "auto" }}
        >
          <TopBarMobile socket={socket} />
          <ChatBoxMobile socket={socket} />
        </MobileView>
      </div>
    </>
  );
};

export default App;
