import { regions } from "../../../../core/sharedObjects/regions"

export default {
    en: {
        Scandinavia: {
            title: "Nordic Delights",
            subtitle: "Discover Captivating Films from the Scandinavian Region",
        },
        Europe: {
            title: "Cinematic Mosaic: Visions of Europe",
            subtitle:
                "Embark on a Cinematic Journey through the Diverse Landscapes of Europe",
        },
        Balkans: {
            title: "Balkan Chronicles",
            subtitle:
                "Explore Unique and Compelling Films from the Balkan Peninsula",
        },
        Greece: {
            title: "Hellenic Heritage on Screen",
            subtitle:
                "Experience the Rich Cultural Legacy and Stories of Greece",
        },
        "Eastern Europe": {
            title: "Contemporary Eastern Europe",
            subtitle:
                "Immerse Yourself in the Cinematic Exploration of Modern Eastern Europe",
        },
        "Middle East & North Africa": {
            title: "Cinematic Wonders of the Middle East and North Africa",
            subtitle:
                "Discover the Richness and Diversity of Films from the Region",
        },
        Africa: {
            title: "African Cinematic Tapestry",
            subtitle:
                "Celebrate the Vibrant and Compelling Films from the Continent",
        },
        "Indian Subcontinent": {
            title: "Journey through the Indian Subcontinent",
            subtitle:
                "Experience the Magic and Grandeur of Films from the Subcontinent",
        },
        Asia: {
            title: "Asian Cinematic Marvels",
            subtitle: "Uncover the Richness and Diversity of Films from Asia",
        },
        "South America": {
            title: "Latin American Stories on Screen",
            subtitle:
                "Explore the Colorful and Passionate Films from South America",
        },
        Oceania: {
            title: "Cinematic Treasures Down Under",
            subtitle: "Dive into the Unique Stories and Landscapes of Oceania",
        },
    },
} satisfies {
    en: Record<keyof typeof regions, { title: string; subtitle: string }>
}
