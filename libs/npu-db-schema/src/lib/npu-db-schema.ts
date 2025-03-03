import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  uuid,
  varchar,
  boolean,
  decimal,
  numeric,
  index,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

export const users = pgTable('users', {
  externalId: varchar('external_id', { length: 255 }).primaryKey(), // ID from Identity Provider
  username: varchar('username', { length: 50 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const npuCreations = pgTable(
  'npu_creations',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: varchar('user_id')
      .notNull()
      .references(() => users.externalId),
    title: varchar('title', { length: 100 }).notNull(),
    description: text('description').notNull(),
    avgRating: numeric('avg_rating', { precision: 5, scale: 2 }),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    deletedAt: timestamp('deleted_at'),
  },
  (table) => [
    index('search_index').using(
      'gin',
      sql`(
          setweight(to_tsvector('english', ${table.title}), 'A') ||
          setweight(to_tsvector('english', ${table.description}), 'B')
      )`
    ),
  ]
);

export const npuImages = pgTable('npu_images', {
  id: serial('id').primaryKey(),
  npuId: uuid('npu_id')
    .notNull()
    .references(() => npuCreations.id),
  imageUrl: text('image_url').notNull(),
  isMain: boolean('is_main').default(false).notNull(),
});

export const ratings = pgTable('ratings', {
  id: serial('id').primaryKey(),
  npuId: uuid('npu_id')
    .notNull()
    .references(() => npuCreations.id),
  userId: varchar('user_id')
    .notNull()
    .references(() => users.externalId),
  score: integer('score').notNull().default(0),
  comment: text('comment'),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
});

export const products = pgTable(
  'products',
  {
    productId: varchar('product_id', { length: 10 }).primaryKey(),
    name: varchar('name', { length: 200 }).notNull(),
  },
  (table) => [
    index('name_search_index').using(
      'gin',
      sql`to_tsvector('english', ${table.name})`
    ),
  ]
);

export const npuToProducts = pgTable('npu_to_products', {
  id: serial('id').primaryKey(),
  npuId: uuid('npu_id')
    .notNull()
    .references(() => npuCreations.id),
  productId: varchar('product_id', { length: 10 })
    .notNull()
    .references(() => products.productId),
});

export const npuCreationsRelations = relations(npuCreations, ({ many }) => ({
  npuImages: many(npuImages),
  npuProducts: many(npuToProducts),
}));

export const npuImagesRelations = relations(npuImages, ({ one }) => ({
  npuCreation: one(npuCreations, {
    fields: [npuImages.npuId],
    references: [npuCreations.id],
  }),
}));

export const npuToProductsRelations = relations(npuToProducts, ({ one }) => ({
  npuCreation: one(npuCreations, {
    fields: [npuToProducts.npuId],
    references: [npuCreations.id],
  }),
  product: one(products, {
    fields: [npuToProducts.productId],
    references: [products.productId],
  }),
}));
