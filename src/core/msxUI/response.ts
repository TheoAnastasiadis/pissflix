import { Action } from "./action"
import { MsxContentRoot } from "./contentObjects"
import { Data } from "./data"
import { MsxMenu } from "./menuObject"

export type MsxServerResponse = {
    response: {
        status: number
        text: string
        message?: string
        data?: {
            action: Action
            data?: {}
        }
    }
}
