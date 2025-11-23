import type { Cuisine } from './types';

export const TASTE_PROFILES = ['Spicy', 'Savory', 'Juicy', 'Sweet', 'Tangy', 'Light'];

export const COOKING_METHODS = ['Stove', 'Oven', 'No-Cook'];

export const COOKING_STYLES = ['Standard', 'Low-Oil', 'One-Pot', 'Quick & Easy'];

// FIX: Added the missing CUISINES constant to resolve an import error in CuisineSelector.tsx.
export const CUISINES: Cuisine[] = [
  { name: 'Italian' },
  { name: 'Mexican' },
  { name: 'Thai' },
  { name: 'Indian' },
  { name: 'Chinese' },
  { name: 'Japanese' },
  { name: 'French' },
  { name: 'American' },
];

export const TASTE_SUGGESTIONS: { [key: string]: string } = {
  'Spicy': 'For a Spicy dish, our AI might suggest using ingredients like chili peppers, cayenne, or hot sauce.',
  'Savory': 'For a Savory dish, our AI might suggest using ingredients like mushrooms, soy sauce, or parmesan cheese.',
  'Juicy': 'For a Juicy dish, our AI might focus on techniques that retain moisture or use ingredients like tomatoes or citrus.',
  'Sweet': 'For a Sweet dish, our AI might suggest using ingredients like honey, sugar, jaggery, or fruit.',
  'Tangy': 'For a Tangy dish, our AI might suggest using ingredients like vinegar, lemon, lime, or yogurt.',
  'Light': 'For a Light dish, our AI might focus on fresh vegetables, lean proteins, and minimal oils.'
};

export const REGIONAL_TASTE_INGREDIENTS: Record<string, Record<string, Record<string, string[]>>> = {
  "India": {
    "Tamil Nadu": {
      "Spicy": ["Dry Red Chillies (Guntur)", "Green Chillies", "Black Peppercorns", "Red Chili Powder"],
      "Savory": ["Curry Leaves", "Mustard Seeds", "Cumin", "Asafoetida (Hing)", "Tamarind"],
      "Tangy": ["Tamarind", "Lemon", "Raw Mango", "Tomato"],
      "Sweet": ["Jaggery", "Coconut Milk", "Cardamom"],
      "Juicy": ["Tomato", "Coconut Milk"],
      "Light": ["Lentils (Dal)", "Steamed Vegetables", "Curry Leaves"]
    },
    "General": {
      "Spicy": ["Kashmiri Chili Powder", "Green Chillies", "Garam Masala", "Cloves", "Black Pepper"],
      "Savory": ["Cumin", "Coriander Powder", "Turmeric", "Ginger-Garlic Paste"],
      "Tangy": ["Amchur (Mango Powder)", "Tamarind", "Yogurt", "Tomato"],
      "Sweet": ["Sugar", "Jaggery", "Cardamom", "Saffron"],
      "Juicy": ["Tomato based gravy", "Yogurt based gravy"],
      "Light": ["Moong Dal", "Khichdi", "Fresh Coriander"]
    }
  },
  "Italy": {
      "General": {
          "Spicy": ["Red Pepper Flakes (Peperoncino)", "Calabrian Chili", "Black Pepper"],
          "Savory": ["Parmesan", "Garlic", "Basil", "Oregano", "Rosemary"],
          "Tangy": ["Balsamic Vinegar", "Lemon Zest", "Capers", "Tomato"],
          "Sweet": ["Balsamic Glaze", "Honey", "Figs"],
          "Juicy": ["San Marzano Tomatoes", "Olive Oil", "Wine"],
          "Light": ["Fresh Herbs", "Lemon Juice", "Arugula"]
      }
  },
  "Mexico": {
      "General": {
          "Spicy": ["Jalapeños", "Serrano Peppers", "Chipotle", "Ancho Chili", "Habanero"],
          "Savory": ["Cumin", "Oregano", "Cilantro", "Garlic", "Onion"],
          "Tangy": ["Lime Juice", "Tomatillos", "Pickled Onions"],
          "Sweet": ["Agave Nectar", "Cinnamon", "Chocolate (Mole)"],
          "Juicy": ["Lime", "Tomato Salsa", "Broth"],
          "Light": ["Cilantro", "Lime", "Radish"]
      }
  },
  "Thailand": {
      "General": {
          "Spicy": ["Thai Bird's Eye Chili", "Dried Chili Flakes", "Curry Paste"],
          "Savory": ["Fish Sauce", "Garlic", "Coriander Root", "Shrimp Paste"],
          "Tangy": ["Lime", "Tamarind", "Lemongrass"],
          "Sweet": ["Palm Sugar", "Coconut Milk"],
          "Juicy": ["Coconut Milk", "Lime"],
          "Light": ["Fresh Herbs", "Lime", "Clear Broth"]
      }
  },
  "China": {
      "General": {
           "Spicy": ["Sichuan Peppercorns", "Dried Red Chilies", "Chili Oil"],
           "Savory": ["Soy Sauce", "Oyster Sauce", "Ginger", "Scallions"],
           "Tangy": ["Rice Vinegar", "Black Vinegar"],
           "Sweet": ["Rock Sugar", "Hoisin Sauce"],
           "Juicy": ["Broth", "Soy Sauce"],
           "Light": ["Steamed Ginger", "Scallions", "White Pepper"]
      }
  }
};

export const GENERIC_TASTE_INGREDIENTS: Record<string, string[]> = {
    "Spicy": ["Chili Flakes", "Cayenne Pepper", "Hot Sauce", "Black Pepper", "Paprika"],
    "Savory": ["Garlic", "Onion", "Soy Sauce", "Herbs", "Salt"],
    "Tangy": ["Vinegar", "Lemon", "Lime", "Yogurt", "Mustard"],
    "Sweet": ["Honey", "Sugar", "Fruit", "Maple Syrup"],
    "Juicy": ["Tomatoes", "Citrus", "Broth", "Stock"],
    "Light": ["Fresh Herbs", "Lemon", "Olive Oil", "Parsley"]
};

export const COMMON_INGREDIENTS = [
  // Proteins
  'Chicken Breast', 'Chicken Thighs', 'Chicken Wings', 'Chicken Legs', 'Ground Chicken', 'Roast Chicken',
  'Beef Steak', 'Ground Beef', 'Beef Chuck', 'Beef Brisket', 'Ribeye Steak', 'Sirloin',
  'Pork Chops', 'Pork Loin', 'Bacon', 'Ham', 'Sausage', 'Chorizo', 'Pepperoni',
  'Salmon', 'Tuna', 'Cod', 'Tilapia', 'Shrimp', 'Prawns', 'Crab', 'Lobster', 'Scallops',
  'Eggs', 'Tofu', 'Tempeh', 'Seitan', 
  'Lentils', 'Chickpeas', 'Black Beans', 'Kidney Beans', 'Pinto Beans', 'Cannellini Beans',

  // Dairy & Alternatives
  'Milk', 'Almond Milk', 'Soy Milk', 'Oat Milk', 'Coconut Milk',
  'Cheddar Cheese', 'Mozzarella Cheese', 'Parmesan Cheese', 'Feta Cheese', 'Goat Cheese', 'Cream Cheese', 'Ricotta',
  'Butter', 'Ghee', 'Yogurt', 'Greek Yogurt', 'Heavy Cream', 'Sour Cream',

  // Grains & Carbs
  'Rice', 'Basmati Rice', 'Jasmine Rice', 'Brown Rice', 'Arborio Rice',
  'Pasta', 'Spaghetti', 'Penne', 'Fusilli', 'Macaroni', 'Noodles', 'Ramen',
  'Bread', 'Sourdough', 'Whole Wheat Bread', 'Baguette', 'Tortillas', 'Pita Bread',
  'Flour', 'All-Purpose Flour', 'Whole Wheat Flour', 'Cornmeal',
  'Oats', 'Rolled Oats', 'Quinoa', 'Couscous', 'Barley',
  'Potatoes', 'Sweet Potatoes', 'Russet Potatoes', 'Red Potatoes',

  // Vegetables
  'Tomato', 'Cherry Tomatoes', 'Canned Tomatoes', 'Tomato Paste',
  'Onion', 'Red Onion', 'White Onion', 'Green Onions', 'Shallots',
  'Garlic', 'Ginger',
  'Carrot', 'Celery', 'Broccoli', 'Cauliflower', 'Spinach', 'Kale', 'Lettuce', 'Arugula', 'Cabbage',
  'Bell Pepper', 'Red Pepper', 'Green Pepper', 'Jalapeño', 'Chili Peppers',
  'Cucumber', 'Zucchini', 'Eggplant', 'Pumpkin', 'Squash',
  'Mushroom', 'Button Mushrooms', 'Portobello Mushrooms',
  'Green Beans', 'Peas', 'Corn', 'Asparagus', 'Brussels Sprouts', 'Avocado',

  // Fruits
  'Apple', 'Banana', 'Orange', 'Lemon', 'Lime', 'Strawberry', 'Blueberry', 'Raspberry', 'Pineapple', 'Mango', 'Peach', 'Pear', 'Grapes',

  // Pantry & Seasonings
  'Olive Oil', 'Vegetable Oil', 'Canola Oil', 'Coconut Oil', 'Sesame Oil',
  'Salt', 'Black Pepper', 'Sugar', 'Brown Sugar', 'Honey', 'Maple Syrup',
  'Soy Sauce', 'Vinegar', 'Balsamic Vinegar', 'Apple Cider Vinegar', 'Rice Vinegar',
  'Mayonnaise', 'Mustard', 'Dijon Mustard', 'Ketchup', 'Hot Sauce', 'Sriracha', 'BBQ Sauce',
  'Tomato Sauce', 'Marinara Sauce', 'Pesto', 'Hummus', 'Peanut Butter',
  'Chicken Broth', 'Beef Broth', 'Vegetable Broth',
  'Basil', 'Oregano', 'Thyme', 'Rosemary', 'Parsley', 'Cilantro', 'Cumin', 'Paprika', 'Turmeric', 'Cinnamon', 'Nutmeg', 'Chili Powder', 'Curry Powder'
];

export const CULINARY_LOCATIONS: Record<string, string[]> = {
  "Italy": ["Tuscany", "Sicily", "Lombardy", "Lazio", "Piedmont", "Emilia-Romagna", "Campania", "Veneto", "Liguria", "Umbria"],
  "France": ["Provence", "Normandy", "Brittany", "Alsace", "Burgundy", "Bordeaux", "Paris", "Lyon", "Champagne"],
  "Mexico": ["Oaxaca", "Jalisco", "Yucatán", "Puebla", "Michoacán", "Mexico City", "Veracruz", "Baja California"],
  "India": ["Punjab", "Kerala", "Tamil Nadu", "Rajasthan", "Gujarat", "Maharashtra", "West Bengal", "Goa", "Kashmir", "Andhra Pradesh"],
  "Thailand": ["Chiang Mai", "Bangkok", "Isan", "Phuket", "Central", "Southern"],
  "Japan": ["Hokkaido", "Kanto", "Kansai", "Kyoto", "Osaka", "Tokyo", "Okinawa", "Kyushu"],
  "China": ["Sichuan", "Guangdong (Cantonese)", "Hunan", "Shandong", "Fujian", "Beijing", "Shanghai", "Jiangsu", "Zhejiang"],
  "Spain": ["Andalusia", "Catalonia", "Basque Country", "Galicia", "Valencia", "Madrid", "Castile-La Mancha"],
  "USA": ["California", "Texas (Tex-Mex/BBQ)", "New York", "Louisiana (Cajun/Creole)", "New England", "Southern", "Midwest", "Southwest"],
  "Greece": ["Crete", "Santorini", "Macedonia", "Peloponnese", "Attica", "Ionian Islands"],
  "Vietnam": ["Hanoi (North)", "Hue (Central)", "Ho Chi Minh City (South)", "Mekong Delta"],
  "Turkey": ["Istanbul", "Aegean", "Anatolia", "Black Sea", "Mediterranean"],
  "Lebanon": ["Beirut", "Mount Lebanon", "North", "South", "Bekaa"],
  "Korea": ["Seoul", "Jeolla", "Busan", "Jeju Island", "Gangwon"],
  "Brazil": ["Bahia", "Minas Gerais", "Amazonas", "Rio de Janeiro", "São Paulo"],
  "Argentina": ["Buenos Aires", "Pampas", "Patagonia", "Mendoza", "Salta"],
  "Peru": ["Lima", "Cusco", "Arequipa", "Amazon"],
  "Morocco": ["Marrakech", "Fes", "Casablanca", "Tangier"],
  "Ethiopia": ["Addis Ababa", "Oromia", "Amhara", "Tigray"],
  "Germany": ["Bavaria", "Berlin", "Hamburg", "Saxony", "Rhineland"],
  "UK": ["London", "Scotland", "Wales", "Cornwall", "Yorkshire"]
};

export const ALL_COUNTRIES = Object.keys(CULINARY_LOCATIONS).sort();