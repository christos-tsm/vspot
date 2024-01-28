export interface HeroSection {
    title: string;
    text: string;
    image: Image
    gallery: Image[]
}

export interface PageData {
    title: string;
    acf: {
        hero_section: HeroSection;
    };
}