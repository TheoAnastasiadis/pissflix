import { URLSearchParams } from "url"

export class URLMaker {
    public static make = (
        externalUrl: string,
        groupUrl: string,
        specialUrl: string,
        params: { [key: string]: string | number | boolean } = {},
        user: any = {}
    ) => {
        const url = `${externalUrl}/${groupUrl}/${specialUrl}`
        const query = new URLSearchParams()
        for (const param in params) {
            query.append(param, params[param] as string)
        }

        //TODO: USER HANDLING
        return `${url}?${query.toString()}`
    }
}
