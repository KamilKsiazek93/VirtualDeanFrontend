import React from "react";
import { Navigate  } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../components/Brother";

export const PrivateRoute = ({children}:any) => {
    const auth = useSelector((state:RootState) => state.auth)
    return auth?.id ? children : <Navigate to="/" />
}
