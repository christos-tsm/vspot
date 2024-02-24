import {IIcon, IImage, ILink} from "@/lib/interfaces/global";

export interface IHeroSection {
    title: string;
    text: string;
    image: IImage;
    gallery: IImage[];
}

export interface IConnect {
    title: string;
    text: string;
    image: IImage;
    link: ILink;
}


export interface ICategories {
    icon: IIcon;
    title: string;
    link: ILink;
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

export interface IRestaurants {
    title: string;
    text: string;
    restaurants: IPost[];
}

export interface IHotels {
    title: string;
    text: string;
    hotels: IPost[];
}

export interface IPageData {
    title: string;
    acf: {
        hero_section: IHeroSection;
        categories: ICategories[];
        featured_restaurants: IRestaurants;
        featured_hotels: IHotels;
        locations: ILocations;
        connect: IConnect;
    };
}
