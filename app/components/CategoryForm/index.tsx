'use client';

import Form from "next/form";
import { useActionState } from "react";
import Stack from "@/app/ui/Flexbox/Stack";

type CategoryFormAction = (
    previousState: { success: boolean; message: string } | null,
    formData: FormData
) => Promise<{ success: boolean; message: string }>;

export default function CategoryForm({
    action: formAction,
    children,
}: {
    action: CategoryFormAction;
    children: React.ReactNode;
}){
    const [state, action, isPending] = useActionState(formAction, null);
   
    return (
        <Form action={ action }>
            <Stack>
                { children }

                {isPending && <p>Salvando categoria...</p>}
                {state?.success && !isPending && <p>{state.message}</p>}
            </Stack>
        </Form>
    );
}
