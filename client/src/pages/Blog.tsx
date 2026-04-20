/*
 * Blog Listing Page
 * 
 * Features:
 * - Grid layout of blog posts
 * - Category filters (All, Case Studies, AI Insights, How-To Guides)
 * - Search functionality
 * - Responsive design
 * - Multilingual support (EN/ES/RO)
 */

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Clock, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { trpc } from '@/lib/trpc';

type BlogCategory = 'all' | 'case-study' | 'ai-insights' | 'how-to-guide';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorRole: string | null;
  coverImage: string | null;
  readingTime: number | null;
  publishedAt: Date | null;
}

export default function Blog() {
  const { t, locale } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch blog posts from database
  const { data: blogPostsData, isLoading } = trpc.blog.getAllPosts.useQuery({ locale });
  const blogPosts: BlogPost[] = blogPostsData || [];

  const categories = [
    { id: 'all' as BlogCategory, label: locale === 'es' ? 'Todos' : locale === 'ro' ? 'Toate' : 'All' },
    { id: 'case-study' as BlogCategory, label: locale === 'es' ? 'Casos de Éxito' : locale === 'ro' ? 'Studii de Caz' : 'Case Studies' },
    { id: 'ai-insights' as BlogCategory, label: locale === 'es' ? 'Insights de IA' : locale === 'ro' ? 'Perspective AI' : 'AI Insights' },
    { id: 'how-to-guide' as BlogCategory, label: locale === 'es' ? 'Guías Prácticas' : locale === 'ro' ? 'Ghiduri Practice' : 'How-To Guides' },
  ];

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'case-study':
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
      case 'ai-insights':
        return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20';
      case 'how-to-guide':
        return 'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString(locale === 'es' ? 'es-ES' : locale === 'ro' ? 'ro-RO' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {locale === 'es' ? 'Blog de Klarson AI' : locale === 'ro' ? 'Blogul Klarson AI' : 'Klarson AI Blog'}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                {locale === 'es' 
                  ? 'Casos de éxito, insights de IA y guías prácticas para transformar tu negocio con inteligencia artificial'
                  : locale === 'ro'
                  ? 'Studii de caz, perspective AI și ghiduri practice pentru a transforma afacerea ta cu inteligență artificială'
                  : 'Case studies, AI insights, and practical guides to transform your business with artificial intelligence'}
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={locale === 'es' ? 'Buscar artículos...' : locale === 'ro' ? 'Căutare articole...' : 'Search articles...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-8 border-b border-border/50">
          <div className="container">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.id)}
                  className="rounded-full"
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="container">
            {isLoading ? (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground">
                  {locale === 'es' ? 'Cargando artículos...' : locale === 'ro' ? 'Se încarcă articolele...' : 'Loading articles...'}
                </p>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground mb-4">
                  {locale === 'es' 
                    ? 'Próximamente: Contenido exclusivo sobre IA y automatización'
                    : locale === 'ro'
                    ? 'În curând: Conținut exclusiv despre AI și automatizare'
                    : 'Coming soon: Exclusive content about AI and automation'}
                </p>
                <p className="text-muted-foreground">
                  {locale === 'es'
                    ? 'Estamos preparando artículos increíbles para ti. ¡Vuelve pronto!'
                    : locale === 'ro'
                    ? 'Pregătim articole incredibile pentru tine. Revino în curând!'
                    : 'We\'re preparing amazing articles for you. Check back soon!'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                      {/* Cover Image */}
                      {post.coverImage && (
                        <div className="aspect-video overflow-hidden rounded-t-lg">
                          <img 
                            src={post.coverImage} 
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className={getCategoryBadgeColor(post.category)}>
                            {categories.find(c => c.id === post.category)?.label}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{post.readingTime} min</span>
                          </div>
                        </div>
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {post.excerpt}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardFooter className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{post.author}</span>
                          <span className="text-xs text-muted-foreground">{post.authorRole}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                      </CardFooter>
                      
                      <div className="px-6 pb-6">
                        <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          {locale === 'es' ? 'Leer más' : locale === 'ro' ? 'Citește mai mult' : 'Read more'}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
