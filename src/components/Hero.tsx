import { Button } from "./ui/button";
import { Link } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1761472651560-f5ae4f4fda1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtYXJibGUlMjBidWlsZGluZ3xlbnwxfHx8fDE3Njk5MDk5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Marmolería Elite - Trabajos en Mármol y Granito"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-semibold mb-6">
          New Top C.A.
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
          Transforme sus espacios con la elegancia atemporal del
          mármol y granito. Calidad superior, diseños exclusivos
          y acabados impecables para su hogar o negocio.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contacto">
            <Button
              size="lg"
              className="px-8 py-3"
            >
              Solicitar Atención
            </Button>
          </Link>
          <Link to="/catalogo">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-primary px-8 py-3"
            >
              Ver Catálogo
              <ArrowRight size={20}/>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}