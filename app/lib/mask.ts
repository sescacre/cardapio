export type MaskType = "cpf" | "cnpj" | "currency" | "phone";

export function maskCpf(value: string): string {
  return value
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function maskCnpj(value: string): string {
  return value
    .replace(/\D/g, "")
    .slice(0, 14)
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
}

export function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 10) {
    return digits
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }

  return digits
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

export function maskCurrency(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";

  const padded = digits.replace(/^0+(?=\d)/, "").padStart(3, "0");
  const cents = padded.slice(-2);
  const ints = padded.slice(0, -2);
  const withDots = ints.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `R$ ${withDots},${cents}`;
}

export function parseCurrency(value: string): number {
  const digits = value.replace(/\D/g, "");
  if (!digits) return 0;
  return Number(digits) / 100;
}

export function applyMask(type: MaskType, value: string): string {
  switch (type) {
    case "cpf":
      return maskCpf(value);
    case "cnpj":
      return maskCnpj(value);
    case "phone":
      return maskPhone(value);
    case "currency":
      return maskCurrency(value);
  }
}
