import { WHATSAPP_LEAD_MESSAGE } from "./whatsapp";

export type PackId = "riviera" | "signature" | "imperial";
export type VehicleId = "range" | "classeg" | "cabriolet" | "sport";

export type Pack = {
  id: PackId;
  name: string;
  shortName: string;
  price: number;
  depositRate: number;
  caution: number;
  capacity: string;
  description: string;
  includes: string[];
  options: string[];
  image: string;
  gallery: string[];
  featured?: boolean;
  badge?: string;
  ctaMessage: string;
};

export type Vehicle = {
  id: VehicleId;
  name: string;
  category: string;
  price: string;
  caution: string;
  image: string;
  specs: string[];
  ctaMessage: string;
};

export const packs: Pack[] = [
  {
    id: "riviera",
    name: "Pack Riviera",
    shortName: "Riviera",
    price: 6000,
    depositRate: 0.25,
    caution: 2000,
    capacity: "Jusqu’à 4 personnes",
    description: "Villa ou appartement haut standing. SUV premium. Accès privé.",
    includes: ["SUV luxe", "Logement haut standing", "Beach club"],
    options: ["Transfert aéroport", "Chef à domicile", "Photographe privé", "Décoration EVJF", "Extension de séjour"],
    image: "/images/cannes/cannes-03.jpg",
    gallery: ["/images/cannes/cannes-03.jpg", "/images/vehicles/vehicle-01.jpg", "/images/cannes/cannes-04.jpg"],
    ctaMessage:
      "Bonjour, je souhaite vérifier la disponibilité du Pack Riviera. Merci de m’envoyer le catalogue PDF."
  },
  {
    id: "signature",
    name: "Pack Signature",
    shortName: "Signature",
    price: 18000,
    depositRate: 0.25,
    caution: 6000,
    capacity: "Jusqu’à 6 personnes",
    description: "Adresse privée. SUV luxe. Activité signature. Service continu.",
    includes: ["SUV luxe", "Villa privée", "Yacht ou beach club"],
    options: ["Transfert aéroport", "Chef à domicile", "Photographe privé", "Décoration EVJF", "Extension de séjour"],
    image: "/images/cannes/cannes-05.jpg",
    gallery: ["/images/cannes/cannes-05.jpg", "/images/vehicles/vehicle-02.jpeg", "/images/cannes/cannes-01.jpg"],
    featured: true,
    badge: "LE PLUS DEMANDÉ",
    ctaMessage:
      "Bonjour, je souhaite vérifier la disponibilité du Pack Signature. Merci de m’envoyer le catalogue PDF."
  },
  {
    id: "imperial",
    name: "Pack Imperial",
    shortName: "Imperial",
    price: 30000,
    depositRate: 0.25,
    caution: 10000,
    capacity: "Jusqu’à 10 personnes",
    description: "Villa iconique. Véhicule prestige. Expérience privée.",
    includes: ["Véhicule prestige", "Villa iconique", "Yacht privé"],
    options: ["Transfert aéroport", "Chef à domicile", "Photographe privé", "Décoration EVJF", "Extension de séjour"],
    image: "/images/cannes/cannes-01.jpg",
    gallery: ["/images/cannes/cannes-01.jpg", "/images/vehicles/vehicle-04.jpeg", "/images/cannes/cannes-02.jpg"],
    ctaMessage:
      "Bonjour, je souhaite vérifier la disponibilité du Pack Imperial. Merci de m’envoyer le catalogue PDF."
  }
];

export const premiumVehicles: Vehicle[] = [
  {
    id: "range",
    name: "Range Rover Sport",
    category: "SUV luxe",
    price: "Sur demande",
    caution: "Empreinte bancaire",
    image: "/images/vehicles/vehicle-04.jpeg",
    specs: ["Livraison aéroport", "Kilométrage encadré", "Assurance premium"],
    ctaMessage:
      "Bonjour, je souhaite louer un SUV luxe. Pouvez-vous m’envoyer les disponibilités et conditions ?"
  },
  {
    id: "classeg",
    name: "Mercedes Classe G",
    category: "SUV prestige",
    price: "Sur demande",
    caution: "Selon modèle",
    image: "/images/vehicles/vehicle-02.jpeg",
    specs: ["Conciergerie 7j/7", "Dépôt sécurisé", "Remise discrète"],
    ctaMessage:
      "Bonjour, je souhaite louer une Mercedes Classe G. Pouvez-vous m’envoyer les disponibilités ?"
  },
  {
    id: "cabriolet",
    name: "Cabriolet Riviera",
    category: "Décapotable",
    price: "Sur demande",
    caution: "Selon modèle",
    image: "/images/vehicles/vehicle-03.jpeg",
    specs: ["Côte d’Azur", "Réservation rapide", "Contrat digital"],
    ctaMessage:
      "Bonjour, je souhaite louer un cabriolet premium. Pouvez-vous m’envoyer les disponibilités ?"
  },
  {
    id: "sport",
    name: "Sport Collection",
    category: "Performance",
    price: "Sur demande",
    caution: "Validation préalable",
    image: "/images/vehicles/vehicle-01.jpg",
    specs: ["Sélection limitée", "Profil validé", "Livraison privée"],
    ctaMessage:
      "Bonjour, je souhaite louer un véhicule sport premium. Pouvez-vous m’envoyer les disponibilités ?"
  }
];

export const vehicleGallery = [
  {
    src: "/images/vehicles/vehicle-01.jpg",
    alt: "Véhicule premium CTD"
  },
  {
    src: "/images/vehicles/vehicle-02.jpeg",
    alt: "SUV luxe CTD"
  },
  {
    src: "/images/vehicles/vehicle-03.jpeg",
    alt: "Véhicule sportif CTD"
  },
  {
    src: "/images/vehicles/vehicle-detail-01.jpg",
    alt: "Intérieur véhicule premium CTD"
  },
  {
    src: "/images/vehicles/vehicle-05.jpeg",
    alt: "Berline premium CTD"
  }
];

export function formatEuro(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(value);
}

export function getPack(packId: string | null | undefined) {
  return packs.find((pack) => pack.id === packId) ?? packs[1];
}

export const trustItems = [
  "SAS CTD",
  "Stripe / Revolut Business",
  "Partenaires véhicules",
  "Partenaires immobiliers"
];

export const clientJourney = [
  "Choix",
  "Disponibilité WhatsApp",
  "Catalogue PDF",
  "Validation",
  "Documents",
  "Acompte",
  "Confirmation"
];

export { WHATSAPP_LEAD_MESSAGE };
