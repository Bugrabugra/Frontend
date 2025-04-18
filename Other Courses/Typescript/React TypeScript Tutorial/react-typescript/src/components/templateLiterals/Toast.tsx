/*
 * Position prop can be one of
 * "left-center" | "left-top" | "left-bottom" | "center" | "center-top" | "center-bottom" | "right-center" | "right-top" | "right-bottom"
 * */

import React from 'react';

type HorizontalPosition = "left" | "center" | "right";
type VerticalPosition = "top" | "center" | "bottom";

type ToastProps = {
  position: Exclude<`${HorizontalPosition}-${VerticalPosition}`, "center-center"> | "center";
};

const Toast = ({ position }: ToastProps) => {
  return (
    <div>
      Toast Notification Position - {position}
    </div>
  );
};

export default Toast;
