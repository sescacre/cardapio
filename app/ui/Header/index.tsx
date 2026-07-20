import Link from 'next/link';
import Inline from '../Flexbox/Inline';
import Stack from '../Flexbox/Stack';
import styles from './Header.module.css';
import Image from 'next/image';
import sescLogo from '@/public/sesc_logo_80_branco.png';
import Text from '../Text';

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
                    <Link href="https://www.sescacre.com.br" target='_blank' title='Ir para o site do Sesc Acre'>
                        <Image 
                            alt="Logo Sesc 80 Anos" 
                            className={ styles.SescLogo }
                            src={ sescLogo } 
                            width={ 100 } 
                            height={ 100 } 
                        />
                    </Link>
                </Inline>
                
                <nav className={ styles.navigation }>
                    <Text as='h1' className={ styles.title } size='lg' weight='md'>Cardápio Digital</Text>
                    
                    <Inline className={ styles.navigationLinks }>
                        <Link href="/">Painel de Controle</Link>
                    </Inline>

                    <Link className={ styles.logout } href="#">Sair</Link>
                </nav>
            </Stack>
        </header>
    );
}