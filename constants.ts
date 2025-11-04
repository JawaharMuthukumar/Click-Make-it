import type { Cuisine } from './types';

export const CUISINES: Cuisine[] = [
  {
    name: 'Any',
    description: 'Let the AI surprise you with a creative recipe based on your ingredients!',
  },
  {
    name: 'North Indian',
    description: 'Characterized by rich, creamy curries, flatbreads like naan and roti, and the use of the tandoor oven.',
    styles: [
        { name: 'Punjabi', description: 'Hearty, buttery dishes like butter chicken, dal makhani, and tandoori items.'},
        { name: 'Mughlai', description: 'Rich, aromatic, and mildly spiced dishes with nuts, cream, and saffron.'},
        { name: 'Rajasthani', description: 'Adapted to an arid climate, this cuisine uses lentils, beans, and dairy like ghee and yogurt. Known for dal baati churma.'},
    ]
  },
  {
    name: 'South Indian',
    description: 'Lighter than North Indian, with a focus on rice, lentils, and stews. Features dishes like dosa, idli, and sambar.',
     styles: [
        { name: 'Tamil Nadu', description: 'A South Indian cuisine known for its distinct blend of spices, tamarind for sourness, and both vegetarian and non-vegetarian dishes.'},
        { name: 'Kerala', description: 'From the South Indian coast, this cuisine heavily features coconut, seafood, rice, and fragrant spices.'},
        { name: 'Chettinad', description: 'A fiery and aromatic cuisine from Tamil Nadu, known for its complex spice blends and sun-dried meats.'},
    ]
  },
  {
    name: 'Hyderabadi',
    description: 'A regal cuisine blending Mughal, Turkish, and Telugu influences. Famous for its aromatic biryanis and rich, slow-cooked dishes.',
  },
];


export const TASTE_PROFILES = ['Spicy', 'Savory', 'Juicy', 'Sweet', 'Tangy', 'Light'];

export const COOKING_METHODS = ['Stove', 'Oven', 'No-Cook'];

export const COOKING_STYLES = ['Standard', 'Low-Oil', 'One-Pot', 'Quick & Easy'];

export const TASTE_SUGGESTIONS: { [key: string]: string } = {
  'Spicy': 'For a Spicy dish, our AI might suggest using ingredients like chili peppers, cayenne, or hot sauce.',
  'Savory': 'For a Savory dish, our AI might suggest using ingredients like mushrooms, soy sauce, or parmesan cheese.',
  'Juicy': 'For a Juicy dish, our AI might focus on techniques that retain moisture or use ingredients like tomatoes or citrus.',
  'Sweet': 'For a Sweet dish, our AI might suggest using ingredients like honey, sugar, jaggery, or fruit.',
  'Tangy': 'For a Tangy dish, our AI might suggest using ingredients like vinegar, lemon, lime, or yogurt.',
  'Light': 'For a Light dish, our AI might focus on fresh vegetables, lean proteins, and minimal oils.'
};