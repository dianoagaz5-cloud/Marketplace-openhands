import type { Metadata } from 'next';
import { AppProvider } from '@/contexts/AppContext';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Marketplace - Achetez et vendez facilement au Bénin',
  description: 'La première marketplace multi-vendeurs du Benin. Achetez des produits physiques, des services et des ebooks.',
  keywords: 'marketplace, benin, achat, vente, produits, services, ebooks, cotonou',
  openGraph: {
    title: 'Marketplace - Achetez et vendez facilement au Benin',
    description: 'La premiere marketplace multi-vendeurs du Benin',
    type: 'website',
    locale: 'fr_BJ',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}