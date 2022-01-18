import { http } from "./http";
import { IObstacleWithBrotherData } from "./Obstacle";

export const mapObstacle = (
    obstacle: IObstacleWithBrotherData
) : IObstacleWithBrotherData => ({
    ...obstacle,
})

export const getConstOBstacleWithBrotherTest = async (): Promise <IObstacleWithBrotherData[] | null> => {
    const result = await http<IObstacleWithBrotherData[]>({
        path: '/obstacle-const/brothers-data'
    });
    if(result.body && result.body) {
        return result.body.map(mapObstacle);
    } else {
        return [];
    }
}