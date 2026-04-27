'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import Chat from '@/components/Chat';
import AIAssistant from '@/components/AIAssistant';
import { services } from '@/data/mockData';
import styles from '../page.module.css';

const categories = [
  { id: 'all', name: 'Tous', icon: '🔧' },
  { id: 'Développement', name: 'Développement', icon: '💻' },
  { id: 'Design', name: 'Design', icon: '🎨' },
  { id: 'Réparation', name: 'Réparation', icon: '🔧' },
  { id: 'Livraison', name: 'Livraison', icon: '🚚' },
];

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const filteredServices = services.filter(s => 
    selectedCategory === 'all' || s.category === selectedCategory
  );

  return (
    <main>
      <Header />
      
      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Services
          </motion.h1>
          <p>Trouvez des prestataires pour tous vos besoins au Bénin</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.layout}>
            <aside className={styles.sidebar}>
              <div className={styles.filterGroup}>
                <h4>Catégories</h4>
                <div className={styles.categoryList}>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      className={`${styles.categoryBtn} ${selectedCategory === cat.id ? styles.active : ''}`}
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      <span>{cat.icon}</span>
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            <div className={styles.mainContent}>
              <div className={styles.toolbar}>
                <span>{filteredServices.length} services</span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={styles.sortSelect}>
                  <option value="popular">Plus populaires</option>
                  <option value="rating">Mieux notés</option>
                </select>
              </div>

              <div className={styles.servicesGrid}>
                {filteredServices.map((service, index) => (
                  <ServiceCard key={service.id} service={service} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Chat />
      <AIAssistant />
    </main>
  );
}