import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Ruler, Phone, Mail, MessageSquare, Calendar } from 'lucide-react'
import { Product } from '../data/products'
import { toast } from 'sonner@2.0.3'

interface QuoteFormProps {
  product: Product
  onClose: () => void
}

export function QuoteForm({ product, onClose }: QuoteFormProps) {
  const [formData, setFormData] = useState({
    projectType: '',
    area: '',
    preferredDate: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    additionalNotes: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast.success('¡Solicitud de cotización enviada!', {
        description: 'Nos pondremos en contacto con usted en las próximas 24 horas.',
        duration: 5000,
      })
      
      onClose()
    } catch (error) {
      toast.error('Error al enviar la solicitud', {
        description: 'Por favor intente nuevamente o contáctenos directamente.',
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const estimatedCost = formData.area 
    ? Math.round(parseFloat(formData.area) * product.price)
    : 0

  return (
    <div className="p-6 space-y-6">
      {/* Product Summary */}
      <div className="border-b pb-4">
        <h3 className="text-xl font-semibold">{product.name}</h3>
        <p className="text-muted-foreground">{product.type} • ${product.price} por m²</p>
        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
          <Ruler className="h-4 w-4" />
          <span>{product.finish}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project Details */}
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <Ruler className="h-4 w-4" />
            Detalles del Proyecto
          </h4>
          
          <div className="space-y-2">
            <Label htmlFor="projectType">Tipo de Proyecto</Label>
            <Select value={formData.projectType} onValueChange={(value) => handleInputChange('projectType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione tipo de proyecto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kitchen">Cocina</SelectItem>
                <SelectItem value="bathroom">Baño</SelectItem>
                <SelectItem value="flooring">Pisos</SelectItem>
                <SelectItem value="countertop">Encimera</SelectItem>
                <SelectItem value="wall">Revestimiento de Muro</SelectItem>
                <SelectItem value="facade">Fachada</SelectItem>
                <SelectItem value="other">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="area">Área Aproximada (m²)</Label>
              <Input
                id="area"
                type="number"
                step="0.1"
                min="0"
                value={formData.area}
                onChange={(e) => handleInputChange('area', e.target.value)}
                placeholder="Ej: 15.5"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preferredDate" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Fecha Preferida Instalación
              </Label>
              <Input
                id="preferredDate"
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={formData.preferredDate}
                onChange={(e) => handleInputChange('preferredDate', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Información de Contacto
          </h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nombre</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Apellido</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Correo Electrónico
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Teléfono
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+52 555 123 4567"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="address">Dirección</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Calle y número"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Ciudad</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Notas Adicionales (Opcional)
          </h4>
          <div className="space-y-2">
            <Label htmlFor="additionalNotes">¿Algo más que debamos saber?</Label>
            <Textarea
              id="additionalNotes"
              value={formData.additionalNotes}
              onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
              placeholder="Ej: Necesito medición a domicilio, colores específicos, plazos especiales..."
              className="min-h-[80px]"
            />
          </div>
        </div>

        {/* Price Estimate */}
        {estimatedCost > 0 && (
          <div className="border-t pt-4 space-y-2">
            <h4 className="font-medium">Estimación de Precio</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>${product.price}/m² × {formData.area} m²</span>
                <span>${estimatedCost}</span>
              </div>
              <div className="flex justify-between font-medium text-base border-t pt-2">
                <span>Estimado Total</span>
                <span className="text-primary">${estimatedCost}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              *Precio estimado. El precio final incluirá instalación, corte y otros servicios según su proyecto.
            </p>
          </div>
        )}

        {/* Submit Buttons */}
        <div className="flex gap-3 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose} 
            className="flex-1"
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Solicitar Cotización'}
          </Button>
        </div>
      </form>
    </div>
  )
}
