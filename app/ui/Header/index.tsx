import Link from 'next/link';
import Inline from '../Flexbox/Inline';
import Stack from '../Flexbox/Stack';
import styles from './Header.module.css';
import Image from 'next/image';
import sescLogo from '@/public/sesc_logo_80.png';
import OpenTvLink from './OpenTvLink';

export default function Header(){
    return (
        <header className={ styles.header }>
            <Stack
                align='center'
                className={ styles.content } 
                fillWidth
            >
                <Inline
                    className={ styles.SescContent } 
                    fillWidth
                    justify='center'
                >
                    <Image 
                        alt="Logo Sesc 80 Anos" 
                        className={ styles.SescLogo }
                        src={ sescLogo } 
                        width={ 100 } 
                        height={ 100 } 
                    />
                </Inline>
                
                <Inline
                    className={ styles.navigation }
                    fillWidth
                    justify='between'
                >
                    <h1>Cardápio Digital</h1>
                    
                    <nav>
                        <Inline className={ styles.navigationLinks }>
                            <Link href="/">Painel de Controle</Link>
                            <OpenTvLink />
                        </Inline>
                    </nav>

                    <Link href="#">Sair</Link>
                </Inline>
            </Stack>
        </header>
    );
}