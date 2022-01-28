export interface KitchenOfficeResp {
    brotherId: number;
    officeName: string;
    day: string;
}

export interface CantorOfficeResponse {
    idBrother: number;
    officeName: string;
}

export interface BrotherDashboardOffice {
    cantorOffice: string;
    liturgistOffice: string;
    deanOffice: string;
    trayOffice: Array<string>
    communionOffice: Array<string>
}