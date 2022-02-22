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