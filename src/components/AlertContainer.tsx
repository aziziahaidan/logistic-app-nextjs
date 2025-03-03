"use client";
import { Alert } from "@/components/Alert";
import { useAlert } from "@/hook/useAlert";
import { useEffect } from 'react';

export const AlertContainer = () => {

  const { show, message, type } = useAlert();
  
  useEffect(() => { 
    console.log(message)
  }, [message])

  return <Alert show={show} message={message} type={type} />;
};