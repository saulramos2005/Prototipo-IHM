import { useState } from 'react';
import { Users, Search, Calendar, Package, X, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/alert-dialog';
import { toast } from 'sonner@2.0.3';

interface Reservation {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  productName: string;
  productType: string;
  quantity: number;
  totalPrice: number;
  reservationDate: string;
  installationDate: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  notes?: string;
}

// Mock data de reservas
const mockReservations: Reservation[] = [
  {
    id: 'RSV-001',
    clientName: 'María González',
    clientEmail: 'maria@example.com',
    clientPhone: '+58 412-1234567',
    productName: 'Calacatta Gold',
    productType: 'Mármol',
    quantity: 25,
    totalPrice: 3750,
    reservationDate: '2024-02-15',
    installationDate: '2024-03-01',
    status: 'confirmed',
    notes: 'Cliente solicita instalación en cocina principal'
  },
  {
    id: 'RSV-002',
    clientName: 'Carlos Pérez',
    clientEmail: 'carlos@example.com',
    clientPhone: '+58 424-9876543',
    productName: 'Negro Absoluto',
    productType: 'Granito',
    quantity: 40,
    totalPrice: 4800,
    reservationDate: '2024-02-18',
    installationDate: '2024-03-05',
    status: 'pending',
    notes: 'Proyecto comercial - Lobby de edificio'
  },
  {
    id: 'RSV-003',
    clientName: 'Ana Rodríguez',
    clientEmail: 'ana@example.com',
    clientPhone: '+58 414-5555555',
    productName: 'Cuarzo Blanco',
    productType: 'Cuarzo',
    quantity: 15,
    totalPrice: 2250,
    reservationDate: '2024-02-20',
    installationDate: '2024-03-10',
    status: 'in-progress',
    notes: 'Encimera de baño'
  },
  {
    id: 'RSV-004',
    clientName: 'Luis Martínez',
    clientEmail: 'luis@example.com',
    clientPhone: '+58 426-7777777',
    productName: 'Travertino Romano',
    productType: 'Travertino',
    quantity: 60,
    totalPrice: 4200,
    reservationDate: '2024-02-10',
    installationDate: '2024-02-28',
    status: 'completed',
    notes: 'Piso de sala y comedor - Cliente muy satisfecho'
  },
  {
    id: 'RSV-005',
    clientName: 'Patricia Silva',
    clientEmail: 'patricia@example.com',
    clientPhone: '+58 412-3333333',
    productName: 'Emperador Dark',
    productType: 'Mármol',
    quantity: 30,
    totalPrice: 5400,
    reservationDate: '2024-02-12',
    installationDate: '2024-02-25',
    status: 'cancelled',
    notes: 'Cliente decidió posponer el proyecto'
  },
];

export function ClientesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const handleCancelReservation = () => {
    if (selectedReservation) {
      setReservations(prev =>
        prev.map(res =>
          res.id === selectedReservation.id
            ? { ...res, status: 'cancelled' as const }
            : res
        )
      );
      toast.success('Reserva cancelada', {
        description: `La reserva ${selectedReservation.id} ha sido cancelada exitosamente`,
      });
      setIsDialogOpen(false);
      setSelectedReservation(null);
    }
  };

  const openCancelDialog = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsDialogOpen(true);
  };

  const filteredReservations = reservations.filter(res => {
    const matchesSearch =
      res.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.productName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'active' && ['pending', 'confirmed', 'in-progress'].includes(res.status)) ||
      res.status === activeTab;

    return matchesSearch && matchesTab;
  });

  const getStatusInfo = (status: Reservation['status']) => {
    switch (status) {
      case 'pending':
        return { label: 'Pendiente', variant: 'default' as const, icon: Clock };
      case 'confirmed':
        return { label: 'Confirmada', variant: 'default' as const, icon: CheckCircle };
      case 'in-progress':
        return { label: 'En Proceso', variant: 'default' as const, icon: Package };
      case 'completed':
        return { label: 'Completada', variant: 'outline' as const, icon: CheckCircle };
      case 'cancelled':
        return { label: 'Cancelada', variant: 'destructive' as const, icon: X };
    }
  };

  const stats = {
    total: reservations.length,
    active: reservations.filter(r => ['pending', 'confirmed', 'in-progress'].includes(r.status)).length,
    completed: reservations.filter(r => r.status === 'completed').length,
    cancelled: reservations.filter(r => r.status === 'cancelled').length,
    totalRevenue: reservations
      .filter(r => r.status === 'completed')
      .reduce((acc, r) => acc + r.totalPrice, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-semibold mb-2 flex items-center gap-3">
                <Users className="h-8 w-8" />
                Gestión de Clientes
              </h1>
              <p className="text-gray-200">
                Administre reservas y pedidos de clientes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Reservas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Activas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.active}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Completadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Canceladas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.cancelled}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Ingresos Totales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ${stats.totalRevenue.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por cliente, email, ID de reserva o producto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Reservations Table with Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Reservas de Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
              <TabsList>
                <TabsTrigger value="all">Todas</TabsTrigger>
                <TabsTrigger value="active">Activas</TabsTrigger>
                <TabsTrigger value="pending">Pendientes</TabsTrigger>
                <TabsTrigger value="confirmed">Confirmadas</TabsTrigger>
                <TabsTrigger value="in-progress">En Proceso</TabsTrigger>
                <TabsTrigger value="completed">Completadas</TabsTrigger>
                <TabsTrigger value="cancelled">Canceladas</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">ID</th>
                    <th className="text-left py-3 px-4 font-medium">Cliente</th>
                    <th className="text-left py-3 px-4 font-medium">Producto</th>
                    <th className="text-center py-3 px-4 font-medium">Cantidad</th>
                    <th className="text-center py-3 px-4 font-medium">Total</th>
                    <th className="text-center py-3 px-4 font-medium">Fecha Instalación</th>
                    <th className="text-center py-3 px-4 font-medium">Estado</th>
                    <th className="text-center py-3 px-4 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReservations.map((reservation) => {
                    const statusInfo = getStatusInfo(reservation.status);
                    const StatusIcon = statusInfo.icon;
                    const canCancel = ['pending', 'confirmed'].includes(reservation.status);

                    return (
                      <tr key={reservation.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <span className="font-mono text-sm">{reservation.id}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{reservation.clientName}</p>
                            <p className="text-sm text-muted-foreground">{reservation.clientEmail}</p>
                            <p className="text-xs text-muted-foreground">{reservation.clientPhone}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{reservation.productName}</p>
                            <Badge variant="secondary" className="text-xs">
                              {reservation.productType}
                            </Badge>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">{reservation.quantity} m²</td>
                        <td className="py-3 px-4 text-center font-medium">
                          ${reservation.totalPrice.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">
                              {new Date(reservation.installationDate).toLocaleDateString('es-ES')}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Badge variant={statusInfo.variant} className="flex items-center gap-1 w-fit mx-auto">
                            <StatusIcon className="h-3 w-3" />
                            {statusInfo.label}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-2">
                            {canCancel && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openCancelDialog(reservation)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <X className="h-4 w-4 mr-1" />
                                Cancelar
                              </Button>
                            )}
                            {!canCancel && reservation.status !== 'cancelled' && (
                              <span className="text-xs text-muted-foreground">-</span>
                            )}
                            {reservation.status === 'cancelled' && (
                              <span className="text-xs text-muted-foreground">Cancelada</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {filteredReservations.length === 0 && (
                <div className="text-center py-12">
                  <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-muted-foreground">No se encontraron reservas</p>
                </div>
              )}
            </div>

            {/* Notes Section */}
            {filteredReservations.length > 0 && (
              <div className="mt-6 border-t pt-6">
                <h3 className="font-semibold mb-4">Notas de Reservas:</h3>
                <div className="space-y-3">
                  {filteredReservations
                    .filter(r => r.notes)
                    .map(reservation => (
                      <div key={reservation.id} className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-start gap-2">
                          <span className="font-mono text-xs font-medium text-primary">
                            {reservation.id}
                          </span>
                          <span className="text-sm text-muted-foreground">-</span>
                          <span className="text-sm">{reservation.notes}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Cancelar esta reserva?</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedReservation && (
                <div className="space-y-2 mt-2">
                  <p>
                    Está a punto de cancelar la reserva <strong>{selectedReservation.id}</strong>
                  </p>
                  <div className="bg-gray-50 p-3 rounded-lg text-sm space-y-1">
                    <p><strong>Cliente:</strong> {selectedReservation.clientName}</p>
                    <p><strong>Producto:</strong> {selectedReservation.productName}</p>
                    <p><strong>Cantidad:</strong> {selectedReservation.quantity} m²</p>
                    <p><strong>Total:</strong> ${selectedReservation.totalPrice.toLocaleString()}</p>
                  </div>
                  <p className="text-red-600 font-medium mt-2">
                    Esta acción no se puede deshacer. El stock reservado será liberado.
                  </p>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, mantener reserva</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelReservation}
              className="bg-red-600 hover:bg-red-700"
            >
              Sí, cancelar reserva
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
