import React from 'react';
import {fetchMenuItems, fetchThemeOptions} from "@/services/wordpress";
import NavigationClient from './client'; // Client-side component

export const Navigation = async () => {
    // Server-side fetch operations
    const options = await fetchThemeOptions();
    const menuItems = await fetchMenuItems('header-menu');

    return <NavigationClient options={options} menuItems={menuItems}/>;
};

export default Navigation;
