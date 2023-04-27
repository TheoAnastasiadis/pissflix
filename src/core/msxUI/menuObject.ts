import { Icon } from "./icon"

export type Data =
    | {
          ["key"]: string
      }
    | string

export type Action = string

export type Transparent = "0" | "1" | "2" | true | false

export type MenuProps = {
    name: string
    version: "1.0.0"
    //"reference": "http://link.to.menu",
    flag: string
    reuse: boolean
    cache: boolean
    restore: boolean
    transparent: Transparent | null
    style:
        | "default"
        | "flat"
        | "flat-separator"
        | "overlay"
        | "overlay-separator"
        | null
    logo: string | null
    logoSize: "small" | "large" | null
    headline: string | null
    background: string | null
    extension: string | null
    //"dictionary": "http://link.to.dictionary",
    action: Action
    data: Data | null
    ready: { action: Action; data: Data } | null
    options: any | null
}

export type MenuItemProps = {
    id: string
    type: "default" | "separator" | "settings"
    display: boolean | null
    enable: boolean | null
    focus: boolean | null
    execute: boolean | null
    transparent: Transparent | null
    icon: Icon | null
    image: string | null
    label: string | null
    background: string | null
    extensionIcon: Icon | null
    extensionLabel: string | null
    lineColor: string | null
    data: Data
    options: any | null
}

export class MsxMenu {
    name
    version
    flag
    reuse
    cache
    restore
    style
    logo
    logoSize
    headline
    background
    extension
    menu: MsxMenuItem[]
    action
    data
    ready
    options
    constructor(props: MenuProps) {
        this.name = props.name
        this.version = props.version
        this.flag = props.flag
        this.reuse = props.reuse
        this.cache = props.cache
        this.restore = props.restore
        this.style = props.style
        this.logo = props.logo
        this.logoSize = props.logoSize
        this.headline = props.headline
        this.background = props.background
        this.extension = props.extension
        this.menu = []
        this.action = props.action
        this.data = props.data
        this.ready = props.ready
        this.options = props.options
    }

    addItem(item: MsxMenuItem): void {
        if (this.menu.map((it) => it.id).indexOf(item.id) >= 0) {
            //cannot add item with same id as existing item
            throw `MSX UI Error: Duplicate id: ${item.id}`
        }
        if (
            this.menu.map((it) => it.focus).reduce((p, c) => p || c) ==
            item.focus
        ) {
            throw `MSX UI Error: Cannot add more than one focused items`
        }
        this.menu.push(item)
    }
}

export class MsxMenuItem {
    id
    type
    display
    enable
    focus
    execute
    transparent
    icon
    image
    label
    background
    extensionIcon
    extensionLabel
    lineColor
    data
    options
    constructor(props: MenuItemProps) {
        this.id = props.id
        this.type = props.type
        this.display = props.display
        this.enable = props.enable
        this.focus = props.focus
        this.execute = props.execute
        this.transparent = props.transparent
        this.icon = props.icon
        this.image = props.image
        this.label = props.label
        this.background = props.background
        this.extensionIcon = props.extensionIcon
        this.extensionLabel = props.extensionLabel
        this.lineColor = props.lineColor
        this.data = props.data
        this.options = props.options
    }
}
