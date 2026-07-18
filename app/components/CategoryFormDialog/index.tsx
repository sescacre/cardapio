'use client';

import useDialog from "@/app/hooks/useDialog";
import { Button } from "@/app/ui/Button";
import Dialog from "@/app/ui/Dialog";
import CategoryForm from "../CategoryForm";
import { createMenuCategoryAction } from "../CategoryForm/actions";

export default function CategoryFormDialog({ children }: { children: React.ReactNode }){
    const dialog = useDialog();

    return (
        <>
            <Button 
                icon="add" 
                onClick={ dialog.open } 
                size="sm"
                variant="text"
            >
                Adicionar
            </Button>

            <Dialog controller={ dialog } title="Adicionar Categoria">
                <CategoryForm action={ createMenuCategoryAction }>
                    { children }
                </CategoryForm>
            </Dialog>
        </>
    );
}
