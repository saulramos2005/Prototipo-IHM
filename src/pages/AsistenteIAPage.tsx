import { useState } from 'react'
import { Upload, Sparkles, Image as ImageIcon, Wand2 } from 'lucide-react'
import { Button } from "../components/ui/button"
import { products } from "../data/products"

export function AsistenteIA() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Asistente IA
          </h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Sube una foto de tu espacio y recibe sugerencias personalizadas de materiales y diseño
        </p>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center">
              <ImageIcon className="text-purple-600" size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#2C2C2C]">Visualización de Materiales</h3>
          </div>
          <p className="text-gray-600">
            Sube una foto estilo negativo de tu proyecto y visualiza cómo se vería con diferentes tonos de mármol y granito
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center">
              <Wand2 className="text-blue-600" size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#2C2C2C]">Sugerencias Inteligentes</h3>
          </div>
          <p className="text-gray-600">
            Recibe recomendaciones basadas en IA sobre los mejores materiales según el estilo de tu espacio
          </p>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white p-8 rounded-xl shadow-2xl">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Area */}
          <div>
            <h3 className="text-xl font-bold text-[#2C2C2C] mb-4">Sube tu Imagen</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-2 text-center hover:border-[#D4AF37] transition-all">
              {uploadedImage ? (
                <div className="relative">
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => setUploadedImage(null)}
                    className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <Upload className="text-gray-400" size={32} />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-[#2C2C2C] mb-1">
                        Haz clic para subir
                      </p>
                      <p className="text-sm text-gray-500">PNG, JPG hasta 10MB</p>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {uploadedImage && (
              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Selecciona Material para Visualizar
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] mb-4">
                  {products.map((p) => (
                    <option>{p.name}</option>
                    )
                   )
                  }
                </select>
                <Button
                  variant="outline"
                  onClick={() => setProcessing(true)}
                  disabled={processing}
                  className="w-full  py-3 rounded-lg hover:opacity-90 transition-all font-medium flex items-center justify-center gap-2"
                >
                  {processing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Procesando...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      Generar Visualización con IA
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Suggestions Area */}
          <div>
            <h3 className="text-xl font-bold text-[#2C2C2C] mb-4">Sugerencias de IA</h3>
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6">
              {uploadedImage ? (
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-semibold text-[#2C2C2C] mb-1">
                          Material Recomendado
                        </p>
                        <p className="text-gray-600 text-sm">
                          Calacatta Gold - Perfecto para cocinas modernas con iluminación natural
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-semibold text-[#2C2C2C] mb-1">
                          Consejo de Diseño
                        </p>
                        <p className="text-gray-600 text-sm">
                          Combina con accesorios cromados para resaltar las vetas doradas
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-semibold text-[#2C2C2C] mb-1">
                          Alternativa Económica
                        </p>
                        <p className="text-gray-600 text-sm">
                          Travertino Romano - Similar estética, precio más accesible
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <div className="text-center">
                    <Sparkles size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Sube una imagen para recibir sugerencias</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
