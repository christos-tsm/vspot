import axios from 'axios';

export const wpApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_WORDPRESS_BASE_URL}/wp-json`,
    headers: {
        'Content-Type': 'application/json'
    }
});