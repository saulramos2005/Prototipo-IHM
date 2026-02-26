import { useState } from 'react';
import { Package, Search, Plus, Edit, Trash2, Filter } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { products } from '../data/products';
import { ProductFormModal } from '../components/ProductFormModal';
import { DeleteConfirmDialog } from '../components/DeleteConfirmDialog';
import { toast } from 'sonner';

interface InventoryItem {
  id: string;
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

export function Inventario() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<InventoryItem | null>(null);

  // Mock inventory data based on products
  const [inventory, setInventory] = useState<InventoryItem[]>(
    products.map(product => ({
      ...product,
      stock: Math.floor(Math.random() * 100) + 10,
      reserved: Math.floor(Math.random() * 20),
      location: `Almacén ${Math.floor(Math.random() * 3) + 1}`
    }))
  );

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'All' || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const types = ['All', ...Array.from(new Set(products.map(p => p.type)))];

  const handleAddProduct = (product: InventoryItem) => {
    const newProduct = {
      ...product,
      id: `product-${Date.now()}`,
    };
    setInventory(prev => [...prev, newProduct]);
  };

  const handleEditProduct = (product: InventoryItem) => {
    setInventory(prev => 
      prev.map(item => item.id === selectedProduct?.id ? { ...product, id: item.id } : item)
    );
    setIsEditModalOpen(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = () => {
    if (selectedProduct) {
      setInventory(prev => prev.filter(item => item.id !== selectedProduct.id));
      toast.success('Producto eliminado', {
        description: `${selectedProduct.name} ha sido eliminado del inventario`,
      });
      setIsDeleteDialogOpen(false);
      setSelectedProduct(null);
    }
  };

  const openEditModal = (product: InventoryItem) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const openDeleteDialog = (product: InventoryItem) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-semibold mb-2 flex items-center gap-3">
                <Package className="h-8 w-8" />
                Inventario
              </h1>
              <p className="text-gray-200">
                Gestión de stock y materiales disponibles
              </p>
            </div>
            <Button 
              className="bg-white text-primary hover:bg-gray-100"
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Agregar Producto
            </Button>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Productos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inventory.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Stock Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {inventory.reduce((acc, item) => acc + item.stock, 0)} m²
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Reservados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {inventory.reduce((acc, item) => acc + item.reserved, 0)} m²
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Disponible
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {inventory.reduce((acc, item) => acc + (item.stock - item.reserved), 0)} m²
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Filter className="h-9 w-9 p-2 border rounded-lg" />
                <div className="flex gap-2 flex-wrap">
                  {types.map(type => (
                    <Button
                      key={type}
                      variant={filterType === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterType(type)}
                    >
                      {type === 'All' ? 'Todos' : type}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Table */}
        <Card>
          <CardHeader>
            <CardTitle>Listado de Productos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Producto</th>
                    <th className="text-left py-3 px-4 font-medium">Tipo</th>
                    <th className="text-left py-3 px-4 font-medium">Ubicación</th>
                    <th className="text-center py-3 px-4 font-medium">Stock</th>
                    <th className="text-center py-3 px-4 font-medium">Reservado</th>
                    <th className="text-center py-3 px-4 font-medium">Disponible</th>
                    <th className="text-center py-3 px-4 font-medium">Estado</th>
                    <th className="text-center py-3 px-4 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInventory.map((item) => {
                    const available = item.stock - item.reserved;
                    const stockLevel = available < 20 ? 'low' : available < 50 ? 'medium' : 'high';
                    
                    return (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-muted-foreground">${item.price}/m²</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary">{item.type}</Badge>
                        </td>
                        <td className="py-3 px-4 text-sm">{item.location}</td>
                        <td className="py-3 px-4 text-center">{item.stock} m²</td>
                        <td className="py-3 px-4 text-center">{item.reserved} m²</td>
                        <td className="py-3 px-4 text-center font-medium">{available} m²</td>
                        <td className="py-3 px-4 text-center">
                          <Badge 
                            variant={stockLevel === 'low' ? 'destructive' : stockLevel === 'medium' ? 'default' : 'outline'}
                          >
                            {stockLevel === 'low' ? 'Bajo' : stockLevel === 'medium' ? 'Medio' : 'Alto'}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => openEditModal(item)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => openDeleteDialog(item)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {filteredInventory.length === 0 && (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-muted-foreground">No se encontraron productos</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Product Modal */}
      <ProductFormModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSave={handleAddProduct}
        mode="add"
      />

      {/* Edit Product Modal */}
      {selectedProduct && (
        <ProductFormModal
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          product={selectedProduct}
          onSave={handleEditProduct}
          mode="edit"
        />
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteProduct}
        productName={selectedProduct?.name || ''}
      />
    </div>
  );
}