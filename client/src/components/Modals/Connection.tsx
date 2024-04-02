import React, { useState } from "react";
import { socket } from "../../socket";

type ModalProps = {
  open: boolean;
};

export function ConnectionModal(props: ModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit() {
    setIsLoading(true);
    socket.connect();

    const command = "C,1";
    socket.timeout(500).emit("command", { command: command }, () => {
      setIsLoading(false);
    });
  }
  return (
    <dialog
      id="ConnectionModal"
      className="modal modal-bottom sm:modal-middle"
      open={!props.open}
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">Connection error!</h3>
        <p className="py-4">Press Connect button below to re-connect!</p>

        <p className="flex gap-4 flex-col justify-between text-center">
          <button
            onClick={() => onSubmit()}
            className="btn btn-error btn-lg"
            disabled={isLoading}
          >
            Connect
          </button>
        </p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
