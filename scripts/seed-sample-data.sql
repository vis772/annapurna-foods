-- Insert sample categories
INSERT INTO categories (id, name, description, image_url) VALUES
  (gen_random_uuid(), 'Fresh Vegetables', 'Farm-fresh vegetables delivered daily', '/placeholder.svg?height=200&width=200'),
  (gen_random_uuid(), 'Fruits', 'Seasonal fruits and exotic varieties', '/placeholder.svg?height=200&width=200'),
  (gen_random_uuid(), 'Dairy & Eggs', 'Fresh dairy products and farm eggs', '/placeholder.svg?height=200&width=200'),
  (gen_random_uuid(), 'Grains & Pulses', 'Premium quality grains and lentils', '/placeholder.svg?height=200&width=200'),
  (gen_random_uuid(), 'Spices & Herbs', 'Authentic Indian spices and herbs', '/placeholder.svg?height=200&width=200');

-- Insert sample products
WITH category_ids AS (
  SELECT id, name FROM categories
)
INSERT INTO products (id, name, description, price, category_id, stock_quantity, unit, is_active, image_url) VALUES
  -- Vegetables
  (gen_random_uuid(), 'Organic Tomatoes', 'Fresh organic tomatoes', 3.99, (SELECT id FROM category_ids WHERE name = 'Fresh Vegetables'), 50, 'lb', true, '/placeholder.svg?height=300&width=300'),
  (gen_random_uuid(), 'Fresh Spinach', 'Tender baby spinach leaves', 2.49, (SELECT id FROM category_ids WHERE name = 'Fresh Vegetables'), 30, 'bunch', true, '/placeholder.svg?height=300&width=300'),
  (gen_random_uuid(), 'Red Onions', 'Sweet red onions', 1.99, (SELECT id FROM category_ids WHERE name = 'Fresh Vegetables'), 40, 'lb', true, '/placeholder.svg?height=300&width=300'),
  
  -- Fruits
  (gen_random_uuid(), 'Alphonso Mangoes', 'Premium Alphonso mangoes from India', 8.99, (SELECT id FROM category_ids WHERE name = 'Fruits'), 25, 'box', true, '/placeholder.svg?height=300&width=300'),
  (gen_random_uuid(), 'Fresh Bananas', 'Ripe yellow bananas', 1.49, (SELECT id FROM category_ids WHERE name = 'Fruits'), 60, 'bunch', true, '/placeholder.svg?height=300&width=300'),
  
  -- Dairy
  (gen_random_uuid(), 'Whole Milk', 'Fresh whole milk', 4.99, (SELECT id FROM category_ids WHERE name = 'Dairy & Eggs'), 20, 'gallon', true, '/placeholder.svg?height=300&width=300'),
  (gen_random_uuid(), 'Farm Fresh Eggs', 'Free-range chicken eggs', 5.99, (SELECT id FROM category_ids WHERE name = 'Dairy & Eggs'), 35, 'dozen', true, '/placeholder.svg?height=300&width=300'),
  
  -- Grains
  (gen_random_uuid(), 'Basmati Rice', 'Premium aged basmati rice', 12.99, (SELECT id FROM category_ids WHERE name = 'Grains & Pulses'), 15, '5lb bag', true, '/placeholder.svg?height=300&width=300'),
  (gen_random_uuid(), 'Red Lentils', 'Organic red lentils', 6.99, (SELECT id FROM category_ids WHERE name = 'Grains & Pulses'), 25, '2lb bag', true, '/placeholder.svg?height=300&width=300'),
  
  -- Spices
  (gen_random_uuid(), 'Turmeric Powder', 'Pure turmeric powder', 3.49, (SELECT id FROM category_ids WHERE name = 'Spices & Herbs'), 45, '100g', true, '/placeholder.svg?height=300&width=300'),
  (gen_random_uuid(), 'Garam Masala', 'Authentic garam masala blend', 4.99, (SELECT id FROM category_ids WHERE name = 'Spices & Herbs'), 30, '50g', true, '/placeholder.svg?height=300&width=300');
