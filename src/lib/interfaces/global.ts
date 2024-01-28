interface Image {
    ID: number,
    id: number,
    title: string,
    filename: string,
    filesize: number,
    url: string,
    link: string,
    alt: string,
    name: string,
    uploaded_to: number,
    sizes: {
        thumbnail: string,
        medium: string,
        medium_large: string,
        large: string,
    }
}