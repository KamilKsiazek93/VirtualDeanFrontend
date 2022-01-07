import React, {useEffect, useState} from "react";
import { Form, Button } from "react-bootstrap";
import { webAPIUrl } from "../AppSettings";
import { AddingBrother } from "./Brother";

export const AddBrotherForm = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [precedency, setPrecedency] = useState("");
    const [singing, setSinging] = useState(false);
    const [lector, setLector] = useState(false);
    const [acolit, setAcolit] = useState(false);
    const [diacon, setDiacon] = useState(false);
    const [brother, setBrother] = useState<AddingBrother | null>();
    const [messageAddedUser, setMessageAddedUser] = useState("");

    useEffect(() => {
        const brotherDefault = {
            id: 0,
            name: "",
            surname: "",
            precedency: "",
            isSinging: false,
            isLector: false,
            isAcolit: false,
            isDiacon: false
        }
        setBrother(brotherDefault)
    }, [])

    const changeName = ({target} : any) => {
        setName(target.value)
    }

    const changeSurname = ({target} : any) => {
        setSurname(target.value)
    }

    const changePrecedency = ({target} : any) => {
        setPrecedency(target.value)
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
        setSinging(false)
        setLector(false)
        setAcolit(false)
        setDiacon(false)
    }

    const showInfoFromRequest = (message:string) => {
        setMessageAddedUser(message)
    }

    // const changeBrotherState = (inputValue:any, officeName:string) => {

    //     const updatedState = {
    //         ...brother,
    //         [officeName]: inputValue
    //     }
    //     setBrother(updatedState)
    //     console.log(brother)
    // }

    const addBrotherToDB = () => {
        const data : AddingBrother = {
            id : 0,
            name: name,
            surname : surname,
            precedency: precedency,
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
        console.log('Success:', data);
        console.log(data.message)
        clearDataInForm()
        showInfoFromRequest(data.message)
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    }

    return (
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
    )
}