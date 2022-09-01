import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { webAPIUrl } from "../../AppSettings";
import { EditingBrother } from "../Brother/Brother";

export const EditBrothers = () => {

    const [brothers, setBrothers] = useState<Array<EditingBrother | null>>();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showEditingModal, setShowEditingModal] = useState(false);
    const handleCloseEditing = () => setShowEditingModal(false);
    const handleShowEditing = () => setShowEditingModal(true);
    const [deletetingBrotherName, setDeletingName] = useState("")
    const [deletetingBrotherSurname, setDeletingSurname] = useState("")
    const [deletingBrotherId, setDeletingId] = useState(0);
    const [deletingCount, setDeletingCount] = useState(0)

    const [nameEditing, setEditingName] = useState("");
    const [surnameEditing, setEditingSurname] = useState("");
    const [precedencyEditing, setEditingPrecedency] = useState("");
    const [emailEditing, setEditingEmail] = useState("");
    const [passwordHash, setPasswordHash] = useState("");
    const [singingEditing, setEditingSinging] = useState(false);
    const [lectorEditing, setEditingLector] = useState(false);
    const [acolitEditing, setEditingAcolit] = useState(false);
    const [diaconEditing, setEditingDiacon] = useState(false);
    const [idEditing, setEditingId] = useState(0)

    const changeNameEditing = ({target} : any) => {
        setEditingName(target.value)
    }

    const changeSurnameEditing = ({target} : any) => {
        setEditingSurname(target.value)
    }

    const changeEditingEmail = ({target} : any) => {
        setEditingEmail(target.value)
    }

    const changePrecedencyEditing = ({target} : any) => {
        setEditingPrecedency(target.value)
    }

    const changeSingingEditing = ({target} : any) => {
        setEditingSinging(!singingEditing)
    }

    const changeLectorEditing = ({target} : any) => {
        setEditingLector(!lectorEditing)
    }

    const changeAcolitEditing = ({target} : any) => {
        setEditingAcolit(!acolitEditing)
    }

    const changeDiaconEditing = ({target} : any) => {
        setEditingDiacon(!diaconEditing)
    }

    useEffect(() => {
        async function getBrothersFromDB() {
            let response = await fetch(`${webAPIUrl}/brothers`);
            let result : Array<EditingBrother> = await response.json();
            setBrothers(result);
        }
        getBrothersFromDB()
    }, [deletingCount])

    const confirmDeleteBrother = (id:any, name:any, surname:any) => {
        setDeletingName(name)
        setDeletingSurname(surname)
        setDeletingId(id)
        handleShow()
    }

    const handleEditBrother = () => {
        const data : EditingBrother = {
            id : idEditing,
            name: nameEditing,
            surname : surnameEditing,
            email: emailEditing,
            passwordHash: passwordHash,
            precedency: precedencyEditing,
            isSinging: singingEditing,
            isLector: lectorEditing,
            isAcolit: acolitEditing,
            isDiacon: diaconEditing,
            statusBrother: "BRAT"
        }

        fetch(`${webAPIUrl}/brothers/${idEditing}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            handleCloseEditing()
            console.log(data)
            setDeletingCount(deletingCount+1)
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    }

    const handleDeleteBrother = () => {
        fetch(`${webAPIUrl}/brothers/${deletingBrotherId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(deletingBrotherId)
        })
        .then(response => response.json())
        .then(data => {
            handleClose()
            console.log(data)
            setDeletingCount(deletingCount+1)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const confirmEditBrother = (id:any) => {
        let brotherForEdit = brothers?.find((bro) => bro?.id === id)
        setEditingName(brotherForEdit?.name ?? "")
        setEditingSurname(brotherForEdit?.surname ?? "")
        setEditingEmail(brotherForEdit?.email ?? "")
        setPasswordHash(brotherForEdit?.passwordHash ?? "")
        setEditingPrecedency((brotherForEdit?.precedency)?.substring(0, 10) ?? "")
        setEditingSinging(brotherForEdit?.isSinging ?? false)
        setEditingLector(brotherForEdit?.isLector ?? false)
        setEditingAcolit(brotherForEdit?.isAcolit ?? false)
        setEditingDiacon(brotherForEdit?.isDiacon ?? false)
        setEditingId(id)
        handleShowEditing()
    }

    return (
        <div>
            <h2 className="header-frame">Edycja braci</h2>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Usuwanie brata</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Jesteś pewien, że chesz usunąć następującego brata? <br />
                    <b>{deletetingBrotherName} {deletetingBrotherSurname}</b>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Zamknij
                </Button>
                <Button variant="primary"onClick={(e) => handleDeleteBrother()}>Usuń</Button>
                </Modal.Footer>
            </Modal>

            <Modal
                id="modalEditing"
                show={showEditingModal}
                onHide={handleCloseEditing}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Edycja brata</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control type="text" placeholder="Imie" id="name" onChange={changeNameEditing} value={nameEditing} />
                            <br />
                            <Form.Control type="text" placeholder="Nazwisko" id="lastname" onChange={changeSurnameEditing} value={surnameEditing} />
                            <br />
                            <Form.Control type="date" placeholder="Precedencja" id="precedency" onChange={changePrecedencyEditing} value={precedencyEditing}/>
                            <br />
                            <Form.Control type="text" placeholder="Email" id="email" onChange={changeEditingEmail} value={emailEditing} />
                            <br />
                            <Form.Check label="Schola" type="checkbox" id="singing" onChange={changeSingingEditing} checked={singingEditing} />
                            <Form.Check label="Lektor" type="checkbox" id="lector" onChange={changeLectorEditing} checked={lectorEditing}/>
                            <Form.Check label="Akolita" type="checkbox" id="acolit" onChange={changeAcolitEditing} checked={acolitEditing} />
                            <Form.Check label="Diakon" type="checkbox" id="diacon" onChange={changeDiaconEditing} checked={diaconEditing} />
                            <br />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEditing}>
                    Zamknij
                </Button>
                <Button variant="primary"onClick={(e) => handleEditBrother()}>Zapisz zmiany</Button>
                </Modal.Footer>
            </Modal>

            <div className="table-center">
                <Table striped bordered hover variant="light">
                    <thead>
                        <tr>
                            <th>Lp</th>
                            <th>Imię</th>
                            <th>Nazwisko</th>
                            <th>Edytuj</th>
                            <th>Usuń</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brothers?.map((brother, index) => 
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{brother?.name}</td>
                                <td>{brother?.surname}</td>
                                <td><Button variant="warning" onClick={(e => confirmEditBrother(brother?.id))} >Edytuj</Button></td>
                                <td><Button variant="danger" onClick={(e) => confirmDeleteBrother(brother?.id, brother?.name, brother?.surname)}>Usuń</Button></td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}