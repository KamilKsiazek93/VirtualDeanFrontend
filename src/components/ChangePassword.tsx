import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { updatePasswordInDb } from "./ApiConnection";
import { getBrotherFromLocalStorage, IUpdatePassword } from "./Brother/Brother";

export const ChangePassword = () => {

    const [changePassswordMessage, setChangePasswordMessage] = useState<string>()
    const [currentPassword, setCurrentPasword] = useState("")
    const [newPassword, setNewPasword] = useState("")
    const [repeatedPassword, setRepeatedPasword] = useState("")

    const handleCurrentPasword = (currentPassword:string) => {
        setCurrentPasword(currentPassword)
    }

    const handleNewPasword = (newPassword:string) => {
        setNewPasword(newPassword)
    }

    const handleRepeatedPasword = (repeatedPassword:string) => {
        setRepeatedPasword(repeatedPassword)
    }

    const clearInputs = () => {
        setCurrentPasword("")
        setNewPasword("")
        setRepeatedPasword("")
    }

    const changePasswordInDb = async() => {
        const brotherId = await await getBrotherFromLocalStorage().id
        const data:IUpdatePassword = { brotherId, currentPassword, newPassword}
        const result = await updatePasswordInDb(data)
        if(result?.message) {
             clearInputs() 
        }
        setChangePasswordMessage(result?.message)
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
                        <Form.Control type="password" placeholder="obecne hasło" id="currentPassword" onChange={(e) => handleCurrentPasword(e.target.value)}></Form.Control>
                        <br/>
                        <Form.Control type="password" placeholder="nowe hasło" id="newPassword" onChange={(e) => handleNewPasword(e.target.value)}></Form.Control>
                        <br/>
                        <Form.Control type="password" placeholder="powtórz nowe hasło" id="repeatedPassword" onChange={(e) => handleRepeatedPasword(e.target.value)}></Form.Control>
                        <br/>
                        <Button variant="success" onClick={handleChangePasword}>Zmień hasło</Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}