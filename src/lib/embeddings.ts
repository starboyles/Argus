interface VoyageEmbeddingResponse {
    object: string;
    data: {
        embedding: number[];
        index: number;
    }[];
    model: string;
    usage: {
        total_tokens: number;
    }
}

export async function getEmbeddings(text: string) {
    try {
        const response = await fetch('https://api.voyageai.com/v1/embeddings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.VOYAGE_API_KEY}`
            },
            body: JSON.stringify({
                input: text.replace(/\n/g, ""),  
                model: "voyage-2",
                input_type: "document"
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: VoyageEmbeddingResponse = await response.json();
        return result.data[0].embedding; 
        
    } catch (error) {
        console.error('Error getting embeddings:', error);
        throw error;
    }
}

