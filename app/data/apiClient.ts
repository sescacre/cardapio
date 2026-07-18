const API_URL = process.env.API_CENTRAL_URL;

export async function centralFetch<T>(endpoint: string, init?: RequestInit){
    console.log('CENTRAL FETCH', `${API_URL}${endpoint}`);
    
    const response = await fetch(
        `${API_URL}${endpoint}`,
        {
            ...init,
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                ...init?.headers,
            }
        }
    );

    if(!response.ok)
        throw new Error(`Erro na comunicação com a API Central - ${response.statusText} ${response.status}`)

    return response.json() as Promise<T>;
}
