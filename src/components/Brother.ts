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