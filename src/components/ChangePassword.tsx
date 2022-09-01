import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const ChangePassword = () => {

    const [changePassswordMessage, setChangePasswordMessage] = useState("")
    const [oldPassword, setOldPasword] = useState("")
    const [newPassword, setNewPasword] = useState("")
    const [repeatedPassword, setRepeatedPasword] = useState("")

    const handleOldPasword = (oldPassword:string) => {
        setOldPasword(oldPassword)
    }

    const handleNewPasword = (newPassword:string) => {
        setNewPasword(newPassword)
    }

    const handleRepeatedPasword = (repeatedPassword:string) => {
        setRepeatedPasword(repeatedPassword)
    }

    const changePasswordInDb = () => {
        console.log("hasło zostało zmienione")
    }

    const handleChangePasword = () => {
        if(newPassword.length < 8) {
            setChangePasswordMessage("Hasło musi mieć co najmniej 8 znaków")
        }
        if(newPassword !== repeatedPassword) {
            setChangePasswordMessage("Podane hasła nie są identyczne")
        } else {
            changePasswordInDb()
        }
    }

    return (
        <div>
            <h2 className="header-frame">Zmiana hasła</h2>
            <div>
                <p id="addUserInfo">{changePassswordMessage}</p>
            </div>
            <div className="form-frame">
                <Form>
                    <Form.Group>
                        <Form.Control type="password" placeholder="obecne hasło" id="oldPassword" onChange={(e) => handleOldPasword(e.target.value)}></Form.Control>
                        <br/>
                        <Form.Control type="password" placeholder="nowe hasło" id="newPassword" onChange={(e) => handleNewPasword(e.target.value)}></Form.Control>
                        <br/>
                        <Form.Control type="password" placeholder="powtórz nowe hasło" id="repeatedPassword" onChange={(e) => handleRepeatedPasword(e.target.value)}></Form.Control>
                        <br/>
                        <Button variant="primary" onClick={handleChangePasword}>Zmień hasło</Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}