import { centralFetch } from "./apiClient";
import { CreateMenuItemData, MenuItem, UpdateMenuItemData } from "./menuItem.type";

export async function getMenuItems(){
    console.log('💿 DAL - GET MENU ITEMS');
    return centralFetch<MenuItem[]>(`/api/menuItem`);
}

export async function createMenuItem(menuItemData: CreateMenuItemData){
    console.log('💿 DAL - CREATE MENU ITEM');
    return centralFetch<MenuItem>(`/api/menuItem`, {
        method: 'POST',
        body: JSON.stringify(menuItemData)
    });
}

export async function updateMenuItem(menuItemId: string, menuItemData: UpdateMenuItemData){
    console.log('💿 DAL - UPDATE MENU ITEM');
    return centralFetch<MenuItem>(`/api/menuItem/${menuItemId}`, {
        method: 'PATCH',
        body: JSON.stringify(menuItemData)
    });
}

export async function deleteMenuItem(menuItemId: string){
    console.log('💿 DAL - DELETE MENU ITEM');
    return centralFetch<void>(`/api/menuItem/${menuItemId}`, {
        method: 'DELETE',
    });
}
