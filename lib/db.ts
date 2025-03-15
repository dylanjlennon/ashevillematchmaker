import { D1Database } from '@cloudflare/workers-types';

export interface Neighborhood {
  id: number;
  name: string;
  area: string;
  description: string;
  location_description: string;
  housing_types: string;
  price_range: string;
  walkability: number;
  amenities: {
    dining_options: number;
    shopping: number;
    breweries_bars: number;
    coffee_shops: number;
    wellness_facilities: number;
    parks_green_spaces: number;
    arts_culture: number;
    nightlife: number;
  };
  characteristics: {
    urban_suburban_scale: number;
    historic_modern_scale: number;
    quiet_lively_scale: number;
    family_friendly: number;
    artistic_vibe: number;
    trendy_traditional_scale: number;
  };
  image: string;
  highlights: string[];
}

export interface UserPreference {
  id: number;
  session_id: string;
  urban_preference: number;
  walkability_preference: number;
  dining_preference: number;
  shopping_preference: number;
  nightlife_preference: number;
  arts_preference: number;
  outdoor_preference: number;
  family_preference: number;
  historic_preference: number;
  price_range: string;
  created_at: string;
}

export interface UserResult {
  id: number;
  session_id: string;
  neighborhood_id: number;
  match_score: number;
  created_at: string;
}

export async function getNeighborhoods(db: D1Database): Promise<Neighborhood[]> {
  const neighborhoods = await db.prepare(`
    SELECT n.*, 
           na.dining_options, na.shopping, na.breweries_bars, na.coffee_shops, 
           na.wellness_facilities, na.parks_green_spaces, na.arts_culture, na.nightlife,
           nc.urban_suburban_scale, nc.historic_modern_scale, nc.quiet_lively_scale, 
           nc.family_friendly, nc.artistic_vibe, nc.trendy_traditional_scale
    FROM neighborhoods n
    JOIN neighborhood_amenities na ON n.id = na.neighborhood_id
    JOIN neighborhood_characteristics nc ON n.id = nc.neighborhood_id
  `).all();
  
  if (!neighborhoods.results) {
    return [];
  }
  
  return neighborhoods.results.map((row: any) => {
    return {
      id: row.id,
      name: row.name,
      area: row.area,
      description: row.description,
      location_description: row.location_description,
      housing_types: row.housing_types,
      price_range: row.price_range,
      walkability: row.walkability,
      amenities: {
        dining_options: row.dining_options,
        shopping: row.shopping,
        breweries_bars: row.breweries_bars,
        coffee_shops: row.coffee_shops,
        wellness_facilities: row.wellness_facilities,
        parks_green_spaces: row.parks_green_spaces,
        arts_culture: row.arts_culture,
        nightlife: row.nightlife
      },
      characteristics: {
        urban_suburban_scale: row.urban_suburban_scale,
        historic_modern_scale: row.historic_modern_scale,
        quiet_lively_scale: row.quiet_lively_scale,
        family_friendly: row.family_friendly,
        artistic_vibe: row.artistic_vibe,
        trendy_traditional_scale: row.trendy_traditional_scale
      },
      image: `/images/${row.id}.jpg`,
      highlights: JSON.parse(row.highlights || '[]')
    };
  });
}

export async function getNeighborhoodById(db: D1Database, id: number): Promise<Neighborhood | null> {
  const neighborhood = await db.prepare(`
    SELECT n.*, 
           na.dining_options, na.shopping, na.breweries_bars, na.coffee_shops, 
           na.wellness_facilities, na.parks_green_spaces, na.arts_culture, na.nightlife,
           nc.urban_suburban_scale, nc.historic_modern_scale, nc.quiet_lively_scale, 
           nc.family_friendly, nc.artistic_vibe, nc.trendy_traditional_scale
    FROM neighborhoods n
    JOIN neighborhood_amenities na ON n.id = na.neighborhood_id
    JOIN neighborhood_characteristics nc ON n.id = nc.neighborhood_id
    WHERE n.id = ?
  `).bind(id).first();
  
  if (!neighborhood) {
    return null;
  }
  
  return {
    id: neighborhood.id,
    name: neighborhood.name,
    area: neighborhood.area,
    description: neighborhood.description,
    location_description: neighborhood.location_description,
    housing_types: neighborhood.housing_types,
    price_range: neighborhood.price_range,
    walkability: neighborhood.walkability,
    amenities: {
      dining_options: neighborhood.dining_options,
      shopping: neighborhood.shopping,
      breweries_bars: neighborhood.breweries_bars,
      coffee_shops: neighborhood.coffee_shops,
      wellness_facilities: neighborhood.wellness_facilities,
      parks_green_spaces: neighborhood.parks_green_spaces,
      arts_culture: neighborhood.arts_culture,
      nightlife: neighborhood.nightlife
    },
    characteristics: {
      urban_suburban_scale: neighborhood.urban_suburban_scale,
      historic_modern_scale: neighborhood.historic_modern_scale,
      quiet_lively_scale: neighborhood.quiet_lively_scale,
      family_friendly: neighborhood.family_friendly,
      artistic_vibe: neighborhood.artistic_vibe,
      trendy_traditional_scale: neighborhood.trendy_traditional_scale
    },
    image: `/images/${neighborhood.id}.jpg`,
    highlights: JSON.parse(neighborhood.highlights || '[]')
  };
}

export async function saveUserPreferences(
  db: D1Database, 
  sessionId: string, 
  preferences: Partial<UserPreference>
): Promise<number> {
  const result = await db.prepare(`
    INSERT INTO user_preferences (
      session_id, urban_preference, walkability_preference, dining_preference,
      shopping_preference, nightlife_preference, arts_preference, outdoor_preference,
      family_preference, historic_preference, price_range
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    sessionId,
    preferences.urban_preference || null,
    preferences.walkability_preference || null,
    preferences.dining_preference || null,
    preferences.shopping_preference || null,
    preferences.nightlife_preference || null,
    preferences.arts_preference || null,
    preferences.outdoor_preference || null,
    preferences.family_preference || null,
    preferences.historic_preference || null,
    preferences.price_range || null
  ).run();
  
  return result.meta.last_row_id;
}

export async function saveUserResults(
  db: D1Database,
  sessionId: string,
  neighborhoodId: number,
  matchScore: number
): Promise<number> {
  const result = await db.prepare(`
    INSERT INTO user_results (session_id, neighborhood_id, match_score)
    VALUES (?, ?, ?)
  `).bind(sessionId, neighborhoodId, matchScore).run();
  
  return result.meta.last_row_id;
}

export async function getUserResults(db: D1Database, sessionId: string): Promise<UserResult[]> {
  const results = await db.prepare(`
    SELECT * FROM user_results
    WHERE session_id = ?
    ORDER BY match_score DESC
  `).bind(sessionId).all();
  
  if (!results.results) {
    return [];
  }
  
  return results.results as UserResult[];
}

// Calculate match score between user preferences and neighborhood
export function calculateMatchScore(
  neighborhood: Neighborhood,
  preferences: Partial<UserPreference>
): number {
  let totalScore = 0;
  let maxPossibleScore = 0;
  
  // Lifestyle preferences
  if (preferences.urban_preference) {
    const urbanScore = 10 - Math.abs(neighborhood.characteristics.urban_suburban_scale - preferences.urban_preference);
    totalScore += urbanScore * 2; // Weighted higher
    maxPossibleScore += 20;
  }
  
  if (preferences.walkability_preference) {
    const walkabilityScore = 10 - Math.abs(neighborhood.walkability - preferences.walkability_preference);
    totalScore += walkabilityScore * 1.5;
    maxPossibleScore += 15;
  }
  
  if (preferences.nightlife_preference) {
    const nightlifeScore = 10 - Math.abs(neighborhood.amenities.nightlife - preferences.nightlife_preference);
    totalScore += nightlifeScore;
    maxPossibleScore += 10;
  }
  
  if (preferences.arts_preference) {
    const artsCultureScore = 10 - Math.abs(neighborhood.amenities.arts_culture - preferences.arts_preference);
    totalScore += artsCultureScore;
    maxPossibleScore += 10;
  }
  
  // Amenities
  if (preferences.dining_preference) {
    const diningScore = 10 - Math.abs(neighborhood.amenities.dining_options - preferences.dining_preference);
    totalScore += diningScore;
    maxPossibleScore += 10;
  }
  
  if (preferences.shopping_preference) {
    const shoppingScore = 10 - Math.abs(neighborhood.amenities.shopping - preferences.shopping_preference);
    totalScore += shoppingScore;
    maxPossibleScore += 10;
  }
  
  // Housing
  if (preferences.historic_preference) {
    const historicScore = 10 - Math.abs(neighborhood.characteristics.historic_modern_scale - preferences.historic_preference);
    totalScore += historicScore;
    maxPossibleScore += 10;
  }
  
  // Price range matching
  if (preferences.price_range) {
    // Simple exact match for price range
    const priceMatch = neighborhood.price_range.toLowerCase().includes(preferences.price_range.toLowerCase());
    totalScore += priceMatch ? 15 : 0;
    maxPossibleScore += 15;
  }
  
  if (preferences.family_preference) {
    const familyScore = 10 - Math.abs(neighborhood.characteristics.family_friendly - preferences.family_preference);
    totalScore += familyScore;
    maxPossibleScore += 10;
  }
  
  // Calculate percentage match
  const percentageMatch = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;
  
  return Math.round(percentageMatch);
}
