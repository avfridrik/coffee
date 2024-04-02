import React, { useState } from "react";
type ModalProps = {
  open: boolean;
};

export function WaitDispenseModal(props: ModalProps) {
  return (
    <dialog
      id="WaitPaymentModal"
      className="modal modal-bottom sm:modal-middle"
      open={props.open}
    >
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Wait for Dispense!</h3>
        <p className="py-4">Please, wait while your drink is dispensed!</p>
        <p className="flex gap-4 flex-col justify-between text-center">
          <div className="text-5xl text-[#eabe74] font-black">Dispense...</div>
        </p>
      </div>
    </dialog>
  );
}
