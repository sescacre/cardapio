'use client';

import styles from "./Dialog.module.css";
import Inline from "../Flexbox/Inline";
import Divider from "../Divider";
import { Button } from "../Button";

type DialogController = {
    close: () => void;
    open: () => void;
    dialogRef: React.RefObject<HTMLDialogElement | null>;
}

type DialogProps = {
    children: React.ReactNode;
    controller: DialogController;
    title: string;
}

export default function Dialog({ children, controller, title }: DialogProps){
    return (
        <>
            <dialog 
                className={ styles.dialog }
                id="modal" 
                ref={ controller.dialogRef }
            >
                <Inline justify="between">
                    <h2>{ title }</h2>

                    <Button
                        icon="close"
                        onClick={ controller.close }
                        size="sm"
                        type="button"
                        variant="text"
                    />
                </Inline>

                <Divider />

                { children }
            </dialog>
        </>
    );
}
