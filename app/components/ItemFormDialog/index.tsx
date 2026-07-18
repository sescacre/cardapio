'use client';

import useDialog from "@/app/hooks/useDialog";
import { Button } from "@/app/ui/Button";
import Dialog from "@/app/ui/Dialog";
import ItemForm from "../ItemForm";
import { createMenuItemAction } from "../ItemForm/actions";

export default function ItemFormDialog({ children }: { children: React.ReactNode }){
    const dialog = useDialog();

    return (
        <>
            <Button icon="add" onClick={ dialog.open }>Adicionar Item</Button>

            <Dialog controller={ dialog } title="Adicionar Item">
                <ItemForm action={ createMenuItemAction }>
                    { children }
                </ItemForm>
            </Dialog>
        </>
    );
}
