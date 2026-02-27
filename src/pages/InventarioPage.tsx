import { useState } from "react";
import { Package, Search, Plus, Edit, Trash2, Filter, ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, Layers } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"; // Asegúrate de tener este componente
import { products } from "../data/products";
import { ProductFormModal } from "../components/ProductFormModal";
import { DeleteConfirmDialog } from "../components/DeleteConfirmDialog";
import { toast } from "sonner";

export interface InventoryItem {
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

export function Inventario() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [activeTab, setActiveTab] = useState("products");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedProduct, setSelectedProduct] = useState<InventoryItem | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);

  const [inventory, setInventory] = useState<InventoryItem[]>(
    products.map((product) => ({
      ...product,
      stock: Math.floor(Math.random() * 100) + 10,
      reserved: Math.floor(Math.random() * 20),
      location: `Almacén ${Math.floor(Math.random() * 3) + 1}`,
    })),
  );

  // --- LÓGICA DE FILTRADO Y SEGMENTACIÓN ---
  
  // 1. Filtrar por búsqueda y selector de tipo general
  const filteredData = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id!.toString().includes(searchTerm);
    const matchesFilter = filterType === "All" || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  // 2. Separar en dos categorías (Ajusta los strings según tus datos reales)
  const isAccessoryOrMisc = (type: string) => 
    ["Accesorio", "Misceláneo", "Herramienta"].includes(type);

  const mainProducts = filteredData.filter(item => !isAccessoryOrMisc(item.type));
  const accessoryProducts = filteredData.filter(item => isAccessoryOrMisc(item.type));

  // 3. Determinar qué lista mostrar según la pestaña activa
  const currentViewData = activeTab === "products" ? mainProducts : accessoryProducts;

  // --- SORT Y PAGINACIÓN (Basado en la vista actual) ---
  const sortedInventory = [...currentViewData].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    let aValue: any = a[key as keyof InventoryItem];
    let bValue: any = b[key as keyof InventoryItem];

    if (key === "available") {
      aValue = a.stock - a.reserved;
      bValue = b.stock - b.reserved;
    }

    if (aValue < bValue) return direction === "asc" ? -1 : 1;
    if (aValue > bValue) return direction === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(currentViewData.length / itemsPerPage);
  const paginatedInventory = sortedInventory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // --- HANDLERS ---
  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  const renderSortIcon = (key: string) => {
    if (sortConfig?.key !== key) return <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />;
    return sortConfig.direction === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />;
  };
  const handleAddProduct = (product: InventoryItem) => {
    const newProduct = {
      ...product,
      id: products.length + 1,
    };
    setInventory((prev) => [...prev, newProduct]);
  };

  const handleEditProduct = (product: InventoryItem) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === selectedProduct?.id ? { ...product, id: item.id } : item,
      ),
    );
    setIsEditModalOpen(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = () => {
    if (selectedProduct) {
      setInventory((prev) =>
        prev.filter((item) => item.id !== selectedProduct.id),
      );
      toast.success("Producto eliminado", {
        description: `${selectedProduct.name} ha sido eliminado del inventario`,
      });
      setIsDeleteDialogOpen(false);
      setSelectedProduct(null);
    }
  };

  // --- RENDERIZADO DE TABLA REUTILIZABLE ---
  const renderTable = (items: InventoryItem[]) => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b text-muted-foreground">
            <th className="text-left py-3 px-4 font-medium cursor-pointer" onClick={() => handleSort("name")}>
              <div className="flex items-center">Producto {renderSortIcon("name")}</div>
            </th>
            <th className="text-left py-3 px-4 font-medium cursor-pointer" onClick={() => handleSort("price")}>
              <div className="flex items-center">Precio {renderSortIcon("price")}</div>
            </th>           
            <th className="text-center py-3 px-4 font-medium cursor-pointer" onClick={() => handleSort("stock")}>
              <div className="flex items-center">Stock {renderSortIcon("stock")}</div>
            </th>
            <th className="text-center py-3 px-4 font-medium cursor-pointer" onClick={() => handleSort("available")}>
              <div className="flex items-center">Disponible {renderSortIcon("available")}</div>
            </th>
            <th className="text-left py-3 px-4 font-medium">Estado</th>
            <th className="text-center py-3 px-4 font-medium">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const available = item.stock - item.reserved;
            return (
              <tr key={item.id} className="border-b hover:bg-gray-50/50 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded shadow-sm" />
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <p className="text-sm text-muted-foreground">${item.price}${activeTab === "products" ? "/m²":""}</p>
                </td>
                <td className="py-3 px-4 text-center text-sm">{item.stock}</td>
                <td className="py-3 px-4 text-center font-medium text-sm">{available}</td>
                <td className="py-3 px-4 text-center">
                  <Badge variant={available < 20 ? "destructive" : "secondary"}>
                    {available < 20 ? "Bajo" : "Normal"}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex justify-center gap-1">
                    <Button variant="ghost" size="icon" onClick={() => { setSelectedProduct(item); setIsEditModalOpen(true); }}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => { setSelectedProduct(item); setIsDeleteDialogOpen(true); }}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {items.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Package className="h-12 w-12 mx-auto mb-2 opacity-20" />
          <p>No se encontraron elementos en esta categoría</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50 pb-10">
      {/* Header Simplificado */}
      <section className="bg-primary text-primary-foreground py-8 mb-8">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Package className="h-8 w-8" /> Inventario Central
            </h1>
            <p className="text-primary-foreground/80">Control de existencias y suministros</p>
          </div>
          <Button onClick={() => setIsAddModalOpen(true)} variant="secondary">
            <Plus className="mr-2 h-4 w-4" /> Nuevo Item
          </Button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controles de búsqueda superiores */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar por nombre o ID..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                  className="pl-10" 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* --- TABS PARA LAS DOS TABLAS --- */}
        <Tabs defaultValue="products" onValueChange={(v) => { setActiveTab(v); setCurrentPage(1); }}>
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-4">
            <TabsTrigger value="products" className="flex gap-2">
              <Package className="h-4 w-4" /> Productos
            </TabsTrigger>
            <TabsTrigger value="accessories" className="flex gap-2">
              <Layers className="h-4 w-4" /> Accesorios y Misc.
            </TabsTrigger>
          </TabsList>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {activeTab === "products" ? "Productos Principales" : "Accesorios y Misceláneos"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TabsContent value="products" className="mt-0">
                {renderTable(paginatedInventory)}
              </TabsContent>
              <TabsContent value="accessories" className="mt-0">
                {renderTable(paginatedInventory)}
              </TabsContent>
            </CardContent>
            
            <CardFooter className="flex items-center justify-between border-t pt-4">
              <p className="text-xs text-muted-foreground">
                Mostrando {paginatedInventory.length} de {currentViewData.length} ítems
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">Página {currentPage}</span>
                <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage >= totalPages}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </Tabs>
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
        productName={selectedProduct?.name || ""}
      />
    </div>
  );
}