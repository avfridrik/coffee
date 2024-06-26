import React, { useState, useEffect } from "react";
import { socket } from "./socket";
import { ConnectionState } from "./components/ConnectionState";
import { ConnectionManager } from "./components/ConnectionManager.jsx";
import { Events } from "./components/Events";
import { MyForm } from "./components/MyForm";
import Products from "./components/Products.js";
import { ConnectionModal } from "./components/Modals/Connection.js";
import { WaitPaymentModal } from "./components/Modals/WaitPayment.js";
import { WaitDispenseModal } from "./components/Modals/WaitDispense.js";
import { SuccessModal } from "./components/Modals/Success.js";
import { ErrorModal } from "./components/Modals/Error.js";

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [commandEvents, setCommandEvents] = useState<any[]>([]);
  const [remoteState, setRemoteState] = useState<string>("OFFLINE");
  const [isWaitPayment, setWaitPayment] = useState<boolean>(false);
  const [isWaitDispense, setWaitDispense] = useState<boolean>(false);
  const [showSuccessWindow, setSuccessWindow] = useState<boolean>(false);
  const [showErrorWindow, setErrorWindow] = useState<boolean>(false);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      if (remoteState === "OFFLINE") {
        const command = ["C", "1"].join(",");
        socket.timeout(500).emit("command", { command: command });
      }
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onCommandEvent(value: any) {
      const resp = value.command.toString();
      const commands = resp.split(",");
      if (commands[0] === "c") {
        if (commands[1] === "STATUS") {
          setRemoteState(commands[2]);
          if (commands[2] === "VEND") {
            if (!Number.isNaN(Number(commands[3]))) {
              setWaitPayment(false);
              setWaitDispense(true);
              const command = ["C", "VEND", commands[3], commands[4]].join(",");
              socket.timeout(500).emit("command", { command: command });
            } else {
              setWaitDispense(false);
              setWaitPayment(false);
            }
          }
        } else if (commands[1] === "VEND") {
          if (commands[2] === "SUCCESS") {
            setWaitDispense(false);
            setSuccessWindow(true);
            setTimeout(() => setSuccessWindow(false), 5000);
          } else {
            setWaitDispense(false);
            setErrorWindow(true);
            setTimeout(() => setErrorWindow(false), 5000);
          }
        } else if (commands[1] === "ERR") {
          if (commands[2].includes("cashless is on")) {
            setRemoteState("ENABLED");
          }
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

  return (
    <div className="App">
      <ConnectionModal open={isConnected} />
      <ErrorModal open={showErrorWindow} />
      <SuccessModal open={showSuccessWindow} />
      <WaitDispenseModal open={isWaitDispense} />
      <WaitPaymentModal open={isWaitPayment} />
      <ConnectionState isConnected={isConnected} state={remoteState} />
      {/* <Events events={commandEvents} /> */}
      {/* <ConnectionManager /> */}
      {/* <MyForm /> */}
      <Products setPayment={setWaitPayment} />
    </div>
  );
}
