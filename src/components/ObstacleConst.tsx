import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { webAPIUrl } from "../AppSettings";
import { BaseBrother } from "./Brother";
import { getConstOBstacleWithBrotherTest } from "./FetchData";
import { IObstacleWithBrotherData } from "./Obstacle";


export const ObstacleConst = () => {

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
    const [idBrotherForObstacleConst, setIdBrotherForObstacleConst] = useState(0);
    const [idObstacle, setIdObstacle] = useState(0);
    const [brotherName, setBrotherName] = useState("")
    const [brotherSurname, setBrotherSurname] = useState("")
    const [obstacleConstName, setNameObstacleConst] = useState("");
    const [obstacleWithBrothers, setObstacleWithBrothers] = useState<Array<IObstacleWithBrotherData> | null>(null);
    const [brothers, setBrothers] = useState<Array<BaseBrother | null>>();
    const [deletingId, setDeletingId] = useState(0);
    

    const ObstacleExample = ["PR", "SR", "T8", "T9", "T10", "T12", "T13", "T15", "T17", "T19", "T20", "T21"]

    useEffect(() => {
        const getBrothersFromDB = async() => {
            let response = await fetch(`${webAPIUrl}/brothers-base`);
            let result : Array<BaseBrother> = await response.json();
            setBrothers(result);
        }

        const getObstacleWithBrothers = async() => {
            
            // let response = await fetch(`${webAPIUrl}/obstacle-const/brothers-data`);
            // let result : Array<IObstacleWithBrotherData> = await response.json();
            // setObstacleWithBrothers(result)

            const resultTest = await getConstOBstacleWithBrotherTest();
            setObstacleWithBrothers(resultTest)
        }

        getBrothersFromDB()
        getObstacleWithBrothers()
       
    }, [stateUpdater])

    const handleIdBrotherForObstacle = (id:any) => {
        setIdBrotherForObstacleConst(parseInt(id, 10))
    }

    const handleNameObstacle = (name:any) => {
        setNameObstacleConst(name)
    }

    const handleAddConstObstacle = () => {
        handleShow()
    }

    const handleDeleteObstacle = (id:number) => {
        setDeletingId(id)
        handleShowDelete()
    }

    const handleEditObstacle = (obstacle: IObstacleWithBrotherData) => {
        handleIdBrotherForObstacle(obstacle?.brotherId)
        handleNameObstacle(obstacle.obstacleName)
        setIdObstacle(obstacle.id)
        setBrotherName(obstacle.name)
        setBrotherSurname(obstacle.surname)
        handleShowEdit();
    }

    const deleteObstacle = () => {
        console.log(deletingId)
        fetch(`${webAPIUrl}/obstacle-const/${deletingId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(deletingId)
        })
        .then(response => response.json())
        .then(data => {
            handleCloseDelete()
            console.log(data)
            setStateUpdater(stateUpdater+1)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const handleAddObstacleToDB = () => {
        const data = {
            id: 0,
            brotherId: idBrotherForObstacleConst,
            obstacleName: obstacleConstName
        }

        fetch(`${webAPIUrl}/obstacle-const`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            handleClose()
            console.log(data)
            setStateUpdater(stateUpdater+1)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const editObstacle = () => {
        const data = {
            id: idObstacle,
            brotherId: idBrotherForObstacleConst,
            obstacleName: obstacleConstName
        }
        
        fetch(`${webAPIUrl}/obstacle-const/${idObstacle}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            handleCloseEdit()
            console.log(data)
            setStateUpdater(stateUpdater+1)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <div>
            <h1>Zarządzaj przeszkodami stałymi</h1>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Powiąż przeszkodę stałą z bratem</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Wybierz brata:
                    <select id="selectBrotherName" onChange={(e) => handleIdBrotherForObstacle(e.target.value)}>
                        <option defaultValue="" >Wybierz brata</option>
                        {brothers?.map((brother) =>
                            <option value={brother?.id} key={brother?.id}>{brother?.name} {brother?.surname}</option>
                        )}
                    </select>
                    <br />
                    Wybierz przeszkodę:
                    <select id="selectObstacleName" onChange={(e) => handleNameObstacle(e.target.value)}>
                        <option defaultValue="" >Wybierz przeszkodę</option>
                        {ObstacleExample?.map((obstacle) => 
                            <option value={obstacle} key={obstacle}>{obstacle}</option>
                        )}
                    </select>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Zamknij
                </Button>
                <Button variant="primary"onClick={(e) => handleAddObstacleToDB()}>Dodaj</Button>
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
                   Jesteś pewien, że chcesz usunąć przeszkodę dla brata?
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDelete}>
                    Zamknij
                </Button>
                <Button variant="danger"onClick={(e) => deleteObstacle()}>Usuń</Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showEdit}
                onHide={handleCloseEdit}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Edycja przeszkody</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                Wybierz brata:
                    <select id="selectBrotherName" onChange={(e) => handleIdBrotherForObstacle(e.target.value)}>
                        <option defaultValue={idBrotherForObstacleConst} >{brotherName} {brotherSurname}</option>
                        {brothers?.map((brother) =>
                            <option value={brother?.id} key={brother?.id}>{brother?.name} {brother?.surname}</option>
                        )}
                    </select>
                    <br />
                    Wybierz przeszkodę:
                    <select id="selectObstacleName" onChange={(e) => handleNameObstacle(e.target.value)}>
                        <option defaultValue={obstacleConstName} >{obstacleConstName}</option>
                        {ObstacleExample?.map((obstacle) => 
                            <option value={obstacle} key={obstacle}>{obstacle}</option>
                        )}
                    </select>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDelete}>
                    Zamknij
                </Button>
                <Button variant="success"onClick={(e) => editObstacle()}>Zapisz zmiany</Button>
                </Modal.Footer>
            </Modal>

            <Table striped bordered hover variant="light">
                <thead>
                <tr>
                    <th>Lp</th>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Przedzkoda</th>
                    <th>Edytuj</th>
                    <th>Usuń</th>
                </tr>
                </thead>
                <tbody>
                    {obstacleWithBrothers?.map((obstacle, index) => 
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{obstacle?.name}</td>
                            <td>{obstacle?.surname}</td>
                            <td>{obstacle?.obstacleName}</td>
                            <td><Button variant="warning" onClick={(e) => handleEditObstacle(obstacle)}>Edytuj</Button></td>
                            <td><Button variant="danger" onClick={(e) => handleDeleteObstacle(obstacle?.id)}>Usuń</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Button variant="success" onClick={handleAddConstObstacle}>Dodaj przeszkodę stałą</Button>
        </div>
    )
}