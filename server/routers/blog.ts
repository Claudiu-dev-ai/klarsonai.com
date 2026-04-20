/**
 * Blog Router
 * 
 * Handles blog post retrieval and management
 */

import { router, publicProcedure } from '../_core/trpc';
import { getDb } from '../db';
import { blogPosts } from '../../drizzle/schema';
import { eq, desc } from 'drizzle-orm';
import { z } from 'zod';

export const blogRouter = router({
  /**
   * Get all published blog posts
   */
  getAllPosts: publicProcedure
    .input(z.object({
      category: z.enum(['all', 'case-study', 'ai-insights', 'how-to-guide']).optional(),
      locale: z.enum(['en', 'es', 'ro']).default('en'),
    }))
    .query(async ({ input }) => {
      const { category, locale } = input;
      
      const db = await getDb();
      if (!db) throw new Error('Database not available');

      const posts = await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.status, 'published'))
        .orderBy(desc(blogPosts.publishedAt));

      // Filter by category if specified
      const filteredPosts = category && category !== 'all'
        ? posts.filter(post => post.category === category)
        : posts;

      // Map to locale-specific fields
      return filteredPosts.map(post => ({
        id: post.id,
        slug: post.slug,
        title: post[`title${locale.charAt(0).toUpperCase() + locale.slice(1)}` as keyof typeof post] as string,
        excerpt: post[`excerpt${locale.charAt(0).toUpperCase() + locale.slice(1)}` as keyof typeof post] as string,
        category: post.category,
        author: post.author,
        authorRole: post.authorRole,
        coverImage: post.coverImage,
        readingTime: post.readingTime,
        publishedAt: post.publishedAt,
      }));
    }),

  /**
   * Get a single blog post by slug
   */
  getPostBySlug: publicProcedure
    .input(z.object({
      slug: z.string(),
      locale: z.enum(['en', 'es', 'ro']).default('en'),
    }))
    .query(async ({ input }) => {
      const { slug, locale } = input;
      
      const db = await getDb();
      if (!db) throw new Error('Database not available');

      const [post] = await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.slug, slug))
        .limit(1);

      if (!post || post.status !== 'published') {
        return null;
      }

      // Return locale-specific fields
      return {
        id: post.id,
        slug: post.slug,
        title: post[`title${locale.charAt(0).toUpperCase() + locale.slice(1)}` as keyof typeof post] as string,
        excerpt: post[`excerpt${locale.charAt(0).toUpperCase() + locale.slice(1)}` as keyof typeof post] as string,
        content: post[`content${locale.charAt(0).toUpperCase() + locale.slice(1)}` as keyof typeof post] as string,
        category: post.category,
        author: post.author,
        authorRole: post.authorRole,
        coverImage: post.coverImage,
        readingTime: post.readingTime,
        publishedAt: post.publishedAt,
        metaDescription: post[`metaDescription${locale.charAt(0).toUpperCase() + locale.slice(1)}` as keyof typeof post] as string,
      };
    }),
});
