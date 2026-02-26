import { AboutSection } from "../components/AboutSection";
import { ServicesSection } from "../components/ServicesSection";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { CheckCircle } from "lucide-react";

export function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">
            Sobre Nosotros
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Más de 15 años transformando espacios con la belleza del mármol y granito
          </p>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-semibold mb-4">Nuestra Misión</h2>
              <p className="text-muted-foreground mb-6">
                Proporcionar productos y servicios de mármol y granito de la más alta calidad, 
                superando las expectativas de nuestros clientes a través de la innovación, 
                la artesanía excepcional y un servicio personalizado.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">Compromiso con la excelencia en cada proyecto</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">Materiales de origen certificado y calidad garantizada</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">Equipo de profesionales altamente capacitados</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-semibold mb-4">Nuestra Visión</h2>
              <p className="text-muted-foreground mb-6">
                Ser la empresa líder en la industria del mármol y granito, reconocida por 
                nuestra innovación, sostenibilidad y compromiso inquebrantable con la 
                satisfacción del cliente.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">Expansión sostenible y responsable</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">Innovación constante en tecnología y procesos</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">Referencias en diseño y funcionalidad</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              ¿Por Qué Elegirnos?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nos distinguimos por nuestro compromiso con la calidad y la satisfacción del cliente
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1587749158407-58ef2b89ccf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMG1hcmJsZSUyMHNsYWIlMjB0ZXh0dXJlfGVufDF8fHx8MTc2OTkwOTkyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Calidad Superior"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Calidad Superior</h3>
              <p className="text-muted-foreground">
                Solo trabajamos con los mejores materiales del mercado nacional e internacional
              </p>
            </div>

            <div className="text-center">
              <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1696952384873-f3cfff78beef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJibGUlMjB3b3Jrc2hvcCUyMGZhYnJpY2F0aW9ufGVufDF8fHx8MTc2OTkwOTkyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Tecnología Avanzada"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tecnología Avanzada</h3>
              <p className="text-muted-foreground">
                Equipos de corte CNC y herramientas especializadas para precisión perfecta
              </p>
            </div>

            <div className="text-center">
              <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1709751745503-bdef18219afc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJibGUlMjBjb3VudGVydG9wJTIwa2l0Y2hlbnxlbnwxfHx8fDE3Njk5MDk5MjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Equipo Experto"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Equipo Experto</h3>
              <p className="text-muted-foreground">
                Profesionales certificados con años de experiencia en diseño e instalación
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
