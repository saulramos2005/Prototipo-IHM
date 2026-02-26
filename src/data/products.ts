export interface Product {
  id: number
  name: string
  type: string
  price: number
  image: string
  description: string
  application: string
  features: string[]
  dimensions: string
  finish: string
}

export const products: Product[] = [
  {
    id: 1,
    name: "Mármol Carrara Blanco",
    type: "Mármol Premium",
    price: 120,
    image: "https://images.unsplash.com/photo-1587749158407-58ef2b89ccf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMG1hcmJsZSUyMHNsYWIlMjB0ZXh0dXJlfGVufDF8fHx8MTc2OTkwOTkyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Elegante mármol blanco de Carrara con vetas grises suaves. Ideal para espacios de lujo y diseños clásicos.",
    application: "Encimeras, Baños, Pisos",
    features: ["Resistente al agua", "Pulido de alta calidad", "Vetas naturales", "Elegancia atemporal", "Fácil mantenimiento"],
    dimensions: "3m x 1.5m",
    finish: "Pulido Brillante"
  },
  {
    id: 2,
    name: "Granito Negro Absoluto",
    type: "Granito Premium",
    price: 150,
    image: "https://images.unsplash.com/photo-1699982758974-0703b87f052d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGdyYW5pdGUlMjBzdG9uZXxlbnwxfHx8fDE3Njk5MDk5MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Granito negro intenso y uniforme, perfecto para diseños modernos y contemporáneos.",
    application: "Cocinas, Baños, Fachadas",
    features: ["Resistente al agua", "Pulido de alta calidad", "Anti-manchas", "Durabilidad extrema", "Bajo mantenimiento"],
    dimensions: "3m x 1.5m",
    finish: "Pulido Espejo"
  },
  {
    id: 3,
    name: "Cuarzo Calacatta",
    type: "Cuarzo Engineered",
    price: 95,
    image: "https://images.unsplash.com/photo-1749704647283-3ad79f4acc6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWFydHolMjBjb3VudGVydG9wJTIwbW9kZXJufGVufDF8fHx8MTc2OTkwOTkyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Cuarzo engineered con apariencia de mármol Calacatta. Resistente y de bajo mantenimiento.",
    application: "Encimeras, Islas de Cocina",
    features: ["Resistente al agua", "Anti-manchas", "No requiere sellado", "Higiénico", "Garantía extendida"],
    dimensions: "3m x 1.4m",
    finish: "Pulido"
  },
  {
    id: 4,
    name: "Mármol Travertino",
    type: "Mármol Natural",
    price: 85,
    image: "https://images.unsplash.com/photo-1693773511442-8f2787a2c89e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJibGUlMjB0aWxlJTIwZmxvb3Jpbmd8ZW58MXx8fHwxNzY5OTA5OTI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Travertino con textura natural y tonos cálidos. Perfecto para pisos y revestimientos.",
    application: "Pisos, Muros, Terrazas",
    features: ["Textura natural", "Tonos cálidos", "Antideslizante", "Resistente al clima", "Estilo rústico"],
    dimensions: "60cm x 60cm",
    finish: "Apomazado"
  },
  {
    id: 5,
    name: "Granito Blanco Dallas",
    type: "Granito Natural",
    price: 110,
    image: "https://images.unsplash.com/photo-1709751745503-bdef18219afc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJibGUlMjBjb3VudGVydG9wJTIwa2l0Y2hlbnxlbnwxfHx8fDE3Njk5MDk5MjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Granito blanco con vetas grises y negras. Ideal para cocinas y espacios luminosos.",
    application: "Encimeras, Islas, Barras",
    features: ["Resistente al agua", "Pulido de alta calidad", "Vetas únicas", "Durabilidad", "Fácil limpieza"],
    dimensions: "3m x 1.5m",
    finish: "Pulido Brillante"
  },
  {
    id: 6,
    name: "Mármol Emperador",
    type: "Mármol Premium",
    price: 130,
    image: "https://images.unsplash.com/photo-1765766600805-e75c44124d2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJibGUlMjBiYXRocm9vbSUyMHZhbml0eXxlbnwxfHx8fDE3Njk5MDk5MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Mármol marrón oscuro con vetas blancas distintivas. Sofisticación y elegancia para baños de lujo.",
    application: "Baños, Encimeras, Muros",
    features: ["Resistente al agua", "Vetas blancas únicas", "Tono cálido", "Elegancia", "Alta calidad"],
    dimensions: "2.5m x 1.5m",
    finish: "Pulido"
  }
]
