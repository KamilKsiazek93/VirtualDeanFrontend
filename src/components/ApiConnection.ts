import { BaseBrother, BaseBrotherLiturgist, SingingBrothers } from "./Brother";
import { http } from "./http";
import { IObstacleConst, IObstacleWithBrotherData } from "./Obstacle";

export const mapObstacle = (
    obstacle: IObstacleWithBrotherData
) : IObstacleWithBrotherData => ({
    ...obstacle,
})

export interface IBody {
    status?: number;
    message?: string;
}


export const getConstOBstacleWithBrotherTest = async (): Promise <IObstacleWithBrotherData[] | null> => {
    const result = await http<IObstacleWithBrotherData[]>({
        path: 'obstacles/const/brothers-data'
    });
    if(result.ok && result.body) {
        return result.body.map(mapObstacle);
    } else {
        return [];
    }
}

export const postConstObstacle = async(obstacle:IObstacleConst): Promise<IObstacleConst | undefined> => {
    const result = await http<IObstacleConst, IObstacleConst>({
        path: 'obstacles/const',
        method: 'post',
        body: obstacle
    });
    if(result.ok && result.body) {
        return result.body
    }
    return undefined
}

export const putConstObstacle = async(obstacle:IObstacleConst): Promise<IObstacleConst | undefined> => {
    const result = await http<IObstacleConst, IObstacleConst>({
        path: `obstacles/const/${obstacle.id}`,
        method: 'put',
        body: obstacle
    })
    if(result.ok && result.body) {
        return result.body
    }
    return undefined
}

export const deleteConstObstacle = async(id:number): Promise<number | undefined> => {
    const result = await http<number, number>({
        path: `obstacles/const/${id}`,
        method: 'delete',
        body: id
    })
    if(result.ok && result.body) {
        return result.body
    }
    return undefined
}

export const getBaseBrother = async(): Promise<BaseBrother[] | null> => {
    const result = await http<BaseBrother[]>({
        path: '/brothers-base'
    })
    if(result.ok && result.body) {
        return result.body.map((bro, index) => bro)
    }
    return []
}

export const getBaseBrothersForSchola = async(): Promise<SingingBrothers[] | null> => {
    const result = await http<SingingBrothers[]>({
        path: '/brothers-singing'
    })
    if(result.ok && result.body) {
        return result.body.map((bro, index) => bro)
    }
    return []
}

export const getBaseBrotherForTray = async(): Promise<BaseBrother[] | null> => {
    const result = await http<BaseBrother[]>({
        path: '/brothers-tray'
    })
    if(result.ok && result.body) {
        return result.body.map((bro, index) => bro)
    }
    return []
}

export const getBrothersForCommunion = async():Promise<BaseBrother[] | null> => {
    const result = await http<BaseBrother[]>({
        path: '/brothers-communion'
    })
    if(result.ok && result.body) {
        return result.body.map((bro) => bro)
    }
    return []
}

export const getBaseBrothersForLiturgistOffice = async(): Promise<BaseBrotherLiturgist[] | null> => {
    const result = await http<BaseBrotherLiturgist[]>({
        path: '/brothers-liturgistOffice'
    })
    if(result.ok && result.body) {
        return result.body.map((bro, index) => bro)
    }
    return []
}