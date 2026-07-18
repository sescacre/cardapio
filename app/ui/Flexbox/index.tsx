import styles from './Flexbox.module.css'

export type FlexboxProps = {
    align?: "start" | "center" | "end" | "stretch"
    children: React.ReactNode
    className?: string
    direction?: "row" | "column"
    fillWidth?: true
    gap?: "sm" | "md" | "lg"
    justify?: "start" | "center" | "between" | "around"
    wrap?: true
}

export function flexboxClassName({
    align = 'center',
    className,
    direction = 'row',
    fillWidth,
    gap = 'sm',
    justify = 'start',
    wrap,
}: Omit<FlexboxProps, 'children'>): string {
    return [
        styles.flexbox,
        styles[direction],
        styles[`align-${align}`],
        styles[`gap-${gap}`],
        styles[`justify-${justify}`],
        wrap ? styles.wrap : '',
        fillWidth ? styles.fillWidth : '',
        className ?? '',
    ].filter(Boolean).join(' ')
}

export default function Flexbox({
    align = 'center',
    children,
    className,
    direction = 'row',
    fillWidth,
    gap = 'sm',
    justify = 'start',
    wrap,
}: FlexboxProps) {
    return (
        <div className={flexboxClassName({ align, className, direction, fillWidth, gap, justify, wrap })}>
            {children}
        </div>
    )
}
