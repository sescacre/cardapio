import { applyMask, type MaskType } from "@/app/lib/mask";

export default function useMask(
  mask?: MaskType,
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (mask) {
      event.target.value = applyMask(mask, event.target.value);
    }
    onChange?.(event);
  }

  return { handleChange: mask ? handleChange : onChange };
}
