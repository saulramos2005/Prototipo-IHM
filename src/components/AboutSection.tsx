import { ImageWithFallback } from './figma/ImageWithFallback'
import { stats } from '../data/constants'

export function AboutSection() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-semibled mb-6">
              Sobre New Top C.A.
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Desde 2010, New Top se ha consolidado como líder en la fabricación e instalación 
              de mármol, granito y cuarzo de la más alta calidad. Nuestra pasión por la excelencia 
              y el detalle nos ha permitido transformar miles de espacios.
            </p>
            <p className="text-muted-foreground mb-8">
              Contamos con tecnología de punta en corte CNC, un equipo de artesanos especializados 
              y una amplia selección de materiales importados y nacionales. Desde cocinas y baños 
              residenciales hasta proyectos comerciales de gran escala, garantizamos acabados 
              impecables y durabilidad excepcional.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2 text-primary">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-semibold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1696952384873-f3cfff78beef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJibGUlMjB3b3Jrc2hvcCUyMGZhYnJpY2F0aW9ufGVufDF8fHx8MTc2OTkwOTkyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Taller de Marmolería Elite"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}