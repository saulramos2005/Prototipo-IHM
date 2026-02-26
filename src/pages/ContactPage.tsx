import { ContactSection } from "../components/ContactSection";
import { MapPin } from "lucide-react";
import { contactInfo } from "../data/constants";

export function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">
            Contáctenos
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Estamos aquí para ayudarle con su proyecto. Solicite una cotización gratuita
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold mb-4">Nuestra Ubicación</h2>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <MapPin className="h-5 w-5" />
              <p>
                {contactInfo.address.street}, {contactInfo.address.district},{" "}
                {contactInfo.address.cityState}
              </p>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapPin className="h-12 w-12 mx-auto mb-2" />
              <p>Mapa interactivo</p>
              <p className="text-sm">Integración con Google Maps disponible</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">Preguntas Frecuentes</h2>
            <p className="text-muted-foreground">
              Encuentre respuestas a las preguntas más comunes
            </p>
          </div>

          <div className="space-y-6">
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">
                ¿Ofrecen medición a domicilio?
              </h3>
              <p className="text-muted-foreground">
                Sí, ofrecemos servicio de medición profesional completamente gratuito. 
                Nuestro equipo visitará su ubicación para tomar medidas exactas y asesorarle 
                sobre las mejores opciones para su proyecto.
              </p>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">
                ¿Cuánto tiempo toma completar un proyecto?
              </h3>
              <p className="text-muted-foreground">
                El tiempo varía según el tamaño y complejidad del proyecto. Típicamente, 
                desde la medición hasta la instalación final, un proyecto estándar toma 
                entre 2-4 semanas. Ofrecemos servicio express para proyectos urgentes.
              </p>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">
                ¿Qué garantía ofrecen?
              </h3>
              <p className="text-muted-foreground">
                Ofrecemos garantía de por vida en todos nuestros materiales y una garantía 
                de 5 años en la mano de obra. Estamos comprometidos con la calidad y 
                durabilidad de cada instalación.
              </p>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">
                ¿Realizan instalaciones comerciales?
              </h3>
              <p className="text-muted-foreground">
                Sí, atendemos tanto proyectos residenciales como comerciales de cualquier 
                escala. Contamos con experiencia en hoteles, restaurantes, oficinas y 
                proyectos de construcción de gran envergadura.
              </p>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">
                ¿Cómo solicito una cotización?
              </h3>
              <p className="text-muted-foreground">
                Puede solicitar una cotización gratuita a través de nuestro formulario en línea, 
                por teléfono o visitando nuestro showroom. Responderemos en menos de 24 horas 
                con un presupuesto detallado para su proyecto.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
