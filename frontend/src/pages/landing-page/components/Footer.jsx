import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Platform',
      links: [
        { label: 'Browse Athletes', path: '/athlete-profile-view' },
        { label: 'How It Works', path: '/about' },
        { label: 'Success Stories', path: '/testimonials' },
        { label: 'Pricing', path: '/pricing' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', path: '/help' },
        { label: 'Contact Us', path: '/contact' },
        { label: 'Safety Guidelines', path: '/safety' },
        { label: 'Report Issue', path: '/report' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Terms of Service', path: '/terms' },
        { label: 'Privacy Policy', path: '/privacy' },
        { label: 'Cookie Policy', path: '/cookies' },
        { label: 'Refund Policy', path: '/refunds' }
      ]
    },
    {
      title: 'Community',
      links: [
        { label: 'Blog', path: '/blog' },
        { label: 'Events', path: '/events' },
        { label: 'Newsletter', path: '/newsletter' },
        { label: 'Partner Program', path: '/partners' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: 'Facebook', url: 'https://facebook.com/athletefund' },
    { name: 'Twitter', icon: 'Twitter', url: 'https://twitter.com/athletefund' },
    { name: 'Instagram', icon: 'Instagram', url: 'https://instagram.com/athletefund' },
    { name: 'LinkedIn', icon: 'Linkedin', url: 'https://linkedin.com/company/athletefund' },
    { name: 'YouTube', icon: 'Youtube', url: 'https://youtube.com/athletefund' }
  ];

  const contactInfo = [
    {
      icon: 'Mail',
      label: 'Email',
      value: 'support@athletefund.com',
      link: 'mailto:support@athletefund.com'
    },
    {
      icon: 'Phone',
      label: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: 'MapPin',
      label: 'Address',
      value: '123 Sports Avenue, Athletic City, AC 12345',
      link: null
    }
  ];

  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/landing-page" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={24} color="white" />
              </div>
              <span className="font-heading font-bold text-xl text-primary">AthleteFund</span>
            </Link>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Connecting athletes with sponsors to fund dreams, support recovery, and build the future of sports.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              {contactInfo.map((contact) => (
                <div key={contact.label} className="flex items-start space-x-3">
                  <Icon name={contact.icon} size={16} className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">
                      {contact.label}
                    </div>
                    {contact.link ? (
                      <a 
                        href={contact.link}
                        className="text-sm text-foreground hover:text-primary transition-colors duration-200"
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <div className="text-sm text-foreground">{contact.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-muted hover:bg-primary rounded-lg flex items-center justify-center transition-colors duration-200 group"
                >
                  <Icon 
                    name={social.icon} 
                    size={18} 
                    className="text-muted-foreground group-hover:text-white transition-colors duration-200" 
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {footerSections.map((section) => (
                <div key={section.title}>
                  <h3 className="font-heading font-semibold text-foreground mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          to={link.path}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
              Stay Updated
            </h3>
            <p className="text-muted-foreground mb-6">
              Get the latest success stories, platform updates, and funding opportunities delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <Button variant="default" iconName="Send" iconPosition="right">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-muted-foreground">
              © {currentYear} AthleteFund. All rights reserved.
            </div>

            {/* Trust Badges */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-primary" />
                <span className="text-xs text-muted-foreground">SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={16} className="text-secondary" />
                <span className="text-xs text-muted-foreground">Verified Platform</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={16} className="text-warning" />
                <span className="text-xs text-muted-foreground">Trusted by 50K+</span>
              </div>
            </div>

            {/* Language/Region */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Globe" size={16} />
              <span>English (US)</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;