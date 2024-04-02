import React, { useState, useEffect } from "react";
import { socket } from "./socket";
import { ConnectionState } from "./components/ConnectionState";
import { ConnectionManager } from "./components/ConnectionManager.jsx";
import { Events } from "./components/Events";
import { MyForm } from "./components/MyForm";
import Products from "./components/Products.js";
import { ConnectionModal } from "./components/Modals/Connection.js";

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [commandEvents, setCommandEvents] = useState<any[]>([]);
  const [remoteStatus, setRemoteStatus] = useState<string>("OFFLINE");

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onCommandEvent(value: any) {
      const resp = value.toString();
      const command = resp.split(",");
      if (command[0] === "c") {
        if (command[1] === "STATUS") {
          setRemoteStatus(command[2]);
        } else if (command[1] === "ERR") {
        }
      }
      setCommandEvents((previous) => [...previous, value]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("command", onCommandEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("command", onCommandEvent);
    };
  }, []);

  if (remoteStatus === "OFFLINE") {
  }
  return (
    <div className="App">
      <ConnectionModal open={isConnected} />
      <ConnectionState isConnected={isConnected} />
      <Events events={commandEvents} />
      <ConnectionManager />
      {/* <MyForm /> */}
      <Products />
    </div>
  );
}
