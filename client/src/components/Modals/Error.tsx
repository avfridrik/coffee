import React, { useState } from "react";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
type ModalProps = {
  open: boolean;
};

export function ErrorModal(props: ModalProps) {
  return (
    <dialog
      id="ErrorModal"
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
          <FaceFrownIcon className="h-12 w-12 text-error" />
          <div className="text-5xl text-error font-black">Sorry :(</div>
          <div className="text-md text-error font-normal">
            The device reports an error. Please, try again.
          </div>
        </p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
