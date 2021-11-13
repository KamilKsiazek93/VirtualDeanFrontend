import React, {useState} from "react";
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
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    }

    return (
        <div className="form-frame">
            <Form>
                <Form.Group>
                    <Form.Control type="text" placeholder="Imie" id="name" onChange={changeName} />
                    <br />
                    <Form.Control type="text" placeholder="Nazwisko" id="lastname" onChange={changeSurname} />
                    <br />
                    <Form.Control type="date" placeholder="Precedencja" id="precedency" onChange={changePrecedency} />
                    <br />
                    <Form.Check label="Schola" type="checkbox" id="singing" onChange={changeSinging} />
                    <Form.Check label="Lektor" type="checkbox" id="lector" onChange={changeLector} />
                    <Form.Check label="Akolita" type="checkbox" id="acolit" onChange={changeAcolit} />
                    <Form.Check label="Diakon" type="checkbox" id="diacon" onChange={changeDiacon} />
                    <br />
                    <Button variant="primary" onClick={addBrotherToDB}>Dodaj</Button>
                </Form.Group>
            </Form>
        </div>
    )
}