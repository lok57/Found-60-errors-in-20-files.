import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const collections = [
  {
    id: 1,
    title: "Luxury Electronics",
    description: 'Premium Tech & Gadgets',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=3440',
    category: 'electronics',
    path: '/electronics',
    accent: 'from-blue-500/20 to-purple-500/20'
  },
  {
    id: 2,
    title: "Men's Essentials",
    description: 'Timeless Style for Modern Men',
    image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=3440&q=80',
    category: 'men',
    path: '/men',
    accent: 'from-amber-500/20 to-red-500/20'
  },
  {
    id: 3,
    title: "Women's Collection",
    description: 'Elegance Redefined',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=3440&q=80',
    category: 'women',
    path: '/women',
    accent: 'from-pink-500/20 to-rose-500/20'
  },
  {
    id: 4,
    title: 'Luxury Timepieces',
    description: 'Where Time Meets Style',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=3440&q=80',
    category: 'watches',
    path: '/watches',
    accent: 'from-emerald-500/20 to-teal-500/20'
  }
];

export default function FeaturedCollections() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-accent-600" />
            <h2 className="text-3xl font-bold text-white">Featured Collections</h2>
          </div>
          <p className="text-white/70 max-w-2xl mx-auto">
            Explore our curated selection of premium collections, each telling a unique story of style and sophistication
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((collection, index) => (
            <Link
              key={collection.id}
              to={collection.path}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${collection.accent} backdrop-blur-sm border border-white/10 ${
                index === 0 ? 'md:col-span-2 aspect-[2.4/1]' : 'aspect-[1.5/1]'
              }`}
            >
              {/* Background Image with Parallax Effect */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${collection.image})` }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-75" />

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-8">
                <div className="transform transition-transform duration-300 group-hover:translate-y-0 translate-y-8">
                  <h3 className="text-3xl font-bold text-white mb-3">
                    {collection.title}
                  </h3>
                  <p className="text-white/80 mb-6 transform opacity-0 transition-all duration-300 group-hover:opacity-100">
                    {collection.description}
                  </p>
                  <div className="inline-flex items-center gap-2 text-white font-medium opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <span>Explore Collection</span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-6 right-6">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-white/5 to-transparent rounded-tr-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
          ))}
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent-600/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
}