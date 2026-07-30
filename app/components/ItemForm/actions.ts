'use server';

import { createMenuItem, deleteMenuItem, getMenuItems, updateMenuItem } from "@/app/data/menuItem";
import { toUserMessage } from "@/app/data/apiErrors";
import { parseCurrency } from "@/app/lib/mask";
import { revalidatePath } from "next/cache";

type ActionState = {
    success?: boolean;
    message?: string;
    error?: string;
} | null;

export async function createMenuItemAction(
    previousState: ActionState,
    formData: FormData,
): Promise<ActionState> {
    console.log('🔁 ACTION - CREATE MENU ITEM');

    try {
        const categoryId = formData.get('categoryId') as string;
        const comerciarioPrice = parseCurrency(String(formData.get('comerciarioPrice') ?? ''));
        const description = formData.get('description') as string;
        const name = formData.get('name') as string;
        const publicoPrice = parseCurrency(String(formData.get('publicoPrice') ?? ''));
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
        revalidatePath('/painel');
        revalidatePath('/tv');

        return { success: true, message: 'Item criado com sucesso' };
    } catch (error) {
        return { error: toUserMessage(error) };
    }
}

export async function updateMenuItemAction(
    previousState: ActionState,
    formData: FormData,
): Promise<ActionState> {
    console.log('🔁 ACTION - UPDATE MENU ITEM');

    try {
        const id = formData.get('id') as string;
        const categoryId = formData.get('categoryId') as string;
        const comerciarioPrice = parseCurrency(String(formData.get('comerciarioPrice') ?? ''));
        const description = formData.get('description') as string;
        const name = formData.get('name') as string;
        const publicoPrice = parseCurrency(String(formData.get('publicoPrice') ?? ''));
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
        revalidatePath('/painel');
        revalidatePath('/tv');

        return { success: true, message: 'Item atualizado com sucesso' };
    } catch (error) {
        return { error: toUserMessage(error) };
    }
}

export async function deleteMenuItemAction(formData: FormData) {
    console.log('🔁 ACTION - DELETE MENU ITEM');

    try {
        const id = formData.get('id') as string;

        await deleteMenuItem(id);

        revalidatePath('/');
        revalidatePath('/painel');
        revalidatePath('/tv');
    } catch (error) {
        throw new Error(toUserMessage(error));
    }
}

export async function toggleMenuItemVisibilityAction(formData: FormData) {
    console.log('🔁 ACTION - TOGGLE MENU ITEM VISIBILITY');

    try {
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
        revalidatePath('/painel');
        revalidatePath('/tv');
    } catch (error) {
        throw new Error(toUserMessage(error));
    }
}
