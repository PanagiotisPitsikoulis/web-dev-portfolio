import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'el');
  CREATE TYPE "public"."enum_form_fields_field_type" AS ENUM('text', 'textarea', 'number', 'email', 'date');
  CREATE TYPE "public"."enum_projects_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TABLE IF NOT EXISTS "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "form_fields" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field_label" varchar NOT NULL,
  	"field_type" "enum_form_fields_field_type" NOT NULL,
  	"required" boolean DEFAULT false
  );
  
  CREATE TABLE IF NOT EXISTS "form" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "projects_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "projects_technologies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"icon_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"featured_image_id" integer NOT NULL,
  	"project_url" varchar,
  	"github_url" varchar,
  	"status" "enum_projects_status" DEFAULT 'draft',
  	"published_date" timestamp(3) with time zone NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"content" jsonb NOT NULL,
  	"featured_image_id" integer NOT NULL,
  	"status" "enum_posts_status" DEFAULT 'draft',
  	"published_date" timestamp(3) with time zone NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"form_id" integer,
  	"projects_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "layout_blocks_navbar_menu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"description" varchar,
  	"icon_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "layout_blocks_navbar_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"description" varchar,
  	"icon_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "layout_blocks_navbar_mobile_extra_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "layout_blocks_navbar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_url" varchar NOT NULL,
  	"logo_src_id" integer NOT NULL,
  	"logo_alt" varchar NOT NULL,
  	"logo_title" varchar NOT NULL,
  	"auth_login_text" varchar NOT NULL,
  	"auth_login_url" varchar NOT NULL,
  	"auth_signup_text" varchar NOT NULL,
  	"auth_signup_url" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "layout_blocks_footer_menu_items_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "layout_blocks_footer_menu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "layout_blocks_footer_bottom_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "layout_blocks_footer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_src_id" integer NOT NULL,
  	"logo_alt" varchar NOT NULL,
  	"logo_title" varchar NOT NULL,
  	"logo_url" varchar NOT NULL,
  	"copyright" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "layout_layout_hideonroutes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"layout_route" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "layout" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_keywords" varchar,
  	"meta_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "about_page_blocks_footer_menu_items_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "about_page_blocks_footer_menu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "about_page_blocks_footer_bottom_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "about_page_blocks_footer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_src_id" integer NOT NULL,
  	"logo_alt" varchar NOT NULL,
  	"logo_title" varchar NOT NULL,
  	"logo_url" varchar NOT NULL,
  	"copyright" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "about_page_blocks_navbar_menu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"description" varchar,
  	"icon_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "about_page_blocks_navbar_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"description" varchar,
  	"icon_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "about_page_blocks_navbar_mobile_extra_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "about_page_blocks_navbar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_url" varchar NOT NULL,
  	"logo_src_id" integer NOT NULL,
  	"logo_alt" varchar NOT NULL,
  	"logo_title" varchar NOT NULL,
  	"auth_login_text" varchar NOT NULL,
  	"auth_login_url" varchar NOT NULL,
  	"auth_signup_text" varchar NOT NULL,
  	"auth_signup_url" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "about_page_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Ready to Get Started?',
  	"description" varchar DEFAULT 'Join thousands of satisfied customers using our platform to build amazing websites.',
  	"buttons_primary_text" varchar DEFAULT 'Get Started',
  	"buttons_primary_url" varchar DEFAULT 'https://www.shadcnblocks.com',
  	"buttons_secondary_text" varchar DEFAULT 'Learn More',
  	"buttons_secondary_url" varchar DEFAULT 'https://www.shadcnblocks.com',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "about_page_blocks_career_jobs_openings" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"location" varchar,
  	"url" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "about_page_blocks_career_jobs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "about_page_blocks_career" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Job Openings',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "about_page_blocks_features_large_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"icon_id" integer NOT NULL,
  	"label" varchar NOT NULL,
  	"content_badge" varchar NOT NULL,
  	"content_title" varchar NOT NULL,
  	"content_description" varchar NOT NULL,
  	"content_button_text" varchar NOT NULL,
  	"content_image_src_id" integer NOT NULL,
  	"content_image_alt" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "about_page_blocks_features_large" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar NOT NULL,
  	"heading" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "about_page_blocks_hero_testimonial_avatars" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"fallback" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "about_page_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"button_text" varchar NOT NULL,
  	"button_url" varchar NOT NULL,
  	"testimonial_quote" varchar NOT NULL,
  	"testimonial_author" varchar NOT NULL,
  	"testimonial_role" varchar NOT NULL,
  	"testimonial_company" varchar NOT NULL,
  	"images_first_id" integer NOT NULL,
  	"images_second_id" integer NOT NULL,
  	"images_third_id" integer NOT NULL,
  	"images_fourth_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "about_page_blocks_hero_smartphone" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"description" varchar,
  	"image_src_id" integer NOT NULL,
  	"image_alt" varchar NOT NULL,
  	"buttons_primary_text" varchar NOT NULL,
  	"buttons_primary_url" varchar NOT NULL,
  	"buttons_secondary_text" varchar NOT NULL,
  	"buttons_secondary_url" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "about_page_blocks_features_boxes_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "about_page_blocks_features_boxes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subheading" varchar NOT NULL,
  	"heading" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "about_page_blocks_features_reasons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "about_page_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "about_page_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "about_page_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "about_page_blocks_blog_small_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"summary" varchar,
  	"label" varchar,
  	"author" varchar,
  	"published" varchar,
  	"url" varchar,
  	"image" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "about_page_blocks_blog_small" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tagline" varchar DEFAULT 'Latest Updates',
  	"heading" varchar DEFAULT 'Blog Posts',
  	"description" varchar DEFAULT 'Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights.',
  	"button_text" varchar DEFAULT 'View all articles',
  	"button_url" varchar DEFAULT 'https://shadcnblocks.com',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "about_page_blocks_contact_contact_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"link_text" varchar,
  	"link_url" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "about_page_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subheading" varchar DEFAULT 'Reach Us',
  	"heading" varchar DEFAULT 'Speak with Our Friendly Team',
  	"description" varchar DEFAULT 'We''''d love to assist you. Fill out the form or drop us an email.',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"published" boolean DEFAULT false,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_keywords" varchar,
  	"meta_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "landing_page_blocks_footer_menu_items_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "landing_page_blocks_footer_menu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "landing_page_blocks_footer_bottom_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "landing_page_blocks_footer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_src_id" integer NOT NULL,
  	"logo_alt" varchar NOT NULL,
  	"logo_title" varchar NOT NULL,
  	"logo_url" varchar NOT NULL,
  	"copyright" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "landing_page_blocks_navbar_menu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"description" varchar,
  	"icon_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "landing_page_blocks_navbar_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"description" varchar,
  	"icon_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "landing_page_blocks_navbar_mobile_extra_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "landing_page_blocks_navbar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_url" varchar NOT NULL,
  	"logo_src_id" integer NOT NULL,
  	"logo_alt" varchar NOT NULL,
  	"logo_title" varchar NOT NULL,
  	"auth_login_text" varchar NOT NULL,
  	"auth_login_url" varchar NOT NULL,
  	"auth_signup_text" varchar NOT NULL,
  	"auth_signup_url" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "landing_page_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Ready to Get Started?',
  	"description" varchar DEFAULT 'Join thousands of satisfied customers using our platform to build amazing websites.',
  	"buttons_primary_text" varchar DEFAULT 'Get Started',
  	"buttons_primary_url" varchar DEFAULT 'https://www.shadcnblocks.com',
  	"buttons_secondary_text" varchar DEFAULT 'Learn More',
  	"buttons_secondary_url" varchar DEFAULT 'https://www.shadcnblocks.com',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "landing_page_blocks_career_jobs_openings" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"location" varchar,
  	"url" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "landing_page_blocks_career_jobs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "landing_page_blocks_career" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Job Openings',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "landing_page_blocks_features_large_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"icon_id" integer NOT NULL,
  	"label" varchar NOT NULL,
  	"content_badge" varchar NOT NULL,
  	"content_title" varchar NOT NULL,
  	"content_description" varchar NOT NULL,
  	"content_button_text" varchar NOT NULL,
  	"content_image_src_id" integer NOT NULL,
  	"content_image_alt" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "landing_page_blocks_features_large" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar NOT NULL,
  	"heading" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "landing_page_blocks_hero_testimonial_avatars" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"fallback" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "landing_page_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"button_text" varchar NOT NULL,
  	"button_url" varchar NOT NULL,
  	"testimonial_quote" varchar NOT NULL,
  	"testimonial_author" varchar NOT NULL,
  	"testimonial_role" varchar NOT NULL,
  	"testimonial_company" varchar NOT NULL,
  	"images_first_id" integer NOT NULL,
  	"images_second_id" integer NOT NULL,
  	"images_third_id" integer NOT NULL,
  	"images_fourth_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "landing_page_blocks_hero_smartphone" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"description" varchar,
  	"image_src_id" integer NOT NULL,
  	"image_alt" varchar NOT NULL,
  	"buttons_primary_text" varchar NOT NULL,
  	"buttons_primary_url" varchar NOT NULL,
  	"buttons_secondary_text" varchar NOT NULL,
  	"buttons_secondary_url" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "landing_page_blocks_features_boxes_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "landing_page_blocks_features_boxes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subheading" varchar NOT NULL,
  	"heading" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "landing_page_blocks_features_reasons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "landing_page_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "landing_page_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "landing_page_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "landing_page_blocks_blog_small_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"summary" varchar,
  	"label" varchar,
  	"author" varchar,
  	"published" varchar,
  	"url" varchar,
  	"image" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "landing_page_blocks_blog_small" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tagline" varchar DEFAULT 'Latest Updates',
  	"heading" varchar DEFAULT 'Blog Posts',
  	"description" varchar DEFAULT 'Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights.',
  	"button_text" varchar DEFAULT 'View all articles',
  	"button_url" varchar DEFAULT 'https://shadcnblocks.com',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "landing_page_blocks_contact_contact_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"link_text" varchar,
  	"link_url" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "landing_page_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subheading" varchar DEFAULT 'Reach Us',
  	"heading" varchar DEFAULT 'Speak with Our Friendly Team',
  	"description" varchar DEFAULT 'We''''d love to assist you. Fill out the form or drop us an email.',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "landing_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"published" boolean DEFAULT false,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_keywords" varchar,
  	"meta_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "blog_page_blocks_footer_menu_items_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "blog_page_blocks_footer_menu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "blog_page_blocks_footer_bottom_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "blog_page_blocks_footer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_src_id" integer NOT NULL,
  	"logo_alt" varchar NOT NULL,
  	"logo_title" varchar NOT NULL,
  	"logo_url" varchar NOT NULL,
  	"copyright" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_page_blocks_navbar_menu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"description" varchar,
  	"icon_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "blog_page_blocks_navbar_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"description" varchar,
  	"icon_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "blog_page_blocks_navbar_mobile_extra_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "blog_page_blocks_navbar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_url" varchar NOT NULL,
  	"logo_src_id" integer NOT NULL,
  	"logo_alt" varchar NOT NULL,
  	"logo_title" varchar NOT NULL,
  	"auth_login_text" varchar NOT NULL,
  	"auth_login_url" varchar NOT NULL,
  	"auth_signup_text" varchar NOT NULL,
  	"auth_signup_url" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_page_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Ready to Get Started?',
  	"description" varchar DEFAULT 'Join thousands of satisfied customers using our platform to build amazing websites.',
  	"buttons_primary_text" varchar DEFAULT 'Get Started',
  	"buttons_primary_url" varchar DEFAULT 'https://www.shadcnblocks.com',
  	"buttons_secondary_text" varchar DEFAULT 'Learn More',
  	"buttons_secondary_url" varchar DEFAULT 'https://www.shadcnblocks.com',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_page_blocks_career_jobs_openings" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"location" varchar,
  	"url" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_page_blocks_career_jobs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_page_blocks_career" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Job Openings',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_page_blocks_features_large_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"icon_id" integer NOT NULL,
  	"label" varchar NOT NULL,
  	"content_badge" varchar NOT NULL,
  	"content_title" varchar NOT NULL,
  	"content_description" varchar NOT NULL,
  	"content_button_text" varchar NOT NULL,
  	"content_image_src_id" integer NOT NULL,
  	"content_image_alt" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "blog_page_blocks_features_large" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar NOT NULL,
  	"heading" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_page_blocks_hero_testimonial_avatars" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"fallback" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "blog_page_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"button_text" varchar NOT NULL,
  	"button_url" varchar NOT NULL,
  	"testimonial_quote" varchar NOT NULL,
  	"testimonial_author" varchar NOT NULL,
  	"testimonial_role" varchar NOT NULL,
  	"testimonial_company" varchar NOT NULL,
  	"images_first_id" integer NOT NULL,
  	"images_second_id" integer NOT NULL,
  	"images_third_id" integer NOT NULL,
  	"images_fourth_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_page_blocks_hero_smartphone" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"description" varchar,
  	"image_src_id" integer NOT NULL,
  	"image_alt" varchar NOT NULL,
  	"buttons_primary_text" varchar NOT NULL,
  	"buttons_primary_url" varchar NOT NULL,
  	"buttons_secondary_text" varchar NOT NULL,
  	"buttons_secondary_url" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_page_blocks_features_boxes_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "blog_page_blocks_features_boxes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subheading" varchar NOT NULL,
  	"heading" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_page_blocks_features_reasons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "blog_page_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_page_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "blog_page_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_page_blocks_blog_small_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"summary" varchar,
  	"label" varchar,
  	"author" varchar,
  	"published" varchar,
  	"url" varchar,
  	"image" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_page_blocks_blog_small" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tagline" varchar DEFAULT 'Latest Updates',
  	"heading" varchar DEFAULT 'Blog Posts',
  	"description" varchar DEFAULT 'Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights.',
  	"button_text" varchar DEFAULT 'View all articles',
  	"button_url" varchar DEFAULT 'https://shadcnblocks.com',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_page_blocks_contact_contact_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"link_text" varchar,
  	"link_url" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_page_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subheading" varchar DEFAULT 'Reach Us',
  	"heading" varchar DEFAULT 'Speak with Our Friendly Team',
  	"description" varchar DEFAULT 'We''''d love to assist you. Fill out the form or drop us an email.',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"published" boolean DEFAULT false,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_keywords" varchar,
  	"meta_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "contact_page_blocks_footer_menu_items_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "contact_page_blocks_footer_menu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "contact_page_blocks_footer_bottom_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "contact_page_blocks_footer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_src_id" integer NOT NULL,
  	"logo_alt" varchar NOT NULL,
  	"logo_title" varchar NOT NULL,
  	"logo_url" varchar NOT NULL,
  	"copyright" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "contact_page_blocks_navbar_menu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"description" varchar,
  	"icon_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "contact_page_blocks_navbar_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"description" varchar,
  	"icon_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "contact_page_blocks_navbar_mobile_extra_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "contact_page_blocks_navbar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_url" varchar NOT NULL,
  	"logo_src_id" integer NOT NULL,
  	"logo_alt" varchar NOT NULL,
  	"logo_title" varchar NOT NULL,
  	"auth_login_text" varchar NOT NULL,
  	"auth_login_url" varchar NOT NULL,
  	"auth_signup_text" varchar NOT NULL,
  	"auth_signup_url" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "contact_page_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Ready to Get Started?',
  	"description" varchar DEFAULT 'Join thousands of satisfied customers using our platform to build amazing websites.',
  	"buttons_primary_text" varchar DEFAULT 'Get Started',
  	"buttons_primary_url" varchar DEFAULT 'https://www.shadcnblocks.com',
  	"buttons_secondary_text" varchar DEFAULT 'Learn More',
  	"buttons_secondary_url" varchar DEFAULT 'https://www.shadcnblocks.com',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "contact_page_blocks_career_jobs_openings" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"location" varchar,
  	"url" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "contact_page_blocks_career_jobs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "contact_page_blocks_career" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Job Openings',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "contact_page_blocks_features_large_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"icon_id" integer NOT NULL,
  	"label" varchar NOT NULL,
  	"content_badge" varchar NOT NULL,
  	"content_title" varchar NOT NULL,
  	"content_description" varchar NOT NULL,
  	"content_button_text" varchar NOT NULL,
  	"content_image_src_id" integer NOT NULL,
  	"content_image_alt" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "contact_page_blocks_features_large" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar NOT NULL,
  	"heading" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "contact_page_blocks_hero_testimonial_avatars" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"fallback" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "contact_page_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"button_text" varchar NOT NULL,
  	"button_url" varchar NOT NULL,
  	"testimonial_quote" varchar NOT NULL,
  	"testimonial_author" varchar NOT NULL,
  	"testimonial_role" varchar NOT NULL,
  	"testimonial_company" varchar NOT NULL,
  	"images_first_id" integer NOT NULL,
  	"images_second_id" integer NOT NULL,
  	"images_third_id" integer NOT NULL,
  	"images_fourth_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "contact_page_blocks_hero_smartphone" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"description" varchar,
  	"image_src_id" integer NOT NULL,
  	"image_alt" varchar NOT NULL,
  	"buttons_primary_text" varchar NOT NULL,
  	"buttons_primary_url" varchar NOT NULL,
  	"buttons_secondary_text" varchar NOT NULL,
  	"buttons_secondary_url" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "contact_page_blocks_features_boxes_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "contact_page_blocks_features_boxes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subheading" varchar NOT NULL,
  	"heading" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "contact_page_blocks_features_reasons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "contact_page_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "contact_page_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "contact_page_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "contact_page_blocks_blog_small_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"summary" varchar,
  	"label" varchar,
  	"author" varchar,
  	"published" varchar,
  	"url" varchar,
  	"image" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "contact_page_blocks_blog_small" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tagline" varchar DEFAULT 'Latest Updates',
  	"heading" varchar DEFAULT 'Blog Posts',
  	"description" varchar DEFAULT 'Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights.',
  	"button_text" varchar DEFAULT 'View all articles',
  	"button_url" varchar DEFAULT 'https://shadcnblocks.com',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "contact_page_blocks_contact_contact_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"link_text" varchar,
  	"link_url" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "contact_page_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subheading" varchar DEFAULT 'Reach Us',
  	"heading" varchar DEFAULT 'Speak with Our Friendly Team',
  	"description" varchar DEFAULT 'We''''d love to assist you. Fill out the form or drop us an email.',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"published" boolean DEFAULT false,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_keywords" varchar,
  	"meta_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "projects_gallery_page_blocks_footer_menu_items_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "projects_gallery_page_blocks_footer_menu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "projects_gallery_page_blocks_footer_bottom_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "projects_gallery_page_blocks_footer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_src_id" integer NOT NULL,
  	"logo_alt" varchar NOT NULL,
  	"logo_title" varchar NOT NULL,
  	"logo_url" varchar NOT NULL,
  	"copyright" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "projects_gallery_page_blocks_navbar_menu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"description" varchar,
  	"icon_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "projects_gallery_page_blocks_navbar_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"description" varchar,
  	"icon_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "projects_gallery_page_blocks_navbar_mobile_extra_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "projects_gallery_page_blocks_navbar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_url" varchar NOT NULL,
  	"logo_src_id" integer NOT NULL,
  	"logo_alt" varchar NOT NULL,
  	"logo_title" varchar NOT NULL,
  	"auth_login_text" varchar NOT NULL,
  	"auth_login_url" varchar NOT NULL,
  	"auth_signup_text" varchar NOT NULL,
  	"auth_signup_url" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "projects_gallery_page_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Ready to Get Started?',
  	"description" varchar DEFAULT 'Join thousands of satisfied customers using our platform to build amazing websites.',
  	"buttons_primary_text" varchar DEFAULT 'Get Started',
  	"buttons_primary_url" varchar DEFAULT 'https://www.shadcnblocks.com',
  	"buttons_secondary_text" varchar DEFAULT 'Learn More',
  	"buttons_secondary_url" varchar DEFAULT 'https://www.shadcnblocks.com',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "projects_gallery_page_blocks_career_jobs_openings" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"location" varchar,
  	"url" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "projects_gallery_page_blocks_career_jobs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "projects_gallery_page_blocks_career" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Job Openings',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "projects_gallery_page_blocks_features_large_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"icon_id" integer NOT NULL,
  	"label" varchar NOT NULL,
  	"content_badge" varchar NOT NULL,
  	"content_title" varchar NOT NULL,
  	"content_description" varchar NOT NULL,
  	"content_button_text" varchar NOT NULL,
  	"content_image_src_id" integer NOT NULL,
  	"content_image_alt" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "projects_gallery_page_blocks_features_large" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar NOT NULL,
  	"heading" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "projects_gallery_page_blocks_hero_testimonial_avatars" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"fallback" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "projects_gallery_page_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"button_text" varchar NOT NULL,
  	"button_url" varchar NOT NULL,
  	"testimonial_quote" varchar NOT NULL,
  	"testimonial_author" varchar NOT NULL,
  	"testimonial_role" varchar NOT NULL,
  	"testimonial_company" varchar NOT NULL,
  	"images_first_id" integer NOT NULL,
  	"images_second_id" integer NOT NULL,
  	"images_third_id" integer NOT NULL,
  	"images_fourth_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "projects_gallery_page_blocks_hero_smartphone" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"description" varchar,
  	"image_src_id" integer NOT NULL,
  	"image_alt" varchar NOT NULL,
  	"buttons_primary_text" varchar NOT NULL,
  	"buttons_primary_url" varchar NOT NULL,
  	"buttons_secondary_text" varchar NOT NULL,
  	"buttons_secondary_url" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "projects_gallery_page_blocks_features_boxes_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "projects_gallery_page_blocks_features_boxes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subheading" varchar NOT NULL,
  	"heading" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "projects_gallery_page_blocks_features_reasons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "projects_gallery_page_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "projects_gallery_page_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "projects_gallery_page_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "projects_gallery_page_blocks_blog_small_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"summary" varchar,
  	"label" varchar,
  	"author" varchar,
  	"published" varchar,
  	"url" varchar,
  	"image" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "projects_gallery_page_blocks_blog_small" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tagline" varchar DEFAULT 'Latest Updates',
  	"heading" varchar DEFAULT 'Blog Posts',
  	"description" varchar DEFAULT 'Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights.',
  	"button_text" varchar DEFAULT 'View all articles',
  	"button_url" varchar DEFAULT 'https://shadcnblocks.com',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "projects_gallery_page_blocks_contact_contact_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"link_text" varchar,
  	"link_url" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "projects_gallery_page_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subheading" varchar DEFAULT 'Reach Us',
  	"heading" varchar DEFAULT 'Speak with Our Friendly Team',
  	"description" varchar DEFAULT 'We''''d love to assist you. Fill out the form or drop us an email.',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "projects_gallery_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"published" boolean DEFAULT false,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_keywords" varchar,
  	"meta_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "resume_page_blocks_footer_menu_items_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "resume_page_blocks_footer_menu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "resume_page_blocks_footer_bottom_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "resume_page_blocks_footer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_src_id" integer NOT NULL,
  	"logo_alt" varchar NOT NULL,
  	"logo_title" varchar NOT NULL,
  	"logo_url" varchar NOT NULL,
  	"copyright" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "resume_page_blocks_navbar_menu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"description" varchar,
  	"icon_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "resume_page_blocks_navbar_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"description" varchar,
  	"icon_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "resume_page_blocks_navbar_mobile_extra_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "resume_page_blocks_navbar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_url" varchar NOT NULL,
  	"logo_src_id" integer NOT NULL,
  	"logo_alt" varchar NOT NULL,
  	"logo_title" varchar NOT NULL,
  	"auth_login_text" varchar NOT NULL,
  	"auth_login_url" varchar NOT NULL,
  	"auth_signup_text" varchar NOT NULL,
  	"auth_signup_url" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "resume_page_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Ready to Get Started?',
  	"description" varchar DEFAULT 'Join thousands of satisfied customers using our platform to build amazing websites.',
  	"buttons_primary_text" varchar DEFAULT 'Get Started',
  	"buttons_primary_url" varchar DEFAULT 'https://www.shadcnblocks.com',
  	"buttons_secondary_text" varchar DEFAULT 'Learn More',
  	"buttons_secondary_url" varchar DEFAULT 'https://www.shadcnblocks.com',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "resume_page_blocks_career_jobs_openings" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"location" varchar,
  	"url" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "resume_page_blocks_career_jobs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "resume_page_blocks_career" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Job Openings',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "resume_page_blocks_features_large_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"icon_id" integer NOT NULL,
  	"label" varchar NOT NULL,
  	"content_badge" varchar NOT NULL,
  	"content_title" varchar NOT NULL,
  	"content_description" varchar NOT NULL,
  	"content_button_text" varchar NOT NULL,
  	"content_image_src_id" integer NOT NULL,
  	"content_image_alt" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "resume_page_blocks_features_large" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar NOT NULL,
  	"heading" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "resume_page_blocks_hero_testimonial_avatars" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"fallback" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "resume_page_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"button_text" varchar NOT NULL,
  	"button_url" varchar NOT NULL,
  	"testimonial_quote" varchar NOT NULL,
  	"testimonial_author" varchar NOT NULL,
  	"testimonial_role" varchar NOT NULL,
  	"testimonial_company" varchar NOT NULL,
  	"images_first_id" integer NOT NULL,
  	"images_second_id" integer NOT NULL,
  	"images_third_id" integer NOT NULL,
  	"images_fourth_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "resume_page_blocks_hero_smartphone" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"description" varchar,
  	"image_src_id" integer NOT NULL,
  	"image_alt" varchar NOT NULL,
  	"buttons_primary_text" varchar NOT NULL,
  	"buttons_primary_url" varchar NOT NULL,
  	"buttons_secondary_text" varchar NOT NULL,
  	"buttons_secondary_url" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "resume_page_blocks_features_boxes_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "resume_page_blocks_features_boxes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subheading" varchar NOT NULL,
  	"heading" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "resume_page_blocks_features_reasons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "resume_page_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "resume_page_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "resume_page_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "resume_page_blocks_blog_small_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"summary" varchar,
  	"label" varchar,
  	"author" varchar,
  	"published" varchar,
  	"url" varchar,
  	"image" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "resume_page_blocks_blog_small" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tagline" varchar DEFAULT 'Latest Updates',
  	"heading" varchar DEFAULT 'Blog Posts',
  	"description" varchar DEFAULT 'Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights.',
  	"button_text" varchar DEFAULT 'View all articles',
  	"button_url" varchar DEFAULT 'https://shadcnblocks.com',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "resume_page_blocks_contact_contact_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"link_text" varchar,
  	"link_url" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "resume_page_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subheading" varchar DEFAULT 'Reach Us',
  	"heading" varchar DEFAULT 'Speak with Our Friendly Team',
  	"description" varchar DEFAULT 'We''''d love to assist you. Fill out the form or drop us an email.',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "resume_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"published" boolean DEFAULT false,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_keywords" varchar,
  	"meta_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  DO $$ BEGIN
   ALTER TABLE "form_fields" ADD CONSTRAINT "form_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery" ADD CONSTRAINT "projects_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery" ADD CONSTRAINT "projects_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_technologies" ADD CONSTRAINT "projects_technologies_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_technologies" ADD CONSTRAINT "projects_technologies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects" ADD CONSTRAINT "projects_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts" ADD CONSTRAINT "posts_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_fk" FOREIGN KEY ("form_id") REFERENCES "public"."form"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "layout_blocks_navbar_menu_items" ADD CONSTRAINT "layout_blocks_navbar_menu_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "layout_blocks_navbar_menu_items" ADD CONSTRAINT "layout_blocks_navbar_menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."layout_blocks_navbar_menu"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "layout_blocks_navbar_menu" ADD CONSTRAINT "layout_blocks_navbar_menu_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "layout_blocks_navbar_menu" ADD CONSTRAINT "layout_blocks_navbar_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."layout_blocks_navbar"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "layout_blocks_navbar_mobile_extra_links" ADD CONSTRAINT "layout_blocks_navbar_mobile_extra_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."layout_blocks_navbar"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "layout_blocks_navbar" ADD CONSTRAINT "layout_blocks_navbar_logo_src_id_media_id_fk" FOREIGN KEY ("logo_src_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "layout_blocks_navbar" ADD CONSTRAINT "layout_blocks_navbar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."layout"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "layout_blocks_footer_menu_items_links" ADD CONSTRAINT "layout_blocks_footer_menu_items_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."layout_blocks_footer_menu_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "layout_blocks_footer_menu_items" ADD CONSTRAINT "layout_blocks_footer_menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."layout_blocks_footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "layout_blocks_footer_bottom_links" ADD CONSTRAINT "layout_blocks_footer_bottom_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."layout_blocks_footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "layout_blocks_footer" ADD CONSTRAINT "layout_blocks_footer_logo_src_id_media_id_fk" FOREIGN KEY ("logo_src_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "layout_blocks_footer" ADD CONSTRAINT "layout_blocks_footer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."layout"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "layout_layout_hideonroutes" ADD CONSTRAINT "layout_layout_hideonroutes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."layout"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "layout" ADD CONSTRAINT "layout_meta_og_image_id_media_id_fk" FOREIGN KEY ("meta_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_footer_menu_items_links" ADD CONSTRAINT "about_page_blocks_footer_menu_items_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_blocks_footer_menu_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_footer_menu_items" ADD CONSTRAINT "about_page_blocks_footer_menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_blocks_footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_footer_bottom_links" ADD CONSTRAINT "about_page_blocks_footer_bottom_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_blocks_footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_footer" ADD CONSTRAINT "about_page_blocks_footer_logo_src_id_media_id_fk" FOREIGN KEY ("logo_src_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_footer" ADD CONSTRAINT "about_page_blocks_footer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_navbar_menu_items" ADD CONSTRAINT "about_page_blocks_navbar_menu_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_navbar_menu_items" ADD CONSTRAINT "about_page_blocks_navbar_menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_blocks_navbar_menu"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_navbar_menu" ADD CONSTRAINT "about_page_blocks_navbar_menu_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_navbar_menu" ADD CONSTRAINT "about_page_blocks_navbar_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_blocks_navbar"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_navbar_mobile_extra_links" ADD CONSTRAINT "about_page_blocks_navbar_mobile_extra_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_blocks_navbar"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_navbar" ADD CONSTRAINT "about_page_blocks_navbar_logo_src_id_media_id_fk" FOREIGN KEY ("logo_src_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_navbar" ADD CONSTRAINT "about_page_blocks_navbar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_cta" ADD CONSTRAINT "about_page_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_career_jobs_openings" ADD CONSTRAINT "about_page_blocks_career_jobs_openings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_blocks_career_jobs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_career_jobs" ADD CONSTRAINT "about_page_blocks_career_jobs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_blocks_career"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_career" ADD CONSTRAINT "about_page_blocks_career_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_features_large_tabs" ADD CONSTRAINT "about_page_blocks_features_large_tabs_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_features_large_tabs" ADD CONSTRAINT "about_page_blocks_features_large_tabs_content_image_src_id_media_id_fk" FOREIGN KEY ("content_image_src_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_features_large_tabs" ADD CONSTRAINT "about_page_blocks_features_large_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_blocks_features_large"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_features_large" ADD CONSTRAINT "about_page_blocks_features_large_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_hero_testimonial_avatars" ADD CONSTRAINT "about_page_blocks_hero_testimonial_avatars_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_hero_testimonial_avatars" ADD CONSTRAINT "about_page_blocks_hero_testimonial_avatars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_hero" ADD CONSTRAINT "about_page_blocks_hero_images_first_id_media_id_fk" FOREIGN KEY ("images_first_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_hero" ADD CONSTRAINT "about_page_blocks_hero_images_second_id_media_id_fk" FOREIGN KEY ("images_second_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_hero" ADD CONSTRAINT "about_page_blocks_hero_images_third_id_media_id_fk" FOREIGN KEY ("images_third_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_hero" ADD CONSTRAINT "about_page_blocks_hero_images_fourth_id_media_id_fk" FOREIGN KEY ("images_fourth_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_hero" ADD CONSTRAINT "about_page_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_hero_smartphone" ADD CONSTRAINT "about_page_blocks_hero_smartphone_image_src_id_media_id_fk" FOREIGN KEY ("image_src_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_hero_smartphone" ADD CONSTRAINT "about_page_blocks_hero_smartphone_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_features_boxes_features" ADD CONSTRAINT "about_page_blocks_features_boxes_features_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_features_boxes_features" ADD CONSTRAINT "about_page_blocks_features_boxes_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_blocks_features_boxes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_features_boxes" ADD CONSTRAINT "about_page_blocks_features_boxes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_features_reasons" ADD CONSTRAINT "about_page_blocks_features_reasons_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_features_reasons" ADD CONSTRAINT "about_page_blocks_features_reasons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_features" ADD CONSTRAINT "about_page_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_faq_items" ADD CONSTRAINT "about_page_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_faq" ADD CONSTRAINT "about_page_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_blog_small_posts" ADD CONSTRAINT "about_page_blocks_blog_small_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_blocks_blog_small"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_blog_small" ADD CONSTRAINT "about_page_blocks_blog_small_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_contact_contact_details" ADD CONSTRAINT "about_page_blocks_contact_contact_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page_blocks_contact" ADD CONSTRAINT "about_page_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page" ADD CONSTRAINT "about_page_meta_og_image_id_media_id_fk" FOREIGN KEY ("meta_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_footer_menu_items_links" ADD CONSTRAINT "landing_page_blocks_footer_menu_items_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page_blocks_footer_menu_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_footer_menu_items" ADD CONSTRAINT "landing_page_blocks_footer_menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page_blocks_footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_footer_bottom_links" ADD CONSTRAINT "landing_page_blocks_footer_bottom_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page_blocks_footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_footer" ADD CONSTRAINT "landing_page_blocks_footer_logo_src_id_media_id_fk" FOREIGN KEY ("logo_src_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_footer" ADD CONSTRAINT "landing_page_blocks_footer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_navbar_menu_items" ADD CONSTRAINT "landing_page_blocks_navbar_menu_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_navbar_menu_items" ADD CONSTRAINT "landing_page_blocks_navbar_menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page_blocks_navbar_menu"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_navbar_menu" ADD CONSTRAINT "landing_page_blocks_navbar_menu_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_navbar_menu" ADD CONSTRAINT "landing_page_blocks_navbar_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page_blocks_navbar"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_navbar_mobile_extra_links" ADD CONSTRAINT "landing_page_blocks_navbar_mobile_extra_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page_blocks_navbar"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_navbar" ADD CONSTRAINT "landing_page_blocks_navbar_logo_src_id_media_id_fk" FOREIGN KEY ("logo_src_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_navbar" ADD CONSTRAINT "landing_page_blocks_navbar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_cta" ADD CONSTRAINT "landing_page_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_career_jobs_openings" ADD CONSTRAINT "landing_page_blocks_career_jobs_openings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page_blocks_career_jobs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_career_jobs" ADD CONSTRAINT "landing_page_blocks_career_jobs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page_blocks_career"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_career" ADD CONSTRAINT "landing_page_blocks_career_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_features_large_tabs" ADD CONSTRAINT "landing_page_blocks_features_large_tabs_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_features_large_tabs" ADD CONSTRAINT "landing_page_blocks_features_large_tabs_content_image_src_id_media_id_fk" FOREIGN KEY ("content_image_src_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_features_large_tabs" ADD CONSTRAINT "landing_page_blocks_features_large_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page_blocks_features_large"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_features_large" ADD CONSTRAINT "landing_page_blocks_features_large_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_hero_testimonial_avatars" ADD CONSTRAINT "landing_page_blocks_hero_testimonial_avatars_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_hero_testimonial_avatars" ADD CONSTRAINT "landing_page_blocks_hero_testimonial_avatars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_hero" ADD CONSTRAINT "landing_page_blocks_hero_images_first_id_media_id_fk" FOREIGN KEY ("images_first_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_hero" ADD CONSTRAINT "landing_page_blocks_hero_images_second_id_media_id_fk" FOREIGN KEY ("images_second_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_hero" ADD CONSTRAINT "landing_page_blocks_hero_images_third_id_media_id_fk" FOREIGN KEY ("images_third_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_hero" ADD CONSTRAINT "landing_page_blocks_hero_images_fourth_id_media_id_fk" FOREIGN KEY ("images_fourth_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_hero" ADD CONSTRAINT "landing_page_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_hero_smartphone" ADD CONSTRAINT "landing_page_blocks_hero_smartphone_image_src_id_media_id_fk" FOREIGN KEY ("image_src_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_hero_smartphone" ADD CONSTRAINT "landing_page_blocks_hero_smartphone_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_features_boxes_features" ADD CONSTRAINT "landing_page_blocks_features_boxes_features_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_features_boxes_features" ADD CONSTRAINT "landing_page_blocks_features_boxes_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page_blocks_features_boxes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_features_boxes" ADD CONSTRAINT "landing_page_blocks_features_boxes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_features_reasons" ADD CONSTRAINT "landing_page_blocks_features_reasons_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_features_reasons" ADD CONSTRAINT "landing_page_blocks_features_reasons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_features" ADD CONSTRAINT "landing_page_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_faq_items" ADD CONSTRAINT "landing_page_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_faq" ADD CONSTRAINT "landing_page_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_blog_small_posts" ADD CONSTRAINT "landing_page_blocks_blog_small_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page_blocks_blog_small"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_blog_small" ADD CONSTRAINT "landing_page_blocks_blog_small_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_contact_contact_details" ADD CONSTRAINT "landing_page_blocks_contact_contact_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page_blocks_contact" ADD CONSTRAINT "landing_page_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_meta_og_image_id_media_id_fk" FOREIGN KEY ("meta_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_footer_menu_items_links" ADD CONSTRAINT "blog_page_blocks_footer_menu_items_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page_blocks_footer_menu_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_footer_menu_items" ADD CONSTRAINT "blog_page_blocks_footer_menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page_blocks_footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_footer_bottom_links" ADD CONSTRAINT "blog_page_blocks_footer_bottom_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page_blocks_footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_footer" ADD CONSTRAINT "blog_page_blocks_footer_logo_src_id_media_id_fk" FOREIGN KEY ("logo_src_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_footer" ADD CONSTRAINT "blog_page_blocks_footer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_navbar_menu_items" ADD CONSTRAINT "blog_page_blocks_navbar_menu_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_navbar_menu_items" ADD CONSTRAINT "blog_page_blocks_navbar_menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page_blocks_navbar_menu"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_navbar_menu" ADD CONSTRAINT "blog_page_blocks_navbar_menu_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_navbar_menu" ADD CONSTRAINT "blog_page_blocks_navbar_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page_blocks_navbar"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_navbar_mobile_extra_links" ADD CONSTRAINT "blog_page_blocks_navbar_mobile_extra_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page_blocks_navbar"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_navbar" ADD CONSTRAINT "blog_page_blocks_navbar_logo_src_id_media_id_fk" FOREIGN KEY ("logo_src_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_navbar" ADD CONSTRAINT "blog_page_blocks_navbar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_cta" ADD CONSTRAINT "blog_page_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_career_jobs_openings" ADD CONSTRAINT "blog_page_blocks_career_jobs_openings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page_blocks_career_jobs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_career_jobs" ADD CONSTRAINT "blog_page_blocks_career_jobs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page_blocks_career"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_career" ADD CONSTRAINT "blog_page_blocks_career_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_features_large_tabs" ADD CONSTRAINT "blog_page_blocks_features_large_tabs_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_features_large_tabs" ADD CONSTRAINT "blog_page_blocks_features_large_tabs_content_image_src_id_media_id_fk" FOREIGN KEY ("content_image_src_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_features_large_tabs" ADD CONSTRAINT "blog_page_blocks_features_large_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page_blocks_features_large"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_features_large" ADD CONSTRAINT "blog_page_blocks_features_large_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_hero_testimonial_avatars" ADD CONSTRAINT "blog_page_blocks_hero_testimonial_avatars_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_hero_testimonial_avatars" ADD CONSTRAINT "blog_page_blocks_hero_testimonial_avatars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_hero" ADD CONSTRAINT "blog_page_blocks_hero_images_first_id_media_id_fk" FOREIGN KEY ("images_first_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_hero" ADD CONSTRAINT "blog_page_blocks_hero_images_second_id_media_id_fk" FOREIGN KEY ("images_second_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_hero" ADD CONSTRAINT "blog_page_blocks_hero_images_third_id_media_id_fk" FOREIGN KEY ("images_third_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_hero" ADD CONSTRAINT "blog_page_blocks_hero_images_fourth_id_media_id_fk" FOREIGN KEY ("images_fourth_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_hero" ADD CONSTRAINT "blog_page_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_hero_smartphone" ADD CONSTRAINT "blog_page_blocks_hero_smartphone_image_src_id_media_id_fk" FOREIGN KEY ("image_src_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_hero_smartphone" ADD CONSTRAINT "blog_page_blocks_hero_smartphone_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_features_boxes_features" ADD CONSTRAINT "blog_page_blocks_features_boxes_features_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_features_boxes_features" ADD CONSTRAINT "blog_page_blocks_features_boxes_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page_blocks_features_boxes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_features_boxes" ADD CONSTRAINT "blog_page_blocks_features_boxes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_features_reasons" ADD CONSTRAINT "blog_page_blocks_features_reasons_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_features_reasons" ADD CONSTRAINT "blog_page_blocks_features_reasons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_features" ADD CONSTRAINT "blog_page_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_faq_items" ADD CONSTRAINT "blog_page_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_faq" ADD CONSTRAINT "blog_page_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_blog_small_posts" ADD CONSTRAINT "blog_page_blocks_blog_small_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page_blocks_blog_small"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_blog_small" ADD CONSTRAINT "blog_page_blocks_blog_small_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_contact_contact_details" ADD CONSTRAINT "blog_page_blocks_contact_contact_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_blocks_contact" ADD CONSTRAINT "blog_page_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page" ADD CONSTRAINT "blog_page_meta_og_image_id_media_id_fk" FOREIGN KEY ("meta_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_footer_menu_items_links" ADD CONSTRAINT "contact_page_blocks_footer_menu_items_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page_blocks_footer_menu_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_footer_menu_items" ADD CONSTRAINT "contact_page_blocks_footer_menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page_blocks_footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_footer_bottom_links" ADD CONSTRAINT "contact_page_blocks_footer_bottom_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page_blocks_footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_footer" ADD CONSTRAINT "contact_page_blocks_footer_logo_src_id_media_id_fk" FOREIGN KEY ("logo_src_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_footer" ADD CONSTRAINT "contact_page_blocks_footer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_navbar_menu_items" ADD CONSTRAINT "contact_page_blocks_navbar_menu_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_navbar_menu_items" ADD CONSTRAINT "contact_page_blocks_navbar_menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page_blocks_navbar_menu"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_navbar_menu" ADD CONSTRAINT "contact_page_blocks_navbar_menu_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_navbar_menu" ADD CONSTRAINT "contact_page_blocks_navbar_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page_blocks_navbar"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_navbar_mobile_extra_links" ADD CONSTRAINT "contact_page_blocks_navbar_mobile_extra_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page_blocks_navbar"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_navbar" ADD CONSTRAINT "contact_page_blocks_navbar_logo_src_id_media_id_fk" FOREIGN KEY ("logo_src_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_navbar" ADD CONSTRAINT "contact_page_blocks_navbar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_cta" ADD CONSTRAINT "contact_page_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_career_jobs_openings" ADD CONSTRAINT "contact_page_blocks_career_jobs_openings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page_blocks_career_jobs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_career_jobs" ADD CONSTRAINT "contact_page_blocks_career_jobs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page_blocks_career"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_career" ADD CONSTRAINT "contact_page_blocks_career_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_features_large_tabs" ADD CONSTRAINT "contact_page_blocks_features_large_tabs_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_features_large_tabs" ADD CONSTRAINT "contact_page_blocks_features_large_tabs_content_image_src_id_media_id_fk" FOREIGN KEY ("content_image_src_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_features_large_tabs" ADD CONSTRAINT "contact_page_blocks_features_large_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page_blocks_features_large"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_features_large" ADD CONSTRAINT "contact_page_blocks_features_large_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_hero_testimonial_avatars" ADD CONSTRAINT "contact_page_blocks_hero_testimonial_avatars_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_hero_testimonial_avatars" ADD CONSTRAINT "contact_page_blocks_hero_testimonial_avatars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_hero" ADD CONSTRAINT "contact_page_blocks_hero_images_first_id_media_id_fk" FOREIGN KEY ("images_first_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_hero" ADD CONSTRAINT "contact_page_blocks_hero_images_second_id_media_id_fk" FOREIGN KEY ("images_second_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_hero" ADD CONSTRAINT "contact_page_blocks_hero_images_third_id_media_id_fk" FOREIGN KEY ("images_third_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_hero" ADD CONSTRAINT "contact_page_blocks_hero_images_fourth_id_media_id_fk" FOREIGN KEY ("images_fourth_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_hero" ADD CONSTRAINT "contact_page_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_hero_smartphone" ADD CONSTRAINT "contact_page_blocks_hero_smartphone_image_src_id_media_id_fk" FOREIGN KEY ("image_src_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_hero_smartphone" ADD CONSTRAINT "contact_page_blocks_hero_smartphone_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_features_boxes_features" ADD CONSTRAINT "contact_page_blocks_features_boxes_features_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_features_boxes_features" ADD CONSTRAINT "contact_page_blocks_features_boxes_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page_blocks_features_boxes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_features_boxes" ADD CONSTRAINT "contact_page_blocks_features_boxes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_features_reasons" ADD CONSTRAINT "contact_page_blocks_features_reasons_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_features_reasons" ADD CONSTRAINT "contact_page_blocks_features_reasons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_features" ADD CONSTRAINT "contact_page_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_faq_items" ADD CONSTRAINT "contact_page_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_faq" ADD CONSTRAINT "contact_page_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_blog_small_posts" ADD CONSTRAINT "contact_page_blocks_blog_small_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page_blocks_blog_small"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_blog_small" ADD CONSTRAINT "contact_page_blocks_blog_small_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_contact_contact_details" ADD CONSTRAINT "contact_page_blocks_contact_contact_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page_blocks_contact" ADD CONSTRAINT "contact_page_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_meta_og_image_id_media_id_fk" FOREIGN KEY ("meta_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_footer_menu_items_links" ADD CONSTRAINT "projects_gallery_page_blocks_footer_menu_items_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_gallery_page_blocks_footer_menu_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_footer_menu_items" ADD CONSTRAINT "projects_gallery_page_blocks_footer_menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_gallery_page_blocks_footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_footer_bottom_links" ADD CONSTRAINT "projects_gallery_page_blocks_footer_bottom_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_gallery_page_blocks_footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_footer" ADD CONSTRAINT "projects_gallery_page_blocks_footer_logo_src_id_media_id_fk" FOREIGN KEY ("logo_src_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_footer" ADD CONSTRAINT "projects_gallery_page_blocks_footer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_gallery_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_navbar_menu_items" ADD CONSTRAINT "projects_gallery_page_blocks_navbar_menu_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_navbar_menu_items" ADD CONSTRAINT "projects_gallery_page_blocks_navbar_menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_gallery_page_blocks_navbar_menu"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_navbar_menu" ADD CONSTRAINT "projects_gallery_page_blocks_navbar_menu_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_navbar_menu" ADD CONSTRAINT "projects_gallery_page_blocks_navbar_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_gallery_page_blocks_navbar"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_navbar_mobile_extra_links" ADD CONSTRAINT "projects_gallery_page_blocks_navbar_mobile_extra_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_gallery_page_blocks_navbar"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_navbar" ADD CONSTRAINT "projects_gallery_page_blocks_navbar_logo_src_id_media_id_fk" FOREIGN KEY ("logo_src_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_navbar" ADD CONSTRAINT "projects_gallery_page_blocks_navbar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_gallery_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_cta" ADD CONSTRAINT "projects_gallery_page_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_gallery_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_career_jobs_openings" ADD CONSTRAINT "projects_gallery_page_blocks_career_jobs_openings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_gallery_page_blocks_career_jobs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_career_jobs" ADD CONSTRAINT "projects_gallery_page_blocks_career_jobs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_gallery_page_blocks_career"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_career" ADD CONSTRAINT "projects_gallery_page_blocks_career_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_gallery_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_features_large_tabs" ADD CONSTRAINT "projects_gallery_page_blocks_features_large_tabs_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_features_large_tabs" ADD CONSTRAINT "projects_gallery_page_blocks_features_large_tabs_content_image_src_id_media_id_fk" FOREIGN KEY ("content_image_src_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_features_large_tabs" ADD CONSTRAINT "projects_gallery_page_blocks_features_large_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_gallery_page_blocks_features_large"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_features_large" ADD CONSTRAINT "projects_gallery_page_blocks_features_large_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_gallery_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_hero_testimonial_avatars" ADD CONSTRAINT "projects_gallery_page_blocks_hero_testimonial_avatars_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_hero_testimonial_avatars" ADD CONSTRAINT "projects_gallery_page_blocks_hero_testimonial_avatars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_gallery_page_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_hero" ADD CONSTRAINT "projects_gallery_page_blocks_hero_images_first_id_media_id_fk" FOREIGN KEY ("images_first_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_hero" ADD CONSTRAINT "projects_gallery_page_blocks_hero_images_second_id_media_id_fk" FOREIGN KEY ("images_second_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_hero" ADD CONSTRAINT "projects_gallery_page_blocks_hero_images_third_id_media_id_fk" FOREIGN KEY ("images_third_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_hero" ADD CONSTRAINT "projects_gallery_page_blocks_hero_images_fourth_id_media_id_fk" FOREIGN KEY ("images_fourth_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_hero" ADD CONSTRAINT "projects_gallery_page_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_gallery_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_hero_smartphone" ADD CONSTRAINT "projects_gallery_page_blocks_hero_smartphone_image_src_id_media_id_fk" FOREIGN KEY ("image_src_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_hero_smartphone" ADD CONSTRAINT "projects_gallery_page_blocks_hero_smartphone_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_gallery_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_features_boxes_features" ADD CONSTRAINT "projects_gallery_page_blocks_features_boxes_features_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_features_boxes_features" ADD CONSTRAINT "projects_gallery_page_blocks_features_boxes_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_gallery_page_blocks_features_boxes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_features_boxes" ADD CONSTRAINT "projects_gallery_page_blocks_features_boxes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_gallery_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_features_reasons" ADD CONSTRAINT "projects_gallery_page_blocks_features_reasons_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_features_reasons" ADD CONSTRAINT "projects_gallery_page_blocks_features_reasons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_gallery_page_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_features" ADD CONSTRAINT "projects_gallery_page_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_gallery_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_faq_items" ADD CONSTRAINT "projects_gallery_page_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_gallery_page_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_faq" ADD CONSTRAINT "projects_gallery_page_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_gallery_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_blog_small_posts" ADD CONSTRAINT "projects_gallery_page_blocks_blog_small_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_gallery_page_blocks_blog_small"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_blog_small" ADD CONSTRAINT "projects_gallery_page_blocks_blog_small_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_gallery_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_contact_contact_details" ADD CONSTRAINT "projects_gallery_page_blocks_contact_contact_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_gallery_page_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page_blocks_contact" ADD CONSTRAINT "projects_gallery_page_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_gallery_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_gallery_page" ADD CONSTRAINT "projects_gallery_page_meta_og_image_id_media_id_fk" FOREIGN KEY ("meta_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_footer_menu_items_links" ADD CONSTRAINT "resume_page_blocks_footer_menu_items_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_page_blocks_footer_menu_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_footer_menu_items" ADD CONSTRAINT "resume_page_blocks_footer_menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_page_blocks_footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_footer_bottom_links" ADD CONSTRAINT "resume_page_blocks_footer_bottom_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_page_blocks_footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_footer" ADD CONSTRAINT "resume_page_blocks_footer_logo_src_id_media_id_fk" FOREIGN KEY ("logo_src_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_footer" ADD CONSTRAINT "resume_page_blocks_footer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_navbar_menu_items" ADD CONSTRAINT "resume_page_blocks_navbar_menu_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_navbar_menu_items" ADD CONSTRAINT "resume_page_blocks_navbar_menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_page_blocks_navbar_menu"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_navbar_menu" ADD CONSTRAINT "resume_page_blocks_navbar_menu_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_navbar_menu" ADD CONSTRAINT "resume_page_blocks_navbar_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_page_blocks_navbar"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_navbar_mobile_extra_links" ADD CONSTRAINT "resume_page_blocks_navbar_mobile_extra_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_page_blocks_navbar"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_navbar" ADD CONSTRAINT "resume_page_blocks_navbar_logo_src_id_media_id_fk" FOREIGN KEY ("logo_src_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_navbar" ADD CONSTRAINT "resume_page_blocks_navbar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_cta" ADD CONSTRAINT "resume_page_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_career_jobs_openings" ADD CONSTRAINT "resume_page_blocks_career_jobs_openings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_page_blocks_career_jobs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_career_jobs" ADD CONSTRAINT "resume_page_blocks_career_jobs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_page_blocks_career"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_career" ADD CONSTRAINT "resume_page_blocks_career_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_features_large_tabs" ADD CONSTRAINT "resume_page_blocks_features_large_tabs_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_features_large_tabs" ADD CONSTRAINT "resume_page_blocks_features_large_tabs_content_image_src_id_media_id_fk" FOREIGN KEY ("content_image_src_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_features_large_tabs" ADD CONSTRAINT "resume_page_blocks_features_large_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_page_blocks_features_large"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_features_large" ADD CONSTRAINT "resume_page_blocks_features_large_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_hero_testimonial_avatars" ADD CONSTRAINT "resume_page_blocks_hero_testimonial_avatars_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_hero_testimonial_avatars" ADD CONSTRAINT "resume_page_blocks_hero_testimonial_avatars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_page_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_hero" ADD CONSTRAINT "resume_page_blocks_hero_images_first_id_media_id_fk" FOREIGN KEY ("images_first_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_hero" ADD CONSTRAINT "resume_page_blocks_hero_images_second_id_media_id_fk" FOREIGN KEY ("images_second_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_hero" ADD CONSTRAINT "resume_page_blocks_hero_images_third_id_media_id_fk" FOREIGN KEY ("images_third_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_hero" ADD CONSTRAINT "resume_page_blocks_hero_images_fourth_id_media_id_fk" FOREIGN KEY ("images_fourth_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_hero" ADD CONSTRAINT "resume_page_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_hero_smartphone" ADD CONSTRAINT "resume_page_blocks_hero_smartphone_image_src_id_media_id_fk" FOREIGN KEY ("image_src_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_hero_smartphone" ADD CONSTRAINT "resume_page_blocks_hero_smartphone_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_features_boxes_features" ADD CONSTRAINT "resume_page_blocks_features_boxes_features_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_features_boxes_features" ADD CONSTRAINT "resume_page_blocks_features_boxes_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_page_blocks_features_boxes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_features_boxes" ADD CONSTRAINT "resume_page_blocks_features_boxes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_features_reasons" ADD CONSTRAINT "resume_page_blocks_features_reasons_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_features_reasons" ADD CONSTRAINT "resume_page_blocks_features_reasons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_page_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_features" ADD CONSTRAINT "resume_page_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_faq_items" ADD CONSTRAINT "resume_page_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_page_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_faq" ADD CONSTRAINT "resume_page_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_blog_small_posts" ADD CONSTRAINT "resume_page_blocks_blog_small_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_page_blocks_blog_small"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_blog_small" ADD CONSTRAINT "resume_page_blocks_blog_small_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_contact_contact_details" ADD CONSTRAINT "resume_page_blocks_contact_contact_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_page_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page_blocks_contact" ADD CONSTRAINT "resume_page_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resume_page" ADD CONSTRAINT "resume_page_meta_og_image_id_media_id_fk" FOREIGN KEY ("meta_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "form_fields_order_idx" ON "form_fields" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "form_fields_parent_id_idx" ON "form_fields" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "form_updated_at_idx" ON "form" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "form_created_at_idx" ON "form" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "projects_gallery_order_idx" ON "projects_gallery" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "projects_gallery_parent_id_idx" ON "projects_gallery" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_image_idx" ON "projects_gallery" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "projects_technologies_order_idx" ON "projects_technologies" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "projects_technologies_parent_id_idx" ON "projects_technologies" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "projects_technologies_icon_idx" ON "projects_technologies" USING btree ("icon_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "projects_featured_image_idx" ON "projects" USING btree ("featured_image_id");
  CREATE INDEX IF NOT EXISTS "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "posts_featured_image_idx" ON "posts" USING btree ("featured_image_id");
  CREATE INDEX IF NOT EXISTS "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_form_id_idx" ON "payload_locked_documents_rels" USING btree ("form_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "layout_blocks_navbar_menu_items_order_idx" ON "layout_blocks_navbar_menu_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "layout_blocks_navbar_menu_items_parent_id_idx" ON "layout_blocks_navbar_menu_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "layout_blocks_navbar_menu_items_icon_idx" ON "layout_blocks_navbar_menu_items" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "layout_blocks_navbar_menu_order_idx" ON "layout_blocks_navbar_menu" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "layout_blocks_navbar_menu_parent_id_idx" ON "layout_blocks_navbar_menu" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "layout_blocks_navbar_menu_icon_idx" ON "layout_blocks_navbar_menu" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "layout_blocks_navbar_mobile_extra_links_order_idx" ON "layout_blocks_navbar_mobile_extra_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "layout_blocks_navbar_mobile_extra_links_parent_id_idx" ON "layout_blocks_navbar_mobile_extra_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "layout_blocks_navbar_order_idx" ON "layout_blocks_navbar" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "layout_blocks_navbar_parent_id_idx" ON "layout_blocks_navbar" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "layout_blocks_navbar_path_idx" ON "layout_blocks_navbar" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "layout_blocks_navbar_logo_logo_src_idx" ON "layout_blocks_navbar" USING btree ("logo_src_id");
  CREATE INDEX IF NOT EXISTS "layout_blocks_footer_menu_items_links_order_idx" ON "layout_blocks_footer_menu_items_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "layout_blocks_footer_menu_items_links_parent_id_idx" ON "layout_blocks_footer_menu_items_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "layout_blocks_footer_menu_items_order_idx" ON "layout_blocks_footer_menu_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "layout_blocks_footer_menu_items_parent_id_idx" ON "layout_blocks_footer_menu_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "layout_blocks_footer_bottom_links_order_idx" ON "layout_blocks_footer_bottom_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "layout_blocks_footer_bottom_links_parent_id_idx" ON "layout_blocks_footer_bottom_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "layout_blocks_footer_order_idx" ON "layout_blocks_footer" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "layout_blocks_footer_parent_id_idx" ON "layout_blocks_footer" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "layout_blocks_footer_path_idx" ON "layout_blocks_footer" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "layout_blocks_footer_logo_logo_src_idx" ON "layout_blocks_footer" USING btree ("logo_src_id");
  CREATE INDEX IF NOT EXISTS "layout_layout_hideonroutes_order_idx" ON "layout_layout_hideonroutes" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "layout_layout_hideonroutes_parent_id_idx" ON "layout_layout_hideonroutes" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "layout_meta_meta_og_image_idx" ON "layout" USING btree ("meta_og_image_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_footer_menu_items_links_order_idx" ON "about_page_blocks_footer_menu_items_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_footer_menu_items_links_parent_id_idx" ON "about_page_blocks_footer_menu_items_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_footer_menu_items_order_idx" ON "about_page_blocks_footer_menu_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_footer_menu_items_parent_id_idx" ON "about_page_blocks_footer_menu_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_footer_bottom_links_order_idx" ON "about_page_blocks_footer_bottom_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_footer_bottom_links_parent_id_idx" ON "about_page_blocks_footer_bottom_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_footer_order_idx" ON "about_page_blocks_footer" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_footer_parent_id_idx" ON "about_page_blocks_footer" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_footer_path_idx" ON "about_page_blocks_footer" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_footer_logo_logo_src_idx" ON "about_page_blocks_footer" USING btree ("logo_src_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_navbar_menu_items_order_idx" ON "about_page_blocks_navbar_menu_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_navbar_menu_items_parent_id_idx" ON "about_page_blocks_navbar_menu_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_navbar_menu_items_icon_idx" ON "about_page_blocks_navbar_menu_items" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_navbar_menu_order_idx" ON "about_page_blocks_navbar_menu" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_navbar_menu_parent_id_idx" ON "about_page_blocks_navbar_menu" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_navbar_menu_icon_idx" ON "about_page_blocks_navbar_menu" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_navbar_mobile_extra_links_order_idx" ON "about_page_blocks_navbar_mobile_extra_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_navbar_mobile_extra_links_parent_id_idx" ON "about_page_blocks_navbar_mobile_extra_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_navbar_order_idx" ON "about_page_blocks_navbar" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_navbar_parent_id_idx" ON "about_page_blocks_navbar" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_navbar_path_idx" ON "about_page_blocks_navbar" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_navbar_logo_logo_src_idx" ON "about_page_blocks_navbar" USING btree ("logo_src_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_cta_order_idx" ON "about_page_blocks_cta" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_cta_parent_id_idx" ON "about_page_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_cta_path_idx" ON "about_page_blocks_cta" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_career_jobs_openings_order_idx" ON "about_page_blocks_career_jobs_openings" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_career_jobs_openings_parent_id_idx" ON "about_page_blocks_career_jobs_openings" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_career_jobs_order_idx" ON "about_page_blocks_career_jobs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_career_jobs_parent_id_idx" ON "about_page_blocks_career_jobs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_career_order_idx" ON "about_page_blocks_career" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_career_parent_id_idx" ON "about_page_blocks_career" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_career_path_idx" ON "about_page_blocks_career" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_features_large_tabs_order_idx" ON "about_page_blocks_features_large_tabs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_features_large_tabs_parent_id_idx" ON "about_page_blocks_features_large_tabs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_features_large_tabs_icon_idx" ON "about_page_blocks_features_large_tabs" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_features_large_tabs_content_content_image_src_idx" ON "about_page_blocks_features_large_tabs" USING btree ("content_image_src_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_features_large_order_idx" ON "about_page_blocks_features_large" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_features_large_parent_id_idx" ON "about_page_blocks_features_large" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_features_large_path_idx" ON "about_page_blocks_features_large" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_hero_testimonial_avatars_order_idx" ON "about_page_blocks_hero_testimonial_avatars" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_hero_testimonial_avatars_parent_id_idx" ON "about_page_blocks_hero_testimonial_avatars" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_hero_testimonial_avatars_image_idx" ON "about_page_blocks_hero_testimonial_avatars" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_hero_order_idx" ON "about_page_blocks_hero" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_hero_parent_id_idx" ON "about_page_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_hero_path_idx" ON "about_page_blocks_hero" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_hero_images_images_first_idx" ON "about_page_blocks_hero" USING btree ("images_first_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_hero_images_images_second_idx" ON "about_page_blocks_hero" USING btree ("images_second_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_hero_images_images_third_idx" ON "about_page_blocks_hero" USING btree ("images_third_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_hero_images_images_fourth_idx" ON "about_page_blocks_hero" USING btree ("images_fourth_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_hero_smartphone_order_idx" ON "about_page_blocks_hero_smartphone" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_hero_smartphone_parent_id_idx" ON "about_page_blocks_hero_smartphone" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_hero_smartphone_path_idx" ON "about_page_blocks_hero_smartphone" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_hero_smartphone_image_image_src_idx" ON "about_page_blocks_hero_smartphone" USING btree ("image_src_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_features_boxes_features_order_idx" ON "about_page_blocks_features_boxes_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_features_boxes_features_parent_id_idx" ON "about_page_blocks_features_boxes_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_features_boxes_features_icon_idx" ON "about_page_blocks_features_boxes_features" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_features_boxes_order_idx" ON "about_page_blocks_features_boxes" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_features_boxes_parent_id_idx" ON "about_page_blocks_features_boxes" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_features_boxes_path_idx" ON "about_page_blocks_features_boxes" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_features_reasons_order_idx" ON "about_page_blocks_features_reasons" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_features_reasons_parent_id_idx" ON "about_page_blocks_features_reasons" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_features_reasons_icon_idx" ON "about_page_blocks_features_reasons" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_features_order_idx" ON "about_page_blocks_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_features_parent_id_idx" ON "about_page_blocks_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_features_path_idx" ON "about_page_blocks_features" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_faq_items_order_idx" ON "about_page_blocks_faq_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_faq_items_parent_id_idx" ON "about_page_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_faq_order_idx" ON "about_page_blocks_faq" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_faq_parent_id_idx" ON "about_page_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_faq_path_idx" ON "about_page_blocks_faq" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_blog_small_posts_order_idx" ON "about_page_blocks_blog_small_posts" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_blog_small_posts_parent_id_idx" ON "about_page_blocks_blog_small_posts" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_blog_small_order_idx" ON "about_page_blocks_blog_small" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_blog_small_parent_id_idx" ON "about_page_blocks_blog_small" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_blog_small_path_idx" ON "about_page_blocks_blog_small" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_contact_contact_details_order_idx" ON "about_page_blocks_contact_contact_details" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_contact_contact_details_parent_id_idx" ON "about_page_blocks_contact_contact_details" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_contact_order_idx" ON "about_page_blocks_contact" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_contact_parent_id_idx" ON "about_page_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "about_page_blocks_contact_path_idx" ON "about_page_blocks_contact" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "about_page_slug_idx" ON "about_page" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "about_page_meta_meta_og_image_idx" ON "about_page" USING btree ("meta_og_image_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_footer_menu_items_links_order_idx" ON "landing_page_blocks_footer_menu_items_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_footer_menu_items_links_parent_id_idx" ON "landing_page_blocks_footer_menu_items_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_footer_menu_items_order_idx" ON "landing_page_blocks_footer_menu_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_footer_menu_items_parent_id_idx" ON "landing_page_blocks_footer_menu_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_footer_bottom_links_order_idx" ON "landing_page_blocks_footer_bottom_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_footer_bottom_links_parent_id_idx" ON "landing_page_blocks_footer_bottom_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_footer_order_idx" ON "landing_page_blocks_footer" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_footer_parent_id_idx" ON "landing_page_blocks_footer" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_footer_path_idx" ON "landing_page_blocks_footer" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_footer_logo_logo_src_idx" ON "landing_page_blocks_footer" USING btree ("logo_src_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_navbar_menu_items_order_idx" ON "landing_page_blocks_navbar_menu_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_navbar_menu_items_parent_id_idx" ON "landing_page_blocks_navbar_menu_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_navbar_menu_items_icon_idx" ON "landing_page_blocks_navbar_menu_items" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_navbar_menu_order_idx" ON "landing_page_blocks_navbar_menu" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_navbar_menu_parent_id_idx" ON "landing_page_blocks_navbar_menu" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_navbar_menu_icon_idx" ON "landing_page_blocks_navbar_menu" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_navbar_mobile_extra_links_order_idx" ON "landing_page_blocks_navbar_mobile_extra_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_navbar_mobile_extra_links_parent_id_idx" ON "landing_page_blocks_navbar_mobile_extra_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_navbar_order_idx" ON "landing_page_blocks_navbar" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_navbar_parent_id_idx" ON "landing_page_blocks_navbar" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_navbar_path_idx" ON "landing_page_blocks_navbar" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_navbar_logo_logo_src_idx" ON "landing_page_blocks_navbar" USING btree ("logo_src_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_cta_order_idx" ON "landing_page_blocks_cta" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_cta_parent_id_idx" ON "landing_page_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_cta_path_idx" ON "landing_page_blocks_cta" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_career_jobs_openings_order_idx" ON "landing_page_blocks_career_jobs_openings" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_career_jobs_openings_parent_id_idx" ON "landing_page_blocks_career_jobs_openings" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_career_jobs_order_idx" ON "landing_page_blocks_career_jobs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_career_jobs_parent_id_idx" ON "landing_page_blocks_career_jobs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_career_order_idx" ON "landing_page_blocks_career" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_career_parent_id_idx" ON "landing_page_blocks_career" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_career_path_idx" ON "landing_page_blocks_career" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_features_large_tabs_order_idx" ON "landing_page_blocks_features_large_tabs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_features_large_tabs_parent_id_idx" ON "landing_page_blocks_features_large_tabs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_features_large_tabs_icon_idx" ON "landing_page_blocks_features_large_tabs" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_features_large_tabs_content_content_image_src_idx" ON "landing_page_blocks_features_large_tabs" USING btree ("content_image_src_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_features_large_order_idx" ON "landing_page_blocks_features_large" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_features_large_parent_id_idx" ON "landing_page_blocks_features_large" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_features_large_path_idx" ON "landing_page_blocks_features_large" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_hero_testimonial_avatars_order_idx" ON "landing_page_blocks_hero_testimonial_avatars" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_hero_testimonial_avatars_parent_id_idx" ON "landing_page_blocks_hero_testimonial_avatars" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_hero_testimonial_avatars_image_idx" ON "landing_page_blocks_hero_testimonial_avatars" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_hero_order_idx" ON "landing_page_blocks_hero" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_hero_parent_id_idx" ON "landing_page_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_hero_path_idx" ON "landing_page_blocks_hero" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_hero_images_images_first_idx" ON "landing_page_blocks_hero" USING btree ("images_first_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_hero_images_images_second_idx" ON "landing_page_blocks_hero" USING btree ("images_second_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_hero_images_images_third_idx" ON "landing_page_blocks_hero" USING btree ("images_third_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_hero_images_images_fourth_idx" ON "landing_page_blocks_hero" USING btree ("images_fourth_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_hero_smartphone_order_idx" ON "landing_page_blocks_hero_smartphone" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_hero_smartphone_parent_id_idx" ON "landing_page_blocks_hero_smartphone" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_hero_smartphone_path_idx" ON "landing_page_blocks_hero_smartphone" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_hero_smartphone_image_image_src_idx" ON "landing_page_blocks_hero_smartphone" USING btree ("image_src_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_features_boxes_features_order_idx" ON "landing_page_blocks_features_boxes_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_features_boxes_features_parent_id_idx" ON "landing_page_blocks_features_boxes_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_features_boxes_features_icon_idx" ON "landing_page_blocks_features_boxes_features" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_features_boxes_order_idx" ON "landing_page_blocks_features_boxes" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_features_boxes_parent_id_idx" ON "landing_page_blocks_features_boxes" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_features_boxes_path_idx" ON "landing_page_blocks_features_boxes" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_features_reasons_order_idx" ON "landing_page_blocks_features_reasons" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_features_reasons_parent_id_idx" ON "landing_page_blocks_features_reasons" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_features_reasons_icon_idx" ON "landing_page_blocks_features_reasons" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_features_order_idx" ON "landing_page_blocks_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_features_parent_id_idx" ON "landing_page_blocks_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_features_path_idx" ON "landing_page_blocks_features" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_faq_items_order_idx" ON "landing_page_blocks_faq_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_faq_items_parent_id_idx" ON "landing_page_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_faq_order_idx" ON "landing_page_blocks_faq" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_faq_parent_id_idx" ON "landing_page_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_faq_path_idx" ON "landing_page_blocks_faq" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_blog_small_posts_order_idx" ON "landing_page_blocks_blog_small_posts" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_blog_small_posts_parent_id_idx" ON "landing_page_blocks_blog_small_posts" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_blog_small_order_idx" ON "landing_page_blocks_blog_small" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_blog_small_parent_id_idx" ON "landing_page_blocks_blog_small" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_blog_small_path_idx" ON "landing_page_blocks_blog_small" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_contact_contact_details_order_idx" ON "landing_page_blocks_contact_contact_details" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_contact_contact_details_parent_id_idx" ON "landing_page_blocks_contact_contact_details" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_contact_order_idx" ON "landing_page_blocks_contact" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_contact_parent_id_idx" ON "landing_page_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_contact_path_idx" ON "landing_page_blocks_contact" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "landing_page_slug_idx" ON "landing_page" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "landing_page_meta_meta_og_image_idx" ON "landing_page" USING btree ("meta_og_image_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_footer_menu_items_links_order_idx" ON "blog_page_blocks_footer_menu_items_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_footer_menu_items_links_parent_id_idx" ON "blog_page_blocks_footer_menu_items_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_footer_menu_items_order_idx" ON "blog_page_blocks_footer_menu_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_footer_menu_items_parent_id_idx" ON "blog_page_blocks_footer_menu_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_footer_bottom_links_order_idx" ON "blog_page_blocks_footer_bottom_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_footer_bottom_links_parent_id_idx" ON "blog_page_blocks_footer_bottom_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_footer_order_idx" ON "blog_page_blocks_footer" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_footer_parent_id_idx" ON "blog_page_blocks_footer" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_footer_path_idx" ON "blog_page_blocks_footer" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_footer_logo_logo_src_idx" ON "blog_page_blocks_footer" USING btree ("logo_src_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_navbar_menu_items_order_idx" ON "blog_page_blocks_navbar_menu_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_navbar_menu_items_parent_id_idx" ON "blog_page_blocks_navbar_menu_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_navbar_menu_items_icon_idx" ON "blog_page_blocks_navbar_menu_items" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_navbar_menu_order_idx" ON "blog_page_blocks_navbar_menu" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_navbar_menu_parent_id_idx" ON "blog_page_blocks_navbar_menu" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_navbar_menu_icon_idx" ON "blog_page_blocks_navbar_menu" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_navbar_mobile_extra_links_order_idx" ON "blog_page_blocks_navbar_mobile_extra_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_navbar_mobile_extra_links_parent_id_idx" ON "blog_page_blocks_navbar_mobile_extra_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_navbar_order_idx" ON "blog_page_blocks_navbar" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_navbar_parent_id_idx" ON "blog_page_blocks_navbar" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_navbar_path_idx" ON "blog_page_blocks_navbar" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_navbar_logo_logo_src_idx" ON "blog_page_blocks_navbar" USING btree ("logo_src_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_cta_order_idx" ON "blog_page_blocks_cta" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_cta_parent_id_idx" ON "blog_page_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_cta_path_idx" ON "blog_page_blocks_cta" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_career_jobs_openings_order_idx" ON "blog_page_blocks_career_jobs_openings" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_career_jobs_openings_parent_id_idx" ON "blog_page_blocks_career_jobs_openings" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_career_jobs_order_idx" ON "blog_page_blocks_career_jobs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_career_jobs_parent_id_idx" ON "blog_page_blocks_career_jobs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_career_order_idx" ON "blog_page_blocks_career" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_career_parent_id_idx" ON "blog_page_blocks_career" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_career_path_idx" ON "blog_page_blocks_career" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_features_large_tabs_order_idx" ON "blog_page_blocks_features_large_tabs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_features_large_tabs_parent_id_idx" ON "blog_page_blocks_features_large_tabs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_features_large_tabs_icon_idx" ON "blog_page_blocks_features_large_tabs" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_features_large_tabs_content_content_image_src_idx" ON "blog_page_blocks_features_large_tabs" USING btree ("content_image_src_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_features_large_order_idx" ON "blog_page_blocks_features_large" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_features_large_parent_id_idx" ON "blog_page_blocks_features_large" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_features_large_path_idx" ON "blog_page_blocks_features_large" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_hero_testimonial_avatars_order_idx" ON "blog_page_blocks_hero_testimonial_avatars" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_hero_testimonial_avatars_parent_id_idx" ON "blog_page_blocks_hero_testimonial_avatars" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_hero_testimonial_avatars_image_idx" ON "blog_page_blocks_hero_testimonial_avatars" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_hero_order_idx" ON "blog_page_blocks_hero" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_hero_parent_id_idx" ON "blog_page_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_hero_path_idx" ON "blog_page_blocks_hero" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_hero_images_images_first_idx" ON "blog_page_blocks_hero" USING btree ("images_first_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_hero_images_images_second_idx" ON "blog_page_blocks_hero" USING btree ("images_second_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_hero_images_images_third_idx" ON "blog_page_blocks_hero" USING btree ("images_third_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_hero_images_images_fourth_idx" ON "blog_page_blocks_hero" USING btree ("images_fourth_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_hero_smartphone_order_idx" ON "blog_page_blocks_hero_smartphone" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_hero_smartphone_parent_id_idx" ON "blog_page_blocks_hero_smartphone" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_hero_smartphone_path_idx" ON "blog_page_blocks_hero_smartphone" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_hero_smartphone_image_image_src_idx" ON "blog_page_blocks_hero_smartphone" USING btree ("image_src_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_features_boxes_features_order_idx" ON "blog_page_blocks_features_boxes_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_features_boxes_features_parent_id_idx" ON "blog_page_blocks_features_boxes_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_features_boxes_features_icon_idx" ON "blog_page_blocks_features_boxes_features" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_features_boxes_order_idx" ON "blog_page_blocks_features_boxes" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_features_boxes_parent_id_idx" ON "blog_page_blocks_features_boxes" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_features_boxes_path_idx" ON "blog_page_blocks_features_boxes" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_features_reasons_order_idx" ON "blog_page_blocks_features_reasons" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_features_reasons_parent_id_idx" ON "blog_page_blocks_features_reasons" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_features_reasons_icon_idx" ON "blog_page_blocks_features_reasons" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_features_order_idx" ON "blog_page_blocks_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_features_parent_id_idx" ON "blog_page_blocks_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_features_path_idx" ON "blog_page_blocks_features" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_faq_items_order_idx" ON "blog_page_blocks_faq_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_faq_items_parent_id_idx" ON "blog_page_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_faq_order_idx" ON "blog_page_blocks_faq" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_faq_parent_id_idx" ON "blog_page_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_faq_path_idx" ON "blog_page_blocks_faq" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_blog_small_posts_order_idx" ON "blog_page_blocks_blog_small_posts" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_blog_small_posts_parent_id_idx" ON "blog_page_blocks_blog_small_posts" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_blog_small_order_idx" ON "blog_page_blocks_blog_small" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_blog_small_parent_id_idx" ON "blog_page_blocks_blog_small" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_blog_small_path_idx" ON "blog_page_blocks_blog_small" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_contact_contact_details_order_idx" ON "blog_page_blocks_contact_contact_details" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_contact_contact_details_parent_id_idx" ON "blog_page_blocks_contact_contact_details" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_contact_order_idx" ON "blog_page_blocks_contact" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_contact_parent_id_idx" ON "blog_page_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_page_blocks_contact_path_idx" ON "blog_page_blocks_contact" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "blog_page_slug_idx" ON "blog_page" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "blog_page_meta_meta_og_image_idx" ON "blog_page" USING btree ("meta_og_image_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_footer_menu_items_links_order_idx" ON "contact_page_blocks_footer_menu_items_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_footer_menu_items_links_parent_id_idx" ON "contact_page_blocks_footer_menu_items_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_footer_menu_items_order_idx" ON "contact_page_blocks_footer_menu_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_footer_menu_items_parent_id_idx" ON "contact_page_blocks_footer_menu_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_footer_bottom_links_order_idx" ON "contact_page_blocks_footer_bottom_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_footer_bottom_links_parent_id_idx" ON "contact_page_blocks_footer_bottom_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_footer_order_idx" ON "contact_page_blocks_footer" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_footer_parent_id_idx" ON "contact_page_blocks_footer" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_footer_path_idx" ON "contact_page_blocks_footer" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_footer_logo_logo_src_idx" ON "contact_page_blocks_footer" USING btree ("logo_src_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_navbar_menu_items_order_idx" ON "contact_page_blocks_navbar_menu_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_navbar_menu_items_parent_id_idx" ON "contact_page_blocks_navbar_menu_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_navbar_menu_items_icon_idx" ON "contact_page_blocks_navbar_menu_items" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_navbar_menu_order_idx" ON "contact_page_blocks_navbar_menu" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_navbar_menu_parent_id_idx" ON "contact_page_blocks_navbar_menu" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_navbar_menu_icon_idx" ON "contact_page_blocks_navbar_menu" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_navbar_mobile_extra_links_order_idx" ON "contact_page_blocks_navbar_mobile_extra_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_navbar_mobile_extra_links_parent_id_idx" ON "contact_page_blocks_navbar_mobile_extra_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_navbar_order_idx" ON "contact_page_blocks_navbar" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_navbar_parent_id_idx" ON "contact_page_blocks_navbar" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_navbar_path_idx" ON "contact_page_blocks_navbar" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_navbar_logo_logo_src_idx" ON "contact_page_blocks_navbar" USING btree ("logo_src_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_cta_order_idx" ON "contact_page_blocks_cta" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_cta_parent_id_idx" ON "contact_page_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_cta_path_idx" ON "contact_page_blocks_cta" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_career_jobs_openings_order_idx" ON "contact_page_blocks_career_jobs_openings" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_career_jobs_openings_parent_id_idx" ON "contact_page_blocks_career_jobs_openings" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_career_jobs_order_idx" ON "contact_page_blocks_career_jobs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_career_jobs_parent_id_idx" ON "contact_page_blocks_career_jobs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_career_order_idx" ON "contact_page_blocks_career" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_career_parent_id_idx" ON "contact_page_blocks_career" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_career_path_idx" ON "contact_page_blocks_career" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_features_large_tabs_order_idx" ON "contact_page_blocks_features_large_tabs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_features_large_tabs_parent_id_idx" ON "contact_page_blocks_features_large_tabs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_features_large_tabs_icon_idx" ON "contact_page_blocks_features_large_tabs" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_features_large_tabs_content_content_image_src_idx" ON "contact_page_blocks_features_large_tabs" USING btree ("content_image_src_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_features_large_order_idx" ON "contact_page_blocks_features_large" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_features_large_parent_id_idx" ON "contact_page_blocks_features_large" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_features_large_path_idx" ON "contact_page_blocks_features_large" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_hero_testimonial_avatars_order_idx" ON "contact_page_blocks_hero_testimonial_avatars" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_hero_testimonial_avatars_parent_id_idx" ON "contact_page_blocks_hero_testimonial_avatars" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_hero_testimonial_avatars_image_idx" ON "contact_page_blocks_hero_testimonial_avatars" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_hero_order_idx" ON "contact_page_blocks_hero" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_hero_parent_id_idx" ON "contact_page_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_hero_path_idx" ON "contact_page_blocks_hero" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_hero_images_images_first_idx" ON "contact_page_blocks_hero" USING btree ("images_first_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_hero_images_images_second_idx" ON "contact_page_blocks_hero" USING btree ("images_second_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_hero_images_images_third_idx" ON "contact_page_blocks_hero" USING btree ("images_third_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_hero_images_images_fourth_idx" ON "contact_page_blocks_hero" USING btree ("images_fourth_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_hero_smartphone_order_idx" ON "contact_page_blocks_hero_smartphone" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_hero_smartphone_parent_id_idx" ON "contact_page_blocks_hero_smartphone" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_hero_smartphone_path_idx" ON "contact_page_blocks_hero_smartphone" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_hero_smartphone_image_image_src_idx" ON "contact_page_blocks_hero_smartphone" USING btree ("image_src_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_features_boxes_features_order_idx" ON "contact_page_blocks_features_boxes_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_features_boxes_features_parent_id_idx" ON "contact_page_blocks_features_boxes_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_features_boxes_features_icon_idx" ON "contact_page_blocks_features_boxes_features" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_features_boxes_order_idx" ON "contact_page_blocks_features_boxes" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_features_boxes_parent_id_idx" ON "contact_page_blocks_features_boxes" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_features_boxes_path_idx" ON "contact_page_blocks_features_boxes" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_features_reasons_order_idx" ON "contact_page_blocks_features_reasons" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_features_reasons_parent_id_idx" ON "contact_page_blocks_features_reasons" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_features_reasons_icon_idx" ON "contact_page_blocks_features_reasons" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_features_order_idx" ON "contact_page_blocks_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_features_parent_id_idx" ON "contact_page_blocks_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_features_path_idx" ON "contact_page_blocks_features" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_faq_items_order_idx" ON "contact_page_blocks_faq_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_faq_items_parent_id_idx" ON "contact_page_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_faq_order_idx" ON "contact_page_blocks_faq" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_faq_parent_id_idx" ON "contact_page_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_faq_path_idx" ON "contact_page_blocks_faq" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_blog_small_posts_order_idx" ON "contact_page_blocks_blog_small_posts" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_blog_small_posts_parent_id_idx" ON "contact_page_blocks_blog_small_posts" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_blog_small_order_idx" ON "contact_page_blocks_blog_small" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_blog_small_parent_id_idx" ON "contact_page_blocks_blog_small" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_blog_small_path_idx" ON "contact_page_blocks_blog_small" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_contact_contact_details_order_idx" ON "contact_page_blocks_contact_contact_details" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_contact_contact_details_parent_id_idx" ON "contact_page_blocks_contact_contact_details" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_contact_order_idx" ON "contact_page_blocks_contact" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_contact_parent_id_idx" ON "contact_page_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "contact_page_blocks_contact_path_idx" ON "contact_page_blocks_contact" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "contact_page_slug_idx" ON "contact_page" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "contact_page_meta_meta_og_image_idx" ON "contact_page" USING btree ("meta_og_image_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_footer_menu_items_links_order_idx" ON "projects_gallery_page_blocks_footer_menu_items_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_footer_menu_items_links_parent_id_idx" ON "projects_gallery_page_blocks_footer_menu_items_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_footer_menu_items_order_idx" ON "projects_gallery_page_blocks_footer_menu_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_footer_menu_items_parent_id_idx" ON "projects_gallery_page_blocks_footer_menu_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_footer_bottom_links_order_idx" ON "projects_gallery_page_blocks_footer_bottom_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_footer_bottom_links_parent_id_idx" ON "projects_gallery_page_blocks_footer_bottom_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_footer_order_idx" ON "projects_gallery_page_blocks_footer" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_footer_parent_id_idx" ON "projects_gallery_page_blocks_footer" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_footer_path_idx" ON "projects_gallery_page_blocks_footer" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_footer_logo_logo_src_idx" ON "projects_gallery_page_blocks_footer" USING btree ("logo_src_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_navbar_menu_items_order_idx" ON "projects_gallery_page_blocks_navbar_menu_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_navbar_menu_items_parent_id_idx" ON "projects_gallery_page_blocks_navbar_menu_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_navbar_menu_items_icon_idx" ON "projects_gallery_page_blocks_navbar_menu_items" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_navbar_menu_order_idx" ON "projects_gallery_page_blocks_navbar_menu" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_navbar_menu_parent_id_idx" ON "projects_gallery_page_blocks_navbar_menu" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_navbar_menu_icon_idx" ON "projects_gallery_page_blocks_navbar_menu" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_navbar_mobile_extra_links_order_idx" ON "projects_gallery_page_blocks_navbar_mobile_extra_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_navbar_mobile_extra_links_parent_id_idx" ON "projects_gallery_page_blocks_navbar_mobile_extra_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_navbar_order_idx" ON "projects_gallery_page_blocks_navbar" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_navbar_parent_id_idx" ON "projects_gallery_page_blocks_navbar" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_navbar_path_idx" ON "projects_gallery_page_blocks_navbar" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_navbar_logo_logo_src_idx" ON "projects_gallery_page_blocks_navbar" USING btree ("logo_src_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_cta_order_idx" ON "projects_gallery_page_blocks_cta" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_cta_parent_id_idx" ON "projects_gallery_page_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_cta_path_idx" ON "projects_gallery_page_blocks_cta" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_career_jobs_openings_order_idx" ON "projects_gallery_page_blocks_career_jobs_openings" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_career_jobs_openings_parent_id_idx" ON "projects_gallery_page_blocks_career_jobs_openings" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_career_jobs_order_idx" ON "projects_gallery_page_blocks_career_jobs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_career_jobs_parent_id_idx" ON "projects_gallery_page_blocks_career_jobs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_career_order_idx" ON "projects_gallery_page_blocks_career" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_career_parent_id_idx" ON "projects_gallery_page_blocks_career" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_career_path_idx" ON "projects_gallery_page_blocks_career" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_features_large_tabs_order_idx" ON "projects_gallery_page_blocks_features_large_tabs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_features_large_tabs_parent_id_idx" ON "projects_gallery_page_blocks_features_large_tabs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_features_large_tabs_icon_idx" ON "projects_gallery_page_blocks_features_large_tabs" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_features_large_tabs_content_content_image_src_idx" ON "projects_gallery_page_blocks_features_large_tabs" USING btree ("content_image_src_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_features_large_order_idx" ON "projects_gallery_page_blocks_features_large" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_features_large_parent_id_idx" ON "projects_gallery_page_blocks_features_large" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_features_large_path_idx" ON "projects_gallery_page_blocks_features_large" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_hero_testimonial_avatars_order_idx" ON "projects_gallery_page_blocks_hero_testimonial_avatars" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_hero_testimonial_avatars_parent_id_idx" ON "projects_gallery_page_blocks_hero_testimonial_avatars" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_hero_testimonial_avatars_image_idx" ON "projects_gallery_page_blocks_hero_testimonial_avatars" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_hero_order_idx" ON "projects_gallery_page_blocks_hero" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_hero_parent_id_idx" ON "projects_gallery_page_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_hero_path_idx" ON "projects_gallery_page_blocks_hero" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_hero_images_images_first_idx" ON "projects_gallery_page_blocks_hero" USING btree ("images_first_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_hero_images_images_second_idx" ON "projects_gallery_page_blocks_hero" USING btree ("images_second_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_hero_images_images_third_idx" ON "projects_gallery_page_blocks_hero" USING btree ("images_third_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_hero_images_images_fourth_idx" ON "projects_gallery_page_blocks_hero" USING btree ("images_fourth_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_hero_smartphone_order_idx" ON "projects_gallery_page_blocks_hero_smartphone" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_hero_smartphone_parent_id_idx" ON "projects_gallery_page_blocks_hero_smartphone" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_hero_smartphone_path_idx" ON "projects_gallery_page_blocks_hero_smartphone" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_hero_smartphone_image_image_src_idx" ON "projects_gallery_page_blocks_hero_smartphone" USING btree ("image_src_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_features_boxes_features_order_idx" ON "projects_gallery_page_blocks_features_boxes_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_features_boxes_features_parent_id_idx" ON "projects_gallery_page_blocks_features_boxes_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_features_boxes_features_icon_idx" ON "projects_gallery_page_blocks_features_boxes_features" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_features_boxes_order_idx" ON "projects_gallery_page_blocks_features_boxes" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_features_boxes_parent_id_idx" ON "projects_gallery_page_blocks_features_boxes" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_features_boxes_path_idx" ON "projects_gallery_page_blocks_features_boxes" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_features_reasons_order_idx" ON "projects_gallery_page_blocks_features_reasons" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_features_reasons_parent_id_idx" ON "projects_gallery_page_blocks_features_reasons" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_features_reasons_icon_idx" ON "projects_gallery_page_blocks_features_reasons" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_features_order_idx" ON "projects_gallery_page_blocks_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_features_parent_id_idx" ON "projects_gallery_page_blocks_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_features_path_idx" ON "projects_gallery_page_blocks_features" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_faq_items_order_idx" ON "projects_gallery_page_blocks_faq_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_faq_items_parent_id_idx" ON "projects_gallery_page_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_faq_order_idx" ON "projects_gallery_page_blocks_faq" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_faq_parent_id_idx" ON "projects_gallery_page_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_faq_path_idx" ON "projects_gallery_page_blocks_faq" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_blog_small_posts_order_idx" ON "projects_gallery_page_blocks_blog_small_posts" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_blog_small_posts_parent_id_idx" ON "projects_gallery_page_blocks_blog_small_posts" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_blog_small_order_idx" ON "projects_gallery_page_blocks_blog_small" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_blog_small_parent_id_idx" ON "projects_gallery_page_blocks_blog_small" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_blog_small_path_idx" ON "projects_gallery_page_blocks_blog_small" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_contact_contact_details_order_idx" ON "projects_gallery_page_blocks_contact_contact_details" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_contact_contact_details_parent_id_idx" ON "projects_gallery_page_blocks_contact_contact_details" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_contact_order_idx" ON "projects_gallery_page_blocks_contact" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_contact_parent_id_idx" ON "projects_gallery_page_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_blocks_contact_path_idx" ON "projects_gallery_page_blocks_contact" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "projects_gallery_page_slug_idx" ON "projects_gallery_page" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "projects_gallery_page_meta_meta_og_image_idx" ON "projects_gallery_page" USING btree ("meta_og_image_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_footer_menu_items_links_order_idx" ON "resume_page_blocks_footer_menu_items_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_footer_menu_items_links_parent_id_idx" ON "resume_page_blocks_footer_menu_items_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_footer_menu_items_order_idx" ON "resume_page_blocks_footer_menu_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_footer_menu_items_parent_id_idx" ON "resume_page_blocks_footer_menu_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_footer_bottom_links_order_idx" ON "resume_page_blocks_footer_bottom_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_footer_bottom_links_parent_id_idx" ON "resume_page_blocks_footer_bottom_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_footer_order_idx" ON "resume_page_blocks_footer" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_footer_parent_id_idx" ON "resume_page_blocks_footer" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_footer_path_idx" ON "resume_page_blocks_footer" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_footer_logo_logo_src_idx" ON "resume_page_blocks_footer" USING btree ("logo_src_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_navbar_menu_items_order_idx" ON "resume_page_blocks_navbar_menu_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_navbar_menu_items_parent_id_idx" ON "resume_page_blocks_navbar_menu_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_navbar_menu_items_icon_idx" ON "resume_page_blocks_navbar_menu_items" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_navbar_menu_order_idx" ON "resume_page_blocks_navbar_menu" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_navbar_menu_parent_id_idx" ON "resume_page_blocks_navbar_menu" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_navbar_menu_icon_idx" ON "resume_page_blocks_navbar_menu" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_navbar_mobile_extra_links_order_idx" ON "resume_page_blocks_navbar_mobile_extra_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_navbar_mobile_extra_links_parent_id_idx" ON "resume_page_blocks_navbar_mobile_extra_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_navbar_order_idx" ON "resume_page_blocks_navbar" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_navbar_parent_id_idx" ON "resume_page_blocks_navbar" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_navbar_path_idx" ON "resume_page_blocks_navbar" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_navbar_logo_logo_src_idx" ON "resume_page_blocks_navbar" USING btree ("logo_src_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_cta_order_idx" ON "resume_page_blocks_cta" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_cta_parent_id_idx" ON "resume_page_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_cta_path_idx" ON "resume_page_blocks_cta" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_career_jobs_openings_order_idx" ON "resume_page_blocks_career_jobs_openings" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_career_jobs_openings_parent_id_idx" ON "resume_page_blocks_career_jobs_openings" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_career_jobs_order_idx" ON "resume_page_blocks_career_jobs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_career_jobs_parent_id_idx" ON "resume_page_blocks_career_jobs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_career_order_idx" ON "resume_page_blocks_career" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_career_parent_id_idx" ON "resume_page_blocks_career" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_career_path_idx" ON "resume_page_blocks_career" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_features_large_tabs_order_idx" ON "resume_page_blocks_features_large_tabs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_features_large_tabs_parent_id_idx" ON "resume_page_blocks_features_large_tabs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_features_large_tabs_icon_idx" ON "resume_page_blocks_features_large_tabs" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_features_large_tabs_content_content_image_src_idx" ON "resume_page_blocks_features_large_tabs" USING btree ("content_image_src_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_features_large_order_idx" ON "resume_page_blocks_features_large" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_features_large_parent_id_idx" ON "resume_page_blocks_features_large" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_features_large_path_idx" ON "resume_page_blocks_features_large" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_hero_testimonial_avatars_order_idx" ON "resume_page_blocks_hero_testimonial_avatars" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_hero_testimonial_avatars_parent_id_idx" ON "resume_page_blocks_hero_testimonial_avatars" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_hero_testimonial_avatars_image_idx" ON "resume_page_blocks_hero_testimonial_avatars" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_hero_order_idx" ON "resume_page_blocks_hero" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_hero_parent_id_idx" ON "resume_page_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_hero_path_idx" ON "resume_page_blocks_hero" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_hero_images_images_first_idx" ON "resume_page_blocks_hero" USING btree ("images_first_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_hero_images_images_second_idx" ON "resume_page_blocks_hero" USING btree ("images_second_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_hero_images_images_third_idx" ON "resume_page_blocks_hero" USING btree ("images_third_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_hero_images_images_fourth_idx" ON "resume_page_blocks_hero" USING btree ("images_fourth_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_hero_smartphone_order_idx" ON "resume_page_blocks_hero_smartphone" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_hero_smartphone_parent_id_idx" ON "resume_page_blocks_hero_smartphone" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_hero_smartphone_path_idx" ON "resume_page_blocks_hero_smartphone" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_hero_smartphone_image_image_src_idx" ON "resume_page_blocks_hero_smartphone" USING btree ("image_src_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_features_boxes_features_order_idx" ON "resume_page_blocks_features_boxes_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_features_boxes_features_parent_id_idx" ON "resume_page_blocks_features_boxes_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_features_boxes_features_icon_idx" ON "resume_page_blocks_features_boxes_features" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_features_boxes_order_idx" ON "resume_page_blocks_features_boxes" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_features_boxes_parent_id_idx" ON "resume_page_blocks_features_boxes" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_features_boxes_path_idx" ON "resume_page_blocks_features_boxes" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_features_reasons_order_idx" ON "resume_page_blocks_features_reasons" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_features_reasons_parent_id_idx" ON "resume_page_blocks_features_reasons" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_features_reasons_icon_idx" ON "resume_page_blocks_features_reasons" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_features_order_idx" ON "resume_page_blocks_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_features_parent_id_idx" ON "resume_page_blocks_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_features_path_idx" ON "resume_page_blocks_features" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_faq_items_order_idx" ON "resume_page_blocks_faq_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_faq_items_parent_id_idx" ON "resume_page_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_faq_order_idx" ON "resume_page_blocks_faq" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_faq_parent_id_idx" ON "resume_page_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_faq_path_idx" ON "resume_page_blocks_faq" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_blog_small_posts_order_idx" ON "resume_page_blocks_blog_small_posts" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_blog_small_posts_parent_id_idx" ON "resume_page_blocks_blog_small_posts" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_blog_small_order_idx" ON "resume_page_blocks_blog_small" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_blog_small_parent_id_idx" ON "resume_page_blocks_blog_small" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_blog_small_path_idx" ON "resume_page_blocks_blog_small" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_contact_contact_details_order_idx" ON "resume_page_blocks_contact_contact_details" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_contact_contact_details_parent_id_idx" ON "resume_page_blocks_contact_contact_details" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_contact_order_idx" ON "resume_page_blocks_contact" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_contact_parent_id_idx" ON "resume_page_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "resume_page_blocks_contact_path_idx" ON "resume_page_blocks_contact" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "resume_page_slug_idx" ON "resume_page" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "resume_page_meta_meta_og_image_idx" ON "resume_page" USING btree ("meta_og_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "form_fields" CASCADE;
  DROP TABLE "form" CASCADE;
  DROP TABLE "projects_gallery" CASCADE;
  DROP TABLE "projects_technologies" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "layout_blocks_navbar_menu_items" CASCADE;
  DROP TABLE "layout_blocks_navbar_menu" CASCADE;
  DROP TABLE "layout_blocks_navbar_mobile_extra_links" CASCADE;
  DROP TABLE "layout_blocks_navbar" CASCADE;
  DROP TABLE "layout_blocks_footer_menu_items_links" CASCADE;
  DROP TABLE "layout_blocks_footer_menu_items" CASCADE;
  DROP TABLE "layout_blocks_footer_bottom_links" CASCADE;
  DROP TABLE "layout_blocks_footer" CASCADE;
  DROP TABLE "layout_layout_hideonroutes" CASCADE;
  DROP TABLE "layout" CASCADE;
  DROP TABLE "about_page_blocks_footer_menu_items_links" CASCADE;
  DROP TABLE "about_page_blocks_footer_menu_items" CASCADE;
  DROP TABLE "about_page_blocks_footer_bottom_links" CASCADE;
  DROP TABLE "about_page_blocks_footer" CASCADE;
  DROP TABLE "about_page_blocks_navbar_menu_items" CASCADE;
  DROP TABLE "about_page_blocks_navbar_menu" CASCADE;
  DROP TABLE "about_page_blocks_navbar_mobile_extra_links" CASCADE;
  DROP TABLE "about_page_blocks_navbar" CASCADE;
  DROP TABLE "about_page_blocks_cta" CASCADE;
  DROP TABLE "about_page_blocks_career_jobs_openings" CASCADE;
  DROP TABLE "about_page_blocks_career_jobs" CASCADE;
  DROP TABLE "about_page_blocks_career" CASCADE;
  DROP TABLE "about_page_blocks_features_large_tabs" CASCADE;
  DROP TABLE "about_page_blocks_features_large" CASCADE;
  DROP TABLE "about_page_blocks_hero_testimonial_avatars" CASCADE;
  DROP TABLE "about_page_blocks_hero" CASCADE;
  DROP TABLE "about_page_blocks_hero_smartphone" CASCADE;
  DROP TABLE "about_page_blocks_features_boxes_features" CASCADE;
  DROP TABLE "about_page_blocks_features_boxes" CASCADE;
  DROP TABLE "about_page_blocks_features_reasons" CASCADE;
  DROP TABLE "about_page_blocks_features" CASCADE;
  DROP TABLE "about_page_blocks_faq_items" CASCADE;
  DROP TABLE "about_page_blocks_faq" CASCADE;
  DROP TABLE "about_page_blocks_blog_small_posts" CASCADE;
  DROP TABLE "about_page_blocks_blog_small" CASCADE;
  DROP TABLE "about_page_blocks_contact_contact_details" CASCADE;
  DROP TABLE "about_page_blocks_contact" CASCADE;
  DROP TABLE "about_page" CASCADE;
  DROP TABLE "landing_page_blocks_footer_menu_items_links" CASCADE;
  DROP TABLE "landing_page_blocks_footer_menu_items" CASCADE;
  DROP TABLE "landing_page_blocks_footer_bottom_links" CASCADE;
  DROP TABLE "landing_page_blocks_footer" CASCADE;
  DROP TABLE "landing_page_blocks_navbar_menu_items" CASCADE;
  DROP TABLE "landing_page_blocks_navbar_menu" CASCADE;
  DROP TABLE "landing_page_blocks_navbar_mobile_extra_links" CASCADE;
  DROP TABLE "landing_page_blocks_navbar" CASCADE;
  DROP TABLE "landing_page_blocks_cta" CASCADE;
  DROP TABLE "landing_page_blocks_career_jobs_openings" CASCADE;
  DROP TABLE "landing_page_blocks_career_jobs" CASCADE;
  DROP TABLE "landing_page_blocks_career" CASCADE;
  DROP TABLE "landing_page_blocks_features_large_tabs" CASCADE;
  DROP TABLE "landing_page_blocks_features_large" CASCADE;
  DROP TABLE "landing_page_blocks_hero_testimonial_avatars" CASCADE;
  DROP TABLE "landing_page_blocks_hero" CASCADE;
  DROP TABLE "landing_page_blocks_hero_smartphone" CASCADE;
  DROP TABLE "landing_page_blocks_features_boxes_features" CASCADE;
  DROP TABLE "landing_page_blocks_features_boxes" CASCADE;
  DROP TABLE "landing_page_blocks_features_reasons" CASCADE;
  DROP TABLE "landing_page_blocks_features" CASCADE;
  DROP TABLE "landing_page_blocks_faq_items" CASCADE;
  DROP TABLE "landing_page_blocks_faq" CASCADE;
  DROP TABLE "landing_page_blocks_blog_small_posts" CASCADE;
  DROP TABLE "landing_page_blocks_blog_small" CASCADE;
  DROP TABLE "landing_page_blocks_contact_contact_details" CASCADE;
  DROP TABLE "landing_page_blocks_contact" CASCADE;
  DROP TABLE "landing_page" CASCADE;
  DROP TABLE "blog_page_blocks_footer_menu_items_links" CASCADE;
  DROP TABLE "blog_page_blocks_footer_menu_items" CASCADE;
  DROP TABLE "blog_page_blocks_footer_bottom_links" CASCADE;
  DROP TABLE "blog_page_blocks_footer" CASCADE;
  DROP TABLE "blog_page_blocks_navbar_menu_items" CASCADE;
  DROP TABLE "blog_page_blocks_navbar_menu" CASCADE;
  DROP TABLE "blog_page_blocks_navbar_mobile_extra_links" CASCADE;
  DROP TABLE "blog_page_blocks_navbar" CASCADE;
  DROP TABLE "blog_page_blocks_cta" CASCADE;
  DROP TABLE "blog_page_blocks_career_jobs_openings" CASCADE;
  DROP TABLE "blog_page_blocks_career_jobs" CASCADE;
  DROP TABLE "blog_page_blocks_career" CASCADE;
  DROP TABLE "blog_page_blocks_features_large_tabs" CASCADE;
  DROP TABLE "blog_page_blocks_features_large" CASCADE;
  DROP TABLE "blog_page_blocks_hero_testimonial_avatars" CASCADE;
  DROP TABLE "blog_page_blocks_hero" CASCADE;
  DROP TABLE "blog_page_blocks_hero_smartphone" CASCADE;
  DROP TABLE "blog_page_blocks_features_boxes_features" CASCADE;
  DROP TABLE "blog_page_blocks_features_boxes" CASCADE;
  DROP TABLE "blog_page_blocks_features_reasons" CASCADE;
  DROP TABLE "blog_page_blocks_features" CASCADE;
  DROP TABLE "blog_page_blocks_faq_items" CASCADE;
  DROP TABLE "blog_page_blocks_faq" CASCADE;
  DROP TABLE "blog_page_blocks_blog_small_posts" CASCADE;
  DROP TABLE "blog_page_blocks_blog_small" CASCADE;
  DROP TABLE "blog_page_blocks_contact_contact_details" CASCADE;
  DROP TABLE "blog_page_blocks_contact" CASCADE;
  DROP TABLE "blog_page" CASCADE;
  DROP TABLE "contact_page_blocks_footer_menu_items_links" CASCADE;
  DROP TABLE "contact_page_blocks_footer_menu_items" CASCADE;
  DROP TABLE "contact_page_blocks_footer_bottom_links" CASCADE;
  DROP TABLE "contact_page_blocks_footer" CASCADE;
  DROP TABLE "contact_page_blocks_navbar_menu_items" CASCADE;
  DROP TABLE "contact_page_blocks_navbar_menu" CASCADE;
  DROP TABLE "contact_page_blocks_navbar_mobile_extra_links" CASCADE;
  DROP TABLE "contact_page_blocks_navbar" CASCADE;
  DROP TABLE "contact_page_blocks_cta" CASCADE;
  DROP TABLE "contact_page_blocks_career_jobs_openings" CASCADE;
  DROP TABLE "contact_page_blocks_career_jobs" CASCADE;
  DROP TABLE "contact_page_blocks_career" CASCADE;
  DROP TABLE "contact_page_blocks_features_large_tabs" CASCADE;
  DROP TABLE "contact_page_blocks_features_large" CASCADE;
  DROP TABLE "contact_page_blocks_hero_testimonial_avatars" CASCADE;
  DROP TABLE "contact_page_blocks_hero" CASCADE;
  DROP TABLE "contact_page_blocks_hero_smartphone" CASCADE;
  DROP TABLE "contact_page_blocks_features_boxes_features" CASCADE;
  DROP TABLE "contact_page_blocks_features_boxes" CASCADE;
  DROP TABLE "contact_page_blocks_features_reasons" CASCADE;
  DROP TABLE "contact_page_blocks_features" CASCADE;
  DROP TABLE "contact_page_blocks_faq_items" CASCADE;
  DROP TABLE "contact_page_blocks_faq" CASCADE;
  DROP TABLE "contact_page_blocks_blog_small_posts" CASCADE;
  DROP TABLE "contact_page_blocks_blog_small" CASCADE;
  DROP TABLE "contact_page_blocks_contact_contact_details" CASCADE;
  DROP TABLE "contact_page_blocks_contact" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "projects_gallery_page_blocks_footer_menu_items_links" CASCADE;
  DROP TABLE "projects_gallery_page_blocks_footer_menu_items" CASCADE;
  DROP TABLE "projects_gallery_page_blocks_footer_bottom_links" CASCADE;
  DROP TABLE "projects_gallery_page_blocks_footer" CASCADE;
  DROP TABLE "projects_gallery_page_blocks_navbar_menu_items" CASCADE;
  DROP TABLE "projects_gallery_page_blocks_navbar_menu" CASCADE;
  DROP TABLE "projects_gallery_page_blocks_navbar_mobile_extra_links" CASCADE;
  DROP TABLE "projects_gallery_page_blocks_navbar" CASCADE;
  DROP TABLE "projects_gallery_page_blocks_cta" CASCADE;
  DROP TABLE "projects_gallery_page_blocks_career_jobs_openings" CASCADE;
  DROP TABLE "projects_gallery_page_blocks_career_jobs" CASCADE;
  DROP TABLE "projects_gallery_page_blocks_career" CASCADE;
  DROP TABLE "projects_gallery_page_blocks_features_large_tabs" CASCADE;
  DROP TABLE "projects_gallery_page_blocks_features_large" CASCADE;
  DROP TABLE "projects_gallery_page_blocks_hero_testimonial_avatars" CASCADE;
  DROP TABLE "projects_gallery_page_blocks_hero" CASCADE;
  DROP TABLE "projects_gallery_page_blocks_hero_smartphone" CASCADE;
  DROP TABLE "projects_gallery_page_blocks_features_boxes_features" CASCADE;
  DROP TABLE "projects_gallery_page_blocks_features_boxes" CASCADE;
  DROP TABLE "projects_gallery_page_blocks_features_reasons" CASCADE;
  DROP TABLE "projects_gallery_page_blocks_features" CASCADE;
  DROP TABLE "projects_gallery_page_blocks_faq_items" CASCADE;
  DROP TABLE "projects_gallery_page_blocks_faq" CASCADE;
  DROP TABLE "projects_gallery_page_blocks_blog_small_posts" CASCADE;
  DROP TABLE "projects_gallery_page_blocks_blog_small" CASCADE;
  DROP TABLE "projects_gallery_page_blocks_contact_contact_details" CASCADE;
  DROP TABLE "projects_gallery_page_blocks_contact" CASCADE;
  DROP TABLE "projects_gallery_page" CASCADE;
  DROP TABLE "resume_page_blocks_footer_menu_items_links" CASCADE;
  DROP TABLE "resume_page_blocks_footer_menu_items" CASCADE;
  DROP TABLE "resume_page_blocks_footer_bottom_links" CASCADE;
  DROP TABLE "resume_page_blocks_footer" CASCADE;
  DROP TABLE "resume_page_blocks_navbar_menu_items" CASCADE;
  DROP TABLE "resume_page_blocks_navbar_menu" CASCADE;
  DROP TABLE "resume_page_blocks_navbar_mobile_extra_links" CASCADE;
  DROP TABLE "resume_page_blocks_navbar" CASCADE;
  DROP TABLE "resume_page_blocks_cta" CASCADE;
  DROP TABLE "resume_page_blocks_career_jobs_openings" CASCADE;
  DROP TABLE "resume_page_blocks_career_jobs" CASCADE;
  DROP TABLE "resume_page_blocks_career" CASCADE;
  DROP TABLE "resume_page_blocks_features_large_tabs" CASCADE;
  DROP TABLE "resume_page_blocks_features_large" CASCADE;
  DROP TABLE "resume_page_blocks_hero_testimonial_avatars" CASCADE;
  DROP TABLE "resume_page_blocks_hero" CASCADE;
  DROP TABLE "resume_page_blocks_hero_smartphone" CASCADE;
  DROP TABLE "resume_page_blocks_features_boxes_features" CASCADE;
  DROP TABLE "resume_page_blocks_features_boxes" CASCADE;
  DROP TABLE "resume_page_blocks_features_reasons" CASCADE;
  DROP TABLE "resume_page_blocks_features" CASCADE;
  DROP TABLE "resume_page_blocks_faq_items" CASCADE;
  DROP TABLE "resume_page_blocks_faq" CASCADE;
  DROP TABLE "resume_page_blocks_blog_small_posts" CASCADE;
  DROP TABLE "resume_page_blocks_blog_small" CASCADE;
  DROP TABLE "resume_page_blocks_contact_contact_details" CASCADE;
  DROP TABLE "resume_page_blocks_contact" CASCADE;
  DROP TABLE "resume_page" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_form_fields_field_type";
  DROP TYPE "public"."enum_projects_status";
  DROP TYPE "public"."enum_posts_status";`)
}
