import React, { useEffect, useState } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import { deleteObstacleBetweenOffices, getObstacleBetweenOffices, getOfficeNameForObstacleBrother, ObstacleBetweenOffice, postObstacleBetweenOffices, putObstacleBetweenOffices } from "./Obstacle";

export const ObstacleBetweenOffices = () => {

    const [message, setMessage] = useState<string>()
    const [obstacles, setObstacleBetweenOffices] = useState<Array<ObstacleBetweenOffice> | null>(null)
    const [offices, setOffices] = useState<Array<string> | null>()
    const [office, setOfficeName] = useState("")
    const [obstacle, setObstacleName] = useState("")
    const [idObstacle, setIdObstacle] = useState(0)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showDelete, setShowDelete] = useState(false);
    const handleShowDelete = () => setShowDelete(true);
    const handleCloseDelete = () => setShowDelete(false);
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);
    const [stateUpdater, setStateUpdater] = useState(0);

    useEffect(() => {
        const getDate = async() => {
            const obstacles = await getObstacleBetweenOffices()
            setObstacleBetweenOffices(obstacles)
            const offices = await getOfficeNameForObstacleBrother();
            setOffices(offices)
        }
        getDate();
    }, [stateUpdater])

    const handleNameOffice = (name:string) => {
        setOfficeName(name)
    }

    const handleNameObstacle = (name:string) => {
        setObstacleName(name)
    }

    const handleAddObstacle = () => {
        handleShow()
    }

    const handleEdit = (id:number, office:string, obstacle:string) => {
        setIdObstacle(id)
        handleNameOffice(office)
        handleNameObstacle(obstacle)
        handleShowEdit()
    }

    const handleDelete = (id:number) => {
        setIdObstacle(id)
        handleShowDelete()
    }

    const addObstacle = async() => {
        const data = {
            id:0,
            officeName: office,
            officeConnected: obstacle
        }
        const result = await postObstacleBetweenOffices(data);
        setMessage(result?.message)
        handleClose()
        setStateUpdater(stateUpdater+1)
    }

    const editObstacle = async() => {
        const data = {
            id:idObstacle,
            officeName: office,
            officeConnected: obstacle
        }
        const result = await putObstacleBetweenOffices(data)
        setMessage(result?.message)
        handleCloseEdit()
        setStateUpdater(stateUpdater+1)
    }

    const deleteObstacle = async() => {
        const result = await deleteObstacleBetweenOffices(idObstacle)
        setMessage(result?.message)
        handleCloseDelete()
        setStateUpdater(stateUpdater+1)
    }

    return (
        <div>
             <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Powiąż przeszkodę z oficjum</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Wybierz oficjum:
                    <select id="selectObstacleName" onChange={(e) => handleNameOffice(e.target.value)}>
                        <option defaultValue="" >Wybierz przeszkodę</option>
                        {offices?.map((nameOffice, index) => 
                            <option value={nameOffice} key={index}>{nameOffice}</option>
                        )}
                    </select>
                    <br />
                    Wybierz przeszkodę:
                    <select id="selectObstacleName" onChange={(e) => handleNameObstacle(e.target.value)}>
                        <option defaultValue="" >Wybierz przeszkodę</option>
                        {offices?.map((nameOffice, index) => 
                            <option value={nameOffice} key={index}>{nameOffice}</option>
                        )}
                    </select>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Zamknij
                </Button>
                <Button variant="primary"onClick={(e) => addObstacle()}>Zatwierdź</Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showEdit}
                onHide={handleCloseEdit}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Powiąż przeszkodę z oficjum</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Wybierz oficjum:
                    <select id="selectObstacleName" onChange={(e) => handleNameOffice(e.target.value)}>
                        <option value={office}>{office}</option>
                        {offices?.map((nameOffice, index) => 
                            <option value={nameOffice} key={index}>{nameOffice}</option>
                        )}
                    </select>
                    <br />
                    Wybierz przeszkodę:
                    <select id="selectObstacleName" onChange={(e) => handleNameObstacle(e.target.value)}>
                        <option value={obstacle}>{obstacle}</option>
                        {offices?.map((nameOffice, index) => 
                            <option value={nameOffice} key={index}>{nameOffice}</option>
                        )}
                    </select>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEdit}>
                    Zamknij
                </Button>
                <Button variant="primary"onClick={(e) => editObstacle()}>Zatwierdź</Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showDelete}
                onHide={handleCloseDelete}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Usuń przeszkodę</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   Jesteś pewien, że chcesz usunąć to powiązanie?
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDelete}>
                    Zamknij
                </Button>
                <Button variant="danger"onClick={(e) => deleteObstacle()}>Usuń</Button>
                </Modal.Footer>
            </Modal>

            <h2 className="header-frame">Przeszkody między oficjami</h2>
            <div className="message-body">{message}</div>
            <div className="table-center">
                <Table striped bordered hover variant="light">
                    <thead>
                        <tr>
                            <th>Lp</th>
                            <th>Oficjum</th>
                            <th>Przeszkoda</th>
                            <th>Edytuj</th>
                            <th>Usuń</th>
                        </tr>
                    </thead>
                    <tbody>
                        {obstacles?.map((obstacle, index) => 
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{obstacle.officeName}</td>
                                <td>{obstacle.officeConnected}</td>
                                <td><Button variant="warning" onClick={(e) => handleEdit(obstacle.id, obstacle.officeName, obstacle.officeConnected)}>Edytuj</Button></td>
                                <td><Button variant="danger" onClick={(e) => handleDelete(obstacle.id)}>Usuń</Button></td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <Button className="button-center" variant="success" onClick={handleAddObstacle}>Dodaj kolejną przeszkodę</Button>
            </div>
        </div>
    )
}