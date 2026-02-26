"use client";

import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { products } from "../data/products";
import { Button } from "./ui/button";
import { Search, Grid, List } from "lucide-react";

export function ProductsSection() {
  const [filter, setFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">(
    "grid",
  );
  const [searchTerm, setSearchTerm] = useState("");

  const types = [
    "All",
    "Mármol Premium",
    "Granito Premium",
    "Cuarzo Engineered",
    "Mármol Natural",
    "Granito Natural",
  ];
  const match = (e) =>
    e.toLowerCase().includes(searchTerm.toLowerCase());
  const filteredProducts = products.filter((p) => {
    const matchesType =
      filter === "All" ||
      p.type.toLowerCase() === filter.toLowerCase();
    const matchesSearch =
      match(p.name) ||
      match(p.description) ||
      match(p.application) ||
      match(p.finish) ||
      p.features.some(match);

    return matchesType && matchesSearch;
  });

  return (
    <section id="products" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Nuestros Productos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubra nuestra exclusiva colección de mármoles,
            granitos y cuarzos de la más alta calidad
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar por nombre, color, cualidades, aplicacion o tipo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray font-bold font-normal not-italic no-underline text-left"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-primary text-white'
                  : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-lg transition-all ${
                viewMode === 'list'
                  ? 'bg-primary text-white'
                  : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <List size={20} />
            </button>
          </div>
        </div>
        

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-[28px] mt-[20px] mr-[0px] ml-[0px]">
          {types.map((type) => (
            <Button
              key={type}
              variant={filter === type ? "default" : "outline"}
              onClick={() => setFilter(type)}
              className={
                filter === type
                  ? "bg-primary text-primary-foreground"
                  : ""
              }
            >
              {type === "All" ? "Todos" : type}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className={viewMode === "list" ? "space-y-4" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} viewMode={viewMode} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No se encontraron productos en esta categoría.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}