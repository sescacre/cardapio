import { useRef } from "react";

export default function useDialog(){
    const dialogRef = useRef<HTMLDialogElement>(null);

    function open(){
        dialogRef.current?.showModal();
    }

    function close(){
        dialogRef.current?.close();
    }

    return { dialogRef, open, close };
}