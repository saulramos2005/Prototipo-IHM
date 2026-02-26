import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Plus,
  Search,
  FileText,
  Download,
  Calendar,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Filter,
} from "lucide-react";
import { QuoteBuilder } from "../components/QuoteBuilder";
import {
  exportQuoteToPDF,
  exportQuoteToCSV,
} from "../utils/exportUtils";
import { Receipt } from "lucide-react";
import { toast } from "sonner@2.0.3";

export interface QuoteItem {
  id: string;
  productId: string | number;
  productName: string;
  quantity: number;
  area: number;
  pricePerUnit: number;
  subtotal: number;
}

export interface Quote {
  id: string;
  quoteNumber: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress?: string;
  projectType: string;
  items: QuoteItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status:
    | "borrador"
    | "enviada"
    | "aceptada"
    | "rechazada"
    | "expirada";
  createdDate: string;
  validUntil: string;
  notes?: string;
  createdBy: string;
}

// Mock data
const mockQuotes: Quote[] = [
  {
    id: "1",
    quoteNumber: "COT-2026-001",
    clientName: "María González",
    clientEmail: "maria.gonzalez@email.com",
    clientPhone: "+52 555 123 4567",
    clientAddress: "Av. Reforma 123, CDMX",
    projectType: "Cocina",
    items: [
      {
        id: "1",
        productId: 1,
        productName: "Marmol Carrara Blanco",
        quantity: 1,
        area: 15,
        pricePerUnit: 120,
        subtotal: 1800,
      },
    ],
    subtotal: 1800,
    tax: 288,
    discount: 0,
    total: 2088,
    status: "enviada",
    createdDate: "2026-02-20",
    validUntil: "2026-03-20",
    notes: "Cliente requiere instalación urgente",
    createdBy: "Vendedor",
  },
  {
    id: "2",
    quoteNumber: "COT-2026-002",
    clientName: "Juan Pérez",
    clientEmail: "juan.perez@email.com",
    clientPhone: "+52 555 987 6543",
    projectType: "Baño",
    items: [
      {
        id: "2",
        productId: 2,
        productName: "Granito Negro Absoluto",
        quantity: 1,
        area: 8,
        pricePerUnit: 150,
        subtotal: 1200,
      },
    ],
    subtotal: 1200,
    tax: 192,
    discount: 100,
    total: 1292,
    status: "aceptada",
    createdDate: "2026-02-18",
    validUntil: "2026-03-18",
    createdBy: "Vendedor",
  },
];

export function CotizacionesPage() {
  const [quotes, setQuotes] = useState<Quote[]>(mockQuotes);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<string>("todas");
  const [isCreating, setIsCreating] = useState(false);
  const [editingQuote, setEditingQuote] =
    useState<Quote | null>(null);
  const [viewingQuote, setViewingQuote] =
    useState<Quote | null>(null);

  const filteredQuotes = quotes.filter((quote) => {
    const matchesSearch =
      quote.quoteNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      quote.clientName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      quote.clientEmail
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "todas" || quote.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleSaveQuote = (quote: Quote) => {
    if (editingQuote) {
      setQuotes(
        quotes.map((q) => (q.id === quote.id ? quote : q)),
      );
      toast.success("Cotización actualizada correctamente");
    } else {
      setQuotes([quote, ...quotes]);
      toast.success("Cotización creada correctamente");
    }
    setIsCreating(false);
    setEditingQuote(null);
  };

  const handleDeleteQuote = (id: string) => {
    if (confirm("¿Está seguro de eliminar esta cotización?")) {
      setQuotes(quotes.filter((q) => q.id !== id));
      toast.success("Cotización eliminada");
    }
  };

  const handleExportPDF = (quote: Quote) => {
    try {
      exportQuoteToPDF(quote);
      toast.success("PDF generado correctamente");
    } catch (error) {
      toast.error("Error al generar PDF");
    }
  };

  const handleExportCSV = (quote: Quote) => {
    try {
      exportQuoteToCSV(quote);
      toast.success("CSV generado correctamente");
    } catch (error) {
      toast.error("Error al generar CSV");
    }
  };

  const getStatusBadgeColor = (status: Quote["status"]) => {
    const colors = {
      borrador: "bg-gray-500",
      enviada: "bg-blue-500",
      aceptada: "bg-green-500",
      rechazada: "bg-red-500",
      expirada: "bg-orange-500",
    };
    return colors[status];
  };

  const stats = {
    total: quotes.length,
    enviadas: quotes.filter((q) => q.status === "enviada")
      .length,
    aceptadas: quotes.filter((q) => q.status === "aceptada")
      .length,
    totalMonto: quotes.reduce((sum, q) => sum + q.total, 0),
  };

  if (isCreating || editingQuote) {
    return (
      <QuoteBuilder
        quote={editingQuote}
        onSave={handleSaveQuote}
        onCancel={() => {
          setIsCreating(false);
          setEditingQuote(null);
        }}
      />
    );
  }

  if (viewingQuote) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="outline"
              onClick={() => setViewingQuote(null)}
            >
              ← Volver
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => handleExportPDF(viewingQuote)}
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar PDF
              </Button>
              <Button
                variant="outline"
                onClick={() => handleExportCSV(viewingQuote)}
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar CSV
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>
                    {viewingQuote.quoteNumber}
                  </CardTitle>
                  <CardDescription>
                    Creada el{" "}
                    {new Date(
                      viewingQuote.createdDate,
                    ).toLocaleDateString("es-MX")}
                  </CardDescription>
                </div>
                <Badge
                  className={getStatusBadgeColor(
                    viewingQuote.status,
                  )}
                >
                  {viewingQuote.status.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Client Info */}
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-3">
                  Información del Cliente
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">
                      Nombre
                    </p>
                    <p className="font-medium">
                      {viewingQuote.clientName}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">
                      Email
                    </p>
                    <p className="font-medium">
                      {viewingQuote.clientEmail}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">
                      Teléfono
                    </p>
                    <p className="font-medium">
                      {viewingQuote.clientPhone}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">
                      Tipo de Proyecto
                    </p>
                    <p className="font-medium">
                      {viewingQuote.projectType}
                    </p>
                  </div>
                  {viewingQuote.clientAddress && (
                    <div className="col-span-2">
                      <p className="text-muted-foreground">
                        Dirección
                      </p>
                      <p className="font-medium">
                        {viewingQuote.clientAddress}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Items */}
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-3">
                  Productos
                </h3>
                <div className="space-y-3">
                  {viewingQuote.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-start p-3 bg-muted/50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">
                          {item.productName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.area} m² × ${item.pricePerUnit}
                          /m²
                        </p>
                      </div>
                      <p className="font-medium">
                        ${item.subtotal.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>
                    ${viewingQuote.subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>IVA (16%)</span>
                  <span>
                    ${viewingQuote.tax.toLocaleString()}
                  </span>
                </div>
                {viewingQuote.discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Descuento</span>
                    <span>
                      -${viewingQuote.discount.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total</span>
                  <span className="text-primary">
                    ${viewingQuote.total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Notes */}
              {viewingQuote.notes && (
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2">Notas</h3>
                  <p className="text-sm text-muted-foreground">
                    {viewingQuote.notes}
                  </p>
                </div>
              )}

              {/* Valid Until */}
              <div className="border-t pt-4 text-sm text-muted-foreground">
                <p>
                  Válida hasta:{" "}
                  {new Date(
                    viewingQuote.validUntil,
                  ).toLocaleDateString("es-MX")}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-semibold mb-2 flex items-center gap-3">
                <Receipt className="h-8 w-8" />
                Cotizaciones
              </h1>
              <p className="text-gray-200">
                Gestiona y crea cotizaciones de proyectos para
                tus clientes
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Cotizaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-2xl font-bold">
                  {stats.total}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Enviadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                <span className="text-2xl font-bold">
                  {stats.enviadas}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Aceptadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-green-500" />
                <span className="text-2xl font-bold">
                  {stats.aceptadas}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Monto Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-2xl font-bold">
                  ${stats.totalMonto.toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por número, cliente o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant={
                statusFilter === "todas" ? "default" : "outline"
              }
              onClick={() => setStatusFilter("todas")}
              size="sm"
            >
              <Filter className="h-4 w-4 mr-2" />
              Todas
            </Button>
            <Button
              variant={
                statusFilter === "enviada"
                  ? "default"
                  : "outline"
              }
              onClick={() => setStatusFilter("enviada")}
              size="sm"
            >
              Enviadas
            </Button>
            <Button
              variant={
                statusFilter === "aceptada"
                  ? "default"
                  : "outline"
              }
              onClick={() => setStatusFilter("aceptada")}
              size="sm"
            >
              Aceptadas
            </Button>
          </div>

          <Button
            variant="outline"
            onClick={() => setIsCreating(true)}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Nueva Cotización
          </Button>
        </div>

        {/* Quotes List */}
        <div className="space-y-4">
          {filteredQuotes.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-semibold mb-2">
                  No hay cotizaciones
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {searchTerm || statusFilter !== "todas"
                    ? "No se encontraron cotizaciones con los filtros aplicados"
                    : "Comienza creando tu primera cotización"}
                </p>
                {!searchTerm && statusFilter === "todas" && (
                  <Button onClick={() => setIsCreating(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Cotización
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredQuotes.map((quote) => (
              <Card
                key={quote.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">
                          {quote.quoteNumber}
                        </h3>
                        <Badge
                          className={getStatusBadgeColor(
                            quote.status,
                          )}
                        >
                          {quote.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">
                            Cliente
                          </p>
                          <p className="font-medium">
                            {quote.clientName}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">
                            Proyecto
                          </p>
                          <p className="font-medium">
                            {quote.projectType}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">
                            Fecha
                          </p>
                          <p className="font-medium">
                            {new Date(
                              quote.createdDate,
                            ).toLocaleDateString("es-MX")}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">
                            Total
                          </p>
                          <p className="font-semibold text-primary">
                            ${quote.total.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setViewingQuote(quote)}
                        title="Ver detalles"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingQuote(quote)}
                        title="Editar"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleExportPDF(quote)}
                        title="Exportar PDF"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleDeleteQuote(quote.id)
                        }
                        title="Eliminar"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}