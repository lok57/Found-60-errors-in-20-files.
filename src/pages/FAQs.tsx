import { useState } from 'react';
import { ChevronDown, HelpCircle, Package, CreditCard, Globe, Gift, MessageCircle } from 'lucide-react';
import ParallaxSection from '../components/ParallaxSection';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  icon: React.ElementType;
}

const faqs: FAQ[] = [
  {
    id: 'returns',
    question: 'What is your return policy?',
    answer: 'We do not accept returns for any products. However, exchanges are available for items that are defective or incorrect. Please contact our customer service team for assistance with exchanges.',
    icon: Package
  },
  {
    id: 'tracking',
    question: 'How can I track my order?',
    answer: 'Once your order has shipped, you will receive a tracking number via email, which you can use to track the delivery status.',
    icon: Package
  },
  {
    id: 'contact',
    question: 'How can I contact customer service?',
    answer: 'You can reach our customer service team at support@yourstore.com or through the contact form on our website. We aim to respond within 24-48 hours.',
    icon: MessageCircle
  },
  {
    id: 'payment',
    question: 'What payment methods do you accept?',
    answer: 'We accept payments through various methods including Visa, MasterCard, American Express, PayPal, and Apple Pay.',
    icon: CreditCard
  },
  {
    id: 'shipping',
    question: 'Do you ship internationally?',
    answer: 'Yes, we offer international shipping to select countries. Rates and delivery times vary by destination.',
    icon: Globe
  },
  {
    id: 'modification',
    question: 'Can I modify or cancel my order after placing it?',
    answer: 'Orders are processed quickly. Please contact us immediately if you need to make changes or cancel your order, and we will try to accommodate your request before shipping.',
    icon: Package
  },
  {
    id: 'giftcards',
    question: 'Do you offer gift cards?',
    answer: 'Yes, we offer digital gift cards that can be used for purchases on our site.',
    icon: Gift
  },
  {
    id: 'damaged',
    question: 'What should I do if I received a damaged or incorrect item?',
    answer: 'If you receive a damaged or incorrect item, please contact our customer service team right away at support@yourstore.com. We will assist you with exchanging the product.',
    icon: Package
  },
  {
    id: 'account',
    question: 'How do I create an account?',
    answer: 'Click on the "Sign Up" button on our website, fill in your details, and you will be able to track your orders, save favorite items, and more.',
    icon: HelpCircle
  }
];

export default function FAQs() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ParallaxSection
        backgroundImage="https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&q=80&w=3440"
        className="h-[40vh] flex items-center"
        speed={0.5}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Find answers to common questions about our services and policies
          </p>
        </div>
      </ParallaxSection>

      {/* FAQs Section */}
      <ParallaxSection
        backgroundImage="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=3440"
        className="py-24"
        speed={0.3}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-4 flex items-center justify-between text-white hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <faq.icon className="w-5 h-5 text-accent-500" />
                    <span className="text-lg font-medium text-left">{faq.question}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      openId === faq.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`px-6 overflow-hidden transition-all duration-300 ${
                    openId === faq.id ? 'max-h-48 py-4' : 'max-h-0'
                  }`}
                >
                  <p className="text-white/80">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-16 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-white/80 mb-8">
              Our customer service team is here to help you with any other questions you may have.
            </p>
            <a
              href="mailto:support@yourstore.com"
              className="inline-flex items-center space-x-2 bg-accent-600 text-white px-6 py-3 rounded-full hover:bg-accent-700 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Contact Support</span>
            </a>
          </div>
        </div>
      </ParallaxSection>
    </div>
  );
}