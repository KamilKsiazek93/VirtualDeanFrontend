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
    trayOffice: Array<string>
    communionOffice: Array<string>
}

export const addScholaToDb = async(data:CantorOfficeResponse[]):Promise<MessageBody | undefined> => {
    const result = await http<MessageBody, CantorOfficeResponse[]>({
        path: '/office-singing',
        method: 'post',
        body: data
    })
    if(result.ok && result.body) {
        return result.body;
    }
    return undefined;
}

export interface ITrayHourResponse {
    brotherId: number;
    trayHour: string;
}

export interface IOfficeAddedResponse {
    brotherId: number;
    officeName: string;
}

export interface ILastTray {
    idBrother: number;
    brothersTrays: Array<string>;
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

export const addTrayToDB = async(data:ITrayHourResponse[]):Promise<MessageBody | undefined> => {
    const result = await http<MessageBody, ITrayHourResponse[]>({
        path: '/tray-hour',
        method: 'post',
        body: data
    })
    if(result.ok && result.body) {
        return result.body
    }
    return undefined;
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