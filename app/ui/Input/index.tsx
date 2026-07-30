import { applyMask, maskCurrency, type MaskType } from "@/app/lib/mask";
import useMask from "./hooks/useMask";
import styles from './Input.module.css';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  fillWidth?: true
  mask?: MaskType
};

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  fillWidth?: true
};

function formatMaskedValue(
  mask: MaskType | undefined,
  value: string | number | readonly string[] | undefined,
) {
  if (!mask || value == null || value === "") return value;
  if (Array.isArray(value)) return value;

  if (mask === "currency") {
    const numeric = Number(value);
    if (!Number.isNaN(numeric)) {
      return maskCurrency(String(Math.round(numeric * 100)));
    }
  }

  return applyMask(mask, String(value));
}

export function Input({ fillWidth, mask, onChange, defaultValue, value, type, inputMode, ...rest }: InputProps){
  const { handleChange } = useMask(mask, onChange);
  const className = `
      ${styles.input}
      ${fillWidth ? styles.fillWidth : ''}
  `;

  const resolvedInputMode =
    inputMode ??
    (mask === "currency" ? "decimal" : mask ? "numeric" : undefined);

  return (
    <input 
        className={ className }
        defaultValue={value === undefined ? formatMaskedValue(mask, defaultValue) : undefined}
        inputMode={resolvedInputMode}
        onChange={handleChange}
        type={mask ? "text" : type}
        value={value !== undefined ? formatMaskedValue(mask, value) : undefined}
        { ...rest }
    />
  );
}

export function Select({ fillWidth, children, ...rest }: SelectProps){
  const className = `
      ${styles.input}
      ${fillWidth ? styles.fillWidth : ''}
  `;
  
  return (
    <select
      className={ className }
      { ...rest }
    >
      { children }
    </select>
  );
}
