// components/Alert.tsx
"use client";
import AnimatedIcon from "./AnimatedIcon";
import CheckIcon from "../icon/Check.json";
import ErrorIcon from "../icon/Error.json";

interface AlertProps {
  show: boolean;
  message: string;
  type: "success" | "error";
}

export const Alert = ({ show, message, type }: AlertProps) => {
//   if (!show) return null;

  return (
    <div className="toast toast-end">
      <div className={`alert ${type === "success" ? "alert-success" : "alert-error"}`}>
        <AnimatedIcon
          height="2rem"
          width="2rem"
          path={type === "success" ? CheckIcon : ErrorIcon}
          loop={true}
          hover={false}
        />
        <span>{message}</span>
      </div>
    </div>
  );
};