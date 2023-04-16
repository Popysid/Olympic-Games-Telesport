export const wording = {
    title: "Olympic Games",
    page: {
        home: {
            subtitle: "Medals per Country",
            description: "Télésport Web Application that displays data about the last Olympic Games.",
            olympicsCount: "Number of Olympics",
            countriesCount: "Number of Countries",
            noDataLoaded: "No data available.",
        },
        details: {
            notFound: (label:string, element:any) => `Country with ${label}: ${element} not found.`,
            entriesCount: "Number of Entries",
            totalMedalsCount: "Total Number of Medals",
            totalAthletesCount: "Total Number of Athletes",
            medalsPerParticipation: "Medals per Participation",
            medals: " Medals",

        },
        notFound: {
            warning: "404: Page not found.",
            back: "Go Back",
        }
    },
    header: {

    },
    footer: {
        copyright: "© Copyright",
        credits: "Credits",
        author: "Author",
    }
}