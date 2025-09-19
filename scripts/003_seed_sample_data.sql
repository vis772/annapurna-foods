-- Insert sample categories
INSERT INTO categories (name, description, image_url) VALUES
('Vegetables', 'Fresh vegetables and greens', '/placeholder.svg?height=200&width=200'),
('Fruits', 'Fresh seasonal fruits', '/placeholder.svg?height=200&width=200'),
('Grains & Pulses', 'Rice, wheat, lentils and pulses', '/placeholder.svg?height=200&width=200'),
('Spices & Condiments', 'Indian spices and cooking essentials', '/placeholder.svg?height=200&width=200'),
('Dairy & Eggs', 'Milk, yogurt, cheese and eggs', '/placeholder.svg?height=200&width=200'),
('Snacks & Sweets', 'Traditional Indian snacks and sweets', '/placeholder.svg?height=200&width=200');

-- Insert sample products (getting category IDs first)
DO $$
DECLARE
    veg_id UUID;
    fruit_id UUID;
    grain_id UUID;
    spice_id UUID;
    dairy_id UUID;
    snack_id UUID;
BEGIN
    SELECT id INTO veg_id FROM categories WHERE name = 'Vegetables';
    SELECT id INTO fruit_id FROM categories WHERE name = 'Fruits';
    SELECT id INTO grain_id FROM categories WHERE name = 'Grains & Pulses';
    SELECT id INTO spice_id FROM categories WHERE name = 'Spices & Condiments';
    SELECT id INTO dairy_id FROM categories WHERE name = 'Dairy & Eggs';
    SELECT id INTO snack_id FROM categories WHERE name = 'Snacks & Sweets';

    -- Vegetables
    INSERT INTO products (name, description, price, category_id, image_url, stock_quantity, unit) VALUES
    ('Tomatoes', 'Fresh red tomatoes', 3.99, veg_id, '/placeholder.svg?height=300&width=300', 50, 'kg'),
    ('Onions', 'Yellow cooking onions', 2.49, veg_id, '/placeholder.svg?height=300&width=300', 75, 'kg'),
    ('Potatoes', 'Fresh potatoes', 1.99, veg_id, '/placeholder.svg?height=300&width=300', 100, 'kg'),
    ('Spinach', 'Fresh green spinach leaves', 2.99, veg_id, '/placeholder.svg?height=300&width=300', 30, 'bunch'),
    ('Carrots', 'Fresh orange carrots', 2.79, veg_id, '/placeholder.svg?height=300&width=300', 40, 'kg');

    -- Fruits
    INSERT INTO products (name, description, price, category_id, image_url, stock_quantity, unit) VALUES
    ('Bananas', 'Ripe yellow bananas', 1.99, fruit_id, '/placeholder.svg?height=300&width=300', 60, 'dozen'),
    ('Apples', 'Fresh red apples', 4.99, fruit_id, '/placeholder.svg?height=300&width=300', 45, 'kg'),
    ('Mangoes', 'Sweet Alphonso mangoes', 8.99, fruit_id, '/placeholder.svg?height=300&width=300', 25, 'kg'),
    ('Oranges', 'Juicy oranges', 3.99, fruit_id, '/placeholder.svg?height=300&width=300', 35, 'kg');

    -- Grains & Pulses
    INSERT INTO products (name, description, price, category_id, image_url, stock_quantity, unit) VALUES
    ('Basmati Rice', 'Premium aged basmati rice', 12.99, grain_id, '/placeholder.svg?height=300&width=300', 80, '5kg bag'),
    ('Toor Dal', 'Yellow split pigeon peas', 6.99, grain_id, '/placeholder.svg?height=300&width=300', 60, '2kg bag'),
    ('Chana Dal', 'Split chickpeas', 5.99, grain_id, '/placeholder.svg?height=300&width=300', 50, '2kg bag'),
    ('Whole Wheat Flour', 'Fresh ground wheat flour', 4.99, grain_id, '/placeholder.svg?height=300&width=300', 70, '2kg bag');

    -- Spices & Condiments
    INSERT INTO products (name, description, price, category_id, image_url, stock_quantity, unit) VALUES
    ('Turmeric Powder', 'Pure turmeric powder', 3.99, spice_id, '/placeholder.svg?height=300&width=300', 40, '200g'),
    ('Cumin Seeds', 'Whole cumin seeds', 4.49, spice_id, '/placeholder.svg?height=300&width=300', 35, '200g'),
    ('Garam Masala', 'Blend of aromatic spices', 5.99, spice_id, '/placeholder.svg?height=300&width=300', 30, '100g'),
    ('Coconut Oil', 'Pure coconut oil', 8.99, spice_id, '/placeholder.svg?height=300&width=300', 25, '500ml');

    -- Dairy & Eggs
    INSERT INTO products (name, description, price, category_id, image_url, stock_quantity, unit) VALUES
    ('Fresh Milk', 'Whole milk', 3.49, dairy_id, '/placeholder.svg?height=300&width=300', 40, '1L'),
    ('Greek Yogurt', 'Thick Greek yogurt', 4.99, dairy_id, '/placeholder.svg?height=300&width=300', 30, '500g'),
    ('Free Range Eggs', 'Farm fresh eggs', 5.99, dairy_id, '/placeholder.svg?height=300&width=300', 50, 'dozen'),
    ('Paneer', 'Fresh cottage cheese', 6.99, dairy_id, '/placeholder.svg?height=300&width=300', 20, '250g');

    -- Snacks & Sweets
    INSERT INTO products (name, description, price, category_id, image_url, stock_quantity, unit) VALUES
    ('Samosas', 'Crispy vegetable samosas', 7.99, snack_id, '/placeholder.svg?height=300&width=300', 25, '6 pieces'),
    ('Gulab Jamun', 'Sweet milk dumplings', 8.99, snack_id, '/placeholder.svg?height=300&width=300', 20, '12 pieces'),
    ('Namak Pare', 'Crispy savory snack', 4.99, snack_id, '/placeholder.svg?height=300&width=300', 30, '250g'),
    ('Jalebi', 'Sweet spiral pastries', 9.99, snack_id, '/placeholder.svg?height=300&width=300', 15, '500g');
END $$;
