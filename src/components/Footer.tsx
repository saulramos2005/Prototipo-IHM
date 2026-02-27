import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import { Link } from "react-router";
import {
  navigation,
  additionalServices,
  contactInfo,
} from "../data/constants";
import { useAuth } from "../contexts/AuthContext";

export function Footer() {
  const { user, isAdmin } = useAuth();
  const quicklinks = navigation.filter(
    (item) => !item.rol.includes("vendedor"),
  );
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              New Top C.A.
            </h3>
            <p className="text-gray-300 mb-4">
              Transformando espacios con la belleza natural del
              mármol y granito. Calidad, experiencia y acabados
              excepcionales desde 2010.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          {!isAdmin && (
            <div>
              <h4 className="font-medium mb-4">
                Enlaces Rápidos
              </h4>
              <ul className="space-y-2 text-gray-300">
                {quicklinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Services */}
          <div>
            <h4 className="font-medium mb-4">Servicios</h4>
            <ul className="space-y-2 text-gray-300">
              {additionalServices.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-medium mb-4">
              Información de Contacto
            </h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>{contactInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>{contactInfo.email}</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-1" />
                <span>
                  {contactInfo.address.street}
                  <br />
                  {contactInfo.address.district}
                  <br />
                  {contactInfo.address.cityState}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
          <p>
            &copy; 2026 New Top C.A. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}