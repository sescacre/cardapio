'use client';

import useDialog from "@/app/hooks/useDialog";
import { Button } from "@/app/ui/Button";
import Dialog from "@/app/ui/Dialog";
import CategoryForm from "../CategoryForm";
import { updateMenuCategoryAction } from "../CategoryForm/actions";

export default function CategoryEditFormDialog({ children }: { children: React.ReactNode }){
    const dialog = useDialog();

    return (
        <>
            <Button
                icon="edit"
                onClick={ dialog.open }
                size="sm"
                title="Editar categoria"
                variant="text"
            />
            <Dialog controller={ dialog } title="Editar Categoria">
                <CategoryForm action={ updateMenuCategoryAction }>
                    { children }
                </CategoryForm>
            </Dialog>
        </>
    );
}
