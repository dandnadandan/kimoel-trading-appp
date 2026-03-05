-- ============================================================
-- KIMOEL TRADING - Supabase Database Schema
-- Run this in Supabase Dashboard > SQL Editor > New Query
-- ============================================================

-- 1. Create sequence for reference numbers
CREATE SEQUENCE IF NOT EXISTS invoice_ref_seq START WITH 1000;

-- 2. Create the invoice_requests table
CREATE TABLE IF NOT EXISTS invoice_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reference_number TEXT UNIQUE NOT NULL,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_city TEXT NOT NULL,
  notes TEXT DEFAULT '',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable Row Level Security
ALTER TABLE invoice_requests ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Anyone can INSERT (customers submit invoice requests)
CREATE POLICY "Allow public insert" ON invoice_requests
  FOR INSERT
  WITH CHECK (true);

-- 4. Policy: Only authenticated users (admin) can SELECT
CREATE POLICY "Allow authenticated select" ON invoice_requests
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- 5. Policy: Only authenticated users (admin) can UPDATE
CREATE POLICY "Allow authenticated update" ON invoice_requests
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- 6. Policy: Only authenticated users (admin) can DELETE
CREATE POLICY "Allow authenticated delete" ON invoice_requests
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- 7. Function to generate reference number
CREATE OR REPLACE FUNCTION generate_invoice_ref()
RETURNS TEXT AS $$
DECLARE
  year_part TEXT;
  seq_num INTEGER;
  ref_num TEXT;
BEGIN
  year_part := EXTRACT(YEAR FROM CURRENT_DATE)::TEXT;
  seq_num := nextval('invoice_ref_seq');
  ref_num := 'KIMO-' || year_part || '-' || LPAD(seq_num::TEXT, 6, '0');
  RETURN ref_num;
END;
$$ LANGUAGE plpgsql;

-- 8. Trigger to auto-generate reference number
CREATE OR REPLACE FUNCTION set_invoice_ref()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.reference_number IS NULL OR NEW.reference_number = '' THEN
    NEW.reference_number := generate_invoice_ref();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 9. Apply the trigger
CREATE TRIGGER set_invoice_ref_trigger
  BEFORE INSERT ON invoice_requests
  FOR EACH ROW
  EXECUTE FUNCTION set_invoice_ref();

-- 10. Index for faster queries
CREATE INDEX IF NOT EXISTS idx_invoice_requests_status ON invoice_requests(status);
CREATE INDEX IF NOT EXISTS idx_invoice_requests_created_at ON invoice_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_invoice_requests_ref ON invoice_requests(reference_number);

-- ============================================================
-- AFTER running this SQL:
-- 1. Go to Authentication > Users > "Add User"
-- 2. Create your admin user with email + password
-- 3. That admin user can now log in to the admin panel
-- ============================================================
