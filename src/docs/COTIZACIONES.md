# Módulo de Cotizaciones para Vendedores

## Descripción
Módulo completo de gestión de cotizaciones para el rol de vendedor que permite crear, editar, visualizar y exportar cotizaciones de proyectos a PDF y CSV.

## Características Principales

### 1. Gestión de Cotizaciones
- ✅ Crear nuevas cotizaciones con información completa del cliente
- ✅ Editar cotizaciones existentes
- ✅ Visualizar detalles completos de cotizaciones
- ✅ Eliminar cotizaciones
- ✅ Estados de cotización: borrador, enviada, aceptada, rechazada, expirada

### 2. Constructor de Cotizaciones (QuoteBuilder)
- Información del cliente (nombre, email, teléfono, dirección)
- Selección de tipo de proyecto
- Agregar múltiples productos con área en m²
- Cálculo automático de:
  - Subtotal
  - IVA (16%)
  - Descuentos
  - Total final
- Notas adicionales
- Configuración de validez (días)

### 3. Exportación
- **PDF**: Documento profesional con toda la información de la cotización
  - Encabezado con número de cotización
  - Información del cliente
  - Tabla de productos
  - Totales con IVA y descuentos
  - Notas adicionales
  
- **CSV**: Archivo de datos para análisis en Excel
  - Información del cliente
  - Desglose de productos
  - Resumen de totales

### 4. Panel de Control
- **Estadísticas en tiempo real**:
  - Total de cotizaciones
  - Cotizaciones enviadas
  - Cotizaciones aceptadas
  - Monto total
  
- **Filtros y búsqueda**:
  - Búsqueda por número de cotización, cliente o email
  - Filtros por estado (todas, enviadas, aceptadas)

### 5. Vista de Detalles
- Visualización completa de la cotización
- Información del cliente
- Lista de productos con precios
- Totales desglosados
- Opciones de exportación directa

## Acceso al Módulo

### Autenticación
El módulo está protegido y solo accesible para usuarios con rol **vendedor**.

**Credenciales de prueba:**
- Email: `admin@newtop.com`
- Password: `admin123`

### Navegación
Una vez autenticado como vendedor, accede al módulo desde:
- URL directa: `/cotizaciones`
- Menú de navegación: "Cotizaciones"

## Estructura de Archivos

```
/pages/CotizacionesPage.tsx       # Página principal del módulo
/components/QuoteBuilder.tsx       # Componente constructor de cotizaciones
/utils/exportUtils.ts              # Utilidades para exportar PDF y CSV
```

## Dependencias

### Paquetes utilizados:
- `jspdf` - Generación de archivos PDF
- `sonner` - Notificaciones toast
- `lucide-react` - Iconos

## Uso del Módulo

### 1. Crear una Nueva Cotización
1. Click en "Nueva Cotización"
2. Completa información del cliente
3. Selecciona productos y especifica áreas
4. Agrega descuentos si aplica
5. Añade notas adicionales (opcional)
6. Guarda la cotización

### 2. Editar una Cotización
1. Click en el ícono de editar (lápiz) en la cotización deseada
2. Modifica los campos necesarios
3. Guarda los cambios

### 3. Ver Detalles
1. Click en el ícono de ojo en la cotización deseada
2. Visualiza todos los detalles
3. Exporta desde esta vista si lo necesitas

### 4. Exportar
- **PDF**: Click en el ícono de descarga o botón "Exportar PDF"
- **CSV**: Click en "Exportar CSV"

### 5. Eliminar
1. Click en el ícono de papelera
2. Confirma la eliminación

## Características del Sistema

### Cálculos Automáticos
- **Subtotal**: Suma de todos los productos (área × precio/m²)
- **IVA**: 16% del subtotal
- **Total**: Subtotal + IVA - Descuento

### Validación
- Campos requeridos: nombre del cliente, email, teléfono, tipo de proyecto
- Al menos un producto debe ser agregado
- Las áreas deben ser mayores a 0

### Números de Cotización
Generados automáticamente con el formato: `COT-2026-XXX`

### Vigencia
Las cotizaciones tienen una fecha de validez configurable (por defecto 30 días)

## Datos de Ejemplo

El módulo incluye 2 cotizaciones de ejemplo:
1. COT-2026-001 - María González (Cocina) - Estado: Enviada
2. COT-2026-002 - Juan Pérez (Baño) - Estado: Aceptada

## Notas Técnicas

- Los datos se almacenan en el estado local (no hay persistencia backend)
- Las exportaciones se descargan directamente en el navegador
- El módulo es completamente responsive
- Todas las funciones son accesibles desde dispositivos móviles

## Próximas Mejoras Sugeridas

1. Integración con Supabase para persistencia de datos
2. Envío automático de cotizaciones por email
3. Plantillas de cotización personalizables
4. Historial de cambios en cotizaciones
5. Firma electrónica de aceptación
6. Conversión de cotización a orden de trabajo
7. Recordatorios de cotizaciones por expirar
