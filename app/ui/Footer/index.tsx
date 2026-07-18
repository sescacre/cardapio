import Inline from '../Flexbox/Inline';
import Text from '../Text';
import styles from './Footer.module.css';

export default function Footer(){
    return (
        <footer className={ styles.footer }>
            <Inline
                className={ styles.content }
                fillWidth
                justify='center'
            >
                <Inline>
                    <Text as="p">Cardápio Digital &copy; 2026</Text>
                    <Text as="p">&bull;</Text>
                    <Text as="p">Sesc</Text>
                    <Text as="p">&bull;</Text>
                    <Text as="p">Departamento Regional do Acre</Text>
                </Inline>
                {/* <p>Cardápio Digital &copy; 2026 &bull; Sesc &bull; Departamento Regional do Acre</p> */}
            </Inline>
        </footer>
    );
}