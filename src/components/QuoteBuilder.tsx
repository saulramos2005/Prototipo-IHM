import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, Trash2, Save, X } from 'lucide-react';
import { products } from '../data/products';
import { Quote, QuoteItem } from '../pages/CotizacionesPage';
import { useAuth } from '../contexts/AuthContext';

interface QuoteBuilderProps {
  quote?: Quote | null;
  onSave: (quote: Quote) => void;
  onCancel: () => void;
}

export function QuoteBuilder({ quote, onSave, onCancel }: QuoteBuilderProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientAddress: '',
    projectType: '',
    status: 'borrador' as Quote['status'],
    discount: 0,
    notes: '',
    validUntilDays: 30
  });

  const [items, setItems] = useState<QuoteItem[]>([]);
  const [newItem, setNewItem] = useState({
    productId: '',
    area: 0
  });

  useEffect(() => {
    if (quote) {
      setFormData({
        clientName: quote.clientName,
        clientEmail: quote.clientEmail,
        clientPhone: quote.clientPhone,
        clientAddress: quote.clientAddress || '',
        projectType: quote.projectType,
        status: quote.status,
        discount: quote.discount,
        notes: quote.notes || '',
        validUntilDays: 30
      });
      setItems(quote.items);
    }
  }, [quote]);

  const handleAddItem = () => {
    if (!newItem.productId || newItem.area <= 0) {
      return;
    }

    const product = products.find(p => p.id.toString() === newItem.productId);
    if (!product) return;

    const subtotal = newItem.area * product.price;
    const item: QuoteItem = {
      id: Date.now().toString(),
      productId: product.id,
      productName: product.name,
      quantity: 1,
      area: newItem.area,
      pricePerUnit: product.price,
      subtotal: subtotal
    };

    setItems([...items, item]);
    setNewItem({ productId: '', area: 0 });
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleUpdateItem = (id: string, area: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newSubtotal = area * item.pricePerUnit;
        return { ...item, area, subtotal: newSubtotal };
      }
      return item;
    }));
  };

  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
    const tax = subtotal * 0.16; // IVA 16%
    const total = subtotal + tax - formData.discount;
    return { subtotal, tax, total };
  };

  const handleSave = () => {
    if (!formData.clientName || !formData.clientEmail || !formData.projectType || items.length === 0) {
      alert('Por favor complete todos los campos requeridos y agregue al menos un producto');
      return;
    }

    const { subtotal, tax, total } = calculateTotals();
    const today = new Date();
    const validUntil = new Date(today);
    validUntil.setDate(validUntil.getDate() + formData.validUntilDays);

    const newQuote: Quote = {
      id: quote?.id || Date.now().toString(),
      quoteNumber: quote?.quoteNumber || `COT-2026-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      clientPhone: formData.clientPhone,
      clientAddress: formData.clientAddress,
      projectType: formData.projectType,
      items: items,
      subtotal: subtotal,
      tax: tax,
      discount: formData.discount,
      total: total,
      status: formData.status,
      createdDate: quote?.createdDate || today.toISOString().split('T')[0],
      validUntil: validUntil.toISOString().split('T')[0],
      notes: formData.notes,
      createdBy: user?.name || 'Vendedor'
    };

    onSave(newQuote);
  };

  const { subtotal, tax, total } = calculateTotals();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">
              {quote ? 'Editar Cotización' : 'Nueva Cotización'}
            </h1>
            <p className="text-muted-foreground">
              Complete la información del cliente y agregue los productos
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Guardar
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Client Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Client Information */}
            <Card>
              <CardHeader>
                <CardTitle>Información del Cliente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientName">Nombre del Cliente *</Label>
                    <Input
                      id="clientName"
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      placeholder="Nombre completo"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clientEmail">Email *</Label>
                    <Input
                      id="clientEmail"
                      type="email"
                      value={formData.clientEmail}
                      onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                      placeholder="email@ejemplo.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientPhone">Teléfono *</Label>
                    <Input
                      id="clientPhone"
                      type="tel"
                      value={formData.clientPhone}
                      onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                      placeholder="+52 555 123 4567"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="projectType">Tipo de Proyecto *</Label>
                    <Select
                      value={formData.projectType}
                      onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cocina">Cocina</SelectItem>
                        <SelectItem value="Baño">Baño</SelectItem>
                        <SelectItem value="Pisos">Pisos</SelectItem>
                        <SelectItem value="Encimera">Encimera</SelectItem>
                        <SelectItem value="Revestimiento">Revestimiento</SelectItem>
                        <SelectItem value="Fachada">Fachada</SelectItem>
                        <SelectItem value="Otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clientAddress">Dirección (Opcional)</Label>
                  <Input
                    id="clientAddress"
                    value={formData.clientAddress}
                    onChange={(e) => setFormData({ ...formData, clientAddress: e.target.value })}
                    placeholder="Dirección completa"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Products */}
            <Card>
              <CardHeader>
                <CardTitle>Productos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Add New Item */}
                <div className="border rounded-lg p-4 bg-muted/50">
                  <h4 className="font-medium mb-3">Agregar Producto</h4>
                  <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-6">
                      <Label htmlFor="product">Producto</Label>
                      <Select
                        value={newItem.productId}
                        onValueChange={(value) => setNewItem({ ...newItem, productId: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar producto" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem key={product.id} value={product.id.toString()}>
                              {product.name} - ${product.price}/m²
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-4">
                      <Label htmlFor="area">Área (m²)</Label>
                      <Input
                        id="area"
                        type="number"
                        step="0.1"
                        min="0"
                        value={newItem.area || ''}
                        onChange={(e) => setNewItem({ ...newItem, area: parseFloat(e.target.value) || 0 })}
                        placeholder="0.0"
                      />
                    </div>
                    <div className="col-span-2 flex items-end">
                      <Button onClick={handleAddItem} className="w-full">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-3">
                  {items.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No hay productos agregados. Agregue al menos uno.
                    </div>
                  ) : (
                    items.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4 flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium">{item.productName}</h4>
                          <p className="text-sm text-muted-foreground">
                            ${item.pricePerUnit}/m²
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-24">
                            <Input
                              type="number"
                              step="0.1"
                              min="0"
                              value={item.area}
                              onChange={(e) => handleUpdateItem(item.id, parseFloat(e.target.value) || 0)}
                              className="text-center"
                            />
                            <p className="text-xs text-muted-foreground text-center mt-1">m²</p>
                          </div>
                          <div className="w-28 text-right">
                            <p className="font-semibold">${item.subtotal.toLocaleString()}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card>
              <CardHeader>
                <CardTitle>Información Adicional</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="notes">Notas (Opcional)</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Información adicional sobre el proyecto..."
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Summary */}
          <div className="space-y-6">
            {/* Status and Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Estado y Configuración</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Estado</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value as Quote['status'] })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="borrador">Borrador</SelectItem>
                      <SelectItem value="enviada">Enviada</SelectItem>
                      <SelectItem value="aceptada">Aceptada</SelectItem>
                      <SelectItem value="rechazada">Rechazada</SelectItem>
                      <SelectItem value="expirada">Expirada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="validUntilDays">Válida por (días)</Label>
                  <Input
                    id="validUntilDays"
                    type="number"
                    min="1"
                    value={formData.validUntilDays}
                    onChange={(e) => setFormData({ ...formData, validUntilDays: parseInt(e.target.value) || 30 })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discount">Descuento ($)</Label>
                  <Input
                    id="discount"
                    type="number"
                    min="0"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Resumen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Productos</span>
                    <span>{items.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>IVA (16%)</span>
                    <span>${tax.toLocaleString()}</span>
                  </div>
                  {formData.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Descuento</span>
                      <span>-${formData.discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-primary">${total.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-2">
              <Button onClick={handleSave} className="w-full" size="lg">
                <Save className="h-4 w-4 mr-2" />
                Guardar Cotización
              </Button>
              <Button onClick={onCancel} variant="outline" className="w-full">
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
