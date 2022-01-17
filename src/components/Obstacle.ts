export interface IObstacleConst {
    id: number;
    brotherId: number;
    obstacleName: string;
}

export interface IObstacleWithBrotherData extends IObstacleConst {
    name: string;
    surname: string;
}