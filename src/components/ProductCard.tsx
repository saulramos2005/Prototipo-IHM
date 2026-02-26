'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { Ruler, Sparkles, Grip, Layers } from 'lucide-react'
import { Product } from '../data/products'
import { QuoteForm } from './QuoteForm'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer"

interface ProductCardProps {
  product: Product
  viewMode: string
}

export function ProductCard({ product, viewMode }: ProductCardProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <>
      {viewMode === "grid" ? (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative h-64">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
              {product.type}
            </Badge>
          </div>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
            <CardDescription>{product.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Ruler className="h-4 w-4" />
                <span>{product.dimensions}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4" />
                <span>{product.finish}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Layers className="h-4 w-4" />
              <span>{product.application}</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {product.features.slice(0, 3).map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center pt-4 border-t border-(--card-border)">
            <div>
              <p className="text-xs text-muted-foreground">Desde</p>
              <p className="text-2xl font-semibold text-primary">${product.price}<span className="text-sm font-normal text-muted-foreground">/m²</span></p>
            </div>
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setIsDrawerOpen(true)}
            >
              Solicitar Cotización
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div
            key={product.id}
            className="bg-white rounded-xl shadow-lg flex items-center gap-6 hover:shadow-2xl transition-all"
          >
            <div className={`w-24 h-24 rounded-lg flex-shrink-0`}>
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <div className="flex items-center flex-wrap gap-2 text-sm text-gray-700">
                <Ruler className="h-4 w-4" />
                <span>  {product.dimensions}</span>
                <Sparkles className="h-4 w-4" />
                <span>  {product.finish}</span>
                <Layers className="h-4 w-4" />
                <span>  {product.application}</span>
                <span><strong>Tipo:</strong> {product.type}</span>
                <span><strong>Precio:</strong> ${product.price}/m²</span>
              </div>
            </div>
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setIsDrawerOpen(true)}
            >
              Solicitar Cotización
            </Button>
          </div>
        ) 
      }
      
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader>
            <DrawerTitle>Solicitar Cotización</DrawerTitle>
            <DrawerDescription>
              Complete el formulario y nos pondremos en contacto con usted en menos de 24 horas
            </DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto">
            <QuoteForm product={product} onClose={() => setIsDrawerOpen(false)} />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}
