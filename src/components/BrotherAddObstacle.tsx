import React, { useEffect, useState } from "react";
import { Table, FormCheck, Button } from "react-bootstrap";
import { BaseBrother, getBrotherFromLocalStorage } from "./Brother";
import { getOfficesName, IBrothersObstacle, sendBrotherObstacleToDB } from "./Obstacle";

export const BrotherAddObstacle = () => {

    const [officeNames, setOfficesName] = useState<Array<string> | null>(null)
    const [brother, setBrother] = useState<BaseBrother>()
    const [message, setMessage] = useState<string>()

    let obstacles = Array<IBrothersObstacle>();

    useEffect(() => {
        const getData = async() => {
            const officeNames = await getOfficesName()
            setOfficesName(officeNames)
            const brother = getBrotherFromLocalStorage();
            setBrother(brother);
        }
        getData()
    }, [])

    const handleObstacle = (name:string) => {
        const obstacleExist = obstacles.find(obstacle => obstacle.obstacle === name);
        if(!obstacleExist?.brotherId) {
            obstacles.push({id: 0, brotherId: brother?.id ?? 0, weekOfOffices: 0, obstacle: name})
        } else {
            obstacles = obstacles.filter(obstacle => obstacle !== obstacleExist)
        }

        console.log(obstacles)
    }

    const sendObstacleToDB = async() => {
        const result = await sendBrotherObstacleToDB(obstacles)
        setMessage(result?.message)
    }

    return (
        <div>
            <h2 className="header-frame">Zgłoś przeszkodę</h2>
            {message}
            <div className="table-center">
                <Table striped bordered hover variant="light">
                    <thead>
                        <tr>
                            <th>Lp</th>
                            <th>Nazwa przeszkody</th>
                            <th>Wybierz</th>
                        </tr>
                    </thead>
                    <tbody>
                        {officeNames?.map((name, index) => 
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{name}</td>
                                <td><FormCheck type="checkbox" onChange={(e) => handleObstacle(name)} /></td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <Button className="button-center" variant="success" onClick={sendObstacleToDB}>Zatwierdź</Button>
            </div>
        </div>
    )
}