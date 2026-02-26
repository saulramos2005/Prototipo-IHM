import { ProductsSection } from "../components/ProductsSection";

export function CatalogPage() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">
            Catálogo de Productos
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Explore nuestra completa selección de mármoles, granitos y cuarzos premium
          </p>
        </div>
      </section>

      {/* Products Section */}
      <ProductsSection />
    </div>
  );
}
