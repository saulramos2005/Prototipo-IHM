import { Gem, ShoppingBag, Wand2 } from "lucide-react";
import { Hero } from "../components/Hero";
import { ProductsSection } from "../components/ProductsSection";
import { stats } from "../data/constants";


export function LandingPage() {
  return (
    <div>
      <Hero />
      {/* Features Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-sm shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
            <div className="w-14 h-14 flex items-center justify-center mb-4">
              <Gem className="text-gray-600" size={28} />
            </div>
            <h3 className="text-2xl font-bold text-[#2C2C2C] mb-3">Materiales Premium</h3>
            <p className="text-gray-600">
              Mármol y granito importado de las mejores canteras del mundo. Calidad garantizada.
            </p>
          </div>

          <div className="bg-white p-8 rounded-sm shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
            <div className="w-14 h-14 flex items-center justify-center mb-4">
              <ShoppingBag className="text-gray-600" size={28} />
            </div>
            <h3 className="text-2xl font-bold text-[#2C2C2C] mb-3">Accesorios Exclusivos</h3>
            <p className="text-gray-600">
              Grifería, fregaderos y accesorios de diseño para complementar tu proyecto.
            </p>
          </div>

          <div className="bg-white p-8 rounded-sm shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
            <div className="w-14 h-14 flex items-center justify-center mb-4">
              <Wand2 className="text-gray-600" size={28} />
            </div>
            <h3 className="text-2xl font-bold text-[#2C2C2C] mb-3">Asistente IA</h3>
            <p className="text-gray-600">
              Visualiza tu proyecto y recibe sugerencias personalizadas con inteligencia artificial.
            </p>
          </div>
        </div>
      </div>
    {/* Estadisticas */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 my-10 mx-auto">
      {stats.map((stat, index) => (
        <div key={index} className="text-center px-4 my-6 hover:shadow-xl transition-all transform hover:-translate-y-2">
          <div className="flex justify-center mb-2 text-primary">
            {stat.icon}
          </div>
          <div className="text-2xl font-semibold text-primary">{stat.value}</div>
          <div className="text-sm text-muted-foreground">{stat.label}</div>
          <div className="h-1 w-1/2 mx-auto my-2 bg-(--card-border)"></div>
        </div>
      ))}
    </div>
    </div>
  );
}
