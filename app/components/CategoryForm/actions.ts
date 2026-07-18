'use server';

import { createMenuCategory, deleteMenuCategory, updateMenuCategory } from "@/app/data/menuCategory";
import { getMenuItems } from "@/app/data/menuItem";
import { revalidatePath } from "next/cache";

export async function createMenuCategoryAction(previousState: any, formData: FormData){
    console.log('🔁 ACTION - CREATE MENU CATEGORY');

    const name = formData.get('name') as string;

    await createMenuCategory({ name });

    revalidatePath('/');
    revalidatePath('/tv');

    return { success: true, message: 'Categoria criada com sucesso' };
}

export async function updateMenuCategoryAction(previousState: any, formData: FormData){
    console.log('🔁 ACTION - UPDATE MENU CATEGORY');

    const id = formData.get('id') as string;
    const name = formData.get('name') as string;

    await updateMenuCategory(id, { name });

    revalidatePath('/');
    revalidatePath('/tv');

    return { success: true, message: 'Categoria atualizada com sucesso' };
}

export async function deleteMenuCategoryAction(formData: FormData){
    console.log('🔁 ACTION - DELETE MENU CATEGORY');

    const id = formData.get('id') as string;
    const items = await getMenuItems();

    if (items.some((item) => item.categoryId === id)) {
        throw new Error('Não é possível apagar uma categoria que possui itens associados');
    }

    await deleteMenuCategory(id);

    revalidatePath('/');
    revalidatePath('/tv');
}
