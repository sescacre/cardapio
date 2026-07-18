import styles from './Text.module.css'

export type TextProps = {
    as?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "label" | "strong" | "em"
    children: React.ReactNode
    className?: string
    size?: "sm" | "df" | "md" | "lg"
    weight?: "rg" | "md" | "bd"
}

export function textClassName({
    className,
    size = 'df',
    weight = 'rg',
}: Omit<TextProps, 'children' | 'as'>): string {
    return [
        styles.text,
        styles[`size-${size}`],
        styles[`weight-${weight}`],
        className ?? '',
    ].filter(Boolean).join(' ')
}

export default function Text({
    as: Component = 'p',
    children,
    className,
    size = 'df',
    weight = 'rg',
}: TextProps) {
    return (
        <Component className={textClassName({ className, size, weight })}>
            {children}
        </Component>
    )
}
