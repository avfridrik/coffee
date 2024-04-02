import React, { useState } from "react";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
type ModalProps = {
  open: boolean;
};

export function SuccessModal(props: ModalProps) {
  return (
    <dialog
      id="SuccessModal"
      className="modal modal-bottom sm:modal-middle"
      open={props.open}
    >
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <p className="flex gap-4 flex-col justify-between text-center items-center">
          <HandThumbUpIcon className="h-12 w-12 text-success" />
          <div className="text-5xl text-success font-black">Thank you!</div>
        </p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
