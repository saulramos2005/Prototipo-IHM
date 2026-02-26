import { useState } from "react";
import { Package, Search, Plus, Edit, Trash2, Filter, ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Badge } from "../components/ui/badge";
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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedProduct, setSelectedProduct] = useState<InventoryItem | null>(
    null,
  );
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  // Mock inventory data based on products
  const [inventory, setInventory] = useState<InventoryItem[]>(
    products.map((product) => ({
      ...product,
      stock: Math.floor(Math.random() * 100) + 10,
      reserved: Math.floor(Math.random() * 20),
      location: `Almacén ${Math.floor(Math.random() * 3) + 1}`,
    })),
  );

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id!.toString().includes(searchTerm);
    const matchesFilter = filterType === "All" || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const sortedInventory = [...filteredInventory].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;

    let aValue: any = a[key as keyof InventoryItem];
    let bValue: any = b[key as keyof InventoryItem];

    if (key === "available") {
      aValue = a.stock - a.reserved;
      bValue = b.stock - b.reserved;
    } else if (key === "status") {
      const getStatusWeight = (item: InventoryItem) => {
        const avail = item.stock - item.reserved;
        if (avail < 20) return 1;
        if (avail < 50) return 2;
        return 3;
      };
      aValue = getStatusWeight(a);
      bValue = getStatusWeight(b);
    }

    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) return direction === "asc" ? -1 : 1;
    if (aValue > bValue) return direction === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(filteredInventory.length / itemsPerPage);
  const paginatedInventory = sortedInventory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (value: string) => {
    setFilterType(value);
    setCurrentPage(1);
  };

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const types = ["All", ...Array.from(new Set(products.map((p) => p.type)))];

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

  const openEditModal = (product: InventoryItem) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const openDeleteDialog = (product: InventoryItem) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const renderSortIcon = (key: string) => {
    if (sortConfig?.key === key) {
      return sortConfig.direction === "asc" ? (
        <ArrowUp className="ml-2 h-4 w-4" />
      ) : (
        <ArrowDown className="ml-2 h-4 w-4" />
      );
    }
    return (
      <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground opacity-50" />
    );
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
                {inventory.reduce(
                  (acc, item) => acc + (item.stock - item.reserved),
                  0,
                )}{" "}
                m²
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
                  onChange={handleSearchChange}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Filter className="h-9 w-9 p-2 border rounded-lg" />
                <div className="flex gap-2 flex-wrap">
                  <Select value={filterType} onValueChange={handleFilterChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {types.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type === "All" ? "Todos" : type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Table */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Listado de Productos</CardTitle>
            <Button
              className="bg-white text-primary hover:bg-gray-100"
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Agregar Producto
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th
                      className="text-left py-3 px-4 font-medium cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort("name")}
                    >
                      <div className="flex items-center">
                        Producto
                        {renderSortIcon("name")}
                      </div>
                    </th>
                    <th
                      className="text-left py-3 px-4 font-medium cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort("type")}
                    >
                      <div className="flex items-center">
                        Tipo
                        {renderSortIcon("type")}
                      </div>
                    </th>
                    <th
                      className="text-left py-3 px-4 font-medium cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort("location")}
                    >
                      <div className="flex items-center">
                        Ubicación
                        {renderSortIcon("location")}
                      </div>
                    </th>
                    <th
                      className="text-center py-3 px-4 font-medium cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort("stock")}
                    >
                      <div className="flex items-center justify-center">
                        Stock
                        {renderSortIcon("stock")}
                      </div>
                    </th>
                    <th
                      className="text-center py-3 px-4 font-medium cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort("reserved")}
                    >
                      <div className="flex items-center justify-center">
                        Reservado
                        {renderSortIcon("reserved")}
                      </div>
                    </th>
                    <th
                      className="text-center py-3 px-4 font-medium cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort("available")}
                    >
                      <div className="flex items-center justify-center">
                        Disponible
                        {renderSortIcon("available")}
                      </div>
                    </th>
                    <th
                      className="text-center py-3 px-4 font-medium cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort("status")}
                    >
                      <div className="flex items-center justify-center">
                        Estado
                        {renderSortIcon("status")}
                      </div>
                    </th>
                    <th className="text-center py-3 px-4 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedInventory.map((item) => {
                    const available = item.stock - item.reserved;
                    const stockLevel =
                      available < 20
                        ? "low"
                        : available < 50
                          ? "medium"
                          : "high";

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
                              <p className="text-sm text-muted-foreground">
                                ${item.price}/m²
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary">{item.type}</Badge>
                        </td>
                        <td className="py-3 px-4 text-sm">{item.location}</td>
                        <td className="py-3 px-4 text-center">
                          {item.stock} m²
                        </td>
                        <td className="py-3 px-4 text-center">
                          {item.reserved} m²
                        </td>
                        <td className="py-3 px-4 text-center font-medium">
                          {available} m²
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Badge
                            variant={
                              stockLevel === "low"
                                ? "destructive"
                                : stockLevel === "medium"
                                  ? "default"
                                  : "outline"
                            }
                          >
                            {stockLevel === "low"
                              ? "Bajo"
                              : stockLevel === "medium"
                                ? "Medio"
                                : "Alto"}
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
                  <p className="text-muted-foreground">
                    No se encontraron productos
                  </p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-center">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Anterior
              </Button>
              <div className="text-sm text-muted-foreground">
              Página {currentPage} de {totalPages || 1}
            </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage >= totalPages}
              >
                Siguiente
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardFooter>
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
        productName={selectedProduct?.name || ""}
      />
    </div>
  );
}
