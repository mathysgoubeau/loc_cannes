const DEFAULT_WHATSAPP_NUMBER = "33672208288";

export const WHATSAPP_LEAD_MESSAGE =
  "Bonjour, je souhaite vérifier une disponibilité premium. Merci de m’envoyer le catalogue PDF.";

export function whatsappUrl(message = WHATSAPP_LEAD_MESSAGE) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? DEFAULT_WHATSAPP_NUMBER;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
