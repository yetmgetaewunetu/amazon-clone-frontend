import React from "react";
import { RingLoader } from "react-spinners";
export default function Loading() {
  return (
    <div>
      <RingLoader
        size={100}
        color="blue"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
}
