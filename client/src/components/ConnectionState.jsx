import React from "react";

export function ConnectionState({ isConnected, title }) {
  return (<div className={"absolute right-1 top-2 badge badge-xs " + (isConnected ? "badge-success" : " badge-error")}></div>);
}
