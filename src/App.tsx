import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LandingPage } from "./pages/LandingPage";
import { CatalogPage } from "./pages/CatalogPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { AsistenteIA } from "./pages/AsistenteIAPage";
import { Inventario } from "./pages/InventarioPage";
import { ClientesPage } from "./pages/ClientesPage";
import { LoginPage } from "./pages/LoginPage";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/catalogo" element={<CatalogPage />} />
              <Route path="/nosotros" element={<AboutPage />} />
              <Route path="/contacto" element={<ContactPage />} />
              <Route path="/asistente" element={<AsistenteIA/>} />
              <Route path="/login" element={<LoginPage />} />
              <Route 
                path="/inventario" 
                element={
                  <ProtectedRoute requireAdmin>
                    <Inventario/>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/clientes" 
                element={
                  <ProtectedRoute requireAdmin>
                    <ClientesPage/>
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
          <Toaster richColors />
        </div>
      </AuthProvider>
    </Router>
  );
}