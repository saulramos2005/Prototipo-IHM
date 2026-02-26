import { Star, Award, Users, Wrench } from "lucide-react";
import {Home, Image, Package, FileText, WandSparkles, Sparkles, Info, Phone, Boxes, PackageOpen, Menu, X, UserCircle} from 'lucide-react'
import { Rol } from "../contexts/AuthContext";
export interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
}
export interface Navigation {
  href: string;
  label: string;
  icon: any;
  rol?: Rol[];
}

export const stats: Stat[] = [
  {
    icon: <Star className="h-6 w-6" />,
    value: "5.0",
    label: "Calificación Clientes",
  },
  {
    icon: <Award className="h-6 w-6" />,
    value: "15+",
    label: "Años de Experiencia",
  },
  {
    icon: <Users className="h-6 w-6" />,
    value: "2000+",
    label: "Proyectos Completados",
  },
  {
    icon: <Wrench className="h-6 w-6" />,
    value: "24/7",
    label: "Asesoría Disponible",
  },
];

export const contactInfo = {
  phone: "+58 412-3456789",
  email: "info@newtop.com",
  address: {
    street: "Av. Juan Pimpina",
    district: "Zona Centro",
    cityState: "Guatamare City, Nueva Esparta",
  },
  hours: "Lunes a Sábado: 9:00 AM - 7:00 PM",
  visitHours: "Showroom abierto con previa cita",
  quoteTime: "Cotizaciones en 24 horas",
};

export const navigation: Navigation[] = [
  { href: "/", label: "Inicio", icon: Home, rol: ["cliente"]},
  { href: "/catalogo", label: "Catálogo", icon: Image, rol: ["cliente"]},
  { href: "/inventario", label: "Inventario", icon: PackageOpen, rol: ["vendedor"]},
  { href: "/clientes", label: "Clientes", icon: UserCircle, rol: ["vendedor"]},
  { href: "/asistente", label: "Asistente IA", icon: WandSparkles, rol: ["vendedor", "cliente"]},
  { href: "/contacto", label: "Contacto", icon: Phone, rol: ["cliente"]},
  { href: "/nosotros", label: "Nosotros", icon: Info, rol: ["cliente"]},
];

export const additionalServices = [
  "Reparación de Mármol",
  "Restauración de Piedra",
  "Mantenimiento Preventivo",
  "Diseño 3D Personalizado",
  "Acabados Especiales",
];