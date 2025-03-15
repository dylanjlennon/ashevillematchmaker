-- Migration number: 0001        2025-03-14T09:47:00.000Z
DROP TABLE IF EXISTS neighborhoods;
DROP TABLE IF EXISTS neighborhood_amenities;
DROP TABLE IF EXISTS neighborhood_characteristics;
DROP TABLE IF EXISTS user_preferences;
DROP TABLE IF EXISTS user_results;

-- Neighborhoods table
CREATE TABLE IF NOT EXISTS neighborhoods (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  area TEXT NOT NULL, -- Downtown, North, South, West, etc.
  description TEXT NOT NULL,
  location_description TEXT NOT NULL,
  housing_types TEXT NOT NULL,
  price_range TEXT NOT NULL,
  walkability INTEGER NOT NULL, -- 1-10 scale
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Neighborhood amenities
CREATE TABLE IF NOT EXISTS neighborhood_amenities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  neighborhood_id INTEGER NOT NULL,
  dining_options INTEGER NOT NULL, -- 1-10 scale
  shopping INTEGER NOT NULL, -- 1-10 scale
  breweries_bars INTEGER NOT NULL, -- 1-10 scale
  coffee_shops INTEGER NOT NULL, -- 1-10 scale
  wellness_facilities INTEGER NOT NULL, -- 1-10 scale
  parks_green_spaces INTEGER NOT NULL, -- 1-10 scale
  arts_culture INTEGER NOT NULL, -- 1-10 scale
  nightlife INTEGER NOT NULL, -- 1-10 scale
  FOREIGN KEY (neighborhood_id) REFERENCES neighborhoods(id)
);

-- Neighborhood characteristics
CREATE TABLE IF NOT EXISTS neighborhood_characteristics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  neighborhood_id INTEGER NOT NULL,
  urban_suburban_scale INTEGER NOT NULL, -- 1-10 (1=rural, 10=urban)
  historic_modern_scale INTEGER NOT NULL, -- 1-10 (1=modern, 10=historic)
  quiet_lively_scale INTEGER NOT NULL, -- 1-10 (1=quiet, 10=lively)
  family_friendly INTEGER NOT NULL, -- 1-10 scale
  artistic_vibe INTEGER NOT NULL, -- 1-10 scale
  trendy_traditional_scale INTEGER NOT NULL, -- 1-10 (1=traditional, 10=trendy)
  FOREIGN KEY (neighborhood_id) REFERENCES neighborhoods(id)
);

-- User preferences
CREATE TABLE IF NOT EXISTS user_preferences (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  urban_preference INTEGER, -- 1-10 scale
  walkability_preference INTEGER, -- 1-10 scale
  dining_preference INTEGER, -- 1-10 scale
  shopping_preference INTEGER, -- 1-10 scale
  nightlife_preference INTEGER, -- 1-10 scale
  arts_preference INTEGER, -- 1-10 scale
  outdoor_preference INTEGER, -- 1-10 scale
  family_preference INTEGER, -- 1-10 scale
  historic_preference INTEGER, -- 1-10 scale
  price_range TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- User results
CREATE TABLE IF NOT EXISTS user_results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  neighborhood_id INTEGER NOT NULL,
  match_score REAL NOT NULL, -- 0-100 percentage
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (neighborhood_id) REFERENCES neighborhoods(id)
);

-- Create indexes
CREATE INDEX idx_neighborhoods_area ON neighborhoods(area);
CREATE INDEX idx_user_preferences_session ON user_preferences(session_id);
CREATE INDEX idx_user_results_session ON user_results(session_id);
