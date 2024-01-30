import {InterfaceIcon, InterfaceImage, InterfaceLink} from "@/lib/interfaces/global";

export interface IHeroSection {
    title: string;
    text: string;
    image: InterfaceImage;
    gallery: InterfaceImage[];
}

export interface ICategories {
    icon: InterfaceIcon;
    title: string;
    link: InterfaceLink;
}

export interface IPost {
    ID: number;
    post_title: string;
    post_excerpt: string;
    post_name: string;
    post_type: string;
    post_thumbnail_url: string;
}

export interface ILocations {
    title: string;
    text: string;
    destinations: IPost[];
}

export interface PageData {
    title: string;
    acf: {
        hero_section: IHeroSection;
        categories: ICategories[];
        locations: ILocations;
    };
}
