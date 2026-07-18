'use client';

import Form from "next/form";
import { useActionState } from "react";
import Stack from "@/app/ui/Flexbox/Stack";

type ItemFormAction = (
    previousState: { success: boolean; message: string } | null,
    formData: FormData
) => Promise<{ success: boolean; message: string }>;

export default function ItemForm({
    action: formAction,
    children,
}: {
    action: ItemFormAction;
    children: React.ReactNode;
}){
    const [state, action, isPending] = useActionState(formAction, null);
   
    return (
        <Form action={ action }>
            <Stack>
                { children }

                {isPending && <p>Salvando item...</p>}
                {state?.success && <p>{state.message}</p>}
            </Stack>
        </Form>
    );
}
