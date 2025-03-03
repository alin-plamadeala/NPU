CREATE INDEX "search_index" ON "npu_creations" USING gin ((
          setweight(to_tsvector('english', "title"), 'A') ||
          setweight(to_tsvector('english', "description"), 'B')
      ));--> statement-breakpoint
CREATE INDEX "name_search_index" ON "products" USING gin (to_tsvector('english', "name"));