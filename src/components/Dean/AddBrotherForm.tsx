import React, {useState} from "react";
import { Form, Button } from "react-bootstrap";
import { webAPIUrl } from "../../AppSettings";
import { AddingBrother } from "../Brother/Brother";

export const AddBrotherForm = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [precedency, setPrecedency] = useState("");
    const [email, setEmail] = useState("");
    const [singing, setSinging] = useState(false);
    const [lector, setLector] = useState(false);
    const [acolit, setAcolit] = useState(false);
    const [diacon, setDiacon] = useState(false);
    const [messageAddedUser, setMessageAddedUser] = useState("");

    const changeName = ({target} : any) => {
        setName(target.value)
    }

    const changeSurname = ({target} : any) => {
        setSurname(target.value)
    }

    const changePrecedency = ({target} : any) => {
        setPrecedency(target.value)
    }

    const changeEmail = ({target} : any) => {
        setEmail(target.value)
    }

    const changeSinging = ({target} : any) => {
        setSinging(!singing)
    }

    const changeLector = ({target} : any) => {
       setLector(!lector)
    }

    const changeAcolit = ({target} : any) => {
        setAcolit(!acolit)
    }

    const changeDiacon = ({target} : any) => {
        setDiacon(!diacon)
    }

    const clearDataInForm = () => {
        setName("")
        setSurname("")
        setPrecedency("")
        setEmail("")
        setSinging(false)
        setLector(false)
        setAcolit(false)
        setDiacon(false)
    }

    const showInfoFromRequest = (message:string) => {
        setMessageAddedUser(message)
    }

    const addBrotherToDB = () => {
        const data : AddingBrother = {
            id : 0,
            name: name,
            surname : surname,
            precedency: precedency,
            email: email,
            isSinging: singing,
            isLector: lector,
            isAcolit: acolit,
            isDiacon: diacon
        }
        console.log(data)
        
        fetch(`${webAPIUrl}/brothers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            clearDataInForm()
            showInfoFromRequest(data.message)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <div>
            <h2 className="header-frame">Dodaj brata</h2>
            <div className="form-frame">
            <div>
                <p id="addUserInfo">{messageAddedUser}</p>
            </div>
            <Form id="addBrotherForm">
                <Form.Group>
                    <Form.Control type="text" placeholder="Imie" id="name" onChange={changeName} value={name} />
                    <br />
                    <Form.Control type="text" placeholder="Nazwisko" id="lastname" onChange={changeSurname} value={surname} />
                    <br />
                    <Form.Control type="text" placeholder="Email" id="email" onChange={changeEmail} value={email} />
                    <br />
                    <Form.Control type="date" placeholder="Precedencja" id="precedency" onChange={changePrecedency} value={precedency}/>
                    <br />
                    <Form.Check label="Schola" type="checkbox" id="singing" onChange={changeSinging} checked={singing} />
                    <Form.Check label="Lektor" type="checkbox" id="lector" onChange={changeLector} checked={lector}/>
                    <Form.Check label="Akolita" type="checkbox" id="acolit" onChange={changeAcolit} checked={acolit} />
                    <Form.Check label="Diakon" type="checkbox" id="diacon" onChange={changeDiacon} checked={diacon} />
                    <br />
                    <Button variant="primary" onClick={addBrotherToDB}>Dodaj</Button>
                </Form.Group>
            </Form>
        </div>
        </div>
    )
}