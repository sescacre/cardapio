import { centralFetch } from "./apiClient";
import { CreateMenuCategoryData, MenuCategory, UpdateMenuCategoryData } from "./menuCategory.type";

export async function getMenuCategories(){
    console.log('💿 DAL - GET MENU CATEGORIES');
    return centralFetch<MenuCategory[]>(`/api/menuCategory`);
}

export async function createMenuCategory(menuCategoryData: CreateMenuCategoryData){
    console.log('💿 DAL - CREATE MENU CATEGORY');
    return centralFetch<MenuCategory>(`/api/menuCategory`, {
        method: 'POST',
        body: JSON.stringify(menuCategoryData)
    });
}

export async function updateMenuCategory(menuCategoryId: string, menuCategoryData: UpdateMenuCategoryData){
    console.log('💿 DAL - UPDATE MENU CATEGORY');
    return centralFetch<MenuCategory>(`/api/menuCategory/${menuCategoryId}`, {
        method: 'PATCH',
        body: JSON.stringify(menuCategoryData)
    });
}

export async function deleteMenuCategory(menuCategoryId: string){
    console.log('💿 DAL - DELETE MENU CATEGORY');
    return centralFetch<void>(`/api/menuCategory/${menuCategoryId}`, {
        method: 'DELETE',
    });
}
