import { http } from "./http"

export interface IObstacleConst {
    id: number;
    brotherId: number;
    obstacleName: string;
}

export interface IObstacleWithBrotherData extends IObstacleConst {
    name: string;
    surname: string;
}

export interface OfficeName {
    officeName: string;
}

export interface IBrothersObstacle {
    id: number;
    brotherId: number;
    weekOfOffices: number;
    obstacle: string;
}

export interface ObstacleBetweenOffice {
    id: number;
    officeName: string;
    officeConnected: string;
}

export interface MessageBody {
    message: string;
}

export const getOfficesName = async():Promise<string[] | null> => {
    const result = await http<string[], OfficeName>({
        path: 'offices/names'
    });
    if(result.ok && result.body) {
        return result.body;
    }
    return [];
}

export const getOfficeNameForObstacleBrother = async():Promise<string[] | null> => {
    const result = await http<string[], OfficeName>({
        path: 'offices/office-name/obstacle'
    });
    if(result.ok && result.body) {
        return result.body;
    }
    return [];
}

export const sendBrotherObstacleToDB = async(data:IBrothersObstacle[], jwtToken:string): Promise<MessageBody | undefined> => {
    const result = await http<MessageBody, IBrothersObstacle[]>({
        path: 'obstacles',
        method: 'post',
        body: data,
        accessToken: jwtToken
    });
    if(result.ok && result.body) {
        return result.body
    }
    return undefined;
}

export const getObstacleBetweenOffices = async():Promise<ObstacleBetweenOffice[] | null> => {
    const result = await http<ObstacleBetweenOffice[]>({
        path: 'obstacles/offices'
    });
    if(result.ok && result.body) {
        return result.body.map((item) => item);
    }
    return []
}

export const postObstacleBetweenOffices = async(data:ObstacleBetweenOffice): Promise<MessageBody | undefined> => {
    const result = await http<MessageBody, ObstacleBetweenOffice>({
        path: 'obstacles/offices',
        method: 'post',
        body: data
    });
    if(result.ok && result.body) {
        return result.body
    }
    return undefined
}

export const putObstacleBetweenOffices = async(data:ObstacleBetweenOffice): Promise<MessageBody | undefined> => {
    const result = await http<MessageBody, ObstacleBetweenOffice>({
        path: `obstacles/offices/${data.id}`,
        method: 'put',
        body: data
    });
    if(result.ok && result.body) {
        return result.body
    }
    return undefined
}

export const deleteObstacleBetweenOffices = async(id:number): Promise<MessageBody | undefined> => {
    const result = await http<MessageBody, number>({
        path: `obstacles/offices/${id}`,
        method: 'delete',
        body: id
    });
    if(result.ok && result.body) {
        return result.body
    }
    return undefined
}

export interface IObstacleFromBrothers {
    brotherId: number;
    obstacles: Array<string>;
}

export const getObstacleFromBrothers = async(): Promise<IObstacleFromBrothers[] | null> => {
    const result = await http<IObstacleFromBrothers[]>({
        path: 'obstacles/last'
    })
    if(result.ok && result.body) {
        return result.body.map((item, index) => item)
    }
    return []
}