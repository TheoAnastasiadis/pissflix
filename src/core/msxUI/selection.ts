import { Action } from "./action"
import { Data } from "./data"

export type Selection = {
    important?: boolean
    headline?: string
    background?: string
    action?: Action
    data?: Data
}
