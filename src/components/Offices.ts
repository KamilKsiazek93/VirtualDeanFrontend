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

export interface IOfficeNames {
    id: number;
    officeName: string;
    officeAdmin: string;
}

export const addScholaToDb = async(data:CantorOfficeResponse[], accessToken:string):Promise<MessageBody | undefined> => {
    const result = await http<MessageBody, CantorOfficeResponse[]>({
        path: '/office-singing',
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
        path: `/office-last/${brotherId}`
    })
    if(result.ok && result.body) {
        return result.body
    }
    return undefined
}

export const getPreviousOfficeForBrother = async(brotherId:number): Promise<BrotherDashboardOffice | undefined> => {
    const result = await http<BrotherDashboardOffice>({
        path: `/office-previous/${brotherId}`
    })
    if(result.ok && result.body) {
        return result.body
    }
    return undefined
}

export const getLastOffice = async(): Promise<BrotherDashboardOffice[] | null> => {
    const result = await http<BrotherDashboardOffice[]>({
        path: '/office-last'
    })
    if(result.ok && result.body) {
        return result.body.map((bro, index) => bro)
    }
    return []
}

export const addKitchenOfficeToDB = async(data:KitchenOfficeResp[], accessToken:string):Promise<MessageBody | undefined> => {
    const result = await http<MessageBody, KitchenOfficeResp[]>({
        path: '/kitchen-offices',
        method: 'post',
        body: data,
        accessToken
    })
    if(result.ok && result.body) {
        return result.body
    }
    return undefined;
}

export const addTrayToDB = async(data:ITrayHourResponse[], accessToken:string):Promise<MessageBody | undefined> => {
    const result = await http<MessageBody, ITrayHourResponse[]>({
        path: '/tray-hour',
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
        path: '/office-liturgist',
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
        path: '/office-dean',
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
        path: '/tray-hour-last'
    })
    if(result.ok && result.body) {
        return result.body.map((bro, index) => bro)
    }
    return []
}

export const isOfficeAbleToSet = async(pipelineName:string): Promise<Boolean> => {
    const result = await http<Boolean>({
        path: `${pipelineName}`
    })
    if(result.ok && result.body) {
        return true
    }
    return false
}

export const getOfficeNames = async(pathName:string): Promise<IOfficeNames[] | null> => {
    const result = await http<IOfficeNames[]>({
        path: `/office-name/${pathName}`
    })
    if(result.ok && result.body) {
        return result.body.map((name, index) => name)
    }
    return []
}

export const getHoursForTray = async(): Promise<string[] | null> => {
    const result = await http<string[]>({
        path: '/hours-tray'
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
