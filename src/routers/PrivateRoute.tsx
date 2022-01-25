import React from "react";
import { Navigate  } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../components/Brother";

export const PrivateRoute = ({children}:any) => {
    const { user } = useSelector((state:RootState) => state.auth)
    return user?.id ? children : <Navigate to="/" />
}
