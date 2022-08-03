import { getBrotherFromLocalStorage } from "./Brother";
import { http } from "./http";
import { MessageBody } from "./Obstacle";

export interface KitchenOfficeResp {
    brotherId: number;
    saturdayOffices?: string;
    sundayOffices?: string;
}

export interface CantorOfficeResponse {
    brotherId: number;
    weekOfOffices: number;
    cantorOffice: string;
}

export interface BrotherDashboardOffice {
    brotherId: number;
    cantorOffice: string;
    liturgistOffice: string;
    deanOffice: string;
    tray: Array<string>
    communion: Array<string>
}

export interface WeeklyOffices extends BrotherDashboardOffice {
    name: string;
    surname: string;
}

export interface ITrayHourResponse {
    brotherId: number;
    trayHour: string;
}

export interface ICommunionHourResponse {
    brotherId: number;
    communionHour: string;
}

export interface IOfficeLiturgistResponse {
    brotherId: number;
    liturgistOffice: string;
}

export interface IDeanOfficeResponse {
    brotherId: number;
    deanOffice: string;
}

export interface ILastTray {
    idBrother: number;
    brothersTrays: Array<string>;
}


export interface FlatOffice {
    brotherId: number;
    officeName: string;
}
export interface IOfficeNames {
    id: number;
    officeName: string;
    officeAdmin: string;
}

export const addScholaToDb = async(data:CantorOfficeResponse[], accessToken:string):Promise<MessageBody | undefined> => {
    const result = await http<MessageBody, CantorOfficeResponse[]>({
        path: 'offices/singing',
        method: 'post',
        body: data,
        accessToken
    })
    if(result.ok && result.body) {
        return result.body;
    }
    return undefined;
}

export const getLastOfficeForBrother = async(brotherId:number): Promise<BrotherDashboardOffice | undefined> => {
    const result = await http<BrotherDashboardOffice>({
        path: `offices/office-last/${brotherId}`
    })
    if(result.ok && result.body) {
        return result.body
    }
    return undefined
}

export const getPreviousOfficeForBrother = async(brotherId:number): Promise<BrotherDashboardOffice | undefined> => {
    const result = await http<BrotherDashboardOffice>({
        path: `offices/office-previous/${brotherId}`
    })
    if(result.ok && result.body) {
        return result.body
    }
    return undefined
}

export const getAccessTokenFromLocalStorage = async() => {
    const brotherLocalStorage = await getBrotherFromLocalStorage()
    return brotherLocalStorage.jwtToken;
}

export const getLastOffice = async(): Promise<WeeklyOffices[] | null> => {
    const accessToken:string = await getAccessTokenFromLocalStorage()
    const result = await http<WeeklyOffices[]>({
        path: 'offices/office-last',
        accessToken
    })
    if(result.ok && result.body) {
        return result.body.map((bro, index) => bro)
    }
    return []
}

export const addKitchenOfficeToDB = async(data:KitchenOfficeResp[], accessToken:string):Promise<MessageBody | undefined> => {
    const result = await http<MessageBody, KitchenOfficeResp[]>({
        path: 'offices/kitchen',
        method: 'post',
        body: data,
        accessToken
    })
    if(result.ok && result.body) {
        return result.body
    }
    return undefined;
}

export const getKitchenOffice  = async(weekNumber:number): Promise<KitchenOfficeResp[] | null> => {
    const result = await http<KitchenOfficeResp[]>({
        path: `offices/kitchen/${weekNumber}`
    })
    if(result.ok && result.body) {
        return result.body.map((item, index) => item)
    }
    return []
}

export const getLastWeek  = async(): Promise<number> => {
    const result = await http<number>({
        path: 'weeks'
    })
    if(result.ok && result.body) {
        return result.body;
    }
    return 0
}

export const getLastFlatOffice = async(weekId:number): Promise<FlatOffice[] | null> => {
    const result = await http<FlatOffice[]>({
        path: `offices/office-flat/${weekId}`
    })
    if(result.ok && result.body) {
        return result.body.map((bro, index) => bro)
    }
    return []
}

export const addTrayToDB = async(data:ITrayHourResponse[], accessToken:string):Promise<MessageBody | undefined> => {
    const result = await http<MessageBody, ITrayHourResponse[]>({
        path: 'trays',
        method: 'post',
        body: data,
        accessToken
    })
    if(result.ok && result.body) {
        return result.body
    }
    return undefined;
}

export const addCommunionToDB = async(data:ICommunionHourResponse[]):Promise<MessageBody | undefined> => {
    const result = await http<MessageBody, ICommunionHourResponse[]>({
        path: '/communion-hour',
        method: 'post',
        body: data
    })
    if(result.ok && result.body) {
        return result.body
    }
    return undefined;
}

export const addLiturgistOfficeTDB = async(data:IOfficeLiturgistResponse[], accessToken:string):Promise<MessageBody | undefined> => {
    const result = await http<MessageBody, IOfficeLiturgistResponse[]>({
        path: 'offices/office',
        method: 'post',
        body: data,
        accessToken
    })
    if(result.ok && result.body) {
        return result.body
    }
    return undefined
}

export const addDeanOfficeTDB = async(data:IDeanOfficeResponse[], accessToken:string):Promise<MessageBody | undefined> => {
    const result = await http<MessageBody, IDeanOfficeResponse[]>({
        path: 'offices/dean',
        method: 'post',
        body: data,
        accessToken
    })
    if(result.ok && result.body) {
        return result.body
    }
    return undefined
}

export const getLastTrays = async(): Promise<ILastTray[] | null> => {
    const result = await http<ILastTray[]>({
        path: 'trays/last'
    })
    if(result.ok && result.body) {
        return result.body.map((bro, index) => bro)
    }
    return []
}

export const isOfficeAbleToSet = async(pipelineName:string): Promise<Boolean> => {
    const result = await http<Boolean>({
        path: `offices/pipeline/name/${pipelineName}`
    })
    if(result.ok && result.body) {
        return true
    }
    return false
}

export const getOfficeNames = async(pathName:string): Promise<IOfficeNames[] | null> => {
    const result = await http<IOfficeNames[]>({
        path: `offices/office-name/${pathName}`
    })
    if(result.ok && result.body) {
        return result.body.map((name, index) => name)
    }
    return []
}

export const getHoursForTray = async(): Promise<string[] | null> => {
    const result = await http<string[]>({
        path: 'trays/hours'
    })
    if(result.ok && result.body) {
        return result.body.map((name, index) => name)
    }
    return []
}

export const getHoursForCommunion = async(): Promise<string[] | null> => {
    const result = await http<string[]>({
        path: '/hours-communion'
    })
    if(result.ok && result.body) {
        return result.body.map((name, index) => name)
    }
    return []
}
