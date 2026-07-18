import Image from 'next/image';
import styles from './ToogleInput.module.css';
import visibilityIcon from '@/public/icons/visibility.svg';
import visibilityOffIcon from '@/public/icons/visibility_off.svg';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: 'visibility';
  labelText: string;
  type?: 'radio' | 'checkbox';
};

export default function ToogleInput({
  id,
  icon,
  labelText,
  name,
  type = 'radio',
  ...rest
}: InputProps) {
  return (
    <label className={ styles.toogleInputLabel } htmlFor={ id }>
      { icon === 'visibility' ? (
        <>
          <Image
            alt=""
            aria-hidden
            className={ styles.iconVisible }
            height={ 16 }
            src={ visibilityIcon }
            width={ 16 }
          />
          <Image
            alt=""
            aria-hidden
            className={ styles.iconHidden }
            height={ 16 }
            src={ visibilityOffIcon }
            width={ 16 }
          />
        </>
      ) : null }

      { labelText }

      <input
        className={ styles.toogleInput }
        id={ id }
        name={ name }
        { ...rest }
        type={ type }
      />
    </label>
  );
}
