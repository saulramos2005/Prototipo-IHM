"use client";

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Button } from "./ui/button";
import {
  Menu,
  X,
  Phone,
  User,
  LogOut,
  Settings,
  LogIn,
} from "lucide-react";
import { navigation, contactInfo } from "../data/constants";
import { useAuth } from "../contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from "sonner@2.0.3";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    toast.success("Sesión cerrada", {
      description: "Has cerrado sesión exitosamente",
    });
    navigate("/");
  };

  // Filter navigation based on admin status
  const visibleNavigation = navigation.filter((item) => {
    if (
      item.href === "/inventario" ||
      item.href === "/clientes"
    ) {
      return isAdmin;
    }
    return true;
  });

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <h1 className="font-semibold text-primary cursor-pointer text-[16px]">
                New Top C.A.
              </h1>
              <p className="text-xs text-gray-600 text-[12px]">
                Showroom Digital
              </p>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2 bg-[rgba(0,0,0,0)]">
            {visibleNavigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-foreground hover:text-primary transition-colors ${
                  location.pathname === item.href
                    ? "text-primary font-medium bg-gray-300"
                    : ""
                }`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Profile Icon and Mobile menu button */}
          <div className="flex items-center gap-2">
            {/* Profile Dropdown - Desktop */}
            <div className="hidden md:block">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56"
                  >
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">
                          {user.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                        {isAdmin && (
                          <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full w-fit">
                            Admin
                          </span>
                        )}
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Cerrar Sesión</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/login">
                  <Button variant="ghost">
                    <LogIn className="h-5 w-5" />
                    Iniciar Sesión
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {visibleNavigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-2 px-3 py-2 text-foreground hover:text-primary transition-colors ${
                    location.pathname === item.href
                      ? "text-primary font-medium"
                      : ""
                  }`}
                  onClick={toggleMenu}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </Link>
              ))}

              <div className="px-3 py-2 border-t mt-2">
                {user ? (
                  <div className="space-y-2">
                    <div className="text-sm">
                      <p className="font-medium text-foreground">
                        {user.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                      {isAdmin && (
                        <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                          Admin
                        </span>
                      )}
                    </div>
                    <Button
                      onClick={() => {
                        handleLogout();
                        toggleMenu();
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Cerrar Sesión
                    </Button>
                  </div>
                ) : (
                  <Link to="/login" onClick={toggleMenu}>
                    <Button className="w-full">
                      <LogIn className="mr-2 h-4 w-4" />
                      Iniciar Sesión
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}