export function hexToUrl(hex: string | null | undefined): string | null {
  const raw = hex?.trim();
  if (!raw) return null;
  if (raw.startsWith("data:")) return raw;
  if (!/^[0-9A-Fa-f]+$/.test(raw) || raw.length % 2 !== 0) return null;

  const bytes = new Uint8Array(raw.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(raw.slice(i * 2, i * 2 + 2), 16);
  }

  if (typeof Buffer !== "undefined") {
    return `data:image/jpeg;base64,${Buffer.from(bytes).toString("base64")}`;
  }

  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]!);
  }
  return `data:image/jpeg;base64,${btoa(binary)}`;
}
