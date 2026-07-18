export type MenuItem = {
    id: string;
    createAt: string;
    updatedAt: string;
    categoryId: string;
    comerciarioPrice: string | number;
    description: string | null;
    name: string;
    publicoPrice: string | number;
    visible: boolean;
}

export type CreateMenuItemData = {
    categoryId: string;
    comerciarioPrice: number;
    description?: string | null;
    name: string;
    publicoPrice: number;
    visible?: boolean;
}

export type UpdateMenuItemData = {
    categoryId: string;
    comerciarioPrice: number;
    description?: string | null;
    name: string;
    publicoPrice: number;
    visible?: boolean;
}
