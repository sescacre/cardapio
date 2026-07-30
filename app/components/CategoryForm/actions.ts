'use server';

import { createMenuCategory, deleteMenuCategory, updateMenuCategory } from "@/app/data/menuCategory";
import { getMenuItems } from "@/app/data/menuItem";
import { toUserMessage } from "@/app/data/apiErrors";
import { revalidatePath } from "next/cache";

type ActionState = {
    success?: boolean;
    message?: string;
    error?: string;
} | null;

export async function createMenuCategoryAction(
    previousState: ActionState,
    formData: FormData,
): Promise<ActionState> {
    console.log('🔁 ACTION - CREATE MENU CATEGORY');

    try {
        const name = formData.get('name') as string;

        await createMenuCategory({ name });

        revalidatePath('/');
        revalidatePath('/painel');
        revalidatePath('/tv');

        return { success: true, message: 'Categoria criada com sucesso' };
    } catch (error) {
        return { error: toUserMessage(error) };
    }
}

export async function updateMenuCategoryAction(
    previousState: ActionState,
    formData: FormData,
): Promise<ActionState> {
    console.log('🔁 ACTION - UPDATE MENU CATEGORY');

    try {
        const id = formData.get('id') as string;
        const name = formData.get('name') as string;

        await updateMenuCategory(id, { name });

        revalidatePath('/');
        revalidatePath('/painel');
        revalidatePath('/tv');

        return { success: true, message: 'Categoria atualizada com sucesso' };
    } catch (error) {
        return { error: toUserMessage(error) };
    }
}

export async function deleteMenuCategoryAction(formData: FormData) {
    console.log('🔁 ACTION - DELETE MENU CATEGORY');

    try {
        const id = formData.get('id') as string;
        const items = await getMenuItems();

        if (items.some((item) => item.categoryId === id)) {
            throw new Error('Não é possível apagar uma categoria que possui itens associados');
        }

        await deleteMenuCategory(id);

        revalidatePath('/');
        revalidatePath('/painel');
        revalidatePath('/tv');
    } catch (error) {
        throw new Error(toUserMessage(error));
    }
}
