import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { contactInfo } from '../data/constants'

export function ContactSection() {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Contáctenos</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ¿Tiene preguntas o está listo para comenzar su proyecto? Póngase en contacto 
            con nosotros y estaremos encantados de asesorarle.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Información de Contacto</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="text-primary mt-1">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Teléfono</h4>
                  <p className="text-muted-foreground">{contactInfo.phone}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="text-primary mt-1">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Correo Electrónico</h4>
                  <p className="text-muted-foreground">{contactInfo.email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="text-primary mt-1">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Dirección</h4>
                  <p className="text-muted-foreground">
                    {contactInfo.address.street}<br />
                    {contactInfo.address.district}<br />
                    {contactInfo.address.cityState}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="text-primary mt-1">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Horario de Atención</h4>
                  <p className="text-muted-foreground">{contactInfo.hours}</p>
                </div>
              </div>
            </div>

            {/* Visit Info */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Visítenos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Showroom:</span>
                    <span className="text-muted-foreground">{contactInfo.visitHours}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Cotizaciones:</span>
                    <span className="text-muted-foreground">{contactInfo.quoteTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Envíenos un Mensaje</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input placeholder="Nombre" />
                    <Input placeholder="Apellido" />
                  </div>
                  <Input type="email" placeholder="Correo Electrónico" />
                  <Input placeholder="Teléfono" />
                  <Input placeholder="Asunto" />
                  <Textarea 
                    placeholder="Su mensaje..."
                    className="min-h-[120px]"
                  />
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Enviar Mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}