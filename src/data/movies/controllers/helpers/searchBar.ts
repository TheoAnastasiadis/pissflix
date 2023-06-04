import { MsxContentPage } from "../../../../core/msxUI/contentObjects"

export const searchBar: (query: string) => MsxContentPage = (query) => ({
    items: [
        {
            layout: "0,0,12,1",
            extensionIcon: "search",
            label: query && query.length > 0 ? query : "Start typing...",
            type: "control",
            action: "reload:content",
        },
    ],
})
