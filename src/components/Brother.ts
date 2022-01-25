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
    auth: UserId;
}

export interface UserId {
    id: number;
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