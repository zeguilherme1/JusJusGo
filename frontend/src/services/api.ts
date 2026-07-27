export interface Suggestion {
  id: number;
  term: string;
}

export async function fetchSuggestions(query: string): Promise<Suggestion[]> {
    if (query.trim().length < 4) {
        return [];
    }

    const graphqlQuery = {
        query: `
            query GetSuggestions($query: String!) {
                getSuggestions(query: $query) {
                    id
                    term
                }
            }
        `,
        variables: {
            query: query
        }
    };

    try {
        const response = await fetch('http://localhost:4000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(graphqlQuery),
        });
        const {data} = await response.json();
        return data.getSuggestions;
    } catch(error){
        console.error("Error fetching suggestions", error);
        return [];
    }
}
