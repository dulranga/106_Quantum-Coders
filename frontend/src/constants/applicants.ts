import anura from "@/assets/anura.jpg";
import ranil from "@/assets/ranil.jpg";
import sajith from "@/assets/sajith.png";
import namal from "@/assets/namal.jpg";

export const APPLICANTS = [
  {
    id: "anura",
    name: "Anura Kumara Dissanayake",
    src: anura.src,
  },
  {
    id: "ranil",
    name: "Ranil Wickremesinghe",
    src: ranil.src,
  },
  {
    id: "sajith",
    name: "Sajith Premadasa",
    src: sajith.src,
  },
  {
    id: "namal",
    name: "Namal Rajapaksa",
    src: namal.src,
  },
] as const;

export const findApplicant = (id: string) =>
  APPLICANTS.find((a) => a.id === id);
