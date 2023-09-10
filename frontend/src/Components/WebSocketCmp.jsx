import { Button } from "@chakra-ui/react";
import React, { useEffect } from "react";
import useWebSocket from "react-use-websocket";

function WebSocketCmp() {
  useWebSocket("ws://localhost:5000", {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
  });

  return (
    <div className="text-center text-slate-300">
      <h1>My web Socket component</h1>
      <p>Note: The numbers registered on Twilio will receive the call!.</p>
    </div>
  );
}

export default WebSocketCmp;
