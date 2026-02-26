import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
import { InventoryItem } from '../pages/InventarioPage';


interface Product {
  id: string | number | undefined;
  name: string;
  type: string;
  price: number;
  image: string;
  stock: number;
  reserved: number;
  location: string;
  description?: string;
  finishes?: string[];
}

interface ProductFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product;
  onSave: (product: Product) => void;
  mode: 'add' | 'edit';
}

export function ProductFormModal({ open, onOpenChange, product, onSave, mode }: ProductFormModalProps) {
  const [formData, setFormData] = useState<Product>(
    product || {
      id: undefined,
      name: '',
      type: 'Marmol',
      price: 0,
      image: '',
      stock: 0,
      reserved: 0,
      location: 'Almacén 1',
      description: '',
      finishes: []
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.type || formData.price <= 0) {
      toast.error('Error', {
        description: 'Por favor complete todos los campos requeridos',
      });
      return;
    }

    onSave(formData);
    toast.success(mode === 'add' ? 'Producto agregado' : 'Producto actualizado', {
      description: `${formData.name} ha sido ${mode === 'add' ? 'agregado' : 'actualizado'} exitosamente`,
    });
    onOpenChange(false);
  };

  const handleChange = (field: keyof Product, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'Agregar Nuevo Producto' : 'Editar Producto'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'add' 
              ? 'Complete la información del nuevo producto para agregarlo al inventario'
              : 'Modifique la información del producto'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nombre */}
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Producto *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Ej: Calacatta Gold"
                required
              />
            </div>

            {/* Tipo */}
            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Material *</Label>
              <Select value={formData.type} onValueChange={(value: string) => handleChange('type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Marmol">Marmol</SelectItem>
                  <SelectItem value="Granito">Granito</SelectItem>
                  <SelectItem value="Cuarzo">Cuarzo</SelectItem>
                  <SelectItem value="Travertino">Travertino</SelectItem>
                  <SelectItem value="Onix">Onix</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Precio */}
            <div className="space-y-2">
              <Label htmlFor="price">Precio por m² ($) *</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleChange('price', parseFloat(e.target.value))}
                placeholder="0.00"
                required
              />
            </div>

            {/* Stock */}
            <div className="space-y-2">
              <Label htmlFor="stock">Stock Total (m²) *</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => handleChange('stock', parseInt(e.target.value))}
                placeholder="0"
                required
              />
            </div>

            {/* Reservado */}
            <div className="space-y-2">
              <Label htmlFor="reserved">Stock Reservado (m²)</Label>
              <Input
                id="reserved"
                type="number"
                min="0"
                value={formData.reserved}
                onChange={(e) => handleChange('reserved', parseInt(e.target.value))}
                placeholder="0"
              />
            </div>

            {/* Ubicación */}
            <div className="space-y-2">
              <Label htmlFor="location">Ubicación</Label>
              <Select value={formData.location} onValueChange={(value: string) => handleChange('location', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar ubicación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Almacén 1">Almacén 1</SelectItem>
                  <SelectItem value="Almacén 2">Almacén 2</SelectItem>
                  <SelectItem value="Almacén 3">Almacén 3</SelectItem>
                  <SelectItem value="Showroom">Showroom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* URL de Imagen */}
          <div className="space-y-2">
            <Label htmlFor="image">URL de Imagen</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => handleChange('image', e.target.value)}
              placeholder="https://example.com/imagen.jpg"
            />
            {formData.image && (
              <div className="mt-2">
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="w-32 h-32 object-cover rounded border"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Sin+Imagen';
                  }}
                />
              </div>
            )}
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Descripción del producto..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              {mode === 'add' ? 'Agregar Producto' : 'Guardar Cambios'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
