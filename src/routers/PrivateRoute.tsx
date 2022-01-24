import React from "react";
import { Navigate, Outlet  } from "react-router-dom";
import { connect } from "react-redux";

export const PrivateRoute = (auth:any) => {
    console.log(auth?.id)
    return auth?.id ? <Outlet /> : <Navigate to="/" />
}

const mapStateToProps = (state:any) => ({
    auth: !!state.auth.id
})

export default connect(mapStateToProps)(PrivateRoute)