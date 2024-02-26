import { IImage } from "./global";

export interface ImageSizes {
    thumbnail: string;
    'thumbnail-width': number;
    'thumbnail-height': number;
    medium: string;
    'medium-width': number;
    'medium-height': number;
    medium_large: string;
    'medium_large-width': number;
    'medium_large-height': number;
    large: string;
    'large-width': number;
    'large-height': number;
    '1536x1536': string;
    '1536x1536-width': number;
    '1536x1536-height': number;
    '2048x2048': string;
    '2048x2048-width': number;
    '2048x2048-height': number;
}

export interface HeaderLogo {
    ID: number;
    title: string;
    filename: string;
    filesize: number;
    url: string;
    link: string;
    alt: string;
    author: string;
    description: string;
    caption: string;
    name: string;
    status: string;
    uploaded_to: number;
    date: string;
    modified: string;
    menu_order: number;
    mime_type: string;
    type: string;
    subtype: string;
    icon: string;
    width: number;
    height: number;
    sizes: ImageSizes;
}

export interface Options {
    header_logo: HeaderLogo;
    header_logo_scrolled: HeaderLogo;
    footer_menu_text: string;
    footer_social_text: string;
    footer_social_title: string;
    footer_social_texture: IImage;
    facebook_url: string;
    instagram_url: string;
    tiktok_url: string;
}
