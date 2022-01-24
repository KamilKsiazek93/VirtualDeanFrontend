import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../actions/auth";
import { BaseBrother, loginAction } from "./Brother";

export const LoginPage = () => {
    const dispatch = useDispatch()
    const location = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [loginInformation, setLoginInformation] = useState("");

    const handleEmail = (email:string) => {
        setEmail(email)   
    }

    const handlePassword = (password:string) => {
        setPassword(password)
    }

    const redirectActionAfterLogin = (brother:BaseBrother | undefined) => {

        const id = brother?.id ?? 0 
        dispatch(login(id))
        
        switch (brother?.statusBrother) {
            case "BRAT":
                location("/brat/dashboard", {state: {name: brother.name, surname: brother.surname }})
                break;
            case "KANTOR":
                location("/kantor")
                break;
            case "LITURGISTA":
                location("/liturgista")
                break;
            case "DZIEKAN":
                location("/dziekan")
                break;
            default:
                setLoginInformation("Niepoprawny login lub hasło!")
                break;
        }
    }

    const submitLogin = async() => {
        const data = {email, password}
        const result = await loginAction(data);
        
        redirectActionAfterLogin(result)
    }

    return (
        <div>
            <div id="loginInformation">{loginInformation}</div>
            <div className="form-frame">
                <Form>
                    <Form.Group>
                        <Form.Control type="text" onChange={(e) => handleEmail(e.target.value)} placeholder="Email" id="name" value={email}/>
                        <br />
                        <Form.Control type="password" onChange={(e) => handlePassword(e.target.value)} placeholder="Hasło" id="password" value={password} />
                        <Button variant="success" onClick={submitLogin}>Zaloguj się!</Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}