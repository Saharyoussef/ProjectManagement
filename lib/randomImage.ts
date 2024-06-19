const UNSPLASH_ACCESS_KEY = 'pBSSxfgYAzFYR3huY1ZubdWeShWRIxGiwaavcvJ5Phs';

export async function getRandomImagesFromCollection(collectionId: string, count: number) {
    try {
        const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${UNSPLASH_ACCESS_KEY}&collections=${collectionId}&count=${count}`);
        const data = await response.json();
        return data.map((photo: any) => photo.urls.regular);
    } catch (error) {
        console.error('Erreur lors de la récupération des images aléatoires:', error);
        return [];
    }
}

