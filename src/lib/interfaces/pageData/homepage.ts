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

export interface ITerm {
    term_id: number;
    name: string;
    slug: string;
    term_taxonomy_id: number;
    taxonomy: string;
    description: string;
    parent: number;
    count: number;
    filter: string;
}

export interface ITaxonomies {
    [key: string]: ITerm[]; // The key is the taxonomy name, and it maps to an array of terms
}

export interface IPost {
    ID: number;
    post_title: string;
    post_excerpt: string;
    post_name: string;
    post_type: string;
    post_thumbnail_url: string;
    taxonomies?: ITaxonomies;
    acf_fields: {
        excerpt?: string;
    }
}

export interface ILocations {
    title: string;
    text: string;
    destinations: IPost[];
    link: ILink;
}

export interface IRestaurants {
    title: string;
    text: string;
    restaurants: IPost[];
    link: ILink;
}

export interface IHotels {
    title: string;
    text: string;
    hotels: IPost[];
    link: ILink;
}

export interface IFeatures {
    title: string;
    text: string;
    icon: {
        ID: number;
        url: string;
    }
}

export interface IAbout {
    title: string;
    text: string;
    link: ILink;
    features: IFeatures[]
}

export interface IDiscoverItem {
    title: string;
    text: string;
    link: ILink;
}

export interface IDiscover {
    title: string;
    cart_image: IImage;
    background_texture: IImage;
    items: IDiscoverItem[];
}

export interface IPageData {
    title: string;
    acf: {
        hero_section: IHeroSection;
        categories: ICategories[];
        featured_restaurants: IRestaurants;
        featured_hotels: IHotels;
        locations: ILocations;
        discover: IDiscover;
        connect: IConnect;
        about: IAbout;
    };
}
