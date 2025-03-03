// components/Alert.tsx
"use client";
import AnimatedIcon from "./AnimatedIcon";
import CheckIcon from "../icon/Check.json";
import ErrorIcon from "../icon/Error.json";
import { useEffect } from "react";
import { useAlert } from "@/hook/useAlert";


interface AlertProps {
  // show: boolean;
  message: string;
  type: "success" | "error";
}

export const Alert2 = ({ message, type }: AlertProps) => {
  const { show } = useAlert();

  useEffect(() => console.log(show), [show])

  // if (!show) return null;

  return (
    <div className="toast toast-end">
      {/* <div className={`alert ${type === "success" ? "alert-success" : "alert-error"}`}> */}
      <div className={`alert alert-success`}>
        <AnimatedIcon
          height="2rem"
          width="2rem"
          path={CheckIcon}
          // path={type === "success" ? CheckIcon : ErrorIcon}
          loop={true}
          hover={false}
        />
        <span>{message}</span>
      </div>
    </div>
  );
};