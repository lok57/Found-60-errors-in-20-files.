import { useEffect } from 'react';
import { Shield, Lock, Eye, UserCheck, Globe, Bell } from 'lucide-react';
import ParallaxSection from '../components/ParallaxSection';

export default function PrivacyPolicy() {
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

  const sections = [
    {
      id: 'data-collection',
      icon: Eye,
      title: 'Data Collection',
      content: `We collect various types of information to provide and improve our services:

• Personal Information: Name, email address, phone number, billing and shipping addresses
• Payment Information: Credit card details (processed securely through our payment providers)
• Technical Data: IP address, browser type, device information
• Usage Data: Browsing patterns, product preferences, purchase history
• Cookies: We use cookies and similar tracking technologies to enhance your experience`
    },
    {
      id: 'data-usage',
      icon: UserCheck,
      title: 'Data Usage',
      content: `Your data helps us provide a better shopping experience:

• Processing and fulfilling your orders
• Personalizing your shopping experience
• Communicating about orders, products, and promotions
• Improving our website and services
• Preventing fraud and maintaining security

We may share data with trusted third parties who assist us in operating our website, conducting business, or servicing you.`
    },
    {
      id: 'data-protection',
      icon: Lock,
      title: 'Data Protection',
      content: `We implement robust security measures to protect your data:

• SSL/TLS encryption for all data transmission
• Secure storage on protected servers
• Regular security assessments and updates
• Strict access controls and authentication
• Compliance with industry security standards`
    },
    {
      id: 'user-rights',
      icon: Shield,
      title: 'Your Rights',
      content: `You have the right to:

• Access your personal data
• Correct inaccurate data
• Request deletion of your data
• Withdraw consent for data processing
• Object to data processing
• Request data portability
• Lodge a complaint with supervisory authorities`
    },
    {
      id: 'international',
      icon: Globe,
      title: 'International Transfers',
      content: `For international customers:

• Data may be transferred to servers in different countries
• We ensure appropriate safeguards are in place
• Transfers comply with applicable data protection laws
• Standard contractual clauses are implemented where required
• Privacy Shield principles are followed for US transfers`
    },
    {
      id: 'updates',
      icon: Bell,
      title: 'Policy Updates',
      content: `We may update this Privacy Policy periodically:

• Changes will be posted on this page
• Material changes will be notified via email
• Continued use of our services after changes constitutes acceptance
• Last updated: ${new Date().toLocaleDateString()}`
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ParallaxSection
        backgroundImage="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=3440"
        className="h-[40vh] flex items-center"
        speed={0.5}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Your privacy is important to us. Learn how we protect and manage your personal information.
          </p>
        </div>
      </ParallaxSection>

      {/* Main Content */}
      <ParallaxSection
        backgroundImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=3440"
        className="py-24"
        speed={0.3}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 mb-8 text-white animate-on-scroll opacity-0">
            <p className="text-lg leading-relaxed">
              This Privacy Policy applies to all services provided by LUXE and explains how we collect,
              use, disclose, and safeguard your personal information. By using our services, you agree
              to the collection and use of information in accordance with this policy.
            </p>
          </div>

          {/* Policy Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="bg-white/10 backdrop-blur-md rounded-xl p-8 text-white animate-on-scroll opacity-0"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <section.icon className="w-8 h-8 text-accent-500" />
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                </div>
                <div className="prose prose-lg prose-invert max-w-none opacity-80">
                  <pre className="whitespace-pre-wrap font-sans">{section.content}</pre>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Information */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 mt-8 text-white text-center animate-on-scroll opacity-0">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-white/80 mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <a
              href="mailto:privacy@luxe.com"
              className="text-accent-400 hover:text-accent-300 transition-colors"
            >
              privacy@luxe.com
            </a>
          </div>
        </div>
      </ParallaxSection>
    </div>
  );
}