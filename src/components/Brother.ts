import { http } from "./http";

export interface AddingBrother {
    id: number;
    name: string;
    surname: string;
    email: string;
    precedency: string;
    isSinging: boolean;
    isLector: boolean;
    isAcolit: boolean;
    isDiacon: boolean;
}

export interface EditingBrother {
    id: number;
    name: string;
    surname: string;
    email: string;
    passwordHash: string;
    precedency: string;
    isSinging: boolean;
    isLector: boolean;
    isAcolit: boolean;
    isDiacon: boolean;
    statusBrother: string;
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
    isLector: boolean;
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

export const loginAction = async(brother:LoginData): Promise<BaseBrother | null> => {
    const result = await http<BaseBrother>({
        path: `brothers/login?email=${brother.email}&password=${brother.password}`
    });
    if(result.ok && result.body) {
        return result.body
    }
    return null
}