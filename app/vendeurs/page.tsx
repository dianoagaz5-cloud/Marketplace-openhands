'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VendorCard from '@/components/VendorCard';
import Chat from '@/components/Chat';
import AIAssistant from '@/components/AIAssistant';
import { vendors } from '@/data/mockData';
import styles from '../page.module.css';

export default function VendeursPage() {
  const [sortBy, setSortBy] = useState('popular');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVendors = vendors.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <Header />
      
      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Vendeurs
          </motion.h1>
          <p>Découvrez nos vendeurs de confiance au Bénin</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.toolbar}>
            <input 
              type="text" 
              placeholder="Rechercher un vendeur..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={styles.sortSelect}>
              <option value="popular">Plus populaires</option>
              <option value="rating">Mieux notés</option>
              <option value="products">Plus de produits</option>
            </select>
          </div>

          <div className={styles.vendorsGrid}>
            {filteredVendors.map((vendor, index) => (
              <VendorCard key={vendor.id} vendor={vendor} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <Chat />
      <AIAssistant />
    </main>
  );
}