import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { BaseBrother } from "../Brother/Brother";
import { deleteConstObstacle, getBaseBrother, getConstOBstacleWithBrotherTest , postConstObstacle, putConstObstacle} from "../ApiConnection";
import { getOfficesName, IObstacleWithBrotherData } from "../Obstacle";


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
    const [brothers, setBrothers] = useState<Array<BaseBrother> | null>();
    const [deletingId, setDeletingId] = useState(0);
    const [officeNames, setOfficesName] = useState<Array<string> | null>(null)

    useEffect(() => {
        const getData = async() => {
            const baseBrother = await getBaseBrother();
            setBrothers(baseBrother)
            const obstacle = await getConstOBstacleWithBrotherTest();
            setObstacleWithBrothers(obstacle)
            const officeNames = await getOfficesName()
            setOfficesName(officeNames)
        }

        getData()
       
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

    const deleteObstacle = async() => {
        const result = await deleteConstObstacle(deletingId)
        console.log(result)
        handleCloseDelete()
        setStateUpdater(stateUpdater+1)
     }

    const handleAddObstacleToDB = async() => {
        const data = {
            id: 0,
            brotherId: idBrotherForObstacleConst,
            obstacleName: obstacleConstName
        }

        const result = await postConstObstacle(data)
        console.log(result)
        handleClose()
        setStateUpdater(stateUpdater+1)
    }

    const editObstacle = async() => {
        const data = {
            id: idObstacle,
            brotherId: idBrotherForObstacleConst,
            obstacleName: obstacleConstName
        }
        
        const result = await putConstObstacle(data)
        handleCloseEdit()
        console.log(result)
        setStateUpdater(stateUpdater+1)
    }

    return (
        <div>
            <h2 className="header-frame">Zarządzaj przeszkodami stałymi</h2>

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
                        {officeNames?.map((nameOffice, index) => 
                            <option value={nameOffice} key={index}>{nameOffice}</option>
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
                        {officeNames?.map((nameOffice, index) => 
                            <option value={nameOffice} key={index}>{nameOffice}</option>
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

            <div className="table-center">
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
        </div>
    )
}