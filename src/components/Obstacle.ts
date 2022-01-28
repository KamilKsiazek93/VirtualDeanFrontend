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

export const getOfficesName = async():Promise<string[] | null> => {
    const result = await http<string[], OfficeName>({
        path: '/offices-name'
    });
    if(result.ok && result.body) {
        return result.body;
    }
    return [];
}

export interface IBrothersObstacle {
    id: number;
    brotherId: number;
    weekOfOffices: number;
    obstacle: string;
}

export interface MessageBody {
    message: string
}

export const sendBrotherObstacleToDB = async(data:IBrothersObstacle[]): Promise<MessageBody | undefined> => {
    const result = await http<MessageBody, IBrothersObstacle[]>({
        path: '/obstacles',
        method: 'post',
        body: data
    });
    if(result.ok && result.body) {
        return result.body
    }
    return undefined;
}