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

export const getOfficesName = async():Promise<OfficeName[] | null> => {
    const result = await http<OfficeName[], OfficeName>({
        path: '/offices-name'
    });
    if(result.ok && result.body) {
        return result.body;
    }
    return [];
}