import type { ComponentProps } from 'react'
import Stack from '../Flexbox/Stack'
import styles from './Box.module.css'

type BoxProps = ComponentProps<typeof Stack> & {
    fillBackground?: true
    fitContent?: true
    padding?: "sm" | "lg"
}

export default function Box({
    fillBackground,
    fillWidth,
    fitContent,
    padding,
    className,
    ...props
}: BoxProps) {
    return (
        <Stack
            gap="md"
            className={[
                styles.box,
                padding ? styles[`padding-${padding}`] : '',
                fillBackground ? styles.fillBackground : '',
                fitContent ? styles.fitContent : '',
                fillWidth ? styles.fillWidth : '',
                className ?? '',
            ].filter(Boolean).join(' ')}
            {...props}
        />
    )
}
