'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EbookCard from '@/components/EbookCard';
import Chat from '@/components/Chat';
import AIAssistant from '@/components/AIAssistant';
import { ebooks } from '@/data/mockData';
import styles from '../page.module.css';

const categories = [
  { id: 'all', name: 'Tous', icon: '📚' },
  { id: 'Business', name: 'Business', icon: '💼' },
  { id: 'Cuisine', name: 'Cuisine', icon: '🍳' },
  { id: 'Programmation', name: 'Programmation', icon: '💻' },
  { id: 'Éducation', name: 'Éducation', icon: '📖' },
];

export default function EbooksPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const filteredEbooks = ebooks.filter(e => 
    selectedCategory === 'all' || e.category === selectedCategory
  );

  return (
    <main>
      <Header />
      
      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Ebooks
          </motion.h1>
          <p>Téléchargez des guides et livres numériques pour réussir</p>
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
                <span>{filteredEbooks.length} ebooks</span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={styles.sortSelect}>
                  <option value="popular">Plus populaires</option>
                  <option value="rating">Mieux notés</option>
                  <option value="price-asc">Prix croissant</option>
                </select>
              </div>

              <div className={styles.ebooksGrid}>
                {filteredEbooks.map((ebook, index) => (
                  <EbookCard key={ebook.id} ebook={ebook} index={index} />
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