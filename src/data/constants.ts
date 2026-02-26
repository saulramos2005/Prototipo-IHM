import { Star, Award, Users, Wrench } from "lucide-react";
import {Home, Image, Package, FileText, WandSparkles, Sparkles, Info, Phone, Boxes, PackageOpen, Menu, X, UserCircle} from 'lucide-react'

export interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
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

export const navigation = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/catalogo", label: "Catálogo", icon: Image },
  { href: "/inventario", label: "Inventario", icon: PackageOpen },
  { href: "/clientes", label: "Clientes", icon: UserCircle },
  { href: "/asistente", label: "Asistente IA", icon: WandSparkles},
  { href: "/contacto", label: "Contacto", icon: Phone },
  { href: "/nosotros", label: "Nosotros", icon: Info },
];

export const additionalServices = [
  "Reparación de Mármol",
  "Restauración de Piedra",
  "Mantenimiento Preventivo",
  "Diseño 3D Personalizado",
  "Acabados Especiales",
];