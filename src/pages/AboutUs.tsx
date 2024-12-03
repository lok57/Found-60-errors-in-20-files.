import { useEffect } from 'react';
import { Users, Target, Award, ShieldCheck, Gem, Clock } from 'lucide-react';
import ParallaxSection from '../components/ParallaxSection';

export default function AboutUs() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const values = [
    {
      icon: ShieldCheck,
      title: 'Quality Assurance',
      description: 'Every product meets our rigorous standards for excellence.'
    },
    {
      icon: Gem,
      title: 'Premium Selection',
      description: 'Curated collections featuring the finest materials and craftsmanship.'
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Dedicated to providing exceptional service and experience.'
    },
    {
      icon: Clock,
      title: 'Timeless Style',
      description: 'Creating enduring fashion that transcends trends.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Luxury Storefront */}
      <ParallaxSection
        backgroundImage="https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&q=80&w=3440"
        className="h-[70vh] flex items-center"
        speed={0.5}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Our Story
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto animate-fade-in delay-300">
            Crafting luxury experiences since 1970
          </p>
        </div>
      </ParallaxSection>

      {/* Mission Section - Elegant Workshop */}
      <ParallaxSection
        backgroundImage="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=3440"
        className="py-24"
        speed={0.3}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 text-white">
            <div className="max-w-3xl mx-auto text-center animate-on-scroll opacity-0">
              <Target className="w-12 h-12 mx-auto mb-6 text-accent-500" />
              <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-white/80 leading-relaxed">
                At LUXE, we're dedicated to redefining luxury fashion through innovation and sustainability. 
                Our mission is to provide discerning customers with exceptional quality products while 
                maintaining our commitment to ethical practices and environmental responsibility.
              </p>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* Values Section - Fashion Design Studio */}
      <ParallaxSection
        backgroundImage="https://images.unsplash.com/photo-1537832816519-689ad163238b?auto=format&fit=crop&q=80&w=3440"
        className="py-24"
        speed={0.4}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <Award className="w-12 h-12 mx-auto mb-6 text-accent-500" />
            <h2 className="text-4xl font-bold text-white mb-6">Our Values</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Built on a foundation of excellence, our values guide every decision we make
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-white/10 backdrop-blur-md rounded-xl p-8 text-white animate-on-scroll opacity-0"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <value.icon className="w-10 h-10 mb-4 text-accent-500" />
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-white/80">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* Stats Section - Modern Retail Space */}
      <ParallaxSection
        backgroundImage="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=3440"
        className="py-24"
        speed={0.2}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
              <div className="text-center animate-on-scroll opacity-0">
                <div className="text-5xl font-bold mb-2">50+</div>
                <div className="text-white/80">Global Locations</div>
              </div>
              <div className="text-center animate-on-scroll opacity-0" style={{ animationDelay: '200ms' }}>
                <div className="text-5xl font-bold mb-2">1M+</div>
                <div className="text-white/80">Happy Customers</div>
              </div>
              <div className="text-center animate-on-scroll opacity-0" style={{ animationDelay: '400ms' }}>
                <div className="text-5xl font-bold mb-2">100K+</div>
                <div className="text-white/80">Products Sold</div>
              </div>
            </div>
          </div>
        </div>
      </ParallaxSection>
    </div>
  );
}