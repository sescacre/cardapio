'use client';

import useDialog from "@/app/hooks/useDialog";
import { Button } from "@/app/ui/Button";
import Dialog from "@/app/ui/Dialog";
import ItemForm from "../ItemForm";
import { updateMenuItemAction } from "../ItemForm/actions";

export default function ItemEditFormDialog({ children }: { children: React.ReactNode }){
    const dialog = useDialog();

    return (
        <>
            <Button
                icon="edit"
                onClick={ dialog.open }
                size="sm"
                title="Editar item"
                variant="text"
            >
                Editar
            </Button>
            <Dialog controller={ dialog } title="Editar Item">
                <ItemForm action={ updateMenuItemAction }>
                    { children }
                </ItemForm>
            </Dialog>
        </>
    );
}
