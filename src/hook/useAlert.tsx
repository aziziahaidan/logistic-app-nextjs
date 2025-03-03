
"use client";

import { useState, useEffect } from "react";

export function useAlert() {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error">("success");

  const showAlert = (message: string, type: "success" | "error") => {
    console.log(message)
    setMessage(message);
    setType(type);
    setShow(true);
    setTimeout(() => setShow(false), 4000);
  };

  const hideAlert = () => {
    setShow(false);
  };

  useEffect(() => { console.log(show) }, [show])

  return { show, message, type, showAlert, hideAlert , setShow };
}