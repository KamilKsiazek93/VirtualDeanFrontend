import React, {useState} from "react";
import { webAPIUrl } from "../AppSettings";

interface AddingBrother {
    id: number;
    name: string;
    surname: string;
    precedency: string;
    isSinging: boolean;
    isLector: boolean;
    isAcolit: boolean;
    isDiacon: boolean;
}

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
        if(target.value === "on") {
            setSinging(true)
        } else {
            setSinging(false)
        }
    }

    const changeLector = ({target} : any) => {
        if(target.value === "on") {
            setLector(true)
        } else {
            setLector(false)
        }
    }

    const changeAcolit = ({target} : any) => {
        if(target.value === "on") {
            setAcolit(true)
        } else {
            setAcolit(false)
        }
    }

    const changeDiacon = ({target} : any) => {
        if(target.value === "on") {
            setDiacon(true)
        } else {
            setDiacon(false)
        }
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
            <input className="form-input" type="text" placeholder="Imie" id="name" onChange={changeName} />
            <input className="form-input" type="text" placeholder="Nazwisko" id="lastname" onChange={changeSurname} />
            <input className="form-input" type="date" placeholder="Precedencja" id="precedency" onChange={changePrecedency} />
            Schola: <input className="form-input" type="checkbox" id="singing" onChange={changeSinging} />
            Lektor: <input className="form-input"  type="checkbox" id="lector" onChange={changeLector} />
            Akolita: <input className="form-input"  type="checkbox" id="acolit" onChange={changeAcolit} />
            Diakon: <input className="form-input"  type="checkbox" id="diacon" onChange={changeDiacon} />
            <button onClick={addBrotherToDB}>Dodaj</button>
        </div>
    )
}