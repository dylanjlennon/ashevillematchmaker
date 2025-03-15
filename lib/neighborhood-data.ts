// Fair housing compliant neighborhood data with additional neighborhoods
// Ensuring no references to race, family structure, sexual orientation or other protected characteristics

export interface Neighborhood {
  id: number;
  name: string;
  area: string;
  description: string;
  location_description: string;
  housing_types: string;
  price_range: string;
  median_price: string;
  distance_to_airport: string;
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
  local_perspective: string;
  nearby_attractions: string[];
  map_coordinates: {
    lat: number;
    lng: number;
  };
}

const neighborhoods: Neighborhood[] = [
  {
    id: 1,
    name: "Downtown Asheville",
    area: "Central",
    description: "The vibrant heart of Asheville featuring historic architecture, diverse dining options, and a thriving arts scene. Downtown offers a walkable urban experience with easy access to shops, restaurants, and entertainment venues.",
    location_description: "Central Asheville, bordered by I-240, with the French Broad River to the west.",
    housing_types: "Condos, Apartments, Historic Homes, Lofts",
    price_range: "High to Very High",
    median_price: "$625,000",
    distance_to_airport: "15 minutes",
    walkability: 9,
    amenities: {
      dining_options: 10,
      shopping: 9,
      breweries_bars: 10,
      coffee_shops: 10,
      wellness_facilities: 8,
      parks_green_spaces: 6,
      arts_culture: 10,
      nightlife: 10
    },
    characteristics: {
      urban_suburban_scale: 9,
      historic_modern_scale: 7,
      quiet_lively_scale: 9,
      family_friendly: 5,
      artistic_vibe: 10,
      trendy_traditional_scale: 8
    },
    image: "/images/downtown.jpg",
    highlights: [
      "Walkable urban core with historic architecture",
      "Thriving arts district with galleries and museums",
      "Diverse dining scene with farm-to-table restaurants",
      "Craft brewery hub with multiple taprooms",
      "Regular festivals, street performances, and events"
    ],
    local_perspective: "Downtown Asheville has an energy that's hard to describe - it's creative, welcoming, and always has something happening. I love grabbing coffee at a local café, browsing the independent bookstores, and ending the day with live music at one of the many venues. The architectural details of the Art Deco buildings make even a simple walk downtown feel special.",
    nearby_attractions: [
      "Pack Square Park",
      "Asheville Art Museum",
      "Grove Arcade",
      "South Slope Brewery District",
      "Basilica of Saint Lawrence"
    ],
    map_coordinates: {
      lat: 35.5951,
      lng: -82.5515
    }
  },
  {
    id: 2,
    name: "Montford",
    area: "North",
    description: "A historic neighborhood known for its beautiful Victorian and Arts & Crafts homes, tree-lined streets, and proximity to downtown. Montford offers a blend of historic charm and convenient access to urban amenities.",
    location_description: "Just north of downtown Asheville, east of the French Broad River.",
    housing_types: "Historic Victorian Homes, Craftsman Bungalows, Bed & Breakfasts",
    price_range: "Medium-High to High",
    median_price: "$550,000",
    distance_to_airport: "20 minutes",
    walkability: 7,
    amenities: {
      dining_options: 6,
      shopping: 4,
      breweries_bars: 5,
      coffee_shops: 6,
      wellness_facilities: 6,
      parks_green_spaces: 8,
      arts_culture: 8,
      nightlife: 5
    },
    characteristics: {
      urban_suburban_scale: 6,
      historic_modern_scale: 9,
      quiet_lively_scale: 4,
      family_friendly: 7,
      artistic_vibe: 8,
      trendy_traditional_scale: 3
    },
    image: "/images/montford.jpg",
    highlights: [
      "Historic district with preserved architecture",
      "Tree-lined streets with sidewalks",
      "Walking distance to downtown",
      "Home to Riverside Cemetery",
      "Annual Montford Music & Arts Festival"
    ],
    local_perspective: "Montford feels like stepping back in time with its gorgeous historic homes, but it's just a short walk to all the excitement of downtown. I love the peaceful atmosphere and the sense of community here. The neighborhood has a wonderful mix of long-time residents and newcomers who all appreciate the area's unique character and charm.",
    nearby_attractions: [
      "Montford Park",
      "Riverside Cemetery",
      "Montford Community Center",
      "Nine Mile Restaurant",
      "Asheville Visitor Center"
    ],
    map_coordinates: {
      lat: 35.6015,
      lng: -82.5567
    }
  },
  {
    id: 3,
    name: "West Asheville",
    area: "West",
    description: "A revitalized area known for its eclectic vibe, local businesses, and artistic community. West Asheville offers a mix of historic homes and new developments along the vibrant Haywood Road corridor.",
    location_description: "West of the French Broad River, centered around Haywood Road.",
    housing_types: "Bungalows, Craftsman Homes, New Construction, Small Multi-units",
    price_range: "Medium to Medium-High",
    median_price: "$475,000",
    distance_to_airport: "20 minutes",
    walkability: 8,
    amenities: {
      dining_options: 8,
      shopping: 7,
      breweries_bars: 8,
      coffee_shops: 9,
      wellness_facilities: 7,
      parks_green_spaces: 7,
      arts_culture: 8,
      nightlife: 7
    },
    characteristics: {
      urban_suburban_scale: 7,
      historic_modern_scale: 6,
      quiet_lively_scale: 7,
      family_friendly: 7,
      artistic_vibe: 9,
      trendy_traditional_scale: 9
    },
    image: "/images/west_asheville.jpg",
    highlights: [
      "Walkable Haywood Road with local businesses",
      "Thriving music and arts scene",
      "Diverse dining options from casual to upscale",
      "Community gardens and farmers markets",
      "Mix of historic charm and modern amenities"
    ],
    local_perspective: "West Asheville has this incredible creative energy that I haven't found anywhere else. The Haywood Road corridor has everything you need within walking distance - great coffee shops, restaurants with outdoor patios, live music venues, and unique local stores. There's a real sense of community here, with neighbors who look out for each other and support local businesses.",
    nearby_attractions: [
      "Carrier Park",
      "French Broad River Greenway",
      "Harvest Records",
      "The Admiral Restaurant",
      "Odd's Cafe"
    ],
    map_coordinates: {
      lat: 35.5789,
      lng: -82.5926
    }
  },
  {
    id: 4,
    name: "River Arts District",
    area: "Central",
    description: "A former industrial area transformed into a creative hub with artist studios, galleries, restaurants, and breweries. The River Arts District offers a unique blend of industrial heritage and contemporary creativity.",
    location_description: "Along the French Broad River between Downtown and West Asheville.",
    housing_types: "Lofts, Converted Warehouses, New Construction, Mixed-Use Developments",
    price_range: "Medium-High to High",
    median_price: "$520,000",
    distance_to_airport: "15 minutes",
    walkability: 6,
    amenities: {
      dining_options: 7,
      shopping: 6,
      breweries_bars: 8,
      coffee_shops: 7,
      wellness_facilities: 6,
      parks_green_spaces: 7,
      arts_culture: 10,
      nightlife: 6
    },
    characteristics: {
      urban_suburban_scale: 8,
      historic_modern_scale: 6,
      quiet_lively_scale: 7,
      family_friendly: 6,
      artistic_vibe: 10,
      trendy_traditional_scale: 9
    },
    image: "/images/river_arts.jpg",
    highlights: [
      "Over 200 working artist studios",
      "Riverside parks and greenways",
      "Unique dining in converted industrial spaces",
      "Regular art walks and studio tours",
      "Growing residential options"
    ],
    local_perspective: "Living in the River Arts District means being surrounded by creativity every day. I love watching the area evolve while maintaining its industrial character. On weekends, I can walk to artist studios, grab lunch at a riverside restaurant, and then bike along the greenway. It's a perfect blend of art, nature, and urban convenience.",
    nearby_attractions: [
      "French Broad River Park",
      "Wedge Brewing Company",
      "Foundation Skatepark",
      "Curve Studios",
      "12 Bones Smokehouse"
    ],
    map_coordinates: {
      lat: 35.5793,
      lng: -82.5735
    }
  },
  {
    id: 5,
    name: "Biltmore Village",
    area: "South",
    description: "A historic planned community originally built for Biltmore Estate workers, now featuring upscale shopping, dining, and distinctive architecture. Biltmore Village offers a quaint, European-inspired atmosphere.",
    location_description: "South of downtown, adjacent to the Biltmore Estate entrance.",
    housing_types: "Historic Cottages, Condos, Townhomes, Luxury Apartments",
    price_range: "High to Very High",
    median_price: "$600,000",
    distance_to_airport: "15 minutes",
    walkability: 8,
    amenities: {
      dining_options: 8,
      shopping: 9,
      breweries_bars: 6,
      coffee_shops: 7,
      wellness_facilities: 7,
      parks_green_spaces: 6,
      arts_culture: 7,
      nightlife: 5
    },
    characteristics: {
      urban_suburban_scale: 7,
      historic_modern_scale: 9,
      quiet_lively_scale: 5,
      family_friendly: 6,
      artistic_vibe: 7,
      trendy_traditional_scale: 4
    },
    image: "/images/biltmore_village.jpg",
    highlights: [
      "Distinctive English-inspired architecture",
      "Upscale boutiques and galleries",
      "Fine dining and cafes",
      "Proximity to Biltmore Estate",
      "Historic All Souls Cathedral"
    ],
    local_perspective: "Biltmore Village has such a unique charm with its Tudor-style architecture and brick sidewalks. It feels like a small European village right in Asheville. I love being able to walk to great restaurants and shops, and the Biltmore Estate is practically in my backyard. The area has a peaceful, upscale atmosphere while still being convenient to everything.",
    nearby_attractions: [
      "Biltmore Estate entrance",
      "All Souls Cathedral",
      "New Morning Gallery",
      "Biltmore Village shops",
      "French Broad River Park"
    ],
    map_coordinates: {
      lat: 35.5694,
      lng: -82.5432
    }
  },
  {
    id: 6,
    name: "North Asheville",
    area: "North",
    description: "An established area with tree-lined streets, historic homes, and beautiful parks. North Asheville offers a blend of suburban tranquility and urban convenience with easy access to downtown.",
    location_description: "North of downtown, including areas around UNC Asheville and Beaver Lake.",
    housing_types: "Colonial Homes, Tudor Revivals, Ranches, New Construction",
    price_range: "High to Very High",
    median_price: "$650,000",
    distance_to_airport: "20 minutes",
    walkability: 5,
    amenities: {
      dining_options: 7,
      shopping: 6,
      breweries_bars: 5,
      coffee_shops: 7,
      wellness_facilities: 8,
      parks_green_spaces: 9,
      arts_culture: 6,
      nightlife: 4
    },
    characteristics: {
      urban_suburban_scale: 4,
      historic_modern_scale: 7,
      quiet_lively_scale: 3,
      family_friendly: 8,
      artistic_vibe: 6,
      trendy_traditional_scale: 3
    },
    image: "/images/north_asheville.jpg",
    highlights: [
      "Prestigious neighborhoods with architectural variety",
      "Beaver Lake nature preserve",
      "UNC Asheville campus",
      "Botanical Gardens at Asheville",
      "Convenient shopping centers"
    ],
    local_perspective: "North Asheville offers the perfect balance of peaceful residential living with proximity to downtown. I love the established neighborhoods with mature trees and the sense of community. The Beaver Lake area is perfect for morning walks, and there are excellent local restaurants and coffee shops scattered throughout the area. It's a wonderful place to enjoy Asheville's natural beauty while still being close to urban amenities.",
    nearby_attractions: [
      "Beaver Lake Bird Sanctuary",
      "UNC Asheville",
      "Botanical Gardens at Asheville",
      "Grove Park Inn",
      "Asheville Country Club"
    ],
    map_coordinates: {
      lat: 35.6223,
      lng: -82.5535
    }
  },
  {
    id: 7,
    name: "Kenilworth",
    area: "East",
    description: "A historic neighborhood with winding streets, diverse architecture, and a convenient location. Kenilworth offers a peaceful residential atmosphere while being minutes from downtown.",
    location_description: "Southeast of downtown, adjacent to Biltmore Village.",
    housing_types: "Tudor Homes, Craftsman Bungalows, Mid-Century Ranches",
    price_range: "Medium-High to High",
    median_price: "$500,000",
    distance_to_airport: "15 minutes",
    walkability: 4,
    amenities: {
      dining_options: 5,
      shopping: 4,
      breweries_bars: 3,
      coffee_shops: 4,
      wellness_facilities: 6,
      parks_green_spaces: 7,
      arts_culture: 5,
      nightlife: 2
    },
    characteristics: {
      urban_suburban_scale: 4,
      historic_modern_scale: 8,
      quiet_lively_scale: 3,
      family_friendly: 7,
      artistic_vibe: 6,
      trendy_traditional_scale: 3
    },
    image: "/images/kenilworth.jpg",
    highlights: [
      "Historic homes with unique architectural styles",
      "Kenilworth Lake and Park",
      "Quiet, winding streets",
      "Proximity to Mission Hospital",
      "Easy access to downtown and Biltmore Village"
    ],
    local_perspective: "Kenilworth is one of Asheville's hidden gems with its winding roads and eclectic mix of homes. I love the peaceful atmosphere and the way the neighborhood feels tucked away, yet it's just minutes from downtown. The Kenilworth Park is a great spot for recreation, and the community has a strong sense of identity and history.",
    nearby_attractions: [
      "Kenilworth Park",
      "Kenilworth Lake",
      "Mission Hospital",
      "Asheville Mall",
      "Biltmore Village"
    ],
    map_coordinates: {
      lat: 35.5684,
      lng: -82.5326
    }
  },
  {
    id: 8,
    name: "Biltmore Park",
    area: "South",
    description: "A modern planned community featuring a town square with shopping, dining, entertainment, and various housing options. Biltmore Park offers a contemporary mixed-use environment.",
    location_description: "South Asheville, near I-26 and Long Shoals Road.",
    housing_types: "Townhomes, Condos, Single-Family Homes, Luxury Apartments",
    price_range: "Medium-High to High",
    median_price: "$525,000",
    distance_to_airport: "10 minutes",
    walkability: 7,
    amenities: {
      dining_options: 8,
      shopping: 9,
      breweries_bars: 6,
      coffee_shops: 7,
      wellness_facilities: 9,
      parks_green_spaces: 6,
      arts_culture: 5,
      nightlife: 5
    },
    characteristics: {
      urban_suburban_scale: 6,
      historic_modern_scale: 2,
      quiet_lively_scale: 6,
      family_friendly: 8,
      artistic_vibe: 4,
      trendy_traditional_scale: 7
    },
    image: "/images/biltmore_park.jpg",
    highlights: [
      "Town Square with shops and restaurants",
      "YMCA and fitness options",
      "Movie theater and entertainment",
      "Modern housing options",
      "Convenient to airport and major highways"
    ],
    local_perspective: "Biltmore Park gives you that 'live, work, play' lif<response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>
