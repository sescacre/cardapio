import { centralFetch } from "./apiClient";
import {
  CreateMenuItemData,
  MenuItem,
  UpdateMenuItemData,
} from "./menuItem.type";
import { MenuCategory } from "./menuCategory.type";

export type PublicMenuCatalog = {
  items: MenuItem[];
  categories: MenuCategory[];
};

export async function getPublicMenuCatalog() {
  console.log("💿 DAL - GET PUBLIC MENU CATALOG");
  return centralFetch<PublicMenuCatalog>("/api/menu/public");
}

export async function getMenuItems() {
  console.log("💿 DAL - GET MENU ITEMS");
  return centralFetch<MenuItem[]>(`/api/menuItem`);
}

export async function createMenuItem(menuItemData: CreateMenuItemData) {
  console.log("💿 DAL - CREATE MENU ITEM");
  return centralFetch<MenuItem>(`/api/menuItem`, {
    method: "POST",
    body: JSON.stringify(menuItemData),
  });
}

export async function updateMenuItem(
  menuItemId: string,
  menuItemData: UpdateMenuItemData,
) {
  console.log("💿 DAL - UPDATE MENU ITEM");
  return centralFetch<MenuItem>(`/api/menuItem/${menuItemId}`, {
    method: "PATCH",
    body: JSON.stringify(menuItemData),
  });
}

export async function deleteMenuItem(menuItemId: string) {
  console.log("💿 DAL - DELETE MENU ITEM");
  return centralFetch<void>(`/api/menuItem/${menuItemId}`, {
    method: "DELETE",
  });
}
