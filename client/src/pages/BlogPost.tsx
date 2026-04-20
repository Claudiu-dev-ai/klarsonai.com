/*
 * Individual Blog Post Page
 * 
 * Features:
 * - Full article content with rich formatting
 * - SEO metadata (Open Graph, Twitter Cards)
 * - Author information
 * - Related articles section
 * - Social sharing buttons
 * - Multilingual support with professional translations
 */

import { useEffect, useState } from 'react';
import { useParams, Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Clock, Calendar, ArrowLeft, Share2, Linkedin, Facebook, Twitter } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Streamdown } from 'streamdown';
import { trpc } from '@/lib/trpc';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string | null;
  coverImage: string | null;
  readingTime: number | null;
  publishedAt: Date | null;
  metaDescription: string;
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { t, locale } = useLanguage();
  
  // Fetch blog post from database
  const { data: post, isLoading: loading } = trpc.blog.getPostBySlug.useQuery({ slug: slug || '', locale });

  const getCategoryLabel = (category: string) => {
    const labels = {
      'case-study': {
        en: 'Case Study',
        es: 'Caso de Éxito',
        ro: 'Studiu de Caz'
      },
      'ai-insights': {
        en: 'AI Insights',
        es: 'Análisis de IA',
        ro: 'Perspective AI'
      },
      'how-to-guide': {
        en: 'How-To Guide',
        es: 'Guía Práctica',
        ro: 'Ghid Practic'
      }
    };
    return labels[category as keyof typeof labels]?.[locale] || category;
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'case-study':
        return 'bg-green-500/10 text-green-500';
      case 'ai-insights':
        return 'bg-blue-500/10 text-blue-500';
      case 'how-to-guide':
        return 'bg-purple-500/10 text-purple-500';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString(locale === 'es' ? 'es-ES' : locale === 'ro' ? 'ro-RO' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  
  const handleShare = (platform: string) => {
    if (!post) return;
    
    const urls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`
    };
    
    window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
  };

  const translations = {
    backToBlog: {
      en: 'Back to Blog',
      es: 'Volver al Blog',
      ro: 'Înapoi la Blog'
    },
    readingTime: {
      en: 'min read',
      es: 'min de lectura',
      ro: 'min citire'
    },
    shareArticle: {
      en: 'Share this article',
      es: 'Compartir este artículo',
      ro: 'Distribuie acest articol'
    },
    relatedArticles: {
      en: 'Related Articles',
      es: 'Artículos Relacionados',
      ro: 'Articole Conexe'
    },
    readMore: {
      en: 'Read more',
      es: 'Leer más',
      ro: 'Citește mai mult'
    },
    notFound: {
      en: 'Article not found',
      es: 'Artículo no encontrado',
      ro: 'Articol negăsit'
    },
    notFoundDescription: {
      en: 'The article you\'re looking for doesn\'t exist or has been removed.',
      es: 'El artículo que buscas no existe o ha sido eliminado.',
      ro: 'Articolul pe care îl cauți nu există sau a fost eliminat.'
    }
  };

  const t_blog = (key: keyof typeof translations) => translations[key][locale];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">
              {locale === 'es' ? 'Cargando...' : locale === 'ro' ? 'Se încarcă...' : 'Loading...'}
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md">
            <h1 className="text-3xl font-bold mb-4">{t_blog('notFound')}</h1>
            <p className="text-muted-foreground mb-8">{t_blog('notFoundDescription')}</p>
            <Link href="/blog">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t_blog('backToBlog')}
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* SEO Metadata */}
      <Helmet>
        <title>{post.title} | Klarson AI Blog</title>
        <meta name="description" content={post.metaDescription || post.excerpt} />
        
        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.metaDescription || post.excerpt} />
        <meta property="og:image" content={post.coverImage || ''} />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.publishedAt?.toISOString() || ''} />
        <meta property="article:author" content={post.author} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.metaDescription || post.excerpt} />
        <meta name="twitter:image" content={post.coverImage || ''} />
        <meta name="twitter:site" content="@KlarsonAI" />
      </Helmet>

      <Header />
      
      <main className="flex-1">
        {/* Back Button */}
        <div className="container py-8">
          <Link href="/blog">
            <Button variant="ghost" className="group">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              {t_blog('backToBlog')}
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <article className="container max-w-4xl pb-16">
          <header className="mb-12">
            {/* Category Badge */}
            <div className="flex items-center gap-3 mb-6">
              <Badge className={getCategoryBadgeColor(post.category)}>
                {getCategoryLabel(post.category)}
              </Badge>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime} {t_blog('readingTime')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-muted-foreground mb-8">
              {post.excerpt}
            </p>

            {/* Author Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold">{post.author}</div>
                  <div className="text-sm text-muted-foreground">{post.authorRole}</div>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground mr-2">{t_blog('shareArticle')}:</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare('linkedin')}
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare('facebook')}
                  aria-label="Share on Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare('twitter')}
                  aria-label="Share on Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="aspect-video overflow-hidden rounded-lg mb-12">
              <img 
                src={post.coverImage} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <Streamdown>{post.content}</Streamdown>
          </div>

          <Separator className="my-12" />

          {/* Author Bio */}
          <div className="bg-muted/50 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-2xl flex-shrink-0">
                {post.author.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{post.author}</h3>
                <p className="text-sm text-muted-foreground mb-3">{post.authorRole}</p>
                <p className="text-sm">
                  {locale === 'es' 
                    ? `${post.author} es un experto en inteligencia artificial y automatización empresarial, ayudando a empresas a transformar sus operaciones con tecnología de vanguardia.`
                    : locale === 'ro'
                    ? `${post.author} este un expert în inteligență artificială și automatizare de afaceri, ajutând companiile să își transforme operațiunile cu tehnologie de ultimă generație.`
                    : `${post.author} is an expert in artificial intelligence and business automation, helping companies transform their operations with cutting-edge technology.`}
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <section className="bg-muted/30 py-16">
          <div className="container max-w-6xl">
            <h2 className="text-3xl font-bold mb-8 text-center">{t_blog('relatedArticles')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* TODO: Add related articles */}
              <div className="text-center py-8 col-span-full text-muted-foreground">
                {locale === 'es' 
                  ? 'Más artículos próximamente'
                  : locale === 'ro'
                  ? 'Mai multe articole în curând'
                  : 'More articles coming soon'}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
