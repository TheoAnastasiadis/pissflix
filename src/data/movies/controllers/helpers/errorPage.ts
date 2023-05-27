import { MsxContentRoot } from "../../../../core/msxUI/contentObjects"

export const errorPage: (message: string) => MsxContentRoot = (message) => ({
    headline: "Unexpected Error!",
    type: "list",
    pages: [
        {
            items: [
                {
                    title: message,
                    layout: "0,0,12,3",
                    type: "space",
                },
                {
                    type: "button",
                    label: "Go back",
                    icon: "arrow-back",
                    action: "back",
                    layout: "0,3,2,2",
                },
            ],
        },
    ],
})
