import NextForm from 'next/form';
import { FormHTMLAttributes } from 'react';

type FormProps = FormHTMLAttributes<HTMLFormElement> & {
    action: NonNullable<string | ((formData: FormData) => void | Promise<void>) | undefined>;
    children: React.ReactNode;
}

export default function Form({
    action,
    className = '',
    children,
    ...rest
}: FormProps) {
    
    return (
        <NextForm 
            action={ action }
            className={ className }
            {...rest}
        >
            { children }
        </NextForm>
    );

}
