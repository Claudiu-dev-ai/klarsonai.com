import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Demo Booking Form Submissions
 * Stores all demo booking requests from the website
 */
export const demoBookings = mysqlTable("demo_bookings", {
  id: int("id").autoincrement().primaryKey(),
  // Form fields
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  company: varchar("company", { length: 255 }),
  industry: varchar("industry", { length: 100 }),
  callsPerMonth: int("calls_per_month"),
  preferredDateTime: timestamp("preferred_date_time"),
  additionalMessage: text("additional_message"),
  // Tracking data
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  referrer: text("referrer"),
  utmSource: varchar("utm_source", { length: 255 }),
  utmMedium: varchar("utm_medium", { length: 255 }),
  utmCampaign: varchar("utm_campaign", { length: 255 }),
  sessionId: varchar("session_id", { length: 255 }),
  timeOnPage: int("time_on_page"), // seconds
  formCompletionTime: int("form_completion_time"), // seconds
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type DemoBooking = typeof demoBookings.$inferSelect;
export type InsertDemoBooking = typeof demoBookings.$inferInsert;

/**
 * ROI Calculator Submissions
 * Stores ROI calculator results and lead information
 */
export const roiCalculations = mysqlTable("roi_calculations", {
  id: int("id").autoincrement().primaryKey(),
  // Form fields
  email: varchar("email", { length: 320 }).notNull(),
  fullName: varchar("full_name", { length: 255 }),
  company: varchar("company", { length: 255 }),
  industry: varchar("industry", { length: 100 }).notNull(),
  // Calculator inputs
  callsPerMonth: int("calls_per_month").notNull(),
  currentResponseRate: int("current_response_rate").notNull(), // percentage
  avgClientValue: int("avg_client_value").notNull(), // dollars
  confirmationRate: int("confirmation_rate"), // percentage
  // Calculator results
  missedCallsPerMonth: int("missed_calls_per_month"),
  lostRevenuePerMonth: int("lost_revenue_per_month"),
  lostRevenuePerYear: int("lost_revenue_per_year"),
  currentReceptionistCost: int("current_receptionist_cost"),
  klarsonCostPerYear: int("klarson_cost_per_year"),
  totalSavingsPerYear: int("total_savings_per_year"),
  roiPercentage: int("roi_percentage"),
  paybackDays: int("payback_days"),
  // Tracking data
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  referrer: text("referrer"),
  utmSource: varchar("utm_source", { length: 255 }),
  utmMedium: varchar("utm_medium", { length: 255 }),
  utmCampaign: varchar("utm_campaign", { length: 255 }),
  sessionId: varchar("session_id", { length: 255 }),
  timeOnPage: int("time_on_page"),
  formCompletionTime: int("form_completion_time"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type RoiCalculation = typeof roiCalculations.$inferSelect;
export type InsertRoiCalculation = typeof roiCalculations.$inferInsert;

/**
 * Partner Applications
 * Stores partner program applications with status tracking
 */
export const partnerApplications = mysqlTable("partner_applications", {
  id: int("id").autoincrement().primaryKey(),
  // Form fields
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  partnerType: mysqlEnum("partner_type", ["reseller", "integrator", "consultant", "agency"]).notNull(),
  aiVoipExperience: text("ai_voip_experience"),
  targetMarket: text("target_market"),
  potentialClients: int("potential_clients"),
  estimatedMonthlyBudget: int("estimated_monthly_budget"),
  portfolioDocument: text("portfolio_document"), // URL to uploaded document
  // Status tracking
  status: mysqlEnum("status", ["pending", "approved", "rejected", "negotiating"]).default("pending").notNull(),
  reviewNotes: text("review_notes"),
  reviewedAt: timestamp("reviewed_at"),
  reviewedBy: int("reviewed_by"), // user ID of admin who reviewed
  // Tracking data
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  referrer: text("referrer"),
  utmSource: varchar("utm_source", { length: 255 }),
  utmMedium: varchar("utm_medium", { length: 255 }),
  utmCampaign: varchar("utm_campaign", { length: 255 }),
  sessionId: varchar("session_id", { length: 255 }),
  timeOnPage: int("time_on_page"),
  formCompletionTime: int("form_completion_time"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type PartnerApplication = typeof partnerApplications.$inferSelect;
export type InsertPartnerApplication = typeof partnerApplications.$inferInsert;
/**
 * Blog Posts
 * Stores blog articles with multilingual support and SEO metadata
 */
export const blogPosts = mysqlTable("blog_posts", {
  id: int("id").autoincrement().primaryKey(),
  // Content fields
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  titleEn: varchar("title_en", { length: 255 }).notNull(),
  titleEs: varchar("title_es", { length: 255 }).notNull(),
  titleRo: varchar("title_ro", { length: 255 }).notNull(),
  excerptEn: text("excerpt_en").notNull(),
  excerptEs: text("excerpt_es").notNull(),
  excerptRo: text("excerpt_ro").notNull(),
  contentEn: text("content_en").notNull(),
  contentEs: text("content_es").notNull(),
  contentRo: text("content_ro").notNull(),
  // Metadata
  category: mysqlEnum("category", ["case-study", "ai-insights", "how-to-guide"]).notNull(),
  author: varchar("author", { length: 255 }).notNull(),
  authorRole: varchar("author_role", { length: 255 }),
  coverImage: text("cover_image"), // URL to cover image
  readingTime: int("reading_time"), // minutes
  // SEO fields
  metaDescriptionEn: text("meta_description_en"),
  metaDescriptionEs: text("meta_description_es"),
  metaDescriptionRo: text("meta_description_ro"),
  metaKeywords: text("meta_keywords"), // comma-separated
  // Publishing
  status: mysqlEnum("status", ["draft", "published", "archived"]).default("draft").notNull(),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;
