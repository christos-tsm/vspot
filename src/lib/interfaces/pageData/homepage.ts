export interface HeroSection {
    title: string;
    text: string;
}

export interface PageData {
    title: string;
    acf: {
        hero_section: HeroSection;
    };
}