import { webAPIUrl } from "../AppSettings";

export interface HttpRequest<REQB> {
    path: string;
    method?:string;
    body?: REQB;
    accessToken?: string;
}

export interface HttpResponse<RESB> {
    ok: boolean;
    body?: RESB;
}

export const http = async<RESB, REQB = undefined>(
    config: HttpRequest<REQB>,
) : Promise<HttpResponse<RESB>> => {
    const request = new Request(`${webAPIUrl}${config.path}`, {
        method: config.method ?? 'get',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: config.body ? JSON.stringify(config.body) : undefined,
    });

    const response = await fetch(request);
    if(response.ok) {
        const body = await response.json();
        return { ok: response.ok, body};
    } else {
        logError(request, response);
        return {ok: response.ok}
    }
}

const logError = async (request: Request, response: Response) => {
    let body = await response.text();
    console.error(`Wystąpił błąd podczas pobierania ${request.method} ${request.url}`, body);
}