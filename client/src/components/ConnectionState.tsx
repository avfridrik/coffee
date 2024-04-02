import React from "react";

type ConnectionStateProps = {
  isConnected: boolean;
  state: string;
};

type ConnectionStateBadges = {
  connection: string;
  vmc: string;
};

export function ConnectionState(props: ConnectionStateProps) {
  const badges: ConnectionStateBadges = {
    connection: props.isConnected ? "badge-success" : "badge-error",
    vmc: "badge-success",
  };

  switch (props.state) {
    case "OFFLINE":
      badges.vmc = "badge-error";
      break;
    case "ERROR":
      badges.vmc = "badge-error";
      break;
    case "INACTIVE":
      badges.vmc = "badge-info";
      break;
    case "DISABLED":
      badges.vmc = "badge-accent";
      break;
    case "ENABLED":
      badges.vmc = "badge-success";
      break;
    case "VEND":
      badges.vmc = "badge-warning";
      break;
    case "IDLE":
      badges.vmc = "badge-secondary";
      break;
    default:
      badges.vmc = "badge-neutral-content";
      break;
  }
  return (
    <div className={"absolute right-1 top-2 flex gap-2"}>
      <div className={"badge badge-xs " + badges.connection}></div>
      <div title={props.state} className={"badge badge-xs " + badges.vmc}></div>
    </div>
  );
}
