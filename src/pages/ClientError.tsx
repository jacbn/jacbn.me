import React from "react";
import { useNavigate } from "react-router";

export const ClientError = () => {
    const navigate = useNavigate();
    return <div className="w-100 d-flex flex-column align-items-center justify-content-center vh-100">
        <h1 className="font-size-title">404: Page not found</h1>
        <p className="font-size-label">The page you are looking for does not exist.</p>
        <div className="d-flex gap-3">
            <button className="btn btn-outline-primary border-3 rounded-3 mt-3 shadow-light" onClick={() => navigate(-1)}>go back</button>
            <button className="btn btn-outline-primary border-3 rounded-3 mt-3 shadow-light" onClick={() => navigate("/")}>go home</button>
        </div>
    </div>;
}
