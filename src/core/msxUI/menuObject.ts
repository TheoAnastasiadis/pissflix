import { Action } from "./action"
import { Icon } from "./icon"
import { Data } from "./data"
import { pipe } from "fp-ts/lib/function"
import * as O from "fp-ts/Option"

export type Transparent = "0" | "1" | "2" | true | false
export type Style =
    | "default"
    | "flat"
    | "flat-separator"
    | "overlay"
    | "overlay-separator"

export type MsxMenu = {
    name?: string
    version?: "1.0.0"
    // reference?: any,
    flag?: string
    reuse?: boolean
    cache?: boolean
    restore?: boolean
    transparent?: Transparent
    style?: Style
    logo?: string
    logoSize?: "small" | "large"
    headline?: string
    background?: string
    extension?: string
    //"dictionary": "http://link.to.dictionary",
    action?: Action
    data?: Data
    ready?: { action: Action; data: Data }
    options?: any
    menu?: MsxMenuItem[]
}

export const addItemToMenu = (menu: MsxMenu) => (item: MsxMenuItem) =>
    pipe(
        item,
        O.fromPredicate((item) =>
            menu.menu ? menu.menu.map((it) => it.id).includes(item.id) : true
        ),
        O.map((item) => ({
            ...menu,
            menu: menu.menu ? menu.menu?.concat(item) : [item],
        }))
    )

export type MsxMenuItem = {
    id?: string
    type?: "default" | "separator" | "settings"
    display?: boolean
    enable?: boolean
    focus?: boolean
    execute?: boolean
    transparent?: Transparent
    icon?: Icon
    image?: string
    label?: string
    background?: string
    extensionIcon?: Icon
    extensionLabel?: string
    lineColor?: string
    data?: any
    options?: any
}
