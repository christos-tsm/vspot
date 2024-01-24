import {wpApi} from "@/services/axios";

/** Fetch Posts */
export const fetchPosts = async () => {
    const response = await wpApi.get('/wp/v2/posts');
    return response.data;
};
/** Fetch Hotels */
export const fetchHotels = async () => {
    const response = await wpApi.get('/wp/v2/hotel');
    return response.data;
}
/** Fetch Theme Options */
export const fetchThemeOptions = async () => {
    const response = await wpApi.get('/acf/v2/options');
    return response.data;
}
/** Fetch Menu Items */
export const fetchMenuItems = async (menuId: string) => {
    const response = await wpApi.get(`/wp/v2/menu/${menuId}`);
    return response.data;
}
/** Fetch Pages ACF */
export const fetchPagesData = async (pageId: number) => {
    const response = await wpApi.get(`/wp/v2/page/${pageId}`);
    return response.data;
}
