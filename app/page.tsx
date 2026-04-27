'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Star, ChevronLeft, ChevronRight, TrendingUp, Package, Wrench, BookOpen, Users, Truck, Shield, CreditCard } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ServiceCard from '@/components/ServiceCard';
import EbookCard from '@/components/EbookCard';
import VendorCard from '@/components/VendorCard';
import Chat from '@/components/Chat';
import AIAssistant from '@/components/AIAssistant';
import { products, services, ebooks, vendors, categories, formatPrice, getFlashSaleProducts } from '@/data/mockData';
import styles from './page.module.css';

export default function Home() {
  const [flashProducts, setFlashProducts] = useState(getFlashSaleProducts());
  const [timeRemaining, setTimeRemaining] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [currentSlide, setCurrentSlide] = useState(0);

  // Countdown timer for flash sales
  useEffect(() => {
    const targetDate = new Date(Date.now() + 8 * 60 * 60 * 1000); // 8 hours from now
    
    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      
      if (diff <= 0) {
        clearInterval(timer);
        return;
      }
      
      setTimeRemaining({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Auto-rotate hero slides
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, []);

  return (
    <main className={styles.main}>
      <Header />
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroPattern}></div>
          <div className={styles.heroGradient}></div>
        </div>
        
        <div className={styles.heroContent}>
          <motion.div
            className={styles.heroText}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.heroBadge}>
              <Zap size={14} />
              La marketplace N°1 au Bénin
            </span>
            <h1 className={styles.heroTitle}>
              Achetez et vendez <span className={styles.highlight}>facilement</span> au Bénin
            </h1>
            <p className={styles.heroSubtitle}>
              Découvrez des milliers de produits, services et ebooks proposés par des vendeurs locaux de confiance. Paiement sécurisé via MTN MoMo, Moov Money et Celtiis Cash.
            </p>
            <div className={styles.heroCta}>
              <Link href="/boutique" className="btn btn-secondary btn-lg">
                Découvrir
                <ArrowRight size={20} />
              </Link>
              <Link href="/vendeur/produits" className="btn btn-outline btn-lg">
                Commencer à vendre
              </Link>
            </div>
            
            {/* Trust Badges */}
            <div className={styles.trustBadges}>
              <div className={styles.trustBadge}>
                <Shield size={18} />
                <span>Paiement sécurisé</span>
              </div>
              <div className={styles.trustBadge}>
                <Truck size={18} />
                <span>Livraison partout</span>
              </div>
              <div className={styles.trustBadge}>
                <Users size={18} />
                <span>500+ vendeurs</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            className={styles.heroVisual}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.heroCard}>
              <img 
                src="https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=500&fit=crop" 
                alt="Shopping"
                className={styles.heroImage}
              />
            </div>
            <div className={styles.heroCard2}>
              <img 
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=350&fit=crop" 
                alt="Products"
                className={styles.heroImage2}
              />
            </div>
            <div className={styles.floatingCard}>
              <div className={styles.floatingCardIcon}>
                <Package size={24} />
              </div>
              <div>
                <span className={styles.floatingCardValue}>2500+</span>
                <span className={styles.floatingCardLabel}>Produits</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <div className={styles.statsBar}>
          <div className={styles.statsContainer}>
            <div className={styles.stat}>
              <span className={styles.statValue}>50 000+</span>
              <span className={styles.statLabel}>Produits</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>500+</span>
              <span className={styles.statLabel}>Vendeurs</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>1000+</span>
              <span className={styles.statLabel}>Services</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>200+</span>
              <span className={styles.statLabel}>Ebooks</span>
            </div>
          </div>
        </div>
      </section>

      {/* Flash Sales Section */}
      <section className={styles.flashSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.flashHeaderLeft}>
              <div className={styles.flashIcon}>
                <Zap size={24} />
              </div>
              <div>
                <h2 className={styles.sectionTitle}>Ventes Flash</h2>
                <p className={styles.sectionSubtitle}>Offres limitées - Dépêchez-vous!</p>
              </div>
            </div>
            <div className={styles.countdown}>
              <div className={styles.countdownItem}>
                <span className={styles.countdownValue}>{String(timeRemaining.hours).padStart(2, '0')}</span>
                <span className={styles.countdownLabel}>Heures</span>
              </div>
              <span className={styles.countdownSeparator}>:</span>
              <div className={styles.countdownItem}>
                <span className={styles.countdownValue}>{String(timeRemaining.minutes).padStart(2, '0')}</span>
                <span className={styles.countdownLabel}>Minutes</span>
              </div>
              <span className={styles.countdownSeparator}>:</span>
              <div className={styles.countdownItem}>
                <span className={styles.countdownValue}>{String(timeRemaining.seconds).padStart(2, '0')}</span>
                <span className={styles.countdownLabel}>Secondes</span>
              </div>
            </div>
            <Link href="/boutique?flash=true" className={styles.seeAll}>
              Tout voir <ArrowRight size={16} />
            </Link>
          </div>

          <div className={styles.productsGrid}>
            {flashProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className={styles.categoriesSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Catégories</h2>
          
          <div className={styles.categoriesGrid}>
            {categories.slice(0, 8).map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/boutique?cat=${category.slug}`} className={styles.categoryCard}>
                  <div className={styles.categoryIcon}>
                    {category.icon === 'smartphone' && <Package size={24} />}
                    {category.icon === 'shirt' && <Package size={24} />}
                    {category.icon === 'apple' && <Package size={24} />}
                    {category.icon === 'home' && <Package size={24} />}
                    {category.icon === 'wrench' && <Wrench size={24} />}
                    {category.icon === 'book' && <BookOpen size={24} />}
                    {category.icon === 'dumbbell' && <Package size={24} />}
                    {category.icon === 'car' && <Package size={24} />}
                  </div>
                  <span className={styles.categoryName}>{category.name}</span>
                  <span className={styles.categoryCount}>{category.count} articles</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products Section */}
      <section className={styles.productsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeaderRow}>
            <h2 className={styles.sectionTitle}>Produits Populaires</h2>
            <Link href="/boutique" className={styles.seeAll}>
              Tout voir <ArrowRight size={16} />
            </Link>
          </div>

          <div className={styles.productsGrid}>
            {products.slice(0, 8).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeaderRow}>
            <h2 className={styles.sectionTitle}>Services Populaires</h2>
            <Link href="/services" className={styles.seeAll}>
              Tout voir <ArrowRight size={16} />
            </Link>
          </div>

          <div className={styles.servicesGrid}>
            {services.slice(0, 4).map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <div className={styles.featuresGrid}>
            <motion.div
              className={styles.featureCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className={styles.featureIcon}>
                <CreditCard size={28} />
              </div>
              <h3>Paiements Locaux</h3>
              <p>Payez facilement avec MTN MoMo, Moov Money ou Celtiis Cash</p>
            </motion.div>
            
            <motion.div
              className={styles.featureCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className={styles.featureIcon}>
                <Truck size={28} />
              </div>
              <h3>Livraison au Benin</h3>
              <p>Livraison à Cotonou, Calavi, Porto-Novo et dans tout le pays</p>
            </motion.div>
            
            <motion.div
              className={styles.featureCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className={styles.featureIcon}>
                <Shield size={28} />
              </div>
              <h3>Achats Sécurisés</h3>
              <p>Protection acheteur et paiement sécuriségaranti</p>
            </motion.div>
            
            <motion.div
              className={styles.featureCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className={styles.featureIcon}>
                <Users size={28} />
              </div>
              <h3>Communauté Active</h3>
              <p>Rejoignez des milliers de vendeurs et acheteurs au Benin</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ebooks Section */}
      <section className={styles.ebooksSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeaderRow}>
            <h2 className={styles.sectionTitle}>Ebooks Recommandés</h2>
            <Link href="/ebooks" className={styles.seeAll}>
              Tout voir <ArrowRight size={16} />
            </Link>
          </div>

          <div className={styles.ebooksGrid}>
            {ebooks.slice(0, 4).map((ebook, index) => (
              <EbookCard key={ebook.id} ebook={ebook} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Vendors Section */}
      <section className={styles.vendorsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeaderRow}>
            <h2 className={styles.sectionTitle}>Vendeurs Populaires</h2>
            <Link href="/vendeurs" className={styles.seeAll}>
              Tout voir <ArrowRight size={16} />
            </Link>
          </div>

          <div className={styles.vendorsGrid}>
            {vendors.slice(0, 4).map((vendor, index) => (
              <VendorCard key={vendor.id} vendor={vendor} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.ctaCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className={styles.ctaContent}>
              <h2>Commencez à vendre sur Marketplace</h2>
              <p>Rejoignez des centaines de vendeurs béninois et développez votre activité en ligne</p>
              <div className={styles.ctaFeatures}>
                <span>✓ Création de boutique gratuite</span>
                <span>✓ Commission réduite</span>
                <span>✓ Paiements rapides</span>
              </div>
              <Link href="/vendeur/produits" className="btn btn-white btn-lg">
                Créer ma boutique
                <ArrowRight size={20} />
              </Link>
            </div>
            <div className={styles.ctaVisual}>
              <div className={styles.ctaCircle}>
                <TrendingUp size={48} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <Chat />
      <AIAssistant />
    </main>
  );
}