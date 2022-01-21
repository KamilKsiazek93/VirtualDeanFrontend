import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BaseBrother, loginAction } from "./Brother";

export const LoginPage = () => {
    const location = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const handleEmail = (email:string) => {
        setEmail(email)   
    }

    const handlePassword = (password:string) => {
        setPassword(password)
    }

    const redirectActionAfterLogin = (brother:BaseBrother | undefined) => {
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
                console.log(brother)
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