import React from 'react';
import styles from './Button.module.css';
import Image from 'next/image';
import openPanelIcon from '@/public/icons/right_panel_open.svg';
import closePanelIcon from '@/public/icons/right_panel_close.svg';
import editIcon from '@/public/icons/edit.svg';
import deleteIcon from '@/public/icons/delete.svg';
import closeIcon from '@/public/icons/close.svg';
import syncIcon from '@/public/icons/sync.svg';
import leftArrowIcon from '@/public/icons/keyboard_arrow_left.svg';
import rightArrowIcon from '@/public/icons/keyboard_arrow_right.svg';
import filterIcon from '@/public/icons/filter_list.svg';
import openIcon from '@/public/icons/open_in_new.svg';
import saveIcon from '@/public/icons/save.svg';
import addIcon from '@/public/icons/add.svg';
import tvIcon from '@/public/icons/tv.svg';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: React.ReactNode;
    fillWidth?: true;
    icon?: 'add' | 'close' | 'closePanel' | 'delete' | 'edit' | 'filter' | 'leftArrow' | 'open' | 'openPanel' | 'rightArrow' | 'save' | 'sync' | 'tv';
    iconPosition?: 'left' | 'right';
    size?: 'sm' | 'md';
    variant?: 'primary' | 'secondary' | 'text';
};

function buttonClassName({
    fillWidth,
    icon,
    iconPosition,
    size,
    variant,
}: Omit<ButtonProps, 'children'>): string {
    return [
        styles.button,
        styles[`size-${size}`],
        styles[`variant-${variant}`],
        fillWidth ? styles.fillWidth : '',
        icon ? styles.icon : '',
        iconPosition === 'right' ? styles.positionRight : '',
    ].filter(Boolean).join(' ');
}

function buttonIcon({ icon }: { icon: ButtonProps['icon'] }) {
    switch(icon) {
        case 'add':
            return addIcon;
        case 'close':
            return closeIcon;
        case 'closePanel':
            return closePanelIcon;
        case 'delete':
            return deleteIcon;
        case 'edit':
            return editIcon;
        case 'openPanel':
            return openPanelIcon;
        case 'save':
            return saveIcon;
        case 'sync':
            return syncIcon;
        case 'leftArrow':
            return leftArrowIcon;
        case 'rightArrow':
            return rightArrowIcon;
        case 'filter':
            return filterIcon;
        case 'open':
            return openIcon;
        case 'tv':
            return tvIcon;
        default:
            return null;
    }
}

export function Button({ 
    children, 
    fillWidth,
    icon,
    iconPosition = 'left',
    size = 'md',
    variant = 'primary',
    ...rest  
}: ButtonProps) {
    const className = buttonClassName({ fillWidth, icon, iconPosition, size, variant });

    return(
        <button className={className} {...rest}>
            {iconPosition === 'right' ? (
                <>
                    {children}
                    {icon && <Image src={buttonIcon({ icon })} alt={icon} width={24} height={24} />}
                </>
            ) : (
                <>
                    {icon && <Image src={buttonIcon({ icon })} alt={icon} width={24} height={24} />}
                    {children}
                </>
            )}
        </button>
   
    );
}
