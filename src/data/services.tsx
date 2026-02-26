import { Ruler, Scissors, Hammer, Palette, Shield, Truck, Clock, Sparkles } from 'lucide-react'

export interface Service {
  icon: React.ReactNode
  title: string
  description: string
}

export const services: Service[] = [
  {
    icon: <Ruler className="h-8 w-8" />,
    title: "Medición Profesional",
    description: "Servicio de medición gratuito a domicilio para garantizar precisión perfecta"
  },
  {
    icon: <Scissors className="h-8 w-8" />,
    title: "Corte CNC Personalizado",
    description: "Tecnología de corte CNC de última generación para formas y diseños personalizados"
  },
  {
    icon: <Palette className="h-8 w-8" />,
    title: "Asesoría de Diseño",
    description: "Consultoría gratuita con nuestros expertos en diseño de interiores"
  },
  {
    icon: <Hammer className="h-8 w-8" />,
    title: "Instalación Profesional",
    description: "Instalación certificada por nuestro equipo de expertos instaladores"
  },
  {
    icon: <Sparkles className="h-8 w-8" />,
    title: "Pulido y Sellado",
    description: "Acabados de alta calidad con pulido profesional y sellado protector"
  },
  {
    icon: <Truck className="h-8 w-8" />,
    title: "Entrega a Domicilio",
    description: "Transporte seguro y entrega en su ubicación con manejo especializado"
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Garantía Extendida",
    description: "Garantía de por vida en materiales y mano de obra certificada"
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: "Servicio Express",
    description: "Tiempos de entrega rápidos para proyectos urgentes sin comprometer calidad"
  }
]
