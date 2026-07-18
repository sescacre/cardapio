'use server';

import { createMenuItem, deleteMenuItem, getMenuItems, updateMenuItem } from "@/app/data/menuItem";
import { revalidatePath } from "next/cache";

export async function createMenuItemAction(previousState: any, formData: FormData){
    console.log('🔁 ACTION - CREATE MENU ITEM');

    const categoryId = formData.get('categoryId') as string;
    const comerciarioPrice = Number(formData.get('comerciarioPrice'));
    const description = formData.get('description') as string;
    const name = formData.get('name') as string;
    const publicoPrice = Number(formData.get('publicoPrice'));
    const visible = formData.get('visible') === 'on';

    await createMenuItem({
        categoryId,
        comerciarioPrice,
        description: description || null,
        name,
        publicoPrice,
        visible,
    });

    revalidatePath('/');
    revalidatePath('/tv');

    return { success: true, message: 'Item criado com sucesso' };
}

export async function updateMenuItemAction(previousState: any, formData: FormData){
    console.log('🔁 ACTION - UPDATE MENU ITEM');

    const id = formData.get('id') as string;
    const categoryId = formData.get('categoryId') as string;
    const comerciarioPrice = Number(formData.get('comerciarioPrice'));
    const description = formData.get('description') as string;
    const name = formData.get('name') as string;
    const publicoPrice = Number(formData.get('publicoPrice'));
    const visible = formData.get('visible') === 'on';

    await updateMenuItem(id, {
        categoryId,
        comerciarioPrice,
        description: description || null,
        name,
        publicoPrice,
        visible,
    });

    revalidatePath('/');
    revalidatePath('/tv');

    return { success: true, message: 'Item atualizado com sucesso' };
}

export async function deleteMenuItemAction(formData: FormData){
    console.log('🔁 ACTION - DELETE MENU ITEM');

    const id = formData.get('id') as string;

    await deleteMenuItem(id);

    revalidatePath('/');
    revalidatePath('/tv');
}

export async function toggleMenuItemVisibilityAction(formData: FormData){
    console.log('🔁 ACTION - TOGGLE MENU ITEM VISIBILITY');

    const id = formData.get('id') as string;
    const visible = formData.get('visible') === 'on';
    const items = await getMenuItems();
    const item = items.find((menuItem) => menuItem.id === id);

    if (!item) {
        throw new Error('Item não encontrado');
    }

    await updateMenuItem(id, {
        categoryId: item.categoryId,
        comerciarioPrice: Number(item.comerciarioPrice),
        description: item.description,
        name: item.name,
        publicoPrice: Number(item.publicoPrice),
        visible,
    });

    revalidatePath('/');
    revalidatePath('/tv');
}
