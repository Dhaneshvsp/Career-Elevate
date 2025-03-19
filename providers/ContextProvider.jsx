"use client";

import React from "react";
import { GlobalContextProvider } from "@/context/globalContext";

const ContextProvider = ({ children }) => {
  return <GlobalContextProvider>{children}</GlobalContextProvider>;
};

export default ContextProvider;
