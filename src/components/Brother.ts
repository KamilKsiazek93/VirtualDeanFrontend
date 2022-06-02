import { http } from "./http";

export interface AddingBrother {
    id: number;
    name: string;
    surname: string;
    precedency: string;
    isSinging: boolean;
    isLector: boolean;
    isAcolit: boolean;
    isDiacon: boolean;
}

export interface BaseBrother {
    id: number;
    name: string;
    surname: string;
    statusBrother: string;
    jwtToken: string;
}

export interface BaseBrotherLiturgist extends BaseBrother {
    isAcolit: boolean;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface SingingBrothers extends BaseBrother {
    isSinging: boolean;
}

export interface SingingEditBrothers {
    idBrother: number;
    isSinging: boolean;
}

export interface RootState {
    auth: UserState;
}

export interface UserState {
    user: BaseBrother;
}


export const getBrotherFromLocalStorage = ():BaseBrother => {
    const storage = window.localStorage;
    return JSON.parse(storage.getItem('user') || "");
}

export const loginAction = async(brother:LoginData): Promise<BaseBrother | undefined> => {
    const result = await http<BaseBrother, LoginData>({
        path: `/brother-login?email=${brother.email}&password=${brother.password}`
    });
    if(result.ok && result.body) {
        return result.body
    }
    return undefined
}