'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Filter, Grid, List, SlidersHorizontal, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import Chat from '@/components/Chat';
import AIAssistant from '@/components/AIAssistant';
import { products, categories, formatPrice } from '@/data/mockData';
import styles from './boutique.module.css';

const sortOptions = [
  { value: 'popular', label: 'Plus populaires' },
  { value: 'newest', label: 'Plus récents' },
  { value: 'price-asc', label: 'Prix: croissant' },
  { value: 'price-desc', label: 'Prix: décroissant' },
];

function BoutiqueContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('cat');
  
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [flashSaleOnly, setFlashSaleOnly] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategory !== 'all') {
      const cat = categories.find(c => c.slug === selectedCategory);
      if (cat) {
        filtered = filtered.filter(p => p.category === cat.name);
      }
    }

    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (inStockOnly) {
      filtered = filtered.filter(p => p.inStock);
    }

    if (flashSaleOnly) {
      filtered = filtered.filter(p => p.flashSale);
    }

    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [selectedCategory, priceRange, sortBy, inStockOnly, flashSaleOnly]);

  const activeFilters = [];
  if (selectedCategory !== 'all') activeFilters.push(selectedCategory);
  if (inStockOnly) activeFilters.push('En stock');
  if (flashSaleOnly) activeFilters.push('Flash');
  if (priceRange[0] > 0 || priceRange[1] < 1000000) activeFilters.push('Prix');

  return (
    <>
      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Boutique
          </motion.h1>
          <p className={styles.breadcrumb}>
            Accueil / Boutique {selectedCategory !== 'all' && `/ ${selectedCategory}`}
          </p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.layout}>
            <aside className={`${styles.sidebar} ${showFilters ? styles.sidebarOpen : ''}`}>
              <div className={styles.sidebarHeader}>
                <h3>Filtres</h3>
                <button className={styles.closeFilters} onClick={() => setShowFilters(false)}>
                  <X size={20} />
                </button>
              </div>

              <div className={styles.filterGroup}>
                <h4>Catégories</h4>
                <div className={styles.categoryList}>
                  <button
                    className={`${styles.categoryBtn} ${selectedCategory === 'all' ? styles.active : ''}`}
                    onClick={() => setSelectedCategory('all')}
                  >
                    Toutes les catégories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      className={`${styles.categoryBtn} ${selectedCategory === cat.slug ? styles.active : ''}`}
                      onClick={() => setSelectedCategory(cat.slug)}
                    >
                      {cat.name}
                      <span className={styles.categoryCount}>{cat.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.filterGroup}>
                <h4>Prix (FCFA)</h4>
                <div className={styles.priceInputs}>
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    placeholder="Min"
                    className={styles.priceInput}
                  />
                  <span>à</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    placeholder="Max"
                    className={styles.priceInput}
                  />
                </div>
              </div>

              <div className={styles.filterGroup}>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                  />
                  <span className={styles.checkmark}></span>
                  En stock uniquement
                </label>
              </div>

              <div className={styles.filterGroup}>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={flashSaleOnly}
                    onChange={(e) => setFlashSaleOnly(e.target.checked)}
                  />
                  <span className={styles.checkmark}></span>
                  Ventes flash uniquement
                </label>
              </div>

              <button
                className={styles.resetBtn}
                onClick={() => {
                  setSelectedCategory('all');
                  setPriceRange([0, 1000000]);
                  setInStockOnly(false);
                  setFlashSaleOnly(false);
                }}
              >
                Réinitialiser les filtres
              </button>
            </aside>

            <div className={styles.mainContent}>
              <div className={styles.toolbar}>
                <div className={styles.resultsInfo}>
                  <span>{filteredProducts.length} produits</span>
                  {activeFilters.length > 0 && (
                    <div className={styles.activeFilters}>
                      {activeFilters.map((filter, i) => (
                        <span key={i} className={styles.filterTag}>
                          {filter}
                          <button onClick={() => {
                            if (filter === 'En stock') setInStockOnly(false);
                            else if (filter === 'Flash') setFlashSaleOnly(false);
                            else if (filter === 'Prix') setPriceRange([0, 1000000]);
                            else setSelectedCategory('all');
                          }}>
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className={styles.toolbarRight}>
                  <button
                    className={styles.filterToggle}
                    onClick={() => setShowFilters(true)}
                  >
                    <SlidersHorizontal size={18} />
                    Filtres
                  </button>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className={styles.sortSelect}
                  >
                    {sortOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {filteredProducts.length > 0 ? (
                <div className={styles.productsGrid}>
                  {filteredProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              ) : (
                <div className={styles.noResults}>
                  <p>Aucun produit ne correspond à vos critères</p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setPriceRange([0, 1000000]);
                      setInStockOnly(false);
                      setFlashSaleOnly(false);
                    }}
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function BoutiquePage() {
  return (
    <main className={styles.main}>
      <Header />
      <Suspense fallback={
        <div className={styles.loading}>
          <p>Chargement...</p>
        </div>
      }>
        <BoutiqueContent />
      </Suspense>
      <Footer />
      <Chat />
      <AIAssistant />
    </main>
  );
}