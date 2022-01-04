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
}

export interface SingingBrothers extends BaseBrother {
    isSinging: boolean;
}

export interface SingingEditBrothers {
    idBrother: number;
    isSinging: boolean;
}