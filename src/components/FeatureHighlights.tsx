import { Shield, Truck, RefreshCw, Package } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Secure Payments',
    description:
      'Shop with confidence knowing that your transactions are safeguarded.',
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    description:
      'Shopping with no extra charges – savor the liberty of complimentary shipping on every order.',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description:
      'With our hassle-free Easy Returns, changing your mind has never been more convenient.',
  },
  {
    icon: Package,
    title: 'Order Tracking',
    description:
      'Stay in the loop with our Order Tracking feature – from checkout to your doorstep.',
  },
];

export default function FeatureHighlights() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-black text-white rounded-full mb-4">
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
