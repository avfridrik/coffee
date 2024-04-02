import React, { useState } from "react";
import { Product } from "../Products";
import { socket } from "../../socket";

type ModalProps = {
  item?: Product;
  setPayment: (wait: boolean) => void;
};

export function DispenseModal(props: ModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  function onDispense(item?: Product) {
    setIsLoading(true);
    if (item) {
      const command = "C,SEL," + item.price + ",FFFFFFFF," + item.id;
      socket.timeout(500).emit("command", { command: command }, () => {
        setIsLoading(false);
        props.setPayment(true);
        (document.getElementById("DispenseModal") as HTMLDialogElement).close();
      });
    }
  }
  return (
    <dialog id="DispenseModal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Dispense {props?.item?.name}!</h3>
        <p className="py-4">
          Press Dispense button below to get your {props?.item?.name}
        </p>

        <p className="flex gap-4 flex-col justify-between text-center">
          <div className="text-5xl text-[#eabe74] font-black">
            ${props?.item?.price}
          </div>
          <button
            onClick={() => onDispense(props?.item)}
            className="btn btn-success btn-lg"
            disabled={isLoading}
          >
            Dispense
          </button>
        </p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
