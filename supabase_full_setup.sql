-- AUTO-GENERATED FULL SUPABASE SETUP SCRIPT

-- MIGRATION: 20260618022450_3270fbc2-31de-47e0-97d3-f3707c9c6707.sql

-- Enums
CREATE TYPE public.app_role AS ENUM ('admin', 'customer');
CREATE TYPE public.company_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE public.address_kind AS ENUM ('billing', 'shipping', 'both');

-- updated_at helper
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- PROFILES
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- USER_ROLES
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE INDEX user_roles_user_id_idx ON public.user_roles(user_id);

-- has_role security-definer
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

-- COMPANIES
CREATE TABLE public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  legal_name TEXT NOT NULL,
  trade_name TEXT,
  tax_id TEXT,
  email TEXT,
  phone TEXT,
  status public.company_status NOT NULL DEFAULT 'pending',
  approved_at TIMESTAMPTZ,
  approved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  rejection_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.companies TO authenticated;
GRANT ALL ON public.companies TO service_role;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
CREATE INDEX companies_owner_id_idx ON public.companies(owner_id);
CREATE INDEX companies_status_idx ON public.companies(status);
CREATE TRIGGER companies_updated_at BEFORE UPDATE ON public.companies
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ADDRESSES
CREATE TABLE public.addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  kind public.address_kind NOT NULL DEFAULT 'both',
  label TEXT,
  street TEXT NOT NULL,
  number TEXT,
  complement TEXT,
  district TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'BR',
  is_default BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.addresses TO authenticated;
GRANT ALL ON public.addresses TO service_role;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
CREATE INDEX addresses_company_id_idx ON public.addresses(company_id);
CREATE TRIGGER addresses_updated_at BEFORE UPDATE ON public.addresses
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============== POLICIES ==============

-- profiles: usuário vê/edita o próprio; admin vê todos
CREATE POLICY "profiles_self_select" ON public.profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "profiles_admin_select" ON public.profiles
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "profiles_self_insert" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_self_update" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_admin_update" ON public.profiles
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- user_roles: usuário vê os próprios papéis; admin gerencia tudo
CREATE POLICY "user_roles_self_select" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "user_roles_admin_all" ON public.user_roles
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- companies: dono CRUD próprias; admin tudo; status só admin
CREATE POLICY "companies_owner_select" ON public.companies
  FOR SELECT TO authenticated USING (auth.uid() = owner_id);
CREATE POLICY "companies_admin_select" ON public.companies
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "companies_owner_insert" ON public.companies
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = owner_id AND status = 'pending');
CREATE POLICY "companies_owner_update" ON public.companies
  FOR UPDATE TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (
    auth.uid() = owner_id
    AND status = (SELECT status FROM public.companies WHERE id = companies.id)
  );
CREATE POLICY "companies_admin_update" ON public.companies
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "companies_admin_delete" ON public.companies
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- addresses: dono da empresa CRUD; admin tudo
CREATE POLICY "addresses_owner_all" ON public.addresses
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.companies c WHERE c.id = addresses.company_id AND c.owner_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.companies c WHERE c.id = addresses.company_id AND c.owner_id = auth.uid()));
CREATE POLICY "addresses_admin_all" ON public.addresses
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============== TRIGGERS new user ==============
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'customer');
  RETURN NEW;
END; $$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- MIGRATION: 20260618022509_f315db0d-6487-4c8d-8a5b-cb3ec1d3e44b.sql

REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;


-- MIGRATION: 20260618022906_e1d09155-cf60-48aa-9d7f-75d390bb674e.sql

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  is_first BOOLEAN;
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'customer');

  SELECT NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') INTO is_first;
  IF is_first THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  END IF;
  RETURN NEW;
END; $$;


-- MIGRATION: 20260618025935_fabcdf63-9acb-44c2-a3c4-018edb7a8249.sql

CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  status BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_categories_parent ON public.categories(parent_id);
GRANT SELECT ON public.categories TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.categories TO authenticated;
GRANT ALL ON public.categories TO service_role;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "categories read all" ON public.categories FOR SELECT USING (true);
CREATE POLICY "categories admin write" ON public.categories FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_categories_updated BEFORE UPDATE ON public.categories
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  status BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.brands TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.brands TO authenticated;
GRANT ALL ON public.brands TO service_role;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
CREATE POLICY "brands read all" ON public.brands FOR SELECT USING (true);
CREATE POLICY "brands admin write" ON public.brands FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_brands_updated BEFORE UPDATE ON public.brands
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TYPE public.product_tipo AS ENUM
  ('controle','carcaca','alarme','modulo','transponder','lamina','bateria','acessorio');

CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  sku TEXT NOT NULL UNIQUE,
  codigo_fabricante TEXT,
  categoria_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  marca_id UUID REFERENCES public.brands(id) ON DELETE SET NULL,
  modelo TEXT,
  descricao_curta TEXT,
  descricao_completa TEXT,
  frequencia TEXT,
  quantidade_botoes INT,
  tipo public.product_tipo,
  observacoes_tecnicas TEXT,
  estoque INT NOT NULL DEFAULT 0,
  estoque_minimo INT NOT NULL DEFAULT 0,
  localizacao TEXT,
  preco_unitario NUMERIC(12,2) NOT NULL DEFAULT 0,
  quantidade_pacote INT NOT NULL DEFAULT 1,
  preco_pacote NUMERIC(12,2),
  status BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_products_categoria ON public.products(categoria_id);
CREATE INDEX idx_products_marca ON public.products(marca_id);
CREATE INDEX idx_products_tipo ON public.products(tipo);
CREATE INDEX idx_products_status ON public.products(status);
CREATE INDEX idx_products_search ON public.products
  USING gin (to_tsvector('portuguese',
    coalesce(nome,'')||' '||coalesce(sku,'')||' '||coalesce(codigo_fabricante,'')
    ||' '||coalesce(modelo,'')||' '||coalesce(frequencia,'')));
CREATE INDEX idx_products_nome_trgm ON public.products USING gin (nome gin_trgm_ops);
GRANT SELECT ON public.products TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "products read all" ON public.products FOR SELECT USING (true);
CREATE POLICY "products admin write" ON public.products FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_products_updated BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TYPE public.image_tipo AS ENUM
  ('principal','secundaria','traseira','placa','botoes','tecnica');

CREATE TABLE public.product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  tipo_imagem public.image_tipo NOT NULL DEFAULT 'principal',
  ordem INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_product_images_product ON public.product_images(product_id);
GRANT SELECT ON public.product_images TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.product_images TO authenticated;
GRANT ALL ON public.product_images TO service_role;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "product_images read all" ON public.product_images FOR SELECT USING (true);
CREATE POLICY "product_images admin write" ON public.product_images FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.compatibilities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  descricao TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_compat_product ON public.compatibilities(product_id);
CREATE INDEX idx_compat_desc_trgm ON public.compatibilities USING gin (descricao gin_trgm_ops);
GRANT SELECT ON public.compatibilities TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.compatibilities TO authenticated;
GRANT ALL ON public.compatibilities TO service_role;
ALTER TABLE public.compatibilities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "compat read all" ON public.compatibilities FOR SELECT USING (true);
CREATE POLICY "compat admin write" ON public.compatibilities FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id)
);
CREATE INDEX idx_favorites_user ON public.favorites(user_id);
GRANT SELECT, INSERT, DELETE ON public.favorites TO authenticated;
GRANT ALL ON public.favorites TO service_role;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "favorites self" ON public.favorites FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

INSERT INTO public.categories (nome, slug) VALUES
  ('Chaves Canivete','chaves-canivete'),
  ('Controles de Alarme','controles-de-alarme'),
  ('Carcaças','carcacas'),
  ('Alarmes','alarmes'),
  ('Módulos','modulos'),
  ('Baterias','baterias'),
  ('Transponders','transponders'),
  ('Lâminas','laminas'),
  ('Acessórios','acessorios');

INSERT INTO public.brands (nome) VALUES
  ('Positron'),('FKS'),('Olimpus'),('PX'),('Taramps');


-- MIGRATION: 20260618030002_71b57453-5142-4cd8-88e3-522825e102c3.sql

CREATE SCHEMA IF NOT EXISTS extensions;
ALTER EXTENSION pg_trgm SET SCHEMA extensions;
GRANT USAGE ON SCHEMA extensions TO anon, authenticated, service_role;

-- Storage policies for product-images bucket
CREATE POLICY "product-images public read"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'product-images');

CREATE POLICY "product-images admin write"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'product-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "product-images admin update"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'product-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "product-images admin delete"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'product-images' AND public.has_role(auth.uid(), 'admin'));


-- MIGRATION: 20260618030505_07560625-cac6-433b-b5dd-16b24d17ae84.sql

CREATE TYPE public.order_origem AS ENUM ('PORTAL','VISITA','WHATSAPP');
CREATE TYPE public.order_status AS ENUM (
  'PENDENTE','AGUARDANDO_PAGAMENTO','PAGO','EM_SEPARACAO','ENVIADO','ENTREGUE','CANCELADO'
);
CREATE TYPE public.compra_tipo AS ENUM ('UNITARIO','PACOTE');
CREATE TYPE public.payment_tipo AS ENUM ('PIX','CARTAO');
CREATE TYPE public.payment_status AS ENUM ('PENDENTE','APROVADO','RECUSADO','CANCELADO','ESTORNADO');

-- ===== ORDERS =====
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE RESTRICT,
  address_id UUID REFERENCES public.addresses(id) ON DELETE SET NULL,
  origem public.order_origem NOT NULL DEFAULT 'PORTAL',
  status public.order_status NOT NULL DEFAULT 'PENDENTE',
  subtotal NUMERIC(12,2) NOT NULL DEFAULT 0,
  frete NUMERIC(12,2) NOT NULL DEFAULT 0,
  desconto NUMERIC(12,2) NOT NULL DEFAULT 0,
  total NUMERIC(12,2) NOT NULL DEFAULT 0,
  observacao TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_orders_company ON public.orders(company_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_created_at ON public.orders(created_at DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "orders self read" ON public.orders FOR SELECT TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin')
    OR EXISTS (SELECT 1 FROM public.companies c WHERE c.id = orders.company_id AND c.owner_id = auth.uid())
  );
CREATE POLICY "orders self insert" ON public.orders FOR INSERT TO authenticated
  WITH CHECK (
    public.has_role(auth.uid(), 'admin')
    OR EXISTS (SELECT 1 FROM public.companies c WHERE c.id = orders.company_id AND c.owner_id = auth.uid() AND c.status = 'approved')
  );
CREATE POLICY "orders admin update" ON public.orders FOR UPDATE TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin')
    OR EXISTS (SELECT 1 FROM public.companies c WHERE c.id = orders.company_id AND c.owner_id = auth.uid())
  );
CREATE POLICY "orders admin delete" ON public.orders FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_orders_updated BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ===== ORDER ITEMS =====
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
  tipo_compra public.compra_tipo NOT NULL DEFAULT 'UNITARIO',
  quantidade INT NOT NULL CHECK (quantidade > 0),
  preco_unitario NUMERIC(12,2) NOT NULL,
  preco_final NUMERIC(12,2) NOT NULL,
  subtotal NUMERIC(12,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_order_items_order ON public.order_items(order_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.order_items TO authenticated;
GRANT ALL ON public.order_items TO service_role;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "order_items follow order" ON public.order_items FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.orders o
    WHERE o.id = order_items.order_id
      AND (public.has_role(auth.uid(), 'admin')
           OR EXISTS (SELECT 1 FROM public.companies c WHERE c.id = o.company_id AND c.owner_id = auth.uid()))
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.orders o
    WHERE o.id = order_items.order_id
      AND (public.has_role(auth.uid(), 'admin')
           OR EXISTS (SELECT 1 FROM public.companies c WHERE c.id = o.company_id AND c.owner_id = auth.uid()))
  ));

-- ===== PAYMENTS =====
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  gateway TEXT NOT NULL DEFAULT 'mercado_pago',
  tipo public.payment_tipo NOT NULL,
  status public.payment_status NOT NULL DEFAULT 'PENDENTE',
  transaction_id TEXT,
  qr_code TEXT,
  qr_code_base64 TEXT,
  valor NUMERIC(12,2) NOT NULL,
  payload JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_payments_order ON public.payments(order_id);
GRANT SELECT, INSERT, UPDATE ON public.payments TO authenticated;
GRANT ALL ON public.payments TO service_role;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "payments follow order" ON public.payments FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.orders o
    WHERE o.id = payments.order_id
      AND (public.has_role(auth.uid(), 'admin')
           OR EXISTS (SELECT 1 FROM public.companies c WHERE c.id = o.company_id AND c.owner_id = auth.uid()))
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.orders o
    WHERE o.id = payments.order_id
      AND (public.has_role(auth.uid(), 'admin')
           OR EXISTS (SELECT 1 FROM public.companies c WHERE c.id = o.company_id AND c.owner_id = auth.uid()))
  ));
CREATE TRIGGER trg_payments_updated BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ===== ORDER HISTORY =====
CREATE TABLE public.order_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  status public.order_status NOT NULL,
  observacao TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_order_history_order ON public.order_history(order_id);
GRANT SELECT, INSERT ON public.order_history TO authenticated;
GRANT ALL ON public.order_history TO service_role;
ALTER TABLE public.order_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "order_history follow order" ON public.order_history FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.orders o
    WHERE o.id = order_history.order_id
      AND (public.has_role(auth.uid(), 'admin')
           OR EXISTS (SELECT 1 FROM public.companies c WHERE c.id = o.company_id AND c.owner_id = auth.uid()))
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.orders o
    WHERE o.id = order_history.order_id
      AND (public.has_role(auth.uid(), 'admin')
           OR EXISTS (SELECT 1 FROM public.companies c WHERE c.id = o.company_id AND c.owner_id = auth.uid()))
  ));

-- auto-create history on order create / status change
CREATE OR REPLACE FUNCTION public.log_order_status()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.order_history(order_id, status, observacao, user_id)
    VALUES (NEW.id, NEW.status, 'Pedido criado', NEW.created_by);
  ELSIF TG_OP = 'UPDATE' AND NEW.status IS DISTINCT FROM OLD.status THEN
    INSERT INTO public.order_history(order_id, status, observacao, user_id)
    VALUES (NEW.id, NEW.status, 'Status atualizado', auth.uid());
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER trg_orders_history AFTER INSERT OR UPDATE OF status ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.log_order_status();

-- ===== SAVED ORDERS (favorite carts) =====
CREATE TABLE public.saved_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_saved_orders_company ON public.saved_orders(company_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.saved_orders TO authenticated;
GRANT ALL ON public.saved_orders TO service_role;
ALTER TABLE public.saved_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "saved_orders self" ON public.saved_orders FOR ALL TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin')
    OR EXISTS (SELECT 1 FROM public.companies c WHERE c.id = saved_orders.company_id AND c.owner_id = auth.uid())
  )
  WITH CHECK (
    public.has_role(auth.uid(), 'admin')
    OR EXISTS (SELECT 1 FROM public.companies c WHERE c.id = saved_orders.company_id AND c.owner_id = auth.uid())
  );

CREATE TABLE public.saved_order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  saved_order_id UUID NOT NULL REFERENCES public.saved_orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  tipo_compra public.compra_tipo NOT NULL DEFAULT 'UNITARIO',
  quantidade INT NOT NULL CHECK (quantidade > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_saved_order_items ON public.saved_order_items(saved_order_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.saved_order_items TO authenticated;
GRANT ALL ON public.saved_order_items TO service_role;
ALTER TABLE public.saved_order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "saved_order_items follow parent" ON public.saved_order_items FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.saved_orders s
    JOIN public.companies c ON c.id = s.company_id
    WHERE s.id = saved_order_items.saved_order_id
      AND (public.has_role(auth.uid(), 'admin') OR c.owner_id = auth.uid())
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.saved_orders s
    JOIN public.companies c ON c.id = s.company_id
    WHERE s.id = saved_order_items.saved_order_id
      AND (public.has_role(auth.uid(), 'admin') OR c.owner_id = auth.uid())
  ));


-- MIGRATION: 20260618030522_d48dc2de-22e2-4c6c-b5ff-70c8ddf38b61.sql

REVOKE EXECUTE ON FUNCTION public.log_order_status() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;


-- MIGRATION: 20260618030954_cec67a24-c6c1-4545-a1e5-d31aeaadd33c.sql

-- Enums
DO $$ BEGIN
  CREATE TYPE public.lead_status AS ENUM ('NOVO_LEAD','CONTATO_FEITO','NEGOCIACAO','AGUARDANDO_RETORNO','CLIENTE','PERDIDO');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.lead_segmento AS ENUM ('CHAVEIRO','AUTO_ELETRICA','CENTRO_AUTOMOTIVO','LOJA_DE_SOM','AUTO_PECAS','INSTALADOR_DE_ALARMES','OUTRO');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.lead_activity_tipo AS ENUM ('LIGACAO','WHATSAPP','VISITA','PROPOSTA','RETORNO','OBSERVACAO','PEDIDO','CADASTRO','MUDANCA_ETAPA','OUTRO');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.lead_task_status AS ENUM ('PENDENTE','CONCLUIDA','CANCELADA');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- leads
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa TEXT NOT NULL,
  contato TEXT NOT NULL,
  whatsapp TEXT,
  telefone TEXT,
  email TEXT,
  cidade TEXT,
  estado TEXT,
  segmento public.lead_segmento NOT NULL DEFAULT 'OUTRO',
  status public.lead_status NOT NULL DEFAULT 'NOVO_LEAD',
  score INT NOT NULL DEFAULT 0 CHECK (score >= 0 AND score <= 100),
  responsavel_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  observacoes TEXT,
  ultimo_contato TIMESTAMPTZ,
  position INT NOT NULL DEFAULT 0,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage leads" ON public.leads FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE INDEX idx_leads_status ON public.leads(status);
CREATE INDEX idx_leads_responsavel ON public.leads(responsavel_id);

CREATE TRIGGER trg_leads_updated BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- lead_activities
CREATE TABLE public.lead_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  tipo public.lead_activity_tipo NOT NULL,
  descricao TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.lead_activities TO authenticated;
GRANT ALL ON public.lead_activities TO service_role;
ALTER TABLE public.lead_activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage lead_activities" ON public.lead_activities FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE INDEX idx_lead_activities_lead ON public.lead_activities(lead_id);

-- lead_tasks
CREATE TABLE public.lead_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  titulo TEXT NOT NULL,
  descricao TEXT,
  data DATE,
  hora TIME,
  status public.lead_task_status NOT NULL DEFAULT 'PENDENTE',
  responsavel_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.lead_tasks TO authenticated;
GRANT ALL ON public.lead_tasks TO service_role;
ALTER TABLE public.lead_tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage lead_tasks" ON public.lead_tasks FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE INDEX idx_lead_tasks_lead ON public.lead_tasks(lead_id);
CREATE INDEX idx_lead_tasks_data ON public.lead_tasks(data);

CREATE TRIGGER trg_lead_tasks_updated BEFORE UPDATE ON public.lead_tasks
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- lead_notes
CREATE TABLE public.lead_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  texto TEXT NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.lead_notes TO authenticated;
GRANT ALL ON public.lead_notes TO service_role;
ALTER TABLE public.lead_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage lead_notes" ON public.lead_notes FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE INDEX idx_lead_notes_lead ON public.lead_notes(lead_id);

-- lead_stage_history
CREATE TABLE public.lead_stage_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  etapa_anterior public.lead_status,
  nova_etapa public.lead_status NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.lead_stage_history TO authenticated;
GRANT ALL ON public.lead_stage_history TO service_role;
ALTER TABLE public.lead_stage_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage lead_stage_history" ON public.lead_stage_history FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE INDEX idx_lead_stage_history_lead ON public.lead_stage_history(lead_id);

-- Trigger: log de mudanças de etapa + atividade automática
CREATE OR REPLACE FUNCTION public.log_lead_stage()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.lead_stage_history(lead_id, etapa_anterior, nova_etapa, user_id)
    VALUES (NEW.id, NULL, NEW.status, auth.uid());
    INSERT INTO public.lead_activities(lead_id, tipo, descricao, created_by)
    VALUES (NEW.id, 'CADASTRO', 'Lead cadastrado', auth.uid());
  ELSIF TG_OP = 'UPDATE' AND NEW.status IS DISTINCT FROM OLD.status THEN
    INSERT INTO public.lead_stage_history(lead_id, etapa_anterior, nova_etapa, user_id)
    VALUES (NEW.id, OLD.status, NEW.status, auth.uid());
    INSERT INTO public.lead_activities(lead_id, tipo, descricao, created_by)
    VALUES (NEW.id, 'MUDANCA_ETAPA', 'Etapa: ' || OLD.status || ' -> ' || NEW.status, auth.uid());
  END IF;
  RETURN NEW;
END $$;

CREATE TRIGGER trg_log_lead_stage
  AFTER INSERT OR UPDATE OF status ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.log_lead_stage();


-- MIGRATION: 20260618031414_054c2806-4c4e-4243-ad9b-0d02b2ab00d3.sql

DO $$ BEGIN
  CREATE TYPE public.wa_direction AS ENUM ('IN','OUT');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.wa_message_type AS ENUM ('TEXT','IMAGE','AUDIO','VIDEO','DOCUMENT','LOCATION','CONTACT','LINK','TEMPLATE','PIX');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.wa_message_status AS ENUM ('PENDING','SENT','DELIVERED','READ','FAILED','RECEIVED');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.wa_campaign_status AS ENUM ('DRAFT','SCHEDULED','SENDING','DONE','CANCELED');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- conversations
CREATE TABLE public.whatsapp_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT NOT NULL UNIQUE,
  contact_name TEXT,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  unread_count INT NOT NULL DEFAULT 0,
  last_message_at TIMESTAMPTZ,
  last_message_preview TEXT,
  status TEXT NOT NULL DEFAULT 'OPEN',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.whatsapp_conversations TO authenticated;
GRANT ALL ON public.whatsapp_conversations TO service_role;
ALTER TABLE public.whatsapp_conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage wa_conversations" ON public.whatsapp_conversations FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE INDEX idx_wa_conv_phone ON public.whatsapp_conversations(phone);
CREATE INDEX idx_wa_conv_lead ON public.whatsapp_conversations(lead_id);
CREATE TRIGGER trg_wa_conv_updated BEFORE UPDATE ON public.whatsapp_conversations
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- messages
CREATE TABLE public.whatsapp_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.whatsapp_conversations(id) ON DELETE CASCADE,
  direction public.wa_direction NOT NULL,
  message_type public.wa_message_type NOT NULL DEFAULT 'TEXT',
  content TEXT,
  file_url TEXT,
  external_id TEXT,
  status public.wa_message_status NOT NULL DEFAULT 'PENDING',
  metadata JSONB,
  sent_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.whatsapp_messages TO authenticated;
GRANT ALL ON public.whatsapp_messages TO service_role;
ALTER TABLE public.whatsapp_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage wa_messages" ON public.whatsapp_messages FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE INDEX idx_wa_msg_conv ON public.whatsapp_messages(conversation_id, created_at DESC);

-- templates
CREATE TABLE public.whatsapp_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  categoria TEXT NOT NULL DEFAULT 'GERAL',
  conteudo TEXT NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.whatsapp_templates TO authenticated;
GRANT ALL ON public.whatsapp_templates TO service_role;
ALTER TABLE public.whatsapp_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage wa_templates" ON public.whatsapp_templates FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_wa_templates_updated BEFORE UPDATE ON public.whatsapp_templates
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- campaigns
CREATE TABLE public.whatsapp_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  mensagem TEXT NOT NULL,
  template_id UUID REFERENCES public.whatsapp_templates(id) ON DELETE SET NULL,
  cidade TEXT,
  estado TEXT,
  segmento TEXT,
  status_filtro TEXT,
  status public.wa_campaign_status NOT NULL DEFAULT 'DRAFT',
  scheduled_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.whatsapp_campaigns TO authenticated;
GRANT ALL ON public.whatsapp_campaigns TO service_role;
ALTER TABLE public.whatsapp_campaigns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage wa_campaigns" ON public.whatsapp_campaigns FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_wa_campaigns_updated BEFORE UPDATE ON public.whatsapp_campaigns
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- recipients
CREATE TABLE public.whatsapp_campaign_recipients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES public.whatsapp_campaigns(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  phone TEXT NOT NULL,
  status public.wa_message_status NOT NULL DEFAULT 'PENDING',
  error TEXT,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.whatsapp_campaign_recipients TO authenticated;
GRANT ALL ON public.whatsapp_campaign_recipients TO service_role;
ALTER TABLE public.whatsapp_campaign_recipients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage wa_recipients" ON public.whatsapp_campaign_recipients FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE INDEX idx_wa_recip_campaign ON public.whatsapp_campaign_recipients(campaign_id);

-- Atualiza conversa quando mensagem chega
CREATE OR REPLACE FUNCTION public.wa_touch_conversation()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY INVOKER SET search_path = public AS $$
BEGIN
  UPDATE public.whatsapp_conversations SET
    last_message_at = NEW.created_at,
    last_message_preview = LEFT(COALESCE(NEW.content, NEW.message_type::text), 120),
    unread_count = CASE WHEN NEW.direction = 'IN' THEN unread_count + 1 ELSE unread_count END,
    updated_at = now()
  WHERE id = NEW.conversation_id;
  RETURN NEW;
END $$;

CREATE TRIGGER trg_wa_touch_conv AFTER INSERT ON public.whatsapp_messages
  FOR EACH ROW EXECUTE FUNCTION public.wa_touch_conversation();

-- Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.whatsapp_conversations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.whatsapp_messages;


-- MIGRATION: 20260618031805_e65a8f4c-86ef-4da3-96bb-70e4312bfa67.sql

-- ENUMS
DO $$ BEGIN
  CREATE TYPE public.visit_resultado AS ENUM ('COMPROU','NEGOCIACAO','SEM_INTERESSE','RETORNAR','AUSENTE','OUTRO');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE public.visit_task_status AS ENUM ('ABERTA','CONCLUIDA','CANCELADA');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE public.visit_photo_tipo AS ENUM ('FACHADA','ESTOQUE','PRODUTO','DOCUMENTO','OUTRO');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE public.route_status AS ENUM ('PLANEJADA','EM_ANDAMENTO','CONCLUIDA','CANCELADA');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE public.shared_cart_status AS ENUM ('PENDENTE','ABERTO','CONVERTIDO','EXPIRADO');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- VISITS
CREATE TABLE public.visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  checkin_at TIMESTAMPTZ DEFAULT now(),
  checkout_at TIMESTAMPTZ,
  duracao_min INT,
  checkin_lat NUMERIC(10,6),
  checkin_lng NUMERIC(10,6),
  checkout_lat NUMERIC(10,6),
  checkout_lng NUMERIC(10,6),
  resultado public.visit_resultado,
  observacoes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.visits TO authenticated;
GRANT ALL ON public.visits TO service_role;
ALTER TABLE public.visits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage visits" ON public.visits FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_visits_updated BEFORE UPDATE ON public.visits FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE INDEX ON public.visits(user_id);
CREATE INDEX ON public.visits(company_id);
CREATE INDEX ON public.visits(lead_id);
CREATE INDEX ON public.visits(checkin_at DESC);

-- VISIT PHOTOS
CREATE TABLE public.visit_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visit_id UUID NOT NULL REFERENCES public.visits(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  tipo public.visit_photo_tipo NOT NULL DEFAULT 'OUTRO',
  legenda TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.visit_photos TO authenticated;
GRANT ALL ON public.visit_photos TO service_role;
ALTER TABLE public.visit_photos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage visit photos" ON public.visit_photos FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE INDEX ON public.visit_photos(visit_id);

-- ROUTE PLANS
CREATE TABLE public.route_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  data DATE NOT NULL DEFAULT CURRENT_DATE,
  cidade TEXT,
  estado TEXT,
  status public.route_status NOT NULL DEFAULT 'PLANEJADA',
  observacoes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.route_plans TO authenticated;
GRANT ALL ON public.route_plans TO service_role;
ALTER TABLE public.route_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage routes" ON public.route_plans FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_routes_updated BEFORE UPDATE ON public.route_plans FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE INDEX ON public.route_plans(user_id, data DESC);

-- ROUTE ITEMS
CREATE TABLE public.route_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  route_id UUID NOT NULL REFERENCES public.route_plans(id) ON DELETE CASCADE,
  company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  ordem INT NOT NULL DEFAULT 0,
  visitado BOOLEAN NOT NULL DEFAULT false,
  visit_id UUID REFERENCES public.visits(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.route_items TO authenticated;
GRANT ALL ON public.route_items TO service_role;
ALTER TABLE public.route_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage route items" ON public.route_items FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE INDEX ON public.route_items(route_id, ordem);

-- VISIT TASKS
CREATE TABLE public.visit_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visit_id UUID REFERENCES public.visits(id) ON DELETE CASCADE,
  company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  titulo TEXT NOT NULL,
  descricao TEXT,
  tipo TEXT,
  status public.visit_task_status NOT NULL DEFAULT 'ABERTA',
  due_at TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.visit_tasks TO authenticated;
GRANT ALL ON public.visit_tasks TO service_role;
ALTER TABLE public.visit_tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage visit tasks" ON public.visit_tasks FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_vtasks_updated BEFORE UPDATE ON public.visit_tasks FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE INDEX ON public.visit_tasks(visit_id);

-- SHARED CARTS
CREATE TABLE public.shared_carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token TEXT NOT NULL UNIQUE DEFAULT replace(gen_random_uuid()::text,'-',''),
  company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  visit_id UUID REFERENCES public.visits(id) ON DELETE SET NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  subtotal NUMERIC(12,2) NOT NULL DEFAULT 0,
  observacoes TEXT,
  status public.shared_cart_status NOT NULL DEFAULT 'PENDENTE',
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.shared_carts TO authenticated;
GRANT SELECT ON public.shared_carts TO anon;
GRANT ALL ON public.shared_carts TO service_role;
ALTER TABLE public.shared_carts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage shared carts" ON public.shared_carts FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Public can read shared cart by token" ON public.shared_carts FOR SELECT TO anon
  USING (true);
CREATE TRIGGER trg_scarts_updated BEFORE UPDATE ON public.shared_carts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE INDEX ON public.shared_carts(token);


-- MIGRATION: 20260618031921_96dfd8c3-ed2d-43c0-b76d-87a0fa2e7764.sql

ALTER TABLE public.companies
  ADD COLUMN IF NOT EXISTS cidade TEXT,
  ADD COLUMN IF NOT EXISTS estado TEXT,
  ADD COLUMN IF NOT EXISTS latitude NUMERIC(10,6),
  ADD COLUMN IF NOT EXISTS longitude NUMERIC(10,6);

ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS latitude NUMERIC(10,6),
  ADD COLUMN IF NOT EXISTS longitude NUMERIC(10,6);


-- MIGRATION: 20260618121048_e397f80c-d002-43a4-9af0-04a4746e6773.sql
-- Acesso autenticado completo a product-images e visit-photos
CREATE POLICY "Auth read images" ON storage.objects FOR SELECT TO authenticated
USING (bucket_id IN ('product-images','visit-photos'));

CREATE POLICY "Auth insert images" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id IN ('product-images','visit-photos'));

CREATE POLICY "Auth update images" ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id IN ('product-images','visit-photos'));

CREATE POLICY "Auth delete images" ON storage.objects FOR DELETE TO authenticated
USING (bucket_id IN ('product-images','visit-photos'));

-- MIGRATION: 20260618121216_a3e1bdc9-3464-4f9f-9ba8-56895cb41e91.sql
-- Enums
CREATE TYPE campaign_status AS ENUM ('RASCUNHO','AGENDADA','EM_EXECUCAO','FINALIZADA','CANCELADA');
CREATE TYPE campaign_model AS ENUM ('VISITA','REPOSICAO','REATIVACAO','LANCAMENTO','PROMOCAO','POS_VENDA');
CREATE TYPE campaign_contact_stage AS ENUM ('ENVIADA','VISUALIZADA','RESPONDEU','INTERESSADO','PRE_PEDIDO','VISITA_AGENDADA','PEDIDO');
CREATE TYPE campaign_response_class AS ENUM ('INTERESSADO','NAO_INTERESSADO','SOLICITOU_RETORNO','ORCAMENTO','VISITA','PEDIDO','SEM_RESPOSTA');

-- 1) commercial_campaigns
CREATE TABLE public.commercial_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  modelo campaign_model NOT NULL DEFAULT 'VISITA',
  cidade TEXT,
  estado TEXT,
  raio_km INTEGER DEFAULT 50,
  responsavel_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  data_inicio DATE,
  data_fim DATE,
  objetivo TEXT,
  observacoes TEXT,
  status campaign_status NOT NULL DEFAULT 'RASCUNHO',
  meta_valor NUMERIC(12,2) DEFAULT 0,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.commercial_campaigns TO authenticated;
GRANT ALL ON public.commercial_campaigns TO service_role;
ALTER TABLE public.commercial_campaigns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins manage campaigns" ON public.commercial_campaigns FOR ALL TO authenticated
USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_commercial_campaigns_updated BEFORE UPDATE ON public.commercial_campaigns
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 2) campaign_contacts
CREATE TABLE public.campaign_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES public.commercial_campaigns(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
  contact_name TEXT,
  phone TEXT NOT NULL,
  cidade TEXT,
  estado TEXT,
  stage campaign_contact_stage NOT NULL DEFAULT 'ENVIADA',
  classification campaign_response_class,
  last_message_at TIMESTAMPTZ,
  last_response_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (lead_id IS NOT NULL OR company_id IS NOT NULL)
);
CREATE INDEX idx_camp_contacts_campaign ON public.campaign_contacts(campaign_id);
CREATE INDEX idx_camp_contacts_phone ON public.campaign_contacts(phone);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.campaign_contacts TO authenticated;
GRANT ALL ON public.campaign_contacts TO service_role;
ALTER TABLE public.campaign_contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins manage camp contacts" ON public.campaign_contacts FOR ALL TO authenticated
USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_camp_contacts_updated BEFORE UPDATE ON public.campaign_contacts
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 3) campaign_messages (agendamento por dia relativo)
CREATE TABLE public.campaign_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES public.commercial_campaigns(id) ON DELETE CASCADE,
  template_id UUID REFERENCES public.whatsapp_templates(id) ON DELETE SET NULL,
  titulo TEXT NOT NULL,
  conteudo TEXT NOT NULL,
  dia_relativo INTEGER NOT NULL DEFAULT 0, -- -7, -3, -1, 0
  scheduled_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'PENDENTE',
  enviados INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_camp_messages_campaign ON public.campaign_messages(campaign_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.campaign_messages TO authenticated;
GRANT ALL ON public.campaign_messages TO service_role;
ALTER TABLE public.campaign_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins manage camp messages" ON public.campaign_messages FOR ALL TO authenticated
USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_camp_messages_updated BEFORE UPDATE ON public.campaign_messages
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 4) campaign_responses
CREATE TABLE public.campaign_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES public.commercial_campaigns(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES public.campaign_contacts(id) ON DELETE CASCADE,
  message_id UUID REFERENCES public.campaign_messages(id) ON DELETE SET NULL,
  classification campaign_response_class NOT NULL DEFAULT 'SEM_RESPOSTA',
  resposta TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_camp_responses_campaign ON public.campaign_responses(campaign_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.campaign_responses TO authenticated;
GRANT ALL ON public.campaign_responses TO service_role;
ALTER TABLE public.campaign_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins manage camp responses" ON public.campaign_responses FOR ALL TO authenticated
USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- 5) campaign_history
CREATE TABLE public.campaign_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES public.commercial_campaigns(id) ON DELETE CASCADE,
  evento TEXT NOT NULL,
  descricao TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_camp_history_campaign ON public.campaign_history(campaign_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.campaign_history TO authenticated;
GRANT ALL ON public.campaign_history TO service_role;
ALTER TABLE public.campaign_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins manage camp history" ON public.campaign_history FOR ALL TO authenticated
USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- MIGRATION: 20260618121742_e3904c7a-9fb3-4e99-9287-3df02b0cc2a2.sql

CREATE TABLE public.route_execution (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  route_id UUID NOT NULL REFERENCES public.route_plans(id) ON DELETE CASCADE,
  inicio TIMESTAMPTZ,
  fim TIMESTAMPTZ,
  distancia_real NUMERIC,
  tempo_real INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_route_execution_route ON public.route_execution(route_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.route_execution TO authenticated;
GRANT ALL ON public.route_execution TO service_role;
ALTER TABLE public.route_execution ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins manage route execution" ON public.route_execution FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.route_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  route_id UUID NOT NULL REFERENCES public.route_plans(id) ON DELETE CASCADE,
  visitas INTEGER NOT NULL DEFAULT 0,
  pedidos INTEGER NOT NULL DEFAULT 0,
  valor_vendido NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_route_metrics_route ON public.route_metrics(route_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.route_metrics TO authenticated;
GRANT ALL ON public.route_metrics TO service_role;
ALTER TABLE public.route_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins manage route metrics" ON public.route_metrics FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));


-- MIGRATION: 20260618122034_ddba85e2-1089-4224-92bd-784d875a0a07.sql

CREATE TABLE public.ai_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo TEXT NOT NULL,
  titulo TEXT NOT NULL,
  descricao TEXT,
  prioridade TEXT NOT NULL DEFAULT 'media' CHECK (prioridade IN ('baixa','media','alta','critica')),
  status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente','executada','ignorada','adiada')),
  referencia_tipo TEXT,
  referencia_id UUID,
  payload JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_ai_rec_status ON public.ai_recommendations(status, prioridade);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.ai_recommendations TO authenticated;
GRANT ALL ON public.ai_recommendations TO service_role;
ALTER TABLE public.ai_recommendations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins manage ai recs" ON public.ai_recommendations FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.ai_predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  categoria TEXT NOT NULL,
  resultado JSONB NOT NULL,
  confianca NUMERIC,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.ai_predictions TO authenticated;
GRANT ALL ON public.ai_predictions TO service_role;
ALTER TABLE public.ai_predictions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins manage ai preds" ON public.ai_predictions FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.ai_classifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  origem TEXT NOT NULL,
  referencia_id UUID NOT NULL,
  classificacao TEXT NOT NULL,
  confianca NUMERIC,
  payload JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_ai_cls_ref ON public.ai_classifications(origem, referencia_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.ai_classifications TO authenticated;
GRANT ALL ON public.ai_classifications TO service_role;
ALTER TABLE public.ai_classifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins manage ai cls" ON public.ai_classifications FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.ai_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recommendation_id UUID REFERENCES public.ai_recommendations(id) ON DELETE CASCADE,
  acao TEXT NOT NULL,
  executada BOOLEAN NOT NULL DEFAULT false,
  executada_por UUID REFERENCES auth.users(id),
  resultado JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.ai_actions TO authenticated;
GRANT ALL ON public.ai_actions TO service_role;
ALTER TABLE public.ai_actions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins manage ai actions" ON public.ai_actions FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TRIGGER ai_rec_updated_at BEFORE UPDATE ON public.ai_recommendations FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- MIGRATION: 20260618122307_c371631d-b146-4753-ab9f-b7c9d69620a6.sql

CREATE TABLE public.financial_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('RECEITA','DESPESA')),
  forma_pagamento TEXT CHECK (forma_pagamento IN ('PIX','CARTAO','BOLETO','DINHEIRO','TRANSFERENCIA','OUTRO')),
  valor NUMERIC(14,2) NOT NULL DEFAULT 0,
  parcelas INT DEFAULT 1,
  taxas NUMERIC(14,2) DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'PENDENTE' CHECK (status IN ('PENDENTE','PAGO','PARCIAL','ATRASADO','CANCELADO','ESTORNADO')),
  vencimento DATE,
  pagamento DATE,
  descricao TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.financial_transactions TO authenticated;
GRANT ALL ON public.financial_transactions TO service_role;
ALTER TABLE public.financial_transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin manage fin tx" ON public.financial_transactions FOR ALL USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_fin_tx_updated BEFORE UPDATE ON public.financial_transactions FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE INDEX idx_fin_tx_company ON public.financial_transactions(company_id);
CREATE INDEX idx_fin_tx_order ON public.financial_transactions(order_id);
CREATE INDEX idx_fin_tx_status ON public.financial_transactions(status);

CREATE TABLE public.financial_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('RECEITA','DESPESA')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.financial_categories TO authenticated;
GRANT ALL ON public.financial_categories TO service_role;
ALTER TABLE public.financial_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin manage fin cat" ON public.financial_categories FOR ALL USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.financial_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  categoria_id UUID REFERENCES public.financial_categories(id) ON DELETE SET NULL,
  descricao TEXT NOT NULL,
  valor NUMERIC(14,2) NOT NULL DEFAULT 0,
  tipo TEXT NOT NULL CHECK (tipo IN ('RECEITA','DESPESA')),
  data DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.financial_entries TO authenticated;
GRANT ALL ON public.financial_entries TO service_role;
ALTER TABLE public.financial_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin manage fin entries" ON public.financial_entries FOR ALL USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE INDEX idx_fin_entries_data ON public.financial_entries(data);

CREATE TABLE public.customer_credit (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE UNIQUE,
  limite NUMERIC(14,2) NOT NULL DEFAULT 0,
  utilizado NUMERIC(14,2) NOT NULL DEFAULT 0,
  disponivel NUMERIC(14,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'ATIVO' CHECK (status IN ('ATIVO','BLOQUEADO','SUSPENSO')),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.customer_credit TO authenticated;
GRANT ALL ON public.customer_credit TO service_role;
ALTER TABLE public.customer_credit ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin manage credit" ON public.customer_credit FOR ALL USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_credit_updated BEFORE UPDATE ON public.customer_credit FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.financial_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  periodo TEXT NOT NULL CHECK (periodo IN ('MENSAL','TRIMESTRAL','ANUAL')),
  referencia DATE NOT NULL,
  meta NUMERIC(14,2) NOT NULL DEFAULT 0,
  descricao TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.financial_goals TO authenticated;
GRANT ALL ON public.financial_goals TO service_role;
ALTER TABLE public.financial_goals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin manage goals" ON public.financial_goals FOR ALL USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));


-- MIGRATION: 20260618122527_9b3b0709-72b0-4e68-be9f-624fdb72df95.sql

CREATE TABLE public.suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  razao_social TEXT NOT NULL,
  nome_fantasia TEXT,
  cnpj TEXT,
  contato TEXT,
  whatsapp TEXT,
  email TEXT,
  cidade TEXT,
  estado TEXT,
  observacoes TEXT,
  avaliacao NUMERIC(3,1) DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.suppliers TO authenticated;
GRANT ALL ON public.suppliers TO service_role;
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin manage suppliers" ON public.suppliers FOR ALL USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_suppliers_updated BEFORE UPDATE ON public.suppliers FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.purchase_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id UUID REFERENCES public.suppliers(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'RASCUNHO' CHECK (status IN ('RASCUNHO','ENVIADO','APROVADO','RECEBIDO','CANCELADO')),
  valor_total NUMERIC(14,2) NOT NULL DEFAULT 0,
  data_emissao DATE NOT NULL DEFAULT CURRENT_DATE,
  data_recebimento DATE,
  observacoes TEXT,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.purchase_orders TO authenticated;
GRANT ALL ON public.purchase_orders TO service_role;
ALTER TABLE public.purchase_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin manage po" ON public.purchase_orders FOR ALL USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_po_updated BEFORE UPDATE ON public.purchase_orders FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE INDEX idx_po_supplier ON public.purchase_orders(supplier_id);
CREATE INDEX idx_po_status ON public.purchase_orders(status);

CREATE TABLE public.purchase_order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  purchase_order_id UUID NOT NULL REFERENCES public.purchase_orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  quantidade NUMERIC(14,3) NOT NULL DEFAULT 0,
  quantidade_recebida NUMERIC(14,3) DEFAULT 0,
  valor_unitario NUMERIC(14,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.purchase_order_items TO authenticated;
GRANT ALL ON public.purchase_order_items TO service_role;
ALTER TABLE public.purchase_order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin manage po items" ON public.purchase_order_items FOR ALL USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE INDEX idx_poi_po ON public.purchase_order_items(purchase_order_id);

CREATE TABLE public.stock_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('ENTRADA','SAIDA','AJUSTE','TRANSFERENCIA','INVENTARIO','PERDA','DEVOLUCAO')),
  quantidade NUMERIC(14,3) NOT NULL DEFAULT 0,
  origem TEXT,
  destino TEXT,
  motivo TEXT,
  reference_id UUID,
  user_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.stock_movements TO authenticated;
GRANT ALL ON public.stock_movements TO service_role;
ALTER TABLE public.stock_movements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin manage stock mov" ON public.stock_movements FOR ALL USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE INDEX idx_stock_mov_product ON public.stock_movements(product_id);
CREATE INDEX idx_stock_mov_created ON public.stock_movements(created_at DESC);

CREATE TABLE public.inventory_counts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  quantidade_sistema NUMERIC(14,3) NOT NULL DEFAULT 0,
  quantidade_contada NUMERIC(14,3) NOT NULL DEFAULT 0,
  diferenca NUMERIC(14,3) GENERATED ALWAYS AS (quantidade_contada - quantidade_sistema) STORED,
  observacoes TEXT,
  user_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.inventory_counts TO authenticated;
GRANT ALL ON public.inventory_counts TO service_role;
ALTER TABLE public.inventory_counts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin manage inv counts" ON public.inventory_counts FOR ALL USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS corredor TEXT,
  ADD COLUMN IF NOT EXISTS prateleira TEXT,
  ADD COLUMN IF NOT EXISTS coluna TEXT,
  ADD COLUMN IF NOT EXISTS posicao TEXT,
  ADD COLUMN IF NOT EXISTS estoque_minimo NUMERIC(14,3) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS curva_abc TEXT CHECK (curva_abc IN ('A','B','C'));


-- MIGRATION: 20260618123121_83488a0e-9c3b-4a14-a6ac-21f0824e617d.sql
-- Dashboards
CREATE TABLE public.dashboards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  tipo TEXT NOT NULL DEFAULT 'EXECUTIVO',
  configuracao JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_shared BOOLEAN NOT NULL DEFAULT false,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.dashboards TO authenticated;
GRANT ALL ON public.dashboards TO service_role;
ALTER TABLE public.dashboards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "dashboards_admin_all" ON public.dashboards FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "dashboards_owner_all" ON public.dashboards FOR ALL TO authenticated
  USING (created_by = auth.uid()) WITH CHECK (created_by = auth.uid());
CREATE POLICY "dashboards_shared_read" ON public.dashboards FOR SELECT TO authenticated
  USING (is_shared = true);
CREATE TRIGGER trg_dashboards_updated BEFORE UPDATE ON public.dashboards
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Reports
CREATE TABLE public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  categoria TEXT NOT NULL,
  filtros JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_shared BOOLEAN NOT NULL DEFAULT false,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.reports TO authenticated;
GRANT ALL ON public.reports TO service_role;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reports_admin_all" ON public.reports FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "reports_owner_all" ON public.reports FOR ALL TO authenticated
  USING (created_by = auth.uid()) WITH CHECK (created_by = auth.uid());
CREATE POLICY "reports_shared_read" ON public.reports FOR SELECT TO authenticated
  USING (is_shared = true);
CREATE TRIGGER trg_reports_updated BEFORE UPDATE ON public.reports
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Scheduled reports
CREATE TABLE public.scheduled_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
  frequencia TEXT NOT NULL CHECK (frequencia IN ('DIARIO','SEMANAL','MENSAL')),
  canal TEXT NOT NULL CHECK (canal IN ('EMAIL','WHATSAPP')),
  destinatarios JSONB NOT NULL DEFAULT '[]'::jsonb,
  ativo BOOLEAN NOT NULL DEFAULT true,
  last_sent_at TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_scheduled_reports_report ON public.scheduled_reports(report_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.scheduled_reports TO authenticated;
GRANT ALL ON public.scheduled_reports TO service_role;
ALTER TABLE public.scheduled_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "scheduled_reports_admin_all" ON public.scheduled_reports FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_scheduled_reports_updated BEFORE UPDATE ON public.scheduled_reports
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Business metrics
CREATE TABLE public.business_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  categoria TEXT NOT NULL,
  nome TEXT NOT NULL,
  valor NUMERIC(14,2) NOT NULL DEFAULT 0,
  periodo DATE NOT NULL DEFAULT CURRENT_DATE,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_business_metrics_cat_periodo ON public.business_metrics(categoria, periodo DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.business_metrics TO authenticated;
GRANT ALL ON public.business_metrics TO service_role;
ALTER TABLE public.business_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "business_metrics_admin_all" ON public.business_metrics FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- MIGRATION: 20260618123335_04430004-54a3-4247-b263-62479e34ec2d.sql
-- Extend roles enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'gerente';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'vendedor';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'operador';

-- Extend profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'ATIVO' CHECK (status IN ('ATIVO','INATIVO','BLOQUEADO','FERIAS')),
  ADD COLUMN IF NOT EXISTS cargo TEXT,
  ADD COLUMN IF NOT EXISTS telefone TEXT;

-- Teams
CREATE TABLE public.teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  regiao TEXT,
  manager_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.teams TO authenticated;
GRANT ALL ON public.teams TO service_role;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
CREATE POLICY "teams_admin_all" ON public.teams FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "teams_authenticated_read" ON public.teams FOR SELECT TO authenticated USING (true);
CREATE TRIGGER trg_teams_updated BEFORE UPDATE ON public.teams
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Team members
CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  papel TEXT NOT NULL DEFAULT 'MEMBRO' CHECK (papel IN ('GERENTE','MEMBRO')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (team_id, user_id)
);
CREATE INDEX idx_team_members_user ON public.team_members(user_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.team_members TO authenticated;
GRANT ALL ON public.team_members TO service_role;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "team_members_admin_all" ON public.team_members FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "team_members_self_read" ON public.team_members FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Permissions catalog
CREATE TABLE public.permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  modulo TEXT NOT NULL,
  acao TEXT NOT NULL,
  descricao TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (modulo, acao)
);
GRANT SELECT ON public.permissions TO authenticated;
GRANT ALL ON public.permissions TO service_role;
ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "permissions_read_all" ON public.permissions FOR SELECT TO authenticated USING (true);
CREATE POLICY "permissions_admin_write" ON public.permissions FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Role permissions
CREATE TABLE public.role_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role public.app_role NOT NULL,
  permission_id UUID NOT NULL REFERENCES public.permissions(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (role, permission_id)
);
GRANT SELECT ON public.role_permissions TO authenticated;
GRANT ALL ON public.role_permissions TO service_role;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "role_permissions_read" ON public.role_permissions FOR SELECT TO authenticated USING (true);
CREATE POLICY "role_permissions_admin_write" ON public.role_permissions FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Audit logs
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  acao TEXT NOT NULL,
  entidade TEXT,
  entidade_id TEXT,
  ip_address TEXT,
  user_agent TEXT,
  resultado TEXT NOT NULL DEFAULT 'SUCESSO' CHECK (resultado IN ('SUCESSO','ERRO','NEGADO')),
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_audit_logs_user_created ON public.audit_logs(user_id, created_at DESC);
CREATE INDEX idx_audit_logs_entidade ON public.audit_logs(entidade, entidade_id);
GRANT SELECT, INSERT ON public.audit_logs TO authenticated;
GRANT ALL ON public.audit_logs TO service_role;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "audit_logs_admin_read" ON public.audit_logs FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "audit_logs_insert_self" ON public.audit_logs FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() OR user_id IS NULL);

-- System settings
CREATE TABLE public.system_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  categoria TEXT NOT NULL,
  chave TEXT NOT NULL,
  valor JSONB NOT NULL DEFAULT '{}'::jsonb,
  descricao TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (categoria, chave)
);
GRANT SELECT ON public.system_settings TO authenticated;
GRANT ALL ON public.system_settings TO service_role;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "system_settings_read" ON public.system_settings FOR SELECT TO authenticated USING (true);
CREATE POLICY "system_settings_admin_write" ON public.system_settings FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_system_settings_updated BEFORE UPDATE ON public.system_settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- MIGRATION: 20260618123632_969067c4-f8c7-4806-a289-6e5718e1102d.sql
CREATE TABLE public.workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  descricao TEXT,
  categoria TEXT NOT NULL DEFAULT 'CUSTOM' CHECK (categoria IN ('CUSTOM','REATIVACAO','POS_VENDA','REPOSICAO','COBRANCA','FOLLOW_UP','PRE_VISITA')),
  status TEXT NOT NULL DEFAULT 'RASCUNHO' CHECK (status IN ('RASCUNHO','ATIVO','PAUSADO','ARQUIVADO')),
  created_by UUID NOT NULL DEFAULT auth.uid(),
  execucoes_count INTEGER NOT NULL DEFAULT 0 CHECK (execucoes_count >= 0),
  falhas_count INTEGER NOT NULL DEFAULT 0 CHECK (falhas_count >= 0),
  conversoes_count INTEGER NOT NULL DEFAULT 0 CHECK (conversoes_count >= 0),
  last_run_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.workflows TO authenticated;
GRANT ALL ON public.workflows TO service_role;
ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;
CREATE POLICY "workflows_admin_all" ON public.workflows FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "workflows_owner_all" ON public.workflows FOR ALL TO authenticated
  USING (created_by = auth.uid() AND deleted_at IS NULL)
  WITH CHECK (created_by = auth.uid());
CREATE INDEX idx_workflows_status ON public.workflows(status) WHERE deleted_at IS NULL;
CREATE INDEX idx_workflows_created_by ON public.workflows(created_by) WHERE deleted_at IS NULL;
CREATE TRIGGER trg_workflows_updated BEFORE UPDATE ON public.workflows
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.workflow_triggers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID NOT NULL REFERENCES public.workflows(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL CHECK (tipo IN ('NOVO_LEAD','NOVO_CLIENTE','NOVA_MENSAGEM','NOVO_PEDIDO','PEDIDO_PAGO','PEDIDO_CANCELADO','CLIENTE_SEM_COMPRA','VISITA_FINALIZADA','CAMPANHA_RESPONDIDA')),
  parametros JSONB NOT NULL DEFAULT '{}'::jsonb,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.workflow_triggers TO authenticated;
GRANT ALL ON public.workflow_triggers TO service_role;
ALTER TABLE public.workflow_triggers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "workflow_triggers_admin_all" ON public.workflow_triggers FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "workflow_triggers_owner_all" ON public.workflow_triggers FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.workflows w WHERE w.id = workflow_id AND w.created_by = auth.uid() AND w.deleted_at IS NULL))
  WITH CHECK (EXISTS (SELECT 1 FROM public.workflows w WHERE w.id = workflow_id AND w.created_by = auth.uid() AND w.deleted_at IS NULL));
CREATE INDEX idx_workflow_triggers_workflow ON public.workflow_triggers(workflow_id);
CREATE INDEX idx_workflow_triggers_tipo ON public.workflow_triggers(tipo) WHERE ativo = true;
CREATE TRIGGER trg_workflow_triggers_updated BEFORE UPDATE ON public.workflow_triggers
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.workflow_conditions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID NOT NULL REFERENCES public.workflows(id) ON DELETE CASCADE,
  campo TEXT NOT NULL CHECK (campo IN ('CIDADE','ESTADO','VALOR','STATUS','PRODUTO','CATEGORIA','CLIENTE','SEGMENTO','DIAS_SEM_COMPRA')),
  operador TEXT NOT NULL CHECK (operador IN ('IGUAL','DIFERENTE','MAIOR_QUE','MENOR_QUE','CONTEM','ENTRE','EXISTE')),
  valor JSONB NOT NULL DEFAULT '{}'::jsonb,
  ordem INTEGER NOT NULL DEFAULT 1 CHECK (ordem > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.workflow_conditions TO authenticated;
GRANT ALL ON public.workflow_conditions TO service_role;
ALTER TABLE public.workflow_conditions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "workflow_conditions_admin_all" ON public.workflow_conditions FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "workflow_conditions_owner_all" ON public.workflow_conditions FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.workflows w WHERE w.id = workflow_id AND w.created_by = auth.uid() AND w.deleted_at IS NULL))
  WITH CHECK (EXISTS (SELECT 1 FROM public.workflows w WHERE w.id = workflow_id AND w.created_by = auth.uid() AND w.deleted_at IS NULL));
CREATE INDEX idx_workflow_conditions_workflow ON public.workflow_conditions(workflow_id);
CREATE TRIGGER trg_workflow_conditions_updated BEFORE UPDATE ON public.workflow_conditions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.workflow_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID NOT NULL REFERENCES public.workflows(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL CHECK (tipo IN ('CRIAR_TAREFA','ENVIAR_WHATSAPP','CRIAR_CAMPANHA','MOVER_CRM','CRIAR_PRE_PEDIDO','CRIAR_VISITA','ENVIAR_EMAIL','NOTIFICAR_USUARIO')),
  parametros JSONB NOT NULL DEFAULT '{}'::jsonb,
  ordem INTEGER NOT NULL DEFAULT 1 CHECK (ordem > 0),
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.workflow_actions TO authenticated;
GRANT ALL ON public.workflow_actions TO service_role;
ALTER TABLE public.workflow_actions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "workflow_actions_admin_all" ON public.workflow_actions FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "workflow_actions_owner_all" ON public.workflow_actions FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.workflows w WHERE w.id = workflow_id AND w.created_by = auth.uid() AND w.deleted_at IS NULL))
  WITH CHECK (EXISTS (SELECT 1 FROM public.workflows w WHERE w.id = workflow_id AND w.created_by = auth.uid() AND w.deleted_at IS NULL));
CREATE INDEX idx_workflow_actions_workflow ON public.workflow_actions(workflow_id);
CREATE TRIGGER trg_workflow_actions_updated BEFORE UPDATE ON public.workflow_actions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.workflow_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID NOT NULL REFERENCES public.workflows(id) ON DELETE CASCADE,
  trigger_tipo TEXT NOT NULL,
  resultado TEXT NOT NULL DEFAULT 'SUCESSO' CHECK (resultado IN ('SUCESSO','ERRO','IGNORADO')),
  referencia_tipo TEXT,
  referencia_id TEXT,
  usuario_id UUID DEFAULT auth.uid(),
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  erro TEXT,
  executed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.workflow_logs TO authenticated;
GRANT ALL ON public.workflow_logs TO service_role;
ALTER TABLE public.workflow_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "workflow_logs_admin_all" ON public.workflow_logs FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "workflow_logs_owner_read" ON public.workflow_logs FOR SELECT TO authenticated
  USING (usuario_id = auth.uid() OR EXISTS (SELECT 1 FROM public.workflows w WHERE w.id = workflow_id AND w.created_by = auth.uid() AND w.deleted_at IS NULL));
CREATE POLICY "workflow_logs_insert_self" ON public.workflow_logs FOR INSERT TO authenticated
  WITH CHECK (usuario_id = auth.uid() OR usuario_id IS NULL OR EXISTS (SELECT 1 FROM public.workflows w WHERE w.id = workflow_id AND w.created_by = auth.uid() AND w.deleted_at IS NULL));
CREATE INDEX idx_workflow_logs_workflow_executed ON public.workflow_logs(workflow_id, executed_at DESC);
CREATE INDEX idx_workflow_logs_resultado ON public.workflow_logs(resultado, executed_at DESC);

CREATE OR REPLACE FUNCTION public.workflow_log_after_insert()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.workflows
  SET
    execucoes_count = execucoes_count + 1,
    falhas_count = falhas_count + CASE WHEN NEW.resultado = 'ERRO' THEN 1 ELSE 0 END,
    conversoes_count = conversoes_count + CASE WHEN COALESCE((NEW.payload->>'conversao')::boolean, false) THEN 1 ELSE 0 END,
    last_run_at = NEW.executed_at,
    updated_at = now()
  WHERE id = NEW.workflow_id;
  RETURN NEW;
END;
$$;
CREATE TRIGGER trg_workflow_log_after_insert
  AFTER INSERT ON public.workflow_logs
  FOR EACH ROW EXECUTE FUNCTION public.workflow_log_after_insert();

-- MIGRATION: 20260618123957_c6cde0c1-eca1-4c65-848b-7e8112d57fed.sql
REVOKE EXECUTE ON FUNCTION public.workflow_log_after_insert() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.workflow_log_after_insert() FROM anon;
REVOKE EXECUTE ON FUNCTION public.workflow_log_after_insert() FROM authenticated;
GRANT EXECUTE ON FUNCTION public.workflow_log_after_insert() TO service_role;

-- MIGRATION: 20260618124220_03a55429-c6ea-4c56-b166-11f0c37a64f0.sql

-- customer_notifications
CREATE TABLE public.customer_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  categoria TEXT NOT NULL CHECK (categoria IN ('PEDIDOS','FINANCEIRO','PROMOCOES','CAMPANHAS','SISTEMA')),
  titulo TEXT NOT NULL,
  mensagem TEXT,
  link TEXT,
  lida BOOLEAN NOT NULL DEFAULT false,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.customer_notifications TO authenticated;
GRANT ALL ON public.customer_notifications TO service_role;
ALTER TABLE public.customer_notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own notifications" ON public.customer_notifications FOR ALL
  USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'))
  WITH CHECK (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));
CREATE INDEX idx_cust_notif_user ON public.customer_notifications(user_id, created_at DESC);

-- customer_favorites
CREATE TABLE public.customer_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  observacao TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.customer_favorites TO authenticated;
GRANT ALL ON public.customer_favorites TO service_role;
ALTER TABLE public.customer_favorites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own favorites" ON public.customer_favorites FOR ALL
  USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'))
  WITH CHECK (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));

-- customer_documents
CREATE TABLE public.customer_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL CHECK (tipo IN ('COMPROVANTE','NOTA_FISCAL','PIX','MANUAL','CATALOGO','OUTRO')),
  titulo TEXT NOT NULL,
  url TEXT NOT NULL,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.customer_documents TO authenticated;
GRANT ALL ON public.customer_documents TO service_role;
ALTER TABLE public.customer_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own docs" ON public.customer_documents FOR ALL
  USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'))
  WITH CHECK (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));

-- customer_support
CREATE TABLE public.customer_support (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assunto TEXT NOT NULL,
  mensagem TEXT NOT NULL,
  canal TEXT NOT NULL DEFAULT 'PORTAL' CHECK (canal IN ('PORTAL','WHATSAPP','EMAIL')),
  status TEXT NOT NULL DEFAULT 'ABERTO' CHECK (status IN ('ABERTO','EM_ATENDIMENTO','RESOLVIDO','CANCELADO')),
  prioridade TEXT NOT NULL DEFAULT 'NORMAL' CHECK (prioridade IN ('BAIXA','NORMAL','ALTA','URGENTE')),
  resposta TEXT,
  responded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.customer_support TO authenticated;
GRANT ALL ON public.customer_support TO service_role;
ALTER TABLE public.customer_support ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own support read" ON public.customer_support FOR SELECT
  USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "own support insert" ON public.customer_support FOR INSERT
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "admin support update" ON public.customer_support FOR UPDATE
  USING (public.has_role(auth.uid(),'admin') OR auth.uid() = user_id)
  WITH CHECK (public.has_role(auth.uid(),'admin') OR auth.uid() = user_id);
CREATE TRIGGER trg_customer_support_updated BEFORE UPDATE ON public.customer_support
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- customer_rewards
CREATE TABLE public.customer_rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  pontos INTEGER NOT NULL DEFAULT 0,
  cashback_disponivel NUMERIC(12,2) NOT NULL DEFAULT 0,
  cashback_acumulado NUMERIC(12,2) NOT NULL DEFAULT 0,
  nivel TEXT NOT NULL DEFAULT 'BRONZE' CHECK (nivel IN ('BRONZE','PRATA','OURO','DIAMANTE')),
  beneficios JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.customer_rewards TO authenticated;
GRANT ALL ON public.customer_rewards TO service_role;
ALTER TABLE public.customer_rewards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own rewards" ON public.customer_rewards FOR ALL
  USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'))
  WITH CHECK (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_customer_rewards_updated BEFORE UPDATE ON public.customer_rewards
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- MIGRATION: 20260618182810_115d74e9-54ae-4c66-a1b2-704e0a97f07c.sql
CREATE TABLE public.installment_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parcelas INT NOT NULL UNIQUE CHECK (parcelas BETWEEN 1 AND 12),
  multiplicador NUMERIC(6,4) NOT NULL DEFAULT 1.0000,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.installment_plans TO anon, authenticated;
GRANT ALL ON public.installment_plans TO authenticated;
GRANT ALL ON public.installment_plans TO service_role;
ALTER TABLE public.installment_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read installment plans" ON public.installment_plans FOR SELECT USING (true);
CREATE POLICY "Admins manage installment plans" ON public.installment_plans FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER set_installment_plans_updated_at BEFORE UPDATE ON public.installment_plans FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.installment_plans (parcelas, multiplicador) VALUES
  (1, 1.0000),(2, 1.0300),(3, 1.0500),(4, 1.0700),(5, 1.0900),(6, 1.1100)
ON CONFLICT (parcelas) DO NOTHING;

-- MIGRATION: 20260618184903_1f8715fe-581d-4c17-9dca-c34e61327f38.sql

CREATE TABLE public.payment_fees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bandeira TEXT NOT NULL UNIQUE,
  debito NUMERIC(5,2),
  credito_avista NUMERIC(5,2) NOT NULL DEFAULT 0,
  credito_2_6 NUMERIC(5,2) NOT NULL DEFAULT 0,
  credito_7_12 NUMERIC(5,2) NOT NULL DEFAULT 0,
  ordem INT NOT NULL DEFAULT 0,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.payment_fees TO authenticated;
GRANT ALL ON public.payment_fees TO service_role;
ALTER TABLE public.payment_fees ENABLE ROW LEVEL SECURITY;
CREATE POLICY "view fees" ON public.payment_fees FOR SELECT TO authenticated USING (true);
CREATE POLICY "admin manage fees" ON public.payment_fees FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_payment_fees_updated BEFORE UPDATE ON public.payment_fees
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.payment_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value NUMERIC(8,4) NOT NULL DEFAULT 0,
  label TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.payment_settings TO authenticated;
GRANT ALL ON public.payment_settings TO service_role;
ALTER TABLE public.payment_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "view settings" ON public.payment_settings FOR SELECT TO authenticated USING (true);
CREATE POLICY "admin manage settings" ON public.payment_settings FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_payment_settings_updated BEFORE UPDATE ON public.payment_settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.payment_fees (bandeira, debito, credito_avista, credito_2_6, credito_7_12, ordem) VALUES
  ('Visa', 1.04, 2.27, 2.50, 2.91, 1),
  ('Mastercard', 0.95, 2.16, 2.71, 2.89, 2),
  ('Elo', 1.55, 2.82, 2.97, 3.41, 3),
  ('American Express', NULL, 3.24, 3.84, 4.14, 4),
  ('Hipercard', NULL, 0.00, 0.00, 0.00, 5);

INSERT INTO public.payment_settings (key, value, label) VALUES
  ('antecipacao_mensal', 2.09, 'Taxa de antecipação de vendas (% a.m.)');


-- MIGRATION: 20260618185129_0817f062-b32c-43f1-9adf-f8063f6e17e1.sql

CREATE TABLE public.promotions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  descricao TEXT,
  imagem_url TEXT,
  link_url TEXT,
  desconto_percentual NUMERIC(5,2),
  valido_de TIMESTAMPTZ,
  valido_ate TIMESTAMPTZ,
  ativo BOOLEAN NOT NULL DEFAULT true,
  ordem INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.promotions TO authenticated;
GRANT ALL ON public.promotions TO service_role;
ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "view active promotions" ON public.promotions FOR SELECT TO authenticated USING (ativo = true);
CREATE POLICY "admin manage promotions" ON public.promotions FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_promotions_updated BEFORE UPDATE ON public.promotions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- MIGRATION: 20260619014332_5f0f8b1c-c8ad-4bb5-876d-c260995329e1.sql
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS payment_link TEXT;

-- MIGRATION: 20260619022339_5776327b-29f9-4d52-8c0e-2b51d978bab6.sql

-- Helper: identifica equipe de vendas (admin/vendedor/gerente)
CREATE OR REPLACE FUNCTION public.is_sales_staff(_uid uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _uid
      AND role IN ('admin'::app_role, 'vendedor'::app_role, 'gerente'::app_role)
  )
$$;

-- companies: vendedor/gerente podem listar todos os clientes
CREATE POLICY "companies_sales_select"
  ON public.companies FOR SELECT
  TO authenticated
  USING (public.is_sales_staff(auth.uid()));

-- addresses: vendedor/gerente podem ler/criar/editar endereços de qualquer cliente
CREATE POLICY "addresses_sales_all"
  ON public.addresses FOR ALL
  TO authenticated
  USING (public.is_sales_staff(auth.uid()))
  WITH CHECK (public.is_sales_staff(auth.uid()));

-- orders: vendedor/gerente podem criar/ler/atualizar pedidos de qualquer cliente
CREATE POLICY "orders_sales_insert"
  ON public.orders FOR INSERT
  TO authenticated
  WITH CHECK (public.is_sales_staff(auth.uid()));

CREATE POLICY "orders_sales_select"
  ON public.orders FOR SELECT
  TO authenticated
  USING (public.is_sales_staff(auth.uid()));

CREATE POLICY "orders_sales_update"
  ON public.orders FOR UPDATE
  TO authenticated
  USING (public.is_sales_staff(auth.uid()))
  WITH CHECK (public.is_sales_staff(auth.uid()));

-- order_items: segue pedido para equipe de vendas
CREATE POLICY "order_items_sales_all"
  ON public.order_items FOR ALL
  TO authenticated
  USING (public.is_sales_staff(auth.uid()))
  WITH CHECK (public.is_sales_staff(auth.uid()));

-- payments: segue pedido para equipe de vendas
CREATE POLICY "payments_sales_all"
  ON public.payments FOR ALL
  TO authenticated
  USING (public.is_sales_staff(auth.uid()))
  WITH CHECK (public.is_sales_staff(auth.uid()));


-- MIGRATION: 20260619114425_5aa619da-40ad-46bf-9ecb-d010ef7e3a19.sql
UPDATE public.companies SET phone = regexp_replace(phone, '\D', '', 'g') WHERE phone IS NOT NULL;
UPDATE public.companies SET phone = '00000000000' WHERE phone IS NULL OR length(phone) < 10;
ALTER TABLE public.companies ALTER COLUMN phone SET NOT NULL;

-- MIGRATION: 20260619114846_57e5cd7a-7355-4f2b-b3c2-6915adb80bd0.sql
DROP POLICY IF EXISTS companies_owner_update ON public.companies;

CREATE POLICY companies_owner_update ON public.companies
  FOR UPDATE
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

-- MIGRATION: 20260619204247_0b212b8e-08d7-47c7-b8a3-76f6e2d370fe.sql
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS image_url TEXT;

-- MIGRATION: 20260619204315_fd3663d1-ffd0-47b3-9b5f-f1abb9bfa7d4.sql
CREATE POLICY "category-images public read" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'category-images');
CREATE POLICY "category-images admin write" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'category-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "category-images admin update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'category-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "category-images admin delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'category-images' AND public.has_role(auth.uid(), 'admin'));

-- MIGRATION: 20260619205017_47a9355c-2962-46f8-81c2-e70046e4dca2.sql
CREATE TABLE public.hero_slides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  titulo TEXT,
  subtitulo TEXT,
  cta_label TEXT,
  cta_link TEXT,
  ordem INT NOT NULL DEFAULT 0,
  ativo BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.hero_slides TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.hero_slides TO authenticated;
GRANT ALL ON public.hero_slides TO service_role;
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "hero slides ativos públicos" ON public.hero_slides FOR SELECT USING (ativo = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "hero slides admin manage" ON public.hero_slides FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER hero_slides_set_updated_at BEFORE UPDATE ON public.hero_slides FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE POLICY "hero-images public read" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'hero-images');
CREATE POLICY "hero-images admin write" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'hero-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "hero-images admin update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'hero-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "hero-images admin delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'hero-images' AND public.has_role(auth.uid(), 'admin'));

-- MIGRATION: 20260620142011_ebbe7a4b-1e8e-49ec-87a8-7555b20dee85.sql

-- route_plans: dono do registro pode gerenciar; admin/sales_staff veem tudo
DROP POLICY IF EXISTS "Admins manage routes" ON public.route_plans;
CREATE POLICY "Sales staff manage routes" ON public.route_plans
  FOR ALL TO authenticated
  USING (public.is_sales_staff(auth.uid()) OR auth.uid() = user_id)
  WITH CHECK (public.is_sales_staff(auth.uid()) OR auth.uid() = user_id);

-- route_items: amarrado à rota do dono ou sales staff
DROP POLICY IF EXISTS "Admins manage route items" ON public.route_items;
CREATE POLICY "Sales staff manage route items" ON public.route_items
  FOR ALL TO authenticated
  USING (
    public.is_sales_staff(auth.uid())
    OR EXISTS (SELECT 1 FROM public.route_plans rp WHERE rp.id = route_items.route_id AND rp.user_id = auth.uid())
  )
  WITH CHECK (
    public.is_sales_staff(auth.uid())
    OR EXISTS (SELECT 1 FROM public.route_plans rp WHERE rp.id = route_items.route_id AND rp.user_id = auth.uid())
  );

-- visits
DROP POLICY IF EXISTS "Admins manage visits" ON public.visits;
CREATE POLICY "Sales staff manage visits" ON public.visits
  FOR ALL TO authenticated
  USING (public.is_sales_staff(auth.uid()) OR auth.uid() = user_id)
  WITH CHECK (public.is_sales_staff(auth.uid()) OR auth.uid() = user_id);

-- leads
DROP POLICY IF EXISTS "Admins manage leads" ON public.leads;
CREATE POLICY "Sales staff manage leads" ON public.leads
  FOR ALL TO authenticated
  USING (public.is_sales_staff(auth.uid()))
  WITH CHECK (public.is_sales_staff(auth.uid()));


-- MIGRATION: 20260620173959_1d2736dd-1ff9-48be-ac8b-198d07d64e42.sql
ALTER TYPE public.lead_status ADD VALUE IF NOT EXISTS 'PEDIDO';

-- MIGRATION: 20260620174812_c012ffe4-d108-40c5-81fa-f2f4fbdb8762.sql
CREATE POLICY companies_sales_insert ON public.companies
FOR INSERT TO authenticated
WITH CHECK (is_sales_staff(auth.uid()) AND auth.uid() = owner_id);

-- MIGRATION: 20260622005930_3c69f452-5f5e-46be-9931-6eca4651533a.sql
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS preco_custo numeric;

-- MIGRATION: 20260627150634_ac95496d-47e3-4c93-a1c8-7f84ac25fb53.sql

-- push_subscriptions: dispositivos inscritos
CREATE TABLE public.push_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  endpoint text NOT NULL UNIQUE,
  p256dh text NOT NULL,
  auth text NOT NULL,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  revoked_at timestamptz
);
CREATE INDEX push_subs_user_idx ON public.push_subscriptions(user_id) WHERE revoked_at IS NULL;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.push_subscriptions TO authenticated;
GRANT ALL ON public.push_subscriptions TO service_role;
ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own subs select" ON public.push_subscriptions FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.is_sales_staff(auth.uid()));
CREATE POLICY "own subs insert" ON public.push_subscriptions FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own subs update" ON public.push_subscriptions FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own subs delete" ON public.push_subscriptions FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- push_campaigns
CREATE TYPE push_campaign_status AS ENUM ('DRAFT','SENDING','DONE','FAILED');
CREATE TABLE public.push_campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  mensagem text NOT NULL,
  imagem_url text,
  link_url text,
  segmento text NOT NULL DEFAULT 'all',
  segmento_valor text,
  status push_campaign_status NOT NULL DEFAULT 'DRAFT',
  scheduled_at timestamptz,
  sent_at timestamptz,
  total int NOT NULL DEFAULT 0,
  enviados int NOT NULL DEFAULT 0,
  falhas int NOT NULL DEFAULT 0,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.push_campaigns TO authenticated;
GRANT ALL ON public.push_campaigns TO service_role;
ALTER TABLE public.push_campaigns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "staff push campaigns" ON public.push_campaigns FOR ALL TO authenticated
  USING (public.is_sales_staff(auth.uid())) WITH CHECK (public.is_sales_staff(auth.uid()));

-- push_deliveries
CREATE TABLE public.push_deliveries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid NOT NULL REFERENCES public.push_campaigns(id) ON DELETE CASCADE,
  subscription_id uuid REFERENCES public.push_subscriptions(id) ON DELETE SET NULL,
  user_id uuid,
  status text NOT NULL,
  error text,
  clicked_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX push_del_campaign_idx ON public.push_deliveries(campaign_id);
GRANT SELECT, INSERT, UPDATE ON public.push_deliveries TO authenticated;
GRANT ALL ON public.push_deliveries TO service_role;
ALTER TABLE public.push_deliveries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "staff push deliveries select" ON public.push_deliveries FOR SELECT TO authenticated
  USING (public.is_sales_staff(auth.uid()));
CREATE POLICY "staff push deliveries write" ON public.push_deliveries FOR INSERT TO authenticated
  WITH CHECK (public.is_sales_staff(auth.uid()));
-- click webhook is anon: allow anon update of clicked_at only
GRANT UPDATE (clicked_at) ON public.push_deliveries TO anon;
CREATE POLICY "anon mark click" ON public.push_deliveries FOR UPDATE TO anon
  USING (true) WITH CHECK (true);


-- MIGRATION: 20260627151149_805ade84-c0f8-498f-9c9b-93b99386f67f.sql
CREATE POLICY "Staff can upload push images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'push-images' AND public.is_sales_staff(auth.uid()));
CREATE POLICY "Staff can read push images" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'push-images' AND public.is_sales_staff(auth.uid()));
CREATE POLICY "Staff can delete push images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'push-images' AND public.is_sales_staff(auth.uid()));

-- MIGRATION: 20260627163031_975aced0-08fd-4710-98f7-e2ecea7b8d0a.sql

-- =========================
-- TABELAS
-- =========================
CREATE TABLE public.trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open','closed')),
  vendedor_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  observacao TEXT,
  opened_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  closed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX trips_vendedor_idx ON public.trips(vendedor_id);
CREATE INDEX trips_status_idx ON public.trips(status);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.trips TO authenticated;
GRANT ALL ON public.trips TO service_role;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff vê viagens próprias ou todas se admin/gerente"
  ON public.trips FOR SELECT TO authenticated
  USING (
    public.is_sales_staff(auth.uid()) AND (
      vendedor_id = auth.uid()
      OR public.has_role(auth.uid(), 'admin')
      OR public.has_role(auth.uid(), 'gerente')
    )
  );
CREATE POLICY "Staff cria viagem própria"
  ON public.trips FOR INSERT TO authenticated
  WITH CHECK (public.is_sales_staff(auth.uid()) AND vendedor_id = auth.uid());
CREATE POLICY "Dono ou admin atualiza viagem"
  ON public.trips FOR UPDATE TO authenticated
  USING (vendedor_id = auth.uid() OR public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'gerente'))
  WITH CHECK (vendedor_id = auth.uid() OR public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'gerente'));
CREATE POLICY "Dono ou admin deleta viagem"
  ON public.trips FOR DELETE TO authenticated
  USING (vendedor_id = auth.uid() OR public.has_role(auth.uid(),'admin'));

CREATE TABLE public.trip_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
  qtd_carregada NUMERIC NOT NULL DEFAULT 0 CHECK (qtd_carregada >= 0),
  qtd_vendida NUMERIC NOT NULL DEFAULT 0 CHECK (qtd_vendida >= 0),
  qtd_devolvida NUMERIC NOT NULL DEFAULT 0 CHECK (qtd_devolvida >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(trip_id, product_id)
);
CREATE INDEX trip_items_trip_idx ON public.trip_items(trip_id);
CREATE INDEX trip_items_product_idx ON public.trip_items(product_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.trip_items TO authenticated;
GRANT ALL ON public.trip_items TO service_role;
ALTER TABLE public.trip_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Ver itens das viagens visíveis"
  ON public.trip_items FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.trips t WHERE t.id = trip_id AND (
    t.vendedor_id = auth.uid() OR public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'gerente')
  )));
CREATE POLICY "Gerir itens das viagens próprias/admin"
  ON public.trip_items FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.trips t WHERE t.id = trip_id AND (
    t.vendedor_id = auth.uid() OR public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'gerente')
  )))
  WITH CHECK (EXISTS (SELECT 1 FROM public.trips t WHERE t.id = trip_id AND (
    t.vendedor_id = auth.uid() OR public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'gerente')
  )));

-- =========================
-- TRIGGERS updated_at
-- =========================
CREATE TRIGGER trips_set_updated_at
  BEFORE UPDATE ON public.trips
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trip_items_set_updated_at
  BEFORE UPDATE ON public.trip_items
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =========================
-- FUNÇÃO: carregar viagem (debita estoque principal)
-- payload: [{ product_id, quantidade }]
-- =========================
CREATE OR REPLACE FUNCTION public.trip_load_items(_trip_id UUID, _items JSONB)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  item JSONB;
  pid UUID;
  qtd NUMERIC;
  trip_status TEXT;
BEGIN
  SELECT status INTO trip_status FROM public.trips WHERE id = _trip_id;
  IF trip_status IS NULL THEN RAISE EXCEPTION 'Viagem não encontrada'; END IF;
  IF trip_status <> 'open' THEN RAISE EXCEPTION 'Viagem encerrada'; END IF;

  FOR item IN SELECT * FROM jsonb_array_elements(_items) LOOP
    pid := (item->>'product_id')::UUID;
    qtd := (item->>'quantidade')::NUMERIC;
    IF qtd <= 0 THEN CONTINUE; END IF;

    -- debita estoque principal
    UPDATE public.products SET estoque = COALESCE(estoque,0) - qtd WHERE id = pid;

    -- upsert no trip_items
    INSERT INTO public.trip_items(trip_id, product_id, qtd_carregada)
      VALUES (_trip_id, pid, qtd)
      ON CONFLICT (trip_id, product_id) DO UPDATE
      SET qtd_carregada = public.trip_items.qtd_carregada + EXCLUDED.qtd_carregada;

    -- log de movimento
    INSERT INTO public.stock_movements(product_id, tipo, quantidade, observacao, user_id)
      VALUES (pid, 'SAIDA', qtd, 'Carga em viagem ' || _trip_id::text, auth.uid());
  END LOOP;
END;
$$;
GRANT EXECUTE ON FUNCTION public.trip_load_items(UUID, JSONB) TO authenticated;

-- =========================
-- FUNÇÃO: encerrar viagem (devolve saldo ao estoque)
-- =========================
CREATE OR REPLACE FUNCTION public.trip_close(_trip_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  rec RECORD;
  saldo NUMERIC;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.trips WHERE id = _trip_id AND status = 'open') THEN
    RAISE EXCEPTION 'Viagem não está aberta';
  END IF;

  FOR rec IN SELECT * FROM public.trip_items WHERE trip_id = _trip_id LOOP
    saldo := rec.qtd_carregada - rec.qtd_vendida - rec.qtd_devolvida;
    IF saldo > 0 THEN
      UPDATE public.products SET estoque = COALESCE(estoque,0) + saldo WHERE id = rec.product_id;
      UPDATE public.trip_items SET qtd_devolvida = qtd_devolvida + saldo WHERE id = rec.id;
      INSERT INTO public.stock_movements(product_id, tipo, quantidade, observacao, user_id)
        VALUES (rec.product_id, 'ENTRADA', saldo, 'Retorno de viagem ' || _trip_id::text, auth.uid());
    END IF;
  END LOOP;

  UPDATE public.trips SET status = 'closed', closed_at = now() WHERE id = _trip_id;
END;
$$;
GRANT EXECUTE ON FUNCTION public.trip_close(UUID) TO authenticated;

-- =========================
-- FUNÇÃO: registrar venda em viagem (baixa saldo do carro)
-- =========================
CREATE OR REPLACE FUNCTION public.trip_record_sale(_trip_id UUID, _product_id UUID, _quantidade NUMERIC)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.trip_items
    SET qtd_vendida = qtd_vendida + _quantidade
  WHERE trip_id = _trip_id AND product_id = _product_id;
END;
$$;
GRANT EXECUTE ON FUNCTION public.trip_record_sale(UUID, UUID, NUMERIC) TO authenticated;


-- MIGRATION: 20260627163110_7de6aa63-348f-4039-8b4b-8d17c34d757a.sql

CREATE OR REPLACE FUNCTION public.trip_load_items(_trip_id UUID, _items JSONB)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  item JSONB;
  pid UUID;
  qtd NUMERIC;
  trip_status TEXT;
BEGIN
  SELECT status INTO trip_status FROM public.trips WHERE id = _trip_id;
  IF trip_status IS NULL THEN RAISE EXCEPTION 'Viagem não encontrada'; END IF;
  IF trip_status <> 'open' THEN RAISE EXCEPTION 'Viagem encerrada'; END IF;

  FOR item IN SELECT * FROM jsonb_array_elements(_items) LOOP
    pid := (item->>'product_id')::UUID;
    qtd := (item->>'quantidade')::NUMERIC;
    IF qtd <= 0 THEN CONTINUE; END IF;

    UPDATE public.products SET estoque = COALESCE(estoque,0) - qtd WHERE id = pid;

    INSERT INTO public.trip_items(trip_id, product_id, qtd_carregada)
      VALUES (_trip_id, pid, qtd)
      ON CONFLICT (trip_id, product_id) DO UPDATE
      SET qtd_carregada = public.trip_items.qtd_carregada + EXCLUDED.qtd_carregada;

    INSERT INTO public.stock_movements(product_id, tipo, quantidade, motivo, reference_id, user_id)
      VALUES (pid, 'SAIDA', qtd, 'Carga em viagem', _trip_id, auth.uid());
  END LOOP;
END;
$$;

CREATE OR REPLACE FUNCTION public.trip_close(_trip_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  rec RECORD;
  saldo NUMERIC;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.trips WHERE id = _trip_id AND status = 'open') THEN
    RAISE EXCEPTION 'Viagem não está aberta';
  END IF;

  FOR rec IN SELECT * FROM public.trip_items WHERE trip_id = _trip_id LOOP
    saldo := rec.qtd_carregada - rec.qtd_vendida - rec.qtd_devolvida;
    IF saldo > 0 THEN
      UPDATE public.products SET estoque = COALESCE(estoque,0) + saldo WHERE id = rec.product_id;
      UPDATE public.trip_items SET qtd_devolvida = qtd_devolvida + saldo WHERE id = rec.id;
      INSERT INTO public.stock_movements(product_id, tipo, quantidade, motivo, reference_id, user_id)
        VALUES (rec.product_id, 'ENTRADA', saldo, 'Retorno de viagem', _trip_id, auth.uid());
    END IF;
  END LOOP;

  UPDATE public.trips SET status = 'closed', closed_at = now() WHERE id = _trip_id;
END;
$$;


-- MIGRATION: 20260627163702_1ae969de-3998-484b-b4f2-25ec1f6c49b4.sql
ALTER TABLE public.trips ADD COLUMN IF NOT EXISTS cidade TEXT, ADD COLUMN IF NOT EXISTS estado TEXT;

-- MIGRATION: 20260705180319_ad25b016-c6b2-4bb5-b623-88c06584d8cb.sql
ALTER TABLE public.whatsapp_campaigns ADD COLUMN IF NOT EXISTS image_url TEXT;

-- MIGRATION: 20260705180430_02859c81-aced-4cd6-8044-0753398aabdd.sql

CREATE POLICY "wa_campaign_images_read" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'wa-campaign-images');
CREATE POLICY "wa_campaign_images_insert" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'wa-campaign-images');
CREATE POLICY "wa_campaign_images_update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'wa-campaign-images');
CREATE POLICY "wa_campaign_images_delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'wa-campaign-images');


-- MIGRATION: 20260705182848_e264a18a-6304-44fa-b6af-b5f2cfabe918.sql

-- 1. Restringir política anônima de push_deliveries: só rows sem clique + só coluna clicked_at
DROP POLICY IF EXISTS "anon mark click" ON public.push_deliveries;

REVOKE UPDATE ON public.push_deliveries FROM anon;
GRANT UPDATE (clicked_at) ON public.push_deliveries TO anon;

CREATE POLICY "anon mark click once"
ON public.push_deliveries
FOR UPDATE
TO anon
USING (clicked_at IS NULL)
WITH CHECK (true);

-- 2. Revogar EXECUTE anônimo em funções SECURITY DEFINER não-trigger
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.is_sales_staff(uuid) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.is_sales_staff(uuid) TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.trip_load_items(uuid, jsonb) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.trip_load_items(uuid, jsonb) TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.trip_close(uuid) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.trip_close(uuid) TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.trip_record_sale(uuid, uuid, numeric) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.trip_record_sale(uuid, uuid, numeric) TO authenticated, service_role;

-- Funções de trigger não são chamadas via API, revogar de todos os roles clientes
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.log_order_status() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.log_lead_stage() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.workflow_log_after_insert() FROM anon, authenticated, public;


-- MIGRATION: 20260706122758_beb137b8-2ef8-464f-8d8f-3e5e3a5979ed.sql
-- EAN-13 para produtos
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS ean13 TEXT UNIQUE;

CREATE OR REPLACE FUNCTION public.generate_ean13(_prefix TEXT DEFAULT '789')
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  base TEXT;
  d INT;
  s INT := 0;
  i INT;
  chk INT;
BEGIN
  base := _prefix || lpad((floor(random() * 1000000000)::bigint)::text, 9, '0');
  base := left(base, 12);
  FOR i IN 1..12 LOOP
    d := substring(base FROM i FOR 1)::int;
    IF i % 2 = 1 THEN s := s + d; ELSE s := s + d * 3; END IF;
  END LOOP;
  chk := (10 - (s % 10)) % 10;
  RETURN base || chk::text;
END $$;

-- Preenche EAN13 para produtos sem código
DO $$
DECLARE r RECORD; novo TEXT;
BEGIN
  FOR r IN SELECT id FROM public.products WHERE ean13 IS NULL LOOP
    LOOP
      novo := public.generate_ean13('789');
      EXIT WHEN NOT EXISTS (SELECT 1 FROM public.products WHERE ean13 = novo);
    END LOOP;
    UPDATE public.products SET ean13 = novo WHERE id = r.id;
  END LOOP;
END $$;

-- Trigger para gerar automaticamente em novos produtos
CREATE OR REPLACE FUNCTION public.products_set_ean13()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE novo TEXT;
BEGIN
  IF NEW.ean13 IS NULL OR NEW.ean13 = '' THEN
    LOOP
      novo := public.generate_ean13('789');
      EXIT WHEN NOT EXISTS (SELECT 1 FROM public.products WHERE ean13 = novo);
    END LOOP;
    NEW.ean13 := novo;
  END IF;
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS trg_products_set_ean13 ON public.products;
CREATE TRIGGER trg_products_set_ean13
BEFORE INSERT ON public.products
FOR EACH ROW EXECUTE FUNCTION public.products_set_ean13();

-- MIGRATION: 20260706122820_b5d7b5c5-0406-498e-bc4b-a94dfaff2a18.sql
ALTER FUNCTION public.generate_ean13(TEXT) SET search_path = public;
ALTER FUNCTION public.products_set_ean13() SET search_path = public;

-- MIGRATION: 20260706231757_893f6fce-0dc0-4c14-ae32-0d5ed4264b7e.sql

-- 1) Adicionar 'chave' ao enum
ALTER TYPE public.product_tipo ADD VALUE IF NOT EXISTS 'chave';


-- MIGRATION: 20260706231908_f26dffb0-8999-4914-aaed-a2ae45357f24.sql

CREATE OR REPLACE FUNCTION public.products_set_sku()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  prefix TEXT;
  start_n INT;
  pad INT;
  use_hyphen BOOLEAN;
  next_n INT;
  candidate TEXT;
BEGIN
  IF NEW.sku IS NOT NULL AND NEW.sku <> '' THEN
    RETURN NEW;
  END IF;

  IF NEW.tipo IS NULL THEN
    RETURN NEW;
  END IF;

  IF NEW.tipo = 'carcaca'::product_tipo THEN
    prefix := 'CP-'; start_n := 10;  pad := 3; use_hyphen := true;
  ELSIF NEW.tipo = 'controle'::product_tipo THEN
    prefix := 'CT';  start_n := 100; pad := 0; use_hyphen := false;
  ELSIF NEW.tipo = 'chave'::product_tipo THEN
    prefix := 'CH';  start_n := 200; pad := 0; use_hyphen := false;
  ELSE
    RETURN NEW;
  END IF;

  -- pega o maior número já usado com esse prefixo
  SELECT COALESCE(MAX(
    NULLIF(regexp_replace(substring(sku FROM char_length(prefix) + 1), '\D', '', 'g'), '')::int
  ), start_n - 1) + 1
  INTO next_n
  FROM public.products
  WHERE sku LIKE prefix || '%';

  IF next_n < start_n THEN next_n := start_n; END IF;

  LOOP
    IF pad > 0 THEN
      candidate := prefix || lpad(next_n::text, pad, '0');
    ELSE
      candidate := prefix || next_n::text;
    END IF;
    EXIT WHEN NOT EXISTS (SELECT 1 FROM public.products WHERE sku = candidate);
    next_n := next_n + 1;
  END LOOP;

  NEW.sku := candidate;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_products_set_sku ON public.products;
CREATE TRIGGER trg_products_set_sku
  BEFORE INSERT ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.products_set_sku();


-- MIGRATION: 20260706232117_bf6cbe41-8d4d-41e5-87f1-aa002e44bfa0.sql

CREATE OR REPLACE FUNCTION public.products_set_sku()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  prefix TEXT;
  start_n INT;
  pad INT;
  next_n INT;
  candidate TEXT;
BEGIN
  IF NEW.sku IS NOT NULL AND NEW.sku <> '' THEN
    RETURN NEW;
  END IF;

  IF NEW.tipo IS NULL THEN
    RETURN NEW;
  END IF;

  IF NEW.tipo = 'carcaca'::product_tipo THEN
    prefix := 'CP-'; start_n := 10;  pad := 3;
  ELSIF NEW.tipo = 'controle'::product_tipo THEN
    prefix := 'CT-'; start_n := 100; pad := 3;
  ELSIF NEW.tipo = 'chave'::product_tipo THEN
    prefix := 'CH-'; start_n := 200; pad := 3;
  ELSE
    RETURN NEW;
  END IF;

  SELECT COALESCE(MAX(
    NULLIF(regexp_replace(substring(sku FROM char_length(prefix) + 1), '\D', '', 'g'), '')::int
  ), start_n - 1) + 1
  INTO next_n
  FROM public.products
  WHERE sku LIKE prefix || '%';

  IF next_n < start_n THEN next_n := start_n; END IF;

  LOOP
    candidate := prefix || lpad(next_n::text, pad, '0');
    EXIT WHEN NOT EXISTS (SELECT 1 FROM public.products WHERE sku = candidate);
    next_n := next_n + 1;
  END LOOP;

  NEW.sku := candidate;
  RETURN NEW;
END;
$$;


-- MIGRATION: 20260707010339_ce6a633e-747a-432a-9cab-514adc644bc7.sql

CREATE OR REPLACE FUNCTION public.stock_deduct_open_trips()
RETURNS TABLE(product_id uuid, deduzido numeric, insuficientes boolean)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  rec RECORD;
  saldo NUMERIC;
  atual NUMERIC;
BEGIN
  FOR rec IN
    SELECT ti.product_id AS pid,
           SUM(ti.qtd_carregada - ti.qtd_vendida - ti.qtd_devolvida) AS saldo_viagem
      FROM public.trip_items ti
      JOIN public.trips t ON t.id = ti.trip_id
     WHERE t.status = 'open'
     GROUP BY ti.product_id
    HAVING SUM(ti.qtd_carregada - ti.qtd_vendida - ti.qtd_devolvida) > 0
  LOOP
    SELECT COALESCE(estoque,0) INTO atual FROM public.products WHERE id = rec.pid;
    saldo := rec.saldo_viagem;

    IF atual < saldo THEN
      product_id := rec.pid; deduzido := 0; insuficientes := true; RETURN NEXT;
      CONTINUE;
    END IF;

    UPDATE public.products SET estoque = atual - saldo WHERE id = rec.pid;

    INSERT INTO public.stock_movements(product_id, tipo, quantidade, motivo, user_id)
    VALUES (rec.pid, 'AJUSTE', saldo, 'Separação: estoque já carregado em viagem aberta', auth.uid());

    product_id := rec.pid; deduzido := saldo; insuficientes := false; RETURN NEXT;
  END LOOP;
END $$;

REVOKE ALL ON FUNCTION public.stock_deduct_open_trips() FROM public;
GRANT EXECUTE ON FUNCTION public.stock_deduct_open_trips() TO authenticated;


-- MIGRATION: 20260707200324_8b30aaa4-5ef8-4dcf-822d-fec58111e79d.sql

-- 1) Reverter a última execução duplicada (adicionar de volta o que foi deduzido em 20:01)
WITH dup AS (
  SELECT product_id, SUM(quantidade) AS qtd
  FROM public.stock_movements
  WHERE motivo = 'Separação: estoque já carregado em viagem aberta'
    AND created_at >= '2026-07-07 20:00:00+00'
  GROUP BY product_id
)
UPDATE public.products p
SET estoque = COALESCE(p.estoque,0) + d.qtd
FROM dup d
WHERE p.id = d.product_id;

-- Registra estorno
INSERT INTO public.stock_movements(product_id, tipo, quantidade, motivo, user_id)
SELECT product_id, 'ENTRADA', SUM(quantidade), 'Estorno: dedução em viagens duplicada', NULL
FROM public.stock_movements
WHERE motivo = 'Separação: estoque já carregado em viagem aberta'
  AND created_at >= '2026-07-07 20:00:00+00'
GROUP BY product_id;

-- 2) Proteger a função contra dedução duplicada:
-- só deduz o que ainda NÃO foi deduzido antes (subtrai ajustes anteriores de mesma origem).
CREATE OR REPLACE FUNCTION public.stock_deduct_open_trips()
 RETURNS TABLE(product_id uuid, deduzido numeric, insuficientes boolean)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  rec RECORD;
  saldo NUMERIC;
  atual NUMERIC;
  ja_deduzido NUMERIC;
  a_deduzir NUMERIC;
BEGIN
  FOR rec IN
    SELECT ti.product_id AS pid,
           SUM(ti.qtd_carregada - ti.qtd_vendida - ti.qtd_devolvida) AS saldo_viagem
      FROM public.trip_items ti
      JOIN public.trips t ON t.id = ti.trip_id
     WHERE t.status = 'open'
     GROUP BY ti.product_id
    HAVING SUM(ti.qtd_carregada - ti.qtd_vendida - ti.qtd_devolvida) > 0
  LOOP
    SELECT COALESCE(estoque,0) INTO atual FROM public.products WHERE id = rec.pid;
    saldo := rec.saldo_viagem;

    -- Quanto já foi deduzido por esta rotina para este produto
    SELECT COALESCE(SUM(
      CASE WHEN tipo = 'AJUSTE' THEN quantidade
           WHEN tipo = 'ENTRADA' AND motivo ILIKE 'Estorno%' THEN -quantidade
           ELSE 0 END
    ), 0)
      INTO ja_deduzido
      FROM public.stock_movements
     WHERE product_id = rec.pid
       AND (motivo = 'Separação: estoque já carregado em viagem aberta'
            OR motivo ILIKE 'Estorno: dedução em viagens duplicada');

    a_deduzir := saldo - ja_deduzido;
    IF a_deduzir <= 0 THEN
      product_id := rec.pid; deduzido := 0; insuficientes := false; RETURN NEXT;
      CONTINUE;
    END IF;

    IF atual < a_deduzir THEN
      product_id := rec.pid; deduzido := 0; insuficientes := true; RETURN NEXT;
      CONTINUE;
    END IF;

    UPDATE public.products SET estoque = atual - a_deduzir WHERE id = rec.pid;

    INSERT INTO public.stock_movements(product_id, tipo, quantidade, motivo, user_id)
    VALUES (rec.pid, 'AJUSTE', a_deduzir, 'Separação: estoque já carregado em viagem aberta', auth.uid());

    product_id := rec.pid; deduzido := a_deduzir; insuficientes := false; RETURN NEXT;
  END LOOP;
END $function$;


-- MIGRATION: 20260708171414_d4b64933-f5b8-4526-b41f-b45cb4ea3440.sql

DROP POLICY IF EXISTS "Public can read shared cart by token" ON public.shared_carts;

CREATE OR REPLACE FUNCTION public.get_shared_cart(_token text)
RETURNS SETOF public.shared_carts
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT *
  FROM public.shared_carts
  WHERE token = _token
    AND (expires_at IS NULL OR expires_at > now())
  LIMIT 1
$$;

REVOKE ALL ON FUNCTION public.get_shared_cart(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_shared_cart(text) TO anon, authenticated;


-- MIGRATION: 20260708212757_b4384f77-1c9a-473e-a40e-84990b4f3ddd.sql

ALTER TABLE public.push_subscriptions ALTER COLUMN user_id DROP NOT NULL;

GRANT INSERT, UPDATE ON public.push_subscriptions TO anon;

CREATE POLICY "anon subs insert" ON public.push_subscriptions
  FOR INSERT TO anon
  WITH CHECK (user_id IS NULL);

CREATE POLICY "anon subs update by endpoint" ON public.push_subscriptions
  FOR UPDATE TO anon
  USING (user_id IS NULL)
  WITH CHECK (user_id IS NULL);


-- MIGRATION: 20260708213503_e4415d70-e11a-43b8-b109-b8acf2fd6c9c.sql

DROP POLICY IF EXISTS "anon subs insert" ON public.push_subscriptions;
DROP POLICY IF EXISTS "anon subs update by endpoint" ON public.push_subscriptions;

CREATE POLICY "public subs insert" ON public.push_subscriptions
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    (auth.uid() IS NULL AND user_id IS NULL)
    OR (auth.uid() IS NOT NULL AND (user_id = auth.uid() OR user_id IS NULL))
  );

CREATE POLICY "public subs update" ON public.push_subscriptions
  FOR UPDATE TO anon, authenticated
  USING (true)
  WITH CHECK (
    (auth.uid() IS NULL AND user_id IS NULL)
    OR (auth.uid() IS NOT NULL AND (user_id = auth.uid() OR user_id IS NULL))
  );

DROP POLICY IF EXISTS "own subs insert" ON public.push_subscriptions;
DROP POLICY IF EXISTS "own subs update" ON public.push_subscriptions;


-- MIGRATION: 20260708214136_e5f4870d-a043-4890-a83a-1e186140a914.sql
ALTER TYPE public.payment_tipo ADD VALUE IF NOT EXISTS 'DINHEIRO';

-- MIGRATION: 20260709004457_2c43c613-88c4-4c41-b066-12a8579fc5ea.sql

CREATE TABLE public.trip_expenses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  categoria TEXT NOT NULL CHECK (categoria IN ('COMBUSTIVEL','PEDAGIO','ALIMENTACAO','HOSPEDAGEM','MANUTENCAO','OUTROS')),
  descricao TEXT,
  valor NUMERIC NOT NULL CHECK (valor >= 0),
  forma_pagamento TEXT CHECK (forma_pagamento IN ('DINHEIRO','PIX','CARTAO','OUTRO')),
  data DATE NOT NULL DEFAULT CURRENT_DATE,
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_trip_expenses_trip ON public.trip_expenses(trip_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.trip_expenses TO authenticated;
GRANT ALL ON public.trip_expenses TO service_role;

ALTER TABLE public.trip_expenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Vendedor vê despesas de suas viagens"
  ON public.trip_expenses FOR SELECT
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.trips t WHERE t.id = trip_id AND t.vendedor_id = auth.uid())
    OR public.is_sales_staff(auth.uid())
  );

CREATE POLICY "Vendedor lança despesas em suas viagens"
  ON public.trip_expenses FOR INSERT
  TO authenticated
  WITH CHECK (
    created_by = auth.uid()
    AND EXISTS (SELECT 1 FROM public.trips t WHERE t.id = trip_id AND (t.vendedor_id = auth.uid() OR public.is_sales_staff(auth.uid())))
  );

CREATE POLICY "Vendedor edita despesas de suas viagens"
  ON public.trip_expenses FOR UPDATE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.trips t WHERE t.id = trip_id AND (t.vendedor_id = auth.uid() OR public.is_sales_staff(auth.uid())))
  );

CREATE POLICY "Vendedor apaga despesas de suas viagens"
  ON public.trip_expenses FOR DELETE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.trips t WHERE t.id = trip_id AND (t.vendedor_id = auth.uid() OR public.is_sales_staff(auth.uid())))
  );

CREATE TRIGGER trg_trip_expenses_updated_at
  BEFORE UPDATE ON public.trip_expenses
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- MIGRATION: 20260709195820_42e55d62-5039-4caf-8559-93857572dae1.sql

-- Vincular pedidos à viagem (opcional) e dar baixa no estoque do carro
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS trip_id UUID REFERENCES public.trips(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_orders_trip_id ON public.orders(trip_id);

-- RPC: dá baixa (qtd_vendida) nos itens da viagem para um pedido específico
CREATE OR REPLACE FUNCTION public.trip_apply_order(_order_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_trip UUID;
BEGIN
  SELECT trip_id INTO v_trip FROM public.orders WHERE id = _order_id;
  IF v_trip IS NULL THEN RETURN; END IF;

  UPDATE public.trip_items ti
     SET qtd_vendida = qtd_vendida + oi.quantidade,
         updated_at  = now()
    FROM public.order_items oi
   WHERE oi.order_id = _order_id
     AND ti.trip_id   = v_trip
     AND ti.product_id = oi.product_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.trip_apply_order(UUID) TO authenticated;


-- MIGRATION: 20260709200411_8ac11377-aa04-49e3-a076-571210160faa.sql

-- Link financial entries back to trip expenses for automatic sync
ALTER TABLE public.financial_entries
  ADD COLUMN IF NOT EXISTS trip_expense_id uuid REFERENCES public.trip_expenses(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS financial_entries_trip_expense_id_idx
  ON public.financial_entries(trip_expense_id);

-- Ensure a "Viagem" category exists (used as fallback)
INSERT INTO public.financial_categories(nome, tipo)
SELECT 'Viagem', 'DESPESA'
WHERE NOT EXISTS (SELECT 1 FROM public.financial_categories WHERE nome = 'Viagem' AND tipo = 'DESPESA');

CREATE OR REPLACE FUNCTION public.trip_expense_to_financial()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_cidade text;
  v_estado text;
  v_nome text;
  v_local text;
  v_desc text;
  v_cat_id uuid;
BEGIN
  IF TG_OP = 'INSERT' THEN
    SELECT cidade, estado, nome INTO v_cidade, v_estado, v_nome FROM public.trips WHERE id = NEW.trip_id;

    IF v_cidade IS NOT NULL AND v_cidade <> '' THEN
      v_local := v_cidade || COALESCE(' - ' || NULLIF(v_estado, ''), '');
    ELSE
      v_local := COALESCE(v_nome, 'Viagem');
    END IF;

    v_desc := 'Viagem ' || v_local
              || ' · ' || NEW.categoria
              || COALESCE(' · ' || NULLIF(NEW.descricao, ''), '');

    SELECT id INTO v_cat_id FROM public.financial_categories
     WHERE tipo = 'DESPESA' AND nome = 'Viagem' LIMIT 1;

    INSERT INTO public.financial_entries(descricao, valor, tipo, data, categoria_id, trip_expense_id)
    VALUES (v_desc, NEW.valor, 'DESPESA', NEW.data, v_cat_id, NEW.id);
    RETURN NEW;

  ELSIF TG_OP = 'UPDATE' THEN
    UPDATE public.financial_entries
       SET valor = NEW.valor,
           data = NEW.data
     WHERE trip_expense_id = NEW.id;
    RETURN NEW;
  END IF;
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS trg_trip_expense_to_financial_ins ON public.trip_expenses;
CREATE TRIGGER trg_trip_expense_to_financial_ins
AFTER INSERT ON public.trip_expenses
FOR EACH ROW EXECUTE FUNCTION public.trip_expense_to_financial();

DROP TRIGGER IF EXISTS trg_trip_expense_to_financial_upd ON public.trip_expenses;
CREATE TRIGGER trg_trip_expense_to_financial_upd
AFTER UPDATE ON public.trip_expenses
FOR EACH ROW EXECUTE FUNCTION public.trip_expense_to_financial();

-- Backfill existing trip expenses that don't have a corresponding financial entry
INSERT INTO public.financial_entries(descricao, valor, tipo, data, categoria_id, trip_expense_id)
SELECT
  'Viagem ' ||
    CASE WHEN t.cidade IS NOT NULL AND t.cidade <> ''
         THEN t.cidade || COALESCE(' - ' || NULLIF(t.estado, ''), '')
         ELSE COALESCE(t.nome, 'Viagem') END
    || ' · ' || te.categoria
    || COALESCE(' · ' || NULLIF(te.descricao, ''), ''),
  te.valor, 'DESPESA', te.data,
  (SELECT id FROM public.financial_categories WHERE tipo='DESPESA' AND nome='Viagem' LIMIT 1),
  te.id
FROM public.trip_expenses te
JOIN public.trips t ON t.id = te.trip_id
WHERE NOT EXISTS (
  SELECT 1 FROM public.financial_entries fe WHERE fe.trip_expense_id = te.id
);


-- MIGRATION: 20260709200823_3026f77c-bde4-4693-ae8a-51735b346fbd.sql

DROP TRIGGER IF EXISTS trg_trip_expense_to_financial_ins ON public.trip_expenses;
DROP TRIGGER IF EXISTS trg_trip_expense_to_financial_upd ON public.trip_expenses;
DROP FUNCTION IF EXISTS public.trip_expense_to_financial();

DELETE FROM public.financial_entries WHERE trip_expense_id IS NOT NULL;


-- MIGRATION: 20260709202142_425de752-0073-459d-adef-1df2cd8497ae.sql

CREATE TABLE IF NOT EXISTS public.bank_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  banco TEXT,
  tipo TEXT NOT NULL DEFAULT 'CORRENTE' CHECK (tipo IN ('CORRENTE','POUPANCA','DINHEIRO','CARTAO','OUTRO')),
  cor TEXT NOT NULL DEFAULT '#6366f1',
  saldo_inicial NUMERIC NOT NULL DEFAULT 0,
  ativo BOOLEAN NOT NULL DEFAULT true,
  observacao TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.bank_accounts TO authenticated;
GRANT ALL ON public.bank_accounts TO service_role;
ALTER TABLE public.bank_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "sales staff can view bank accounts" ON public.bank_accounts
  FOR SELECT TO authenticated USING (public.is_sales_staff(auth.uid()));
CREATE POLICY "sales staff can insert bank accounts" ON public.bank_accounts
  FOR INSERT TO authenticated WITH CHECK (public.is_sales_staff(auth.uid()));
CREATE POLICY "sales staff can update bank accounts" ON public.bank_accounts
  FOR UPDATE TO authenticated USING (public.is_sales_staff(auth.uid())) WITH CHECK (public.is_sales_staff(auth.uid()));
CREATE POLICY "sales staff can delete bank accounts" ON public.bank_accounts
  FOR DELETE TO authenticated USING (public.is_sales_staff(auth.uid()));

CREATE TRIGGER trg_bank_accounts_updated
  BEFORE UPDATE ON public.bank_accounts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.financial_transactions
  ADD COLUMN IF NOT EXISTS account_id UUID REFERENCES public.bank_accounts(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS financial_transactions_account_id_idx ON public.financial_transactions(account_id);

ALTER TABLE public.financial_entries
  ADD COLUMN IF NOT EXISTS account_id UUID REFERENCES public.bank_accounts(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS financial_entries_account_id_idx ON public.financial_entries(account_id);

ALTER TABLE public.trip_expenses
  ADD COLUMN IF NOT EXISTS account_id UUID REFERENCES public.bank_accounts(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS trip_expenses_account_id_idx ON public.trip_expenses(account_id);

-- Backfill paid orders that don't yet have a financial_transaction
INSERT INTO public.financial_transactions (
  company_id, order_id, tipo, forma_pagamento, valor, status, pagamento, descricao
)
SELECT
  o.company_id,
  o.id,
  'RECEITA',
  COALESCE(p.tipo, 'DINHEIRO'),
  o.total,
  'PAGO',
  o.created_at::date,
  'Venda #' || substring(o.id::text, 1, 8)
FROM public.orders o
LEFT JOIN LATERAL (
  SELECT tipo FROM public.payments WHERE order_id = o.id AND status = 'APROVADO' LIMIT 1
) p ON true
WHERE o.status IN ('PAGO','EM_SEPARACAO','ENVIADO','ENTREGUE')
  AND NOT EXISTS (SELECT 1 FROM public.financial_transactions ft WHERE ft.order_id = o.id);

CREATE OR REPLACE FUNCTION public.bank_account_balance(_account_id UUID)
RETURNS NUMERIC
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    COALESCE((SELECT saldo_inicial FROM public.bank_accounts WHERE id = _account_id), 0)
    + COALESCE((SELECT SUM(valor) FROM public.financial_transactions WHERE account_id = _account_id AND status = 'PAGO' AND tipo = 'RECEITA'), 0)
    - COALESCE((SELECT SUM(valor) FROM public.financial_transactions WHERE account_id = _account_id AND status = 'PAGO' AND tipo = 'DESPESA'), 0)
    + COALESCE((SELECT SUM(valor) FROM public.financial_entries WHERE account_id = _account_id AND tipo = 'RECEITA'), 0)
    - COALESCE((SELECT SUM(valor) FROM public.financial_entries WHERE account_id = _account_id AND tipo = 'DESPESA'), 0)
    - COALESCE((SELECT SUM(valor) FROM public.trip_expenses WHERE account_id = _account_id), 0)
$$;


-- MIGRATION: 20260709203104_5c7f163e-14bf-409d-ba3b-48d786d3ff87.sql

CREATE TABLE public.bank_transfers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  from_account_id UUID NOT NULL REFERENCES public.bank_accounts(id) ON DELETE RESTRICT,
  to_account_id UUID NOT NULL REFERENCES public.bank_accounts(id) ON DELETE RESTRICT,
  valor NUMERIC NOT NULL CHECK (valor > 0),
  data DATE NOT NULL DEFAULT CURRENT_DATE,
  observacao TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (from_account_id <> to_account_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bank_transfers TO authenticated;
GRANT ALL ON public.bank_transfers TO service_role;
ALTER TABLE public.bank_transfers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can manage bank transfers" ON public.bank_transfers
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE INDEX ix_bank_transfers_from ON public.bank_transfers(from_account_id);
CREATE INDEX ix_bank_transfers_to ON public.bank_transfers(to_account_id);


-- MIGRATION: 20260709210534_144b9db2-ae29-4ea1-85f2-46798cfbb227.sql
-- Ao encerrar viagem: gera conta a pagar com custo das peças vendidas naquela viagem
CREATE OR REPLACE FUNCTION public.trip_close(_trip_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  rec RECORD;
  saldo NUMERIC;
  custo_total NUMERIC := 0;
  local_txt TEXT;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.trips WHERE id = _trip_id AND status = 'open') THEN
    RAISE EXCEPTION 'Viagem não está aberta';
  END IF;

  -- Retorno de estoque
  FOR rec IN SELECT * FROM public.trip_items WHERE trip_id = _trip_id LOOP
    saldo := rec.qtd_carregada - rec.qtd_vendida - rec.qtd_devolvida;
    IF saldo > 0 THEN
      UPDATE public.products SET estoque = COALESCE(estoque,0) + saldo WHERE id = rec.product_id;
      UPDATE public.trip_items SET qtd_devolvida = qtd_devolvida + saldo WHERE id = rec.id;
      INSERT INTO public.stock_movements(product_id, tipo, quantidade, motivo, reference_id, user_id)
        VALUES (rec.product_id, 'ENTRADA', saldo, 'Retorno de viagem', _trip_id, auth.uid());
    END IF;
  END LOOP;

  -- Custo das peças vendidas na viagem => conta a pagar
  SELECT COALESCE(SUM(ti.qtd_vendida * COALESCE(p.preco_custo, 0)), 0)
    INTO custo_total
    FROM public.trip_items ti
    JOIN public.products p ON p.id = ti.product_id
   WHERE ti.trip_id = _trip_id;

  IF custo_total > 0 THEN
    SELECT CASE WHEN cidade IS NOT NULL THEN cidade || COALESCE('-' || estado, '') ELSE COALESCE(nome, 'Viagem') END
      INTO local_txt FROM public.trips WHERE id = _trip_id;

    INSERT INTO public.financial_transactions(tipo, valor, status, descricao, vencimento)
    VALUES ('DESPESA', custo_total, 'PENDENTE',
            'Custo peças vendidas — ' || local_txt,
            CURRENT_DATE + INTERVAL '30 days');
  END IF;

  UPDATE public.trips SET status = 'closed', closed_at = now() WHERE id = _trip_id;
END;
$function$;

-- MIGRATION: 20260710203235_becd9ff1-3b65-4530-8a5f-6063d424a1b7.sql

CREATE OR REPLACE FUNCTION public.trip_close_v2(_trip_id uuid, _return_stock boolean DEFAULT true)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  rec RECORD;
  saldo NUMERIC;
  custo_total NUMERIC := 0;
  local_txt TEXT;
  trip_row RECORD;
  new_trip_id UUID := NULL;
BEGIN
  SELECT * INTO trip_row FROM public.trips WHERE id = _trip_id AND status = 'open';
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Viagem não está aberta';
  END IF;

  IF _return_stock THEN
    -- Comportamento original: devolve saldo à matriz
    FOR rec IN SELECT * FROM public.trip_items WHERE trip_id = _trip_id LOOP
      saldo := rec.qtd_carregada - rec.qtd_vendida - rec.qtd_devolvida;
      IF saldo > 0 THEN
        UPDATE public.products SET estoque = COALESCE(estoque,0) + saldo WHERE id = rec.product_id;
        UPDATE public.trip_items SET qtd_devolvida = qtd_devolvida + saldo WHERE id = rec.id;
        INSERT INTO public.stock_movements(product_id, tipo, quantidade, motivo, reference_id, user_id)
          VALUES (rec.product_id, 'ENTRADA', saldo, 'Retorno de viagem', _trip_id, auth.uid());
      END IF;
    END LOOP;
  ELSE
    -- Nova viagem "Sobras de X" já carregada com o saldo (sem mexer no estoque)
    INSERT INTO public.trips(nome, cidade, estado, status, created_by, notas)
    VALUES (
      'Sobras de ' || COALESCE(trip_row.nome, 'viagem'),
      trip_row.cidade,
      trip_row.estado,
      'open',
      auth.uid(),
      'Gerada automaticamente ao encerrar viagem ' || COALESCE(trip_row.nome, _trip_id::text)
    )
    RETURNING id INTO new_trip_id;

    FOR rec IN SELECT * FROM public.trip_items WHERE trip_id = _trip_id LOOP
      saldo := rec.qtd_carregada - rec.qtd_vendida - rec.qtd_devolvida;
      IF saldo > 0 THEN
        INSERT INTO public.trip_items(trip_id, product_id, qtd_carregada)
          VALUES (new_trip_id, rec.product_id, saldo)
          ON CONFLICT (trip_id, product_id) DO UPDATE
            SET qtd_carregada = public.trip_items.qtd_carregada + EXCLUDED.qtd_carregada;
        -- Marca como devolvida na viagem antiga (para fechar as contas dela)
        UPDATE public.trip_items SET qtd_devolvida = qtd_devolvida + saldo WHERE id = rec.id;
        INSERT INTO public.stock_movements(product_id, tipo, quantidade, motivo, reference_id, user_id)
          VALUES (rec.product_id, 'TRANSFERENCIA', saldo, 'Transferência de saldo para nova viagem', new_trip_id, auth.uid());
      END IF;
    END LOOP;
  END IF;

  -- Custo das peças vendidas => conta a pagar (igual ao trip_close original)
  SELECT COALESCE(SUM(ti.qtd_vendida * COALESCE(p.preco_custo, 0)), 0)
    INTO custo_total
    FROM public.trip_items ti
    JOIN public.products p ON p.id = ti.product_id
   WHERE ti.trip_id = _trip_id;

  IF custo_total > 0 THEN
    SELECT CASE WHEN cidade IS NOT NULL THEN cidade || COALESCE('-' || estado, '') ELSE COALESCE(nome, 'Viagem') END
      INTO local_txt FROM public.trips WHERE id = _trip_id;

    INSERT INTO public.financial_transactions(tipo, valor, status, descricao, vencimento)
    VALUES ('DESPESA', custo_total, 'PENDENTE',
            'Custo peças vendidas — ' || local_txt,
            CURRENT_DATE + INTERVAL '30 days');
  END IF;

  UPDATE public.trips SET status = 'closed', closed_at = now() WHERE id = _trip_id;
  RETURN new_trip_id;
END;
$function$;


-- MIGRATION: 20260710225824_2e80bc03-2cbc-44e1-9981-77ab40f6e382.sql
-- 1) Trigger function
CREATE OR REPLACE FUNCTION public.order_sync_financials()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  custo_total NUMERIC := 0;
  ja_receita UUID;
  ja_despesa UUID;
BEGIN
  -- Só age quando o status vira PAGO (ou pedido é criado já PAGO)
  IF NOT (
    (TG_OP = 'INSERT' AND NEW.status = 'PAGO') OR
    (TG_OP = 'UPDATE' AND NEW.status = 'PAGO' AND NEW.status IS DISTINCT FROM OLD.status)
  ) THEN
    RETURN NEW;
  END IF;

  -- RECEITA (venda): cria se ainda não existir
  SELECT id INTO ja_receita
    FROM public.financial_transactions
   WHERE order_id = NEW.id AND tipo = 'RECEITA'
   LIMIT 1;

  IF ja_receita IS NULL THEN
    INSERT INTO public.financial_transactions(
      order_id, company_id, tipo, status, valor, pagamento, descricao
    ) VALUES (
      NEW.id, NEW.company_id, 'RECEITA', 'PAGO', COALESCE(NEW.total, 0), CURRENT_DATE,
      'Venda #' || substring(NEW.id::text, 1, 8)
    );
  ELSE
    UPDATE public.financial_transactions
       SET status = 'PAGO',
           valor = COALESCE(NEW.total, 0),
           pagamento = COALESCE(pagamento, CURRENT_DATE),
           updated_at = now()
     WHERE id = ja_receita;
  END IF;

  -- DESPESA (custo das peças) — apenas se NÃO for pedido de viagem
  -- (viagens geram esse lançamento no trip_close)
  IF NEW.trip_id IS NULL THEN
    SELECT COALESCE(SUM(oi.quantidade * COALESCE(p.preco_custo, 0)), 0)
      INTO custo_total
      FROM public.order_items oi
      JOIN public.products p ON p.id = oi.product_id
     WHERE oi.order_id = NEW.id;

    IF custo_total > 0 THEN
      SELECT id INTO ja_despesa
        FROM public.financial_transactions
       WHERE order_id = NEW.id AND tipo = 'DESPESA'
       LIMIT 1;

      IF ja_despesa IS NULL THEN
        INSERT INTO public.financial_transactions(
          order_id, company_id, tipo, status, valor, vencimento, descricao
        ) VALUES (
          NEW.id, NEW.company_id, 'DESPESA', 'PENDENTE',
          custo_total, CURRENT_DATE + INTERVAL '30 days',
          'Custo peças — Venda #' || substring(NEW.id::text, 1, 8)
        );
      END IF;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

-- 2) Trigger
DROP TRIGGER IF EXISTS trg_order_sync_financials ON public.orders;
CREATE TRIGGER trg_order_sync_financials
AFTER INSERT OR UPDATE OF status ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.order_sync_financials();

-- 3) Back-fill: pedidos já em status pago/enviado/entregue sem lançamento
DO $$
DECLARE
  o RECORD;
  custo_total NUMERIC;
BEGIN
  FOR o IN
    SELECT id, company_id, total, trip_id
      FROM public.orders
     WHERE status IN ('PAGO', 'EM_SEPARACAO', 'ENVIADO', 'ENTREGUE')
  LOOP
    -- RECEITA
    IF NOT EXISTS (
      SELECT 1 FROM public.financial_transactions
       WHERE order_id = o.id AND tipo = 'RECEITA'
    ) THEN
      INSERT INTO public.financial_transactions(
        order_id, company_id, tipo, status, valor, pagamento, descricao
      ) VALUES (
        o.id, o.company_id, 'RECEITA', 'PAGO', COALESCE(o.total, 0), CURRENT_DATE,
        'Venda #' || substring(o.id::text, 1, 8) || ' (backfill)'
      );
    END IF;

    -- DESPESA custo das peças (só para pedidos não-viagem)
    IF o.trip_id IS NULL THEN
      SELECT COALESCE(SUM(oi.quantidade * COALESCE(p.preco_custo, 0)), 0)
        INTO custo_total
        FROM public.order_items oi
        JOIN public.products p ON p.id = oi.product_id
       WHERE oi.order_id = o.id;

      IF custo_total > 0 AND NOT EXISTS (
        SELECT 1 FROM public.financial_transactions
         WHERE order_id = o.id AND tipo = 'DESPESA'
      ) THEN
        INSERT INTO public.financial_transactions(
          order_id, company_id, tipo, status, valor, vencimento, descricao
        ) VALUES (
          o.id, o.company_id, 'DESPESA', 'PENDENTE',
          custo_total, CURRENT_DATE + INTERVAL '30 days',
          'Custo peças — Venda #' || substring(o.id::text, 1, 8) || ' (backfill)'
        );
      END IF;
    END IF;
  END LOOP;
END $$;

-- MIGRATION: 20260711005419_0a387e41-21c3-4c62-81f5-05d80a13e6f7.sql

ALTER TABLE public.bank_accounts
  ADD COLUMN IF NOT EXISTS default_pix boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS default_cartao boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS default_dinheiro boolean NOT NULL DEFAULT false;

CREATE UNIQUE INDEX IF NOT EXISTS bank_accounts_default_pix_uq
  ON public.bank_accounts ((true)) WHERE default_pix;
CREATE UNIQUE INDEX IF NOT EXISTS bank_accounts_default_cartao_uq
  ON public.bank_accounts ((true)) WHERE default_cartao;
CREATE UNIQUE INDEX IF NOT EXISTS bank_accounts_default_dinheiro_uq
  ON public.bank_accounts ((true)) WHERE default_dinheiro;

UPDATE public.bank_accounts SET
  default_cartao = (nome = 'INTER PRIME'),
  default_pix = (nome = 'DENYS - C6BANK'),
  default_dinheiro = (nome = 'DENYS PESSOAL');

CREATE OR REPLACE FUNCTION public.order_sync_financials()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  custo_total NUMERIC := 0;
  ja_receita UUID; ja_despesa UUID;
  pay_tipo TEXT; acc_id UUID;
BEGIN
  IF NOT (
    (TG_OP='INSERT' AND NEW.status='PAGO') OR
    (TG_OP='UPDATE' AND NEW.status='PAGO' AND NEW.status IS DISTINCT FROM OLD.status)
  ) THEN RETURN NEW; END IF;

  SELECT tipo::text INTO pay_tipo FROM public.payments WHERE order_id=NEW.id ORDER BY created_at DESC LIMIT 1;

  IF pay_tipo='CARTAO' THEN
    SELECT id INTO acc_id FROM public.bank_accounts WHERE default_cartao AND ativo LIMIT 1;
  ELSIF pay_tipo='PIX' THEN
    SELECT id INTO acc_id FROM public.bank_accounts WHERE default_pix AND ativo LIMIT 1;
  ELSIF pay_tipo='DINHEIRO' THEN
    SELECT id INTO acc_id FROM public.bank_accounts WHERE default_dinheiro AND ativo LIMIT 1;
  END IF;

  SELECT id INTO ja_receita FROM public.financial_transactions WHERE order_id=NEW.id AND tipo='RECEITA' LIMIT 1;
  IF ja_receita IS NULL THEN
    INSERT INTO public.financial_transactions(order_id, company_id, tipo, status, valor, pagamento, descricao, forma_pagamento, account_id)
    VALUES (NEW.id, NEW.company_id, 'RECEITA', 'PAGO', COALESCE(NEW.total,0), CURRENT_DATE,
            'Venda #'||substring(NEW.id::text,1,8), pay_tipo, acc_id);
  ELSE
    UPDATE public.financial_transactions
       SET status='PAGO', valor=COALESCE(NEW.total,0),
           pagamento=COALESCE(pagamento,CURRENT_DATE),
           forma_pagamento=COALESCE(forma_pagamento,pay_tipo),
           account_id=COALESCE(account_id,acc_id),
           updated_at=now()
     WHERE id=ja_receita;
  END IF;

  IF NEW.trip_id IS NULL THEN
    SELECT COALESCE(SUM(oi.quantidade*COALESCE(p.preco_custo,0)),0) INTO custo_total
      FROM public.order_items oi JOIN public.products p ON p.id=oi.product_id
     WHERE oi.order_id=NEW.id;
    IF custo_total>0 THEN
      SELECT id INTO ja_despesa FROM public.financial_transactions WHERE order_id=NEW.id AND tipo='DESPESA' LIMIT 1;
      IF ja_despesa IS NULL THEN
        INSERT INTO public.financial_transactions(order_id, company_id, tipo, status, valor, vencimento, descricao)
        VALUES (NEW.id, NEW.company_id, 'DESPESA', 'PENDENTE', custo_total, CURRENT_DATE+INTERVAL '30 days',
                'Custo peças — Venda #'||substring(NEW.id::text,1,8));
      END IF;
    END IF;
  END IF;

  RETURN NEW;
END; $$;

UPDATE public.financial_transactions ft
   SET account_id = ba.id,
       forma_pagamento = COALESCE(ft.forma_pagamento, p.tipo::text)
  FROM public.payments p
  JOIN public.bank_accounts ba
    ON (p.tipo::text='CARTAO'   AND ba.default_cartao)
    OR (p.tipo::text='PIX'      AND ba.default_pix)
    OR (p.tipo::text='DINHEIRO' AND ba.default_dinheiro)
 WHERE ft.account_id IS NULL AND ft.tipo='RECEITA' AND ft.order_id=p.order_id AND ba.ativo;


-- MIGRATION: 20260711010151_5a089300-dca3-470f-9426-555d61f978cd.sql

-- Novo gatilho: consolida despesa por DIA (vendas avulsas) e limpa antigas por pedido
CREATE OR REPLACE FUNCTION public.order_sync_financials()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  custo_total NUMERIC := 0;
  ja_receita UUID;
  ja_despesa_dia UUID;
  pay_tipo TEXT; acc_id UUID;
  dia_venda DATE;
  dia_label TEXT;
  desc_dia TEXT;
BEGIN
  IF NOT (
    (TG_OP='INSERT' AND NEW.status='PAGO') OR
    (TG_OP='UPDATE' AND NEW.status='PAGO' AND NEW.status IS DISTINCT FROM OLD.status)
  ) THEN RETURN NEW; END IF;

  SELECT tipo::text INTO pay_tipo FROM public.payments WHERE order_id=NEW.id ORDER BY created_at DESC LIMIT 1;

  IF pay_tipo='CARTAO' THEN
    SELECT id INTO acc_id FROM public.bank_accounts WHERE default_cartao AND ativo LIMIT 1;
  ELSIF pay_tipo='PIX' THEN
    SELECT id INTO acc_id FROM public.bank_accounts WHERE default_pix AND ativo LIMIT 1;
  ELSIF pay_tipo='DINHEIRO' THEN
    SELECT id INTO acc_id FROM public.bank_accounts WHERE default_dinheiro AND ativo LIMIT 1;
  END IF;

  -- RECEITA (uma por pedido)
  SELECT id INTO ja_receita FROM public.financial_transactions WHERE order_id=NEW.id AND tipo='RECEITA' LIMIT 1;
  IF ja_receita IS NULL THEN
    INSERT INTO public.financial_transactions(order_id, company_id, tipo, status, valor, pagamento, descricao, forma_pagamento, account_id)
    VALUES (NEW.id, NEW.company_id, 'RECEITA', 'PAGO', COALESCE(NEW.total,0), CURRENT_DATE,
            'Venda #'||substring(NEW.id::text,1,8), pay_tipo, acc_id);
  ELSE
    UPDATE public.financial_transactions
       SET status='PAGO', valor=COALESCE(NEW.total,0),
           pagamento=COALESCE(pagamento,CURRENT_DATE),
           forma_pagamento=COALESCE(forma_pagamento,pay_tipo),
           account_id=COALESCE(account_id,acc_id),
           updated_at=now()
     WHERE id=ja_receita;
  END IF;

  -- DESPESA custo peças — consolidada por DIA (só vendas avulsas)
  IF NEW.trip_id IS NULL THEN
    SELECT COALESCE(SUM(oi.quantidade*COALESCE(p.preco_custo,0)),0) INTO custo_total
      FROM public.order_items oi JOIN public.products p ON p.id=oi.product_id
     WHERE oi.order_id=NEW.id;

    IF custo_total>0 THEN
      dia_venda := CURRENT_DATE;
      dia_label := to_char(dia_venda, 'DD/MM/YYYY');
      desc_dia  := 'Custos das peças vendidas '||dia_label;

      -- Procura despesa consolidada existente para o dia (não-viagem, pendente)
      SELECT id INTO ja_despesa_dia
        FROM public.financial_transactions
       WHERE tipo='DESPESA'
         AND order_id IS NULL
         AND descricao = desc_dia
       LIMIT 1;

      IF ja_despesa_dia IS NULL THEN
        INSERT INTO public.financial_transactions(order_id, company_id, tipo, status, valor, vencimento, descricao)
        VALUES (NULL, NULL, 'DESPESA', 'PENDENTE', custo_total,
                dia_venda + INTERVAL '30 days', desc_dia);
      ELSE
        UPDATE public.financial_transactions
           SET valor = valor + custo_total, updated_at = now()
         WHERE id = ja_despesa_dia;
      END IF;
    END IF;
  END IF;

  RETURN NEW;
END; $$;

-- Consolida despesas antigas "Custo peças — Venda #xxxx" agrupando por dia da receita
DO $$
DECLARE
  r RECORD;
  novo_id UUID;
  desc_dia TEXT;
BEGIN
  FOR r IN
    SELECT date(COALESCE(rc.pagamento, ft.created_at::date)) as dia,
           SUM(ft.valor) as total
      FROM public.financial_transactions ft
      LEFT JOIN public.financial_transactions rc
        ON rc.order_id = ft.order_id AND rc.tipo='RECEITA'
     WHERE ft.tipo='DESPESA'
       AND ft.order_id IS NOT NULL
       AND ft.status='PENDENTE'
       AND ft.descricao ILIKE 'Custo peças — Venda%'
     GROUP BY 1
  LOOP
    desc_dia := 'Custos das peças vendidas '||to_char(r.dia, 'DD/MM/YYYY');
    INSERT INTO public.financial_transactions(order_id, company_id, tipo, status, valor, vencimento, descricao)
    VALUES (NULL, NULL, 'DESPESA', 'PENDENTE', r.total, r.dia + INTERVAL '30 days', desc_dia)
    RETURNING id INTO novo_id;
  END LOOP;

  -- Remove as antigas por pedido
  DELETE FROM public.financial_transactions
   WHERE tipo='DESPESA'
     AND order_id IS NOT NULL
     AND status='PENDENTE'
     AND descricao ILIKE 'Custo peças — Venda%';
END $$;


-- MIGRATION: 20260711010335_c2486954-cbdf-4869-b375-2cc45fe49d1e.sql
UPDATE public.financial_transactions ft
SET status = 'PENDENTE',
    pagamento = NULL,
    account_id = NULL
FROM public.payments p
WHERE ft.order_id = p.order_id
  AND p.tipo = 'CARTAO'
  AND ft.tipo = 'RECEITA'
  AND ft.status = 'PAGO';

-- MIGRATION: 20260711015342_b16113d4-357d-4654-99ae-c59d6cf77112.sql
ALTER TABLE public.trips ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id);
ALTER TABLE public.trips ADD COLUMN IF NOT EXISTS notas TEXT;

-- MIGRATION: 20260711015619_0c5c9791-7f4d-4a94-9c4a-b3373243280b.sql
CREATE OR REPLACE FUNCTION public.trip_close_v2(_trip_id uuid, _return_stock boolean DEFAULT true)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  rec RECORD;
  saldo NUMERIC;
  custo_total NUMERIC := 0;
  local_txt TEXT;
  trip_row RECORD;
  new_trip_id UUID := NULL;
BEGIN
  SELECT * INTO trip_row FROM public.trips WHERE id = _trip_id AND status = 'open';
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Viagem não está aberta';
  END IF;

  IF _return_stock THEN
    FOR rec IN SELECT * FROM public.trip_items WHERE trip_id = _trip_id LOOP
      saldo := rec.qtd_carregada - rec.qtd_vendida - rec.qtd_devolvida;
      IF saldo > 0 THEN
        UPDATE public.products SET estoque = COALESCE(estoque,0) + saldo WHERE id = rec.product_id;
        UPDATE public.trip_items SET qtd_devolvida = qtd_devolvida + saldo WHERE id = rec.id;
        INSERT INTO public.stock_movements(product_id, tipo, quantidade, motivo, reference_id, user_id)
          VALUES (rec.product_id, 'ENTRADA', saldo, 'Retorno de viagem', _trip_id, auth.uid());
      END IF;
    END LOOP;
  ELSE
    INSERT INTO public.trips(nome, cidade, estado, status, vendedor_id, created_by, notas)
    VALUES (
      'Sobras de ' || COALESCE(trip_row.nome, 'viagem'),
      trip_row.cidade,
      trip_row.estado,
      'open',
      COALESCE(trip_row.vendedor_id, auth.uid()),
      auth.uid(),
      'Gerada automaticamente ao encerrar viagem ' || COALESCE(trip_row.nome, _trip_id::text)
    )
    RETURNING id INTO new_trip_id;

    FOR rec IN SELECT * FROM public.trip_items WHERE trip_id = _trip_id LOOP
      saldo := rec.qtd_carregada - rec.qtd_vendida - rec.qtd_devolvida;
      IF saldo > 0 THEN
        INSERT INTO public.trip_items(trip_id, product_id, qtd_carregada)
          VALUES (new_trip_id, rec.product_id, saldo)
          ON CONFLICT (trip_id, product_id) DO UPDATE
            SET qtd_carregada = public.trip_items.qtd_carregada + EXCLUDED.qtd_carregada;
        UPDATE public.trip_items SET qtd_devolvida = qtd_devolvida + saldo WHERE id = rec.id;
        INSERT INTO public.stock_movements(product_id, tipo, quantidade, motivo, reference_id, user_id)
          VALUES (rec.product_id, 'TRANSFERENCIA', saldo, 'Transferência de saldo para nova viagem', new_trip_id, auth.uid());
      END IF;
    END LOOP;
  END IF;

  SELECT COALESCE(SUM(ti.qtd_vendida * COALESCE(p.preco_custo, 0)), 0)
    INTO custo_total
    FROM public.trip_items ti
    JOIN public.products p ON p.id = ti.product_id
   WHERE ti.trip_id = _trip_id;

  IF custo_total > 0 THEN
    SELECT CASE WHEN cidade IS NOT NULL THEN cidade || COALESCE('-' || estado, '') ELSE COALESCE(nome, 'Viagem') END
      INTO local_txt FROM public.trips WHERE id = _trip_id;

    INSERT INTO public.financial_transactions(tipo, valor, status, descricao, vencimento)
    VALUES ('DESPESA', custo_total, 'PENDENTE',
            'Custo peças vendidas — ' || local_txt,
            CURRENT_DATE + INTERVAL '30 days');
  END IF;

  UPDATE public.trips SET status = 'closed', closed_at = now() WHERE id = _trip_id;
  RETURN new_trip_id;
END;
$function$;

-- MIGRATION: 20260711020116_ca1a96b2-11ae-4976-975a-4d86ac4b9449.sql
CREATE OR REPLACE FUNCTION public.trip_recalculate_items(_trip_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  sold RECORD;
BEGIN
  FOR sold IN
    SELECT
      oi.product_id,
      COALESCE(SUM(oi.quantidade), 0)::numeric AS quantidade_vendida
    FROM public.orders o
    JOIN public.order_items oi ON oi.order_id = o.id
    WHERE o.trip_id = _trip_id
      AND o.status <> 'CANCELADO'
    GROUP BY oi.product_id
  LOOP
    INSERT INTO public.trip_items(
      trip_id,
      product_id,
      qtd_carregada,
      qtd_vendida,
      qtd_devolvida
    )
    VALUES (
      _trip_id,
      sold.product_id,
      sold.quantidade_vendida,
      sold.quantidade_vendida,
      0
    )
    ON CONFLICT (trip_id, product_id) DO UPDATE
      SET qtd_vendida = sold.quantidade_vendida,
          qtd_carregada = GREATEST(public.trip_items.qtd_carregada, sold.quantidade_vendida),
          updated_at = now();
  END LOOP;
END;
$function$;

GRANT EXECUTE ON FUNCTION public.trip_recalculate_items(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.trip_recalculate_items(uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.trip_apply_order(_order_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_trip uuid;
BEGIN
  SELECT trip_id INTO v_trip FROM public.orders WHERE id = _order_id;
  IF v_trip IS NULL THEN
    RETURN;
  END IF;

  PERFORM public.trip_recalculate_items(v_trip);
END;
$function$;

GRANT EXECUTE ON FUNCTION public.trip_apply_order(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.trip_apply_order(uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.trip_close(_trip_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  rec RECORD;
  saldo NUMERIC;
  custo_total NUMERIC := 0;
  local_txt TEXT;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.trips WHERE id = _trip_id AND status = 'open') THEN
    RAISE EXCEPTION 'Viagem não está aberta';
  END IF;

  PERFORM public.trip_recalculate_items(_trip_id);

  FOR rec IN SELECT * FROM public.trip_items WHERE trip_id = _trip_id LOOP
    saldo := rec.qtd_carregada - rec.qtd_vendida - rec.qtd_devolvida;
    IF saldo > 0 THEN
      UPDATE public.products SET estoque = COALESCE(estoque,0) + saldo WHERE id = rec.product_id;
      UPDATE public.trip_items SET qtd_devolvida = qtd_devolvida + saldo WHERE id = rec.id;
      INSERT INTO public.stock_movements(product_id, tipo, quantidade, motivo, reference_id, user_id)
        VALUES (rec.product_id, 'ENTRADA', saldo, 'Retorno de viagem', _trip_id, auth.uid());
    END IF;
  END LOOP;

  SELECT COALESCE(SUM(oi.quantidade * COALESCE(p.preco_custo, 0)), 0)
    INTO custo_total
    FROM public.orders o
    JOIN public.order_items oi ON oi.order_id = o.id
    JOIN public.products p ON p.id = oi.product_id
   WHERE o.trip_id = _trip_id
     AND o.status <> 'CANCELADO';

  IF custo_total > 0 THEN
    SELECT CASE WHEN cidade IS NOT NULL THEN cidade || COALESCE('-' || estado, '') ELSE COALESCE(nome, 'Viagem') END
      INTO local_txt FROM public.trips WHERE id = _trip_id;

    INSERT INTO public.financial_transactions(tipo, valor, status, descricao, vencimento)
    VALUES ('DESPESA', custo_total, 'PENDENTE',
            'Custo peças vendidas — ' || local_txt,
            CURRENT_DATE + INTERVAL '30 days');
  END IF;

  UPDATE public.trips SET status = 'closed', closed_at = now() WHERE id = _trip_id;
END;
$function$;

CREATE OR REPLACE FUNCTION public.trip_close_v2(_trip_id uuid, _return_stock boolean DEFAULT true)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  rec RECORD;
  saldo NUMERIC;
  custo_total NUMERIC := 0;
  local_txt TEXT;
  trip_row RECORD;
  new_trip_id UUID := NULL;
BEGIN
  SELECT * INTO trip_row FROM public.trips WHERE id = _trip_id AND status = 'open';
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Viagem não está aberta';
  END IF;

  PERFORM public.trip_recalculate_items(_trip_id);

  IF _return_stock THEN
    FOR rec IN SELECT * FROM public.trip_items WHERE trip_id = _trip_id LOOP
      saldo := rec.qtd_carregada - rec.qtd_vendida - rec.qtd_devolvida;
      IF saldo > 0 THEN
        UPDATE public.products SET estoque = COALESCE(estoque,0) + saldo WHERE id = rec.product_id;
        UPDATE public.trip_items SET qtd_devolvida = qtd_devolvida + saldo WHERE id = rec.id;
        INSERT INTO public.stock_movements(product_id, tipo, quantidade, motivo, reference_id, user_id)
          VALUES (rec.product_id, 'ENTRADA', saldo, 'Retorno de viagem', _trip_id, auth.uid());
      END IF;
    END LOOP;
  ELSE
    INSERT INTO public.trips(nome, cidade, estado, status, vendedor_id, created_by, notas)
    VALUES (
      'Sobras de ' || COALESCE(trip_row.nome, 'viagem'),
      trip_row.cidade,
      trip_row.estado,
      'open',
      COALESCE(trip_row.vendedor_id, auth.uid()),
      auth.uid(),
      'Gerada automaticamente ao encerrar viagem ' || COALESCE(trip_row.nome, _trip_id::text)
    )
    RETURNING id INTO new_trip_id;

    FOR rec IN SELECT * FROM public.trip_items WHERE trip_id = _trip_id LOOP
      saldo := rec.qtd_carregada - rec.qtd_vendida - rec.qtd_devolvida;
      IF saldo > 0 THEN
        INSERT INTO public.trip_items(trip_id, product_id, qtd_carregada)
          VALUES (new_trip_id, rec.product_id, saldo)
          ON CONFLICT (trip_id, product_id) DO UPDATE
            SET qtd_carregada = public.trip_items.qtd_carregada + EXCLUDED.qtd_carregada;
        UPDATE public.trip_items SET qtd_devolvida = qtd_devolvida + saldo WHERE id = rec.id;
        INSERT INTO public.stock_movements(product_id, tipo, quantidade, motivo, reference_id, user_id)
          VALUES (rec.product_id, 'TRANSFERENCIA', saldo, 'Transferência de saldo para nova viagem', new_trip_id, auth.uid());
      END IF;
    END LOOP;
  END IF;

  SELECT COALESCE(SUM(oi.quantidade * COALESCE(p.preco_custo, 0)), 0)
    INTO custo_total
    FROM public.orders o
    JOIN public.order_items oi ON oi.order_id = o.id
    JOIN public.products p ON p.id = oi.product_id
   WHERE o.trip_id = _trip_id
     AND o.status <> 'CANCELADO';

  IF custo_total > 0 THEN
    SELECT CASE WHEN cidade IS NOT NULL THEN cidade || COALESCE('-' || estado, '') ELSE COALESCE(nome, 'Viagem') END
      INTO local_txt FROM public.trips WHERE id = _trip_id;

    INSERT INTO public.financial_transactions(tipo, valor, status, descricao, vencimento)
    VALUES ('DESPESA', custo_total, 'PENDENTE',
            'Custo peças vendidas — ' || local_txt,
            CURRENT_DATE + INTERVAL '30 days');
  END IF;

  UPDATE public.trips SET status = 'closed', closed_at = now() WHERE id = _trip_id;
  RETURN new_trip_id;
END;
$function$;

DO $function$
DECLARE
  trip_row RECORD;
BEGIN
  FOR trip_row IN SELECT id FROM public.trips LOOP
    PERFORM public.trip_recalculate_items(trip_row.id);
  END LOOP;
END;
$function$;

-- MIGRATION: 20260711020328_09deac78-fd5d-45ee-9a3c-ef630092326d.sql
REVOKE EXECUTE ON FUNCTION public.trip_recalculate_items(uuid) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.trip_recalculate_items(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.trip_recalculate_items(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.trip_recalculate_items(uuid) TO service_role;

REVOKE EXECUTE ON FUNCTION public.trip_apply_order(uuid) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.trip_apply_order(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.trip_apply_order(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.trip_apply_order(uuid) TO service_role;

REVOKE EXECUTE ON FUNCTION public.trip_close(uuid) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.trip_close(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.trip_close(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.trip_close(uuid) TO service_role;

REVOKE EXECUTE ON FUNCTION public.trip_close_v2(uuid, boolean) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.trip_close_v2(uuid, boolean) FROM anon;
GRANT EXECUTE ON FUNCTION public.trip_close_v2(uuid, boolean) TO authenticated;
GRANT EXECUTE ON FUNCTION public.trip_close_v2(uuid, boolean) TO service_role;

-- MIGRATION: 20260711134426_00b4e413-d008-4288-a360-56e24c16da9c.sql

-- C1: Trigger de estorno completo ao cancelar pedido pago/em separação/enviado
CREATE OR REPLACE FUNCTION public.order_cancel_reverse()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  it RECORD;
  custo_pedido NUMERIC := 0;
  desp RECORD;
  dia_label TEXT;
  desc_dia TEXT;
BEGIN
  -- Só age quando o status ESTÁ mudando PARA CANCELADO
  IF NOT (TG_OP = 'UPDATE' AND NEW.status = 'CANCELADO' AND OLD.status IS DISTINCT FROM 'CANCELADO') THEN
    RETURN NEW;
  END IF;

  -- Não permitir cancelar pedido já entregue
  IF OLD.status = 'ENTREGUE' THEN
    RAISE EXCEPTION 'Pedido já ENTREGUE não pode ser cancelado. Estorno manual necessário.';
  END IF;

  -- Se o pedido nunca chegou a PAGO, não há o que estornar financeiramente
  IF OLD.status NOT IN ('PAGO','EM_SEPARACAO','ENVIADO') THEN
    RETURN NEW;
  END IF;

  -- 1) Estornar RECEITA(s) financeira(s) desse pedido
  UPDATE public.financial_transactions
     SET status = 'ESTORNADO',
         updated_at = now(),
         descricao = COALESCE(descricao,'') || ' [Estorno cancelamento em ' || to_char(now(),'DD/MM/YYYY HH24:MI') || ']'
   WHERE order_id = NEW.id
     AND tipo = 'RECEITA'
     AND status <> 'ESTORNADO';

  -- 2) Calcular custo das peças desse pedido
  SELECT COALESCE(SUM(oi.quantidade * COALESCE(p.preco_custo,0)),0)
    INTO custo_pedido
    FROM public.order_items oi
    JOIN public.products p ON p.id = oi.product_id
   WHERE oi.order_id = NEW.id;

  -- 2a) Se pedido AVULSO (sem trip_id) e houve custo consolidado no dia, subtrair
  IF NEW.trip_id IS NULL AND custo_pedido > 0 THEN
    dia_label := to_char(COALESCE(OLD.created_at::date, CURRENT_DATE), 'DD/MM/YYYY');
    desc_dia  := 'Custos das peças vendidas ' || dia_label;

    SELECT id, valor INTO desp
      FROM public.financial_transactions
     WHERE tipo = 'DESPESA'
       AND order_id IS NULL
       AND descricao = desc_dia
     LIMIT 1;

    IF FOUND THEN
      IF desp.valor - custo_pedido <= 0 THEN
        DELETE FROM public.financial_transactions WHERE id = desp.id;
      ELSE
        UPDATE public.financial_transactions
           SET valor = valor - custo_pedido, updated_at = now()
         WHERE id = desp.id;
      END IF;
    END IF;
  END IF;

  -- 3) Devolver estoque item a item
  FOR it IN
    SELECT product_id, quantidade FROM public.order_items WHERE order_id = NEW.id
  LOOP
    IF NEW.trip_id IS NOT NULL THEN
      -- Devolve à viagem: reduz qtd_vendida
      UPDATE public.trip_items
         SET qtd_vendida = GREATEST(qtd_vendida - it.quantidade, 0),
             updated_at = now()
       WHERE trip_id = NEW.trip_id
         AND product_id = it.product_id;
    ELSE
      -- Devolve ao estoque geral
      UPDATE public.products
         SET estoque = COALESCE(estoque,0) + it.quantidade
       WHERE id = it.product_id;

      INSERT INTO public.stock_movements(product_id, tipo, quantidade, motivo, reference_id, user_id)
      VALUES (it.product_id, 'ENTRADA', it.quantidade,
              'Estorno de cancelamento — pedido ' || substring(NEW.id::text,1,8),
              NEW.id, auth.uid());
    END IF;
  END LOOP;

  -- 4) Recalcular a viagem, se aplicável
  IF NEW.trip_id IS NOT NULL THEN
    PERFORM public.trip_recalculate_items(NEW.trip_id);
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_order_cancel_reverse ON public.orders;
CREATE TRIGGER trg_order_cancel_reverse
BEFORE UPDATE OF status ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.order_cancel_reverse();

REVOKE ALL ON FUNCTION public.order_cancel_reverse() FROM PUBLIC, anon;


-- MIGRATION: 20260711134609_6e9cc443-80bc-4e03-9215-d379eb814ef1.sql

-- C2: flag idempotente para o lançamento de custo
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS custo_lancado_em TIMESTAMPTZ;

-- Marcar retroativamente os pedidos já pagos e cujo custo já foi contabilizado
-- (evita re-lançamento na próxima transição de status)
UPDATE public.orders
   SET custo_lancado_em = COALESCE(updated_at, created_at, now())
 WHERE custo_lancado_em IS NULL
   AND status IN ('PAGO','EM_SEPARACAO','ENVIADO','ENTREGUE');

-- Recria trigger de sync financeiro com guarda idempotente
CREATE OR REPLACE FUNCTION public.order_sync_financials()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  custo_total NUMERIC := 0;
  ja_receita UUID;
  ja_despesa_dia UUID;
  pay_tipo TEXT; acc_id UUID;
  dia_venda DATE;
  dia_label TEXT;
  desc_dia TEXT;
BEGIN
  IF NOT (
    (TG_OP='INSERT' AND NEW.status='PAGO') OR
    (TG_OP='UPDATE' AND NEW.status='PAGO' AND NEW.status IS DISTINCT FROM OLD.status)
  ) THEN RETURN NEW; END IF;

  SELECT tipo::text INTO pay_tipo FROM public.payments WHERE order_id=NEW.id ORDER BY created_at DESC LIMIT 1;

  IF pay_tipo='CARTAO' THEN
    SELECT id INTO acc_id FROM public.bank_accounts WHERE default_cartao AND ativo LIMIT 1;
  ELSIF pay_tipo='PIX' THEN
    SELECT id INTO acc_id FROM public.bank_accounts WHERE default_pix AND ativo LIMIT 1;
  ELSIF pay_tipo='DINHEIRO' THEN
    SELECT id INTO acc_id FROM public.bank_accounts WHERE default_dinheiro AND ativo LIMIT 1;
  END IF;

  -- RECEITA (uma por pedido, idempotente por order_id)
  SELECT id INTO ja_receita
    FROM public.financial_transactions
   WHERE order_id=NEW.id AND tipo='RECEITA'
   LIMIT 1;

  IF ja_receita IS NULL THEN
    INSERT INTO public.financial_transactions(order_id, company_id, tipo, status, valor, pagamento, descricao, forma_pagamento, account_id)
    VALUES (NEW.id, NEW.company_id, 'RECEITA', 'PAGO', COALESCE(NEW.total,0), CURRENT_DATE,
            'Venda #'||substring(NEW.id::text,1,8), pay_tipo, acc_id);
  ELSE
    UPDATE public.financial_transactions
       SET status='PAGO', valor=COALESCE(NEW.total,0),
           pagamento=COALESCE(pagamento,CURRENT_DATE),
           forma_pagamento=COALESCE(forma_pagamento,pay_tipo),
           account_id=COALESCE(account_id,acc_id),
           updated_at=now()
     WHERE id=ja_receita;
  END IF;

  -- DESPESA custo peças — consolidada por DIA (só vendas avulsas)
  -- IDEMPOTENTE: só lança se orders.custo_lancado_em IS NULL
  IF NEW.trip_id IS NULL AND NEW.custo_lancado_em IS NULL THEN
    SELECT COALESCE(SUM(oi.quantidade*COALESCE(p.preco_custo,0)),0) INTO custo_total
      FROM public.order_items oi JOIN public.products p ON p.id=oi.product_id
     WHERE oi.order_id=NEW.id;

    IF custo_total > 0 THEN
      dia_venda := CURRENT_DATE;
      dia_label := to_char(dia_venda, 'DD/MM/YYYY');
      desc_dia  := 'Custos das peças vendidas '||dia_label;

      SELECT id INTO ja_despesa_dia
        FROM public.financial_transactions
       WHERE tipo='DESPESA'
         AND order_id IS NULL
         AND descricao = desc_dia
       LIMIT 1;

      IF ja_despesa_dia IS NULL THEN
        INSERT INTO public.financial_transactions(order_id, company_id, tipo, status, valor, vencimento, descricao)
        VALUES (NULL, NULL, 'DESPESA', 'PENDENTE', custo_total,
                dia_venda + INTERVAL '30 days', desc_dia);
      ELSE
        UPDATE public.financial_transactions
           SET valor = valor + custo_total, updated_at = now()
         WHERE id = ja_despesa_dia;
      END IF;
    END IF;

    -- Marca como lançado (mesmo se custo_total=0, para não reavaliar)
    NEW.custo_lancado_em := now();
  END IF;

  RETURN NEW;
END; $function$;

-- Recria trigger de cancelamento para também limpar a flag
CREATE OR REPLACE FUNCTION public.order_cancel_reverse()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  it RECORD;
  custo_pedido NUMERIC := 0;
  desp RECORD;
  dia_label TEXT;
  desc_dia TEXT;
BEGIN
  IF NOT (TG_OP = 'UPDATE' AND NEW.status = 'CANCELADO' AND OLD.status IS DISTINCT FROM 'CANCELADO') THEN
    RETURN NEW;
  END IF;

  IF OLD.status = 'ENTREGUE' THEN
    RAISE EXCEPTION 'Pedido já ENTREGUE não pode ser cancelado. Estorno manual necessário.';
  END IF;

  IF OLD.status NOT IN ('PAGO','EM_SEPARACAO','ENVIADO') THEN
    RETURN NEW;
  END IF;

  UPDATE public.financial_transactions
     SET status = 'ESTORNADO',
         updated_at = now(),
         descricao = COALESCE(descricao,'') || ' [Estorno cancelamento em ' || to_char(now(),'DD/MM/YYYY HH24:MI') || ']'
   WHERE order_id = NEW.id
     AND tipo = 'RECEITA'
     AND status <> 'ESTORNADO';

  SELECT COALESCE(SUM(oi.quantidade * COALESCE(p.preco_custo,0)),0)
    INTO custo_pedido
    FROM public.order_items oi
    JOIN public.products p ON p.id = oi.product_id
   WHERE oi.order_id = NEW.id;

  IF NEW.trip_id IS NULL AND custo_pedido > 0 AND OLD.custo_lancado_em IS NOT NULL THEN
    dia_label := to_char(COALESCE(OLD.custo_lancado_em::date, OLD.created_at::date, CURRENT_DATE), 'DD/MM/YYYY');
    desc_dia  := 'Custos das peças vendidas ' || dia_label;

    SELECT id, valor INTO desp
      FROM public.financial_transactions
     WHERE tipo = 'DESPESA'
       AND order_id IS NULL
       AND descricao = desc_dia
     LIMIT 1;

    IF FOUND THEN
      IF desp.valor - custo_pedido <= 0 THEN
        DELETE FROM public.financial_transactions WHERE id = desp.id;
      ELSE
        UPDATE public.financial_transactions
           SET valor = valor - custo_pedido, updated_at = now()
         WHERE id = desp.id;
      END IF;
    END IF;
  END IF;

  -- Limpar flag para permitir relançamento correto se pedido for repago
  NEW.custo_lancado_em := NULL;

  FOR it IN
    SELECT product_id, quantidade FROM public.order_items WHERE order_id = NEW.id
  LOOP
    IF NEW.trip_id IS NOT NULL THEN
      UPDATE public.trip_items
         SET qtd_vendida = GREATEST(qtd_vendida - it.quantidade, 0),
             updated_at = now()
       WHERE trip_id = NEW.trip_id
         AND product_id = it.product_id;
    ELSE
      UPDATE public.products
         SET estoque = COALESCE(estoque,0) + it.quantidade
       WHERE id = it.product_id;

      INSERT INTO public.stock_movements(product_id, tipo, quantidade, motivo, reference_id, user_id)
      VALUES (it.product_id, 'ENTRADA', it.quantidade,
              'Estorno de cancelamento — pedido ' || substring(NEW.id::text,1,8),
              NEW.id, auth.uid());
    END IF;
  END LOOP;

  IF NEW.trip_id IS NOT NULL THEN
    PERFORM public.trip_recalculate_items(NEW.trip_id);
  END IF;

  RETURN NEW;
END;
$$;


-- MIGRATION: 20260711134737_9204c7b2-9cdd-487e-937f-b039a8a5b3ac.sql

CREATE OR REPLACE FUNCTION public.trip_recalculate_items(_trip_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  sold RECORD;
BEGIN
  -- Zera qtd_vendida de itens que não têm mais vendas (evita resíduo de cancelamentos antigos)
  UPDATE public.trip_items ti
     SET qtd_vendida = 0,
         updated_at = now()
   WHERE ti.trip_id = _trip_id
     AND ti.qtd_vendida > 0
     AND NOT EXISTS (
       SELECT 1 FROM public.orders o
       JOIN public.order_items oi ON oi.order_id = o.id
       WHERE o.trip_id = _trip_id
         AND o.status <> 'CANCELADO'
         AND oi.product_id = ti.product_id
     );

  FOR sold IN
    SELECT
      oi.product_id,
      COALESCE(SUM(oi.quantidade), 0)::numeric AS quantidade_vendida
    FROM public.orders o
    JOIN public.order_items oi ON oi.order_id = o.id
    WHERE o.trip_id = _trip_id
      AND o.status <> 'CANCELADO'
    GROUP BY oi.product_id
  LOOP
    -- IMPORTANTE: NÃO inflar qtd_carregada. Vendas sem carga => saldo negativo,
    -- que é o sinal correto de sobrevenda.
    INSERT INTO public.trip_items(
      trip_id,
      product_id,
      qtd_carregada,
      qtd_vendida,
      qtd_devolvida
    )
    VALUES (
      _trip_id,
      sold.product_id,
      0,                        -- carregada = 0 quando peça não foi carregada
      sold.quantidade_vendida,
      0
    )
    ON CONFLICT (trip_id, product_id) DO UPDATE
      SET qtd_vendida = EXCLUDED.qtd_vendida,
          updated_at = now();
    -- qtd_carregada preservado como está (não é alterado)
  END LOOP;
END;
$function$;


-- MIGRATION: 20260711134907_fe8b8d0d-8a61-46ff-9d78-15d69557a828.sql

CREATE OR REPLACE FUNCTION public.stock_deduct_open_trips()
 RETURNS TABLE(product_id uuid, deduzido numeric, insuficientes boolean)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  rec RECORD;
  saldo NUMERIC;
  atual NUMERIC;
  ja_deduzido NUMERIC;
  ja_saida_carga NUMERIC;
  ja_entrada_retorno NUMERIC;
  a_deduzir NUMERIC;
BEGIN
  FOR rec IN
    SELECT ti.product_id AS pid,
           SUM(ti.qtd_carregada - ti.qtd_vendida - ti.qtd_devolvida) AS saldo_viagem
      FROM public.trip_items ti
      JOIN public.trips t ON t.id = ti.trip_id
     WHERE t.status = 'open'
     GROUP BY ti.product_id
    HAVING SUM(ti.qtd_carregada - ti.qtd_vendida - ti.qtd_devolvida) > 0
  LOOP
    SELECT COALESCE(estoque,0) INTO atual FROM public.products WHERE id = rec.pid;
    saldo := rec.saldo_viagem;

    -- Ajustes anteriores desta própria rotina (líquido: AJUSTE - estornos)
    SELECT COALESCE(SUM(
      CASE WHEN tipo = 'AJUSTE' THEN quantidade
           WHEN tipo = 'ENTRADA' AND motivo ILIKE 'Estorno%' THEN -quantidade
           ELSE 0 END
    ), 0)
      INTO ja_deduzido
      FROM public.stock_movements
     WHERE product_id = rec.pid
       AND (motivo = 'Separação: estoque já carregado em viagem aberta'
            OR motivo ILIKE 'Estorno: dedução em viagens duplicada');

    -- SAIDAs de carga em viagem (feitas pelo fluxo normal trip_load_items) em viagens AINDA ABERTAS
    SELECT COALESCE(SUM(sm.quantidade), 0) INTO ja_saida_carga
      FROM public.stock_movements sm
      JOIN public.trips t ON t.id = sm.reference_id
     WHERE sm.product_id = rec.pid
       AND sm.tipo = 'SAIDA'
       AND sm.motivo = 'Carga em viagem'
       AND t.status = 'open';

    -- Retornos já efetuados em viagens abertas (raro, mas por segurança)
    SELECT COALESCE(SUM(sm.quantidade), 0) INTO ja_entrada_retorno
      FROM public.stock_movements sm
      JOIN public.trips t ON t.id = sm.reference_id
     WHERE sm.product_id = rec.pid
       AND sm.tipo = 'ENTRADA'
       AND sm.motivo = 'Retorno de viagem'
       AND t.status = 'open';

    -- Faltando deduzir = saldo em viagens abertas − (já saído pela carga − retornos) − ajustes desta rotina
    a_deduzir := saldo - (ja_saida_carga - ja_entrada_retorno) - ja_deduzido;

    IF a_deduzir <= 0 THEN
      product_id := rec.pid; deduzido := 0; insuficientes := false; RETURN NEXT;
      CONTINUE;
    END IF;

    IF atual < a_deduzir THEN
      product_id := rec.pid; deduzido := 0; insuficientes := true; RETURN NEXT;
      CONTINUE;
    END IF;

    UPDATE public.products SET estoque = atual - a_deduzir WHERE id = rec.pid;

    INSERT INTO public.stock_movements(product_id, tipo, quantidade, motivo, user_id)
    VALUES (rec.pid, 'AJUSTE', a_deduzir, 'Separação: estoque já carregado em viagem aberta', auth.uid());

    product_id := rec.pid; deduzido := a_deduzir; insuficientes := false; RETURN NEXT;
  END LOOP;
END $function$;


-- MIGRATION: 20260711135119_1c1159d4-558f-4c7c-a7f5-d2e670ca4e75.sql

-- C5: Ajuste atômico de estoque + registro de movimento
CREATE OR REPLACE FUNCTION public.stock_apply_delta(
  _product_id UUID,
  _delta NUMERIC,           -- positivo = ENTRADA / negativo = SAIDA
  _tipo TEXT,               -- 'ENTRADA' | 'SAIDA' | 'AJUSTE'
  _motivo TEXT,
  _ref UUID DEFAULT NULL,
  _allow_negative BOOLEAN DEFAULT FALSE
)
RETURNS NUMERIC
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  novo NUMERIC;
BEGIN
  IF _delta = 0 THEN
    SELECT COALESCE(estoque,0) INTO novo FROM public.products WHERE id = _product_id;
    RETURN novo;
  END IF;

  -- UPDATE atômico (lock de linha implícito). RETURNING evita SELECT prévio.
  UPDATE public.products
     SET estoque = COALESCE(estoque,0) + _delta,
         updated_at = now()
   WHERE id = _product_id
  RETURNING estoque INTO novo;

  IF novo IS NULL THEN
    RAISE EXCEPTION 'Produto % não encontrado', _product_id;
  END IF;

  IF novo < 0 AND NOT _allow_negative THEN
    -- reverter e abortar
    UPDATE public.products SET estoque = COALESCE(estoque,0) - _delta WHERE id = _product_id;
    RAISE EXCEPTION 'Estoque insuficiente para o produto (saldo ficaria %). Operação cancelada.', novo;
  END IF;

  INSERT INTO public.stock_movements(product_id, tipo, quantidade, motivo, reference_id, user_id)
  VALUES (_product_id, _tipo, ABS(_delta), _motivo, _ref, auth.uid());

  RETURN novo;
END;
$$;

REVOKE ALL ON FUNCTION public.stock_apply_delta(UUID,NUMERIC,TEXT,TEXT,UUID,BOOLEAN) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.stock_apply_delta(UUID,NUMERIC,TEXT,TEXT,UUID,BOOLEAN) TO authenticated, service_role;


-- MIGRATION: 20260711135512_ec74d0b7-bf9a-4d3c-b527-9f8805bf1966.sql

CREATE OR REPLACE FUNCTION public.order_create_atomic(_payload JSONB)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_company_id UUID := (_payload->>'company_id')::UUID;
  v_address_id UUID := NULLIF(_payload->>'address_id','')::UUID;
  v_origem     TEXT := _payload->>'origem';
  v_frete      NUMERIC := COALESCE((_payload->>'frete')::NUMERIC, 0);
  v_desconto   NUMERIC := COALESCE((_payload->>'desconto')::NUMERIC, 0);
  v_acrescimo  NUMERIC := COALESCE((_payload->>'acrescimo')::NUMERIC, 0);
  v_observacao TEXT := _payload->>'observacao';
  v_pagamento  TEXT := _payload->>'pagamento';
  v_trip_id    UUID := NULLIF(_payload->>'trip_id','')::UUID;
  v_created_by UUID := auth.uid();

  v_order_id   UUID;
  v_subtotal   NUMERIC := 0;
  v_total      NUMERIC := 0;

  it JSONB;
  v_product_id UUID;
  v_tipo_compra TEXT;
  v_qtd NUMERIC;
  v_preco_unit NUMERIC;
  v_preco_pac NUMERIC;
  v_preco_final NUMERIC;
  v_item_subtotal NUMERIC;
BEGIN
  IF v_company_id IS NULL THEN RAISE EXCEPTION 'company_id obrigatório'; END IF;
  IF v_origem IS NULL THEN RAISE EXCEPTION 'origem obrigatório'; END IF;
  IF v_pagamento IS NULL THEN RAISE EXCEPTION 'pagamento obrigatório'; END IF;
  IF jsonb_array_length(_payload->'items') = 0 THEN
    RAISE EXCEPTION 'Pedido precisa de pelo menos 1 item';
  END IF;

  -- 1) Cria pedido (subtotal/total serão atualizados após itens)
  INSERT INTO public.orders(
    company_id, address_id, origem, status,
    subtotal, frete, desconto, total,
    observacao, created_by, trip_id
  ) VALUES (
    v_company_id, v_address_id, v_origem::order_origem, 'AGUARDANDO_PAGAMENTO'::order_status,
    0, v_frete, v_desconto, 0,
    v_observacao, v_created_by, v_trip_id
  ) RETURNING id INTO v_order_id;

  -- 2) Insere itens + calcula subtotal
  FOR it IN SELECT * FROM jsonb_array_elements(_payload->'items')
  LOOP
    v_product_id := (it->>'product_id')::UUID;
    v_tipo_compra := COALESCE(it->>'tipo_compra','UNIDADE');
    v_qtd := (it->>'quantidade')::NUMERIC;
    v_preco_unit := (it->>'preco_unitario')::NUMERIC;
    v_preco_pac := NULLIF(it->>'preco_pacote','')::NUMERIC;

    IF v_qtd IS NULL OR v_qtd <= 0 THEN
      RAISE EXCEPTION 'Quantidade inválida para item %', v_product_id;
    END IF;

    v_preco_final := CASE
      WHEN v_tipo_compra = 'PACOTE' AND v_preco_pac IS NOT NULL THEN v_preco_pac
      ELSE v_preco_unit
    END;
    v_item_subtotal := v_preco_final * v_qtd;

    INSERT INTO public.order_items(
      order_id, product_id, tipo_compra, quantidade,
      preco_unitario, preco_final, subtotal
    ) VALUES (
      v_order_id, v_product_id, v_tipo_compra, v_qtd,
      v_preco_unit, v_preco_final, v_item_subtotal
    );

    v_subtotal := v_subtotal + v_item_subtotal;

    -- 3) Baixa de estoque (só para vendas AVULSAS; viagens usam trip_apply_order)
    IF v_trip_id IS NULL THEN
      PERFORM public.stock_apply_delta(
        v_product_id,
        -v_qtd,
        'SAIDA',
        'Venda pedido ' || substring(v_order_id::text,1,8),
        v_order_id,
        TRUE  -- vendas podem gerar estoque negativo (alerta, não bloqueio)
      );
    END IF;
  END LOOP;

  v_total := v_subtotal + v_frete - v_desconto + v_acrescimo;

  UPDATE public.orders
     SET subtotal = v_subtotal, total = v_total
   WHERE id = v_order_id;

  -- 4) Payment
  INSERT INTO public.payments(order_id, tipo, valor, status)
  VALUES (v_order_id, v_pagamento::payment_tipo, v_total, 'PENDENTE'::payment_status);

  -- 5) Se viagem, recalcula
  IF v_trip_id IS NOT NULL THEN
    PERFORM public.trip_recalculate_items(v_trip_id);
  END IF;

  RETURN v_order_id;
END;
$$;

REVOKE ALL ON FUNCTION public.order_create_atomic(JSONB) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.order_create_atomic(JSONB) TO authenticated, service_role;


-- MIGRATION: 20260711135706_8e214f35-245d-42eb-a442-63cf279012b8.sql

-- Helper: manager = admin OR gerente
CREATE OR REPLACE FUNCTION public.is_manager(_uid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _uid
      AND role IN ('admin'::app_role, 'gerente'::app_role)
  )
$$;

REVOKE ALL ON FUNCTION public.is_manager(UUID) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_manager(UUID) TO authenticated, service_role;

-- Reescrita das policies de trip_expenses
DROP POLICY IF EXISTS "Vendedor vê despesas de suas viagens" ON public.trip_expenses;
DROP POLICY IF EXISTS "Vendedor lança despesas em suas viagens" ON public.trip_expenses;
DROP POLICY IF EXISTS "Vendedor edita despesas de suas viagens" ON public.trip_expenses;
DROP POLICY IF EXISTS "Vendedor apaga despesas de suas viagens" ON public.trip_expenses;

CREATE POLICY "Ver despesas das próprias viagens (ou manager)"
ON public.trip_expenses FOR SELECT
TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.trips t WHERE t.id = trip_expenses.trip_id AND t.vendedor_id = auth.uid())
  OR public.is_manager(auth.uid())
);

CREATE POLICY "Inserir despesas nas próprias viagens (ou manager)"
ON public.trip_expenses FOR INSERT
TO authenticated
WITH CHECK (
  created_by = auth.uid()
  AND (
    EXISTS (SELECT 1 FROM public.trips t WHERE t.id = trip_expenses.trip_id AND t.vendedor_id = auth.uid())
    OR public.is_manager(auth.uid())
  )
);

CREATE POLICY "Editar despesas das próprias viagens (ou manager)"
ON public.trip_expenses FOR UPDATE
TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.trips t WHERE t.id = trip_expenses.trip_id AND t.vendedor_id = auth.uid())
  OR public.is_manager(auth.uid())
)
WITH CHECK (
  EXISTS (SELECT 1 FROM public.trips t WHERE t.id = trip_expenses.trip_id AND t.vendedor_id = auth.uid())
  OR public.is_manager(auth.uid())
);

CREATE POLICY "Apagar despesas das próprias viagens (ou manager)"
ON public.trip_expenses FOR DELETE
TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.trips t WHERE t.id = trip_expenses.trip_id AND t.vendedor_id = auth.uid())
  OR public.is_manager(auth.uid())
);


-- MIGRATION: 20260711135911_592f5a11-ce74-4c78-a044-99d1305687ee.sql

-- Índice único: no máximo 1 RECEITA por pedido
CREATE UNIQUE INDEX IF NOT EXISTS financial_transactions_order_receita_uniq
  ON public.financial_transactions(order_id)
  WHERE tipo = 'RECEITA' AND order_id IS NOT NULL;

-- Reescreve o trigger para ser a única fonte de verdade da RECEITA
CREATE OR REPLACE FUNCTION public.order_sync_financials()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  custo_total NUMERIC := 0;
  ja_receita UUID;
  ja_despesa_dia UUID;
  pay RECORD;
  pay_tipo TEXT;
  parcelas_num INT := 1;
  conta_txt TEXT;
  observ_txt TEXT;
  acc_id UUID;
  is_cartao BOOLEAN;
  status_fin TEXT;
  pagamento_fin DATE;
  forma_txt TEXT;
  dia_venda DATE;
  dia_label TEXT;
  desc_dia TEXT;
BEGIN
  IF NOT (
    (TG_OP='INSERT' AND NEW.status='PAGO') OR
    (TG_OP='UPDATE' AND NEW.status='PAGO' AND NEW.status IS DISTINCT FROM OLD.status)
  ) THEN RETURN NEW; END IF;

  -- Lê o pagamento mais recente com metadados (parcelas, conta, observação)
  SELECT tipo::text,
         COALESCE((payload->>'parcelas')::int, 1) AS parcelas,
         payload->>'conta' AS conta,
         payload->>'observacao' AS observ,
         account_id
    INTO pay
    FROM public.payments
   WHERE order_id = NEW.id
   ORDER BY created_at DESC
   LIMIT 1;

  pay_tipo := pay.tipo;
  parcelas_num := COALESCE(pay.parcelas, 1);
  conta_txt := pay.conta;
  observ_txt := pay.observ;
  acc_id := pay.account_id;

  -- Se o pagamento não trouxe account_id, usa a conta padrão da forma
  IF acc_id IS NULL THEN
    IF pay_tipo = 'CARTAO' THEN
      SELECT id INTO acc_id FROM public.bank_accounts WHERE default_cartao AND ativo LIMIT 1;
    ELSIF pay_tipo = 'PIX' THEN
      SELECT id INTO acc_id FROM public.bank_accounts WHERE default_pix AND ativo LIMIT 1;
    ELSIF pay_tipo = 'DINHEIRO' THEN
      SELECT id INTO acc_id FROM public.bank_accounts WHERE default_dinheiro AND ativo LIMIT 1;
    END IF;
  END IF;

  is_cartao := pay_tipo = 'CARTAO';
  status_fin := CASE WHEN is_cartao THEN 'PENDENTE' ELSE 'PAGO' END;
  pagamento_fin := CASE WHEN is_cartao THEN NULL ELSE CURRENT_DATE END;
  forma_txt := CASE
    WHEN is_cartao AND conta_txt IS NOT NULL THEN conta_txt || ' · ' || parcelas_num || 'x'
    WHEN conta_txt IS NOT NULL THEN conta_txt
    ELSE pay_tipo
  END;

  -- RECEITA (uma por pedido, idempotente)
  SELECT id INTO ja_receita
    FROM public.financial_transactions
   WHERE order_id = NEW.id AND tipo = 'RECEITA'
   LIMIT 1;

  IF ja_receita IS NULL THEN
    INSERT INTO public.financial_transactions(
      order_id, company_id, tipo, status, valor,
      pagamento, descricao, forma_pagamento, parcelas,
      account_id
    ) VALUES (
      NEW.id, NEW.company_id, 'RECEITA', status_fin, COALESCE(NEW.total,0),
      pagamento_fin,
      COALESCE(observ_txt, 'Venda #'||substring(NEW.id::text,1,8)),
      forma_txt, parcelas_num,
      CASE WHEN is_cartao THEN NULL ELSE acc_id END
    );
  ELSE
    -- Apenas complementa se estiver vazio; não sobrescreve escolhas do operador
    UPDATE public.financial_transactions
       SET status = status_fin,
           valor = COALESCE(NEW.total, valor),
           pagamento = COALESCE(pagamento, pagamento_fin),
           forma_pagamento = COALESCE(forma_pagamento, forma_txt),
           parcelas = COALESCE(parcelas, parcelas_num),
           account_id = COALESCE(account_id, CASE WHEN is_cartao THEN NULL ELSE acc_id END),
           updated_at = now()
     WHERE id = ja_receita;
  END IF;

  -- DESPESA custo peças — consolidada por DIA (só vendas avulsas), idempotente
  IF NEW.trip_id IS NULL AND NEW.custo_lancado_em IS NULL THEN
    SELECT COALESCE(SUM(oi.quantidade*COALESCE(p.preco_custo,0)),0) INTO custo_total
      FROM public.order_items oi JOIN public.products p ON p.id=oi.product_id
     WHERE oi.order_id=NEW.id;

    IF custo_total > 0 THEN
      dia_venda := CURRENT_DATE;
      dia_label := to_char(dia_venda, 'DD/MM/YYYY');
      desc_dia  := 'Custos das peças vendidas '||dia_label;

      SELECT id INTO ja_despesa_dia
        FROM public.financial_transactions
       WHERE tipo='DESPESA'
         AND order_id IS NULL
         AND descricao = desc_dia
       LIMIT 1;

      IF ja_despesa_dia IS NULL THEN
        INSERT INTO public.financial_transactions(order_id, company_id, tipo, status, valor, vencimento, descricao)
        VALUES (NULL, NULL, 'DESPESA', 'PENDENTE', custo_total,
                dia_venda + INTERVAL '30 days', desc_dia);
      ELSE
        UPDATE public.financial_transactions
           SET valor = valor + custo_total, updated_at = now()
         WHERE id = ja_despesa_dia;
      END IF;
    END IF;

    NEW.custo_lancado_em := now();
  END IF;

  RETURN NEW;
END; $function$;


-- MIGRATION: 20260711135945_d9101e4a-1c8a-4150-8269-0fb43e39f868.sql

ALTER TABLE public.payments
  ADD COLUMN IF NOT EXISTS account_id UUID REFERENCES public.bank_accounts(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS payments_account_id_idx ON public.payments(account_id);


-- MIGRATION: 20260711140223_961efe3a-4793-42c6-aabd-d5f0192bac37.sql

-- 1) Coluna congelada
ALTER TABLE public.order_items
  ADD COLUMN IF NOT EXISTS custo_unitario NUMERIC NOT NULL DEFAULT 0;

-- 2) Backfill do histórico com custo atual (single shot)
UPDATE public.order_items oi
   SET custo_unitario = COALESCE(p.preco_custo, 0)
  FROM public.products p
 WHERE p.id = oi.product_id
   AND oi.custo_unitario = 0;

-- 3) order_create_atomic congela o custo
CREATE OR REPLACE FUNCTION public.order_create_atomic(_payload jsonb)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_company_id UUID := (_payload->>'company_id')::UUID;
  v_address_id UUID := NULLIF(_payload->>'address_id','')::UUID;
  v_origem     TEXT := _payload->>'origem';
  v_frete      NUMERIC := COALESCE((_payload->>'frete')::NUMERIC, 0);
  v_desconto   NUMERIC := COALESCE((_payload->>'desconto')::NUMERIC, 0);
  v_acrescimo  NUMERIC := COALESCE((_payload->>'acrescimo')::NUMERIC, 0);
  v_observacao TEXT := _payload->>'observacao';
  v_pagamento  TEXT := _payload->>'pagamento';
  v_trip_id    UUID := NULLIF(_payload->>'trip_id','')::UUID;
  v_created_by UUID := auth.uid();

  v_order_id   UUID;
  v_subtotal   NUMERIC := 0;
  v_total      NUMERIC := 0;

  it JSONB;
  v_product_id UUID;
  v_tipo_compra TEXT;
  v_qtd NUMERIC;
  v_preco_unit NUMERIC;
  v_preco_pac NUMERIC;
  v_preco_final NUMERIC;
  v_item_subtotal NUMERIC;
  v_custo_unit NUMERIC;
BEGIN
  IF v_company_id IS NULL THEN RAISE EXCEPTION 'company_id obrigatório'; END IF;
  IF v_origem IS NULL THEN RAISE EXCEPTION 'origem obrigatório'; END IF;
  IF v_pagamento IS NULL THEN RAISE EXCEPTION 'pagamento obrigatório'; END IF;
  IF jsonb_array_length(_payload->'items') = 0 THEN
    RAISE EXCEPTION 'Pedido precisa de pelo menos 1 item';
  END IF;

  INSERT INTO public.orders(
    company_id, address_id, origem, status,
    subtotal, frete, desconto, total,
    observacao, created_by, trip_id
  ) VALUES (
    v_company_id, v_address_id, v_origem::order_origem, 'AGUARDANDO_PAGAMENTO'::order_status,
    0, v_frete, v_desconto, 0,
    v_observacao, v_created_by, v_trip_id
  ) RETURNING id INTO v_order_id;

  FOR it IN SELECT * FROM jsonb_array_elements(_payload->'items')
  LOOP
    v_product_id := (it->>'product_id')::UUID;
    v_tipo_compra := COALESCE(it->>'tipo_compra','UNIDADE');
    v_qtd := (it->>'quantidade')::NUMERIC;
    v_preco_unit := (it->>'preco_unitario')::NUMERIC;
    v_preco_pac := NULLIF(it->>'preco_pacote','')::NUMERIC;

    IF v_qtd IS NULL OR v_qtd <= 0 THEN
      RAISE EXCEPTION 'Quantidade inválida para item %', v_product_id;
    END IF;

    v_preco_final := CASE
      WHEN v_tipo_compra = 'PACOTE' AND v_preco_pac IS NOT NULL THEN v_preco_pac
      ELSE v_preco_unit
    END;
    v_item_subtotal := v_preco_final * v_qtd;

    -- Congela o custo atual da peça
    SELECT COALESCE(preco_custo, 0) INTO v_custo_unit
      FROM public.products WHERE id = v_product_id;

    INSERT INTO public.order_items(
      order_id, product_id, tipo_compra, quantidade,
      preco_unitario, preco_final, subtotal, custo_unitario
    ) VALUES (
      v_order_id, v_product_id, v_tipo_compra, v_qtd,
      v_preco_unit, v_preco_final, v_item_subtotal, v_custo_unit
    );

    v_subtotal := v_subtotal + v_item_subtotal;

    IF v_trip_id IS NULL THEN
      PERFORM public.stock_apply_delta(
        v_product_id, -v_qtd, 'SAIDA',
        'Venda pedido ' || substring(v_order_id::text,1,8),
        v_order_id, TRUE
      );
    END IF;
  END LOOP;

  v_total := v_subtotal + v_frete - v_desconto + v_acrescimo;

  UPDATE public.orders SET subtotal = v_subtotal, total = v_total WHERE id = v_order_id;

  INSERT INTO public.payments(order_id, tipo, valor, status)
  VALUES (v_order_id, v_pagamento::payment_tipo, v_total, 'PENDENTE'::payment_status);

  IF v_trip_id IS NOT NULL THEN
    PERFORM public.trip_recalculate_items(v_trip_id);
  END IF;

  RETURN v_order_id;
END;
$function$;

-- 4) order_sync_financials passa a somar custo congelado
CREATE OR REPLACE FUNCTION public.order_sync_financials()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  custo_total NUMERIC := 0;
  ja_receita UUID;
  ja_despesa_dia UUID;
  pay RECORD;
  pay_tipo TEXT;
  parcelas_num INT := 1;
  conta_txt TEXT;
  observ_txt TEXT;
  acc_id UUID;
  is_cartao BOOLEAN;
  status_fin TEXT;
  pagamento_fin DATE;
  forma_txt TEXT;
  dia_venda DATE;
  dia_label TEXT;
  desc_dia TEXT;
BEGIN
  IF NOT (
    (TG_OP='INSERT' AND NEW.status='PAGO') OR
    (TG_OP='UPDATE' AND NEW.status='PAGO' AND NEW.status IS DISTINCT FROM OLD.status)
  ) THEN RETURN NEW; END IF;

  SELECT tipo::text,
         COALESCE((payload->>'parcelas')::int, 1) AS parcelas,
         payload->>'conta' AS conta,
         payload->>'observacao' AS observ,
         account_id
    INTO pay
    FROM public.payments
   WHERE order_id = NEW.id
   ORDER BY created_at DESC
   LIMIT 1;

  pay_tipo := pay.tipo;
  parcelas_num := COALESCE(pay.parcelas, 1);
  conta_txt := pay.conta;
  observ_txt := pay.observ;
  acc_id := pay.account_id;

  IF acc_id IS NULL THEN
    IF pay_tipo = 'CARTAO' THEN
      SELECT id INTO acc_id FROM public.bank_accounts WHERE default_cartao AND ativo LIMIT 1;
    ELSIF pay_tipo = 'PIX' THEN
      SELECT id INTO acc_id FROM public.bank_accounts WHERE default_pix AND ativo LIMIT 1;
    ELSIF pay_tipo = 'DINHEIRO' THEN
      SELECT id INTO acc_id FROM public.bank_accounts WHERE default_dinheiro AND ativo LIMIT 1;
    END IF;
  END IF;

  is_cartao := pay_tipo = 'CARTAO';
  status_fin := CASE WHEN is_cartao THEN 'PENDENTE' ELSE 'PAGO' END;
  pagamento_fin := CASE WHEN is_cartao THEN NULL ELSE CURRENT_DATE END;
  forma_txt := CASE
    WHEN is_cartao AND conta_txt IS NOT NULL THEN conta_txt || ' · ' || parcelas_num || 'x'
    WHEN conta_txt IS NOT NULL THEN conta_txt
    ELSE pay_tipo
  END;

  SELECT id INTO ja_receita
    FROM public.financial_transactions
   WHERE order_id = NEW.id AND tipo = 'RECEITA'
   LIMIT 1;

  IF ja_receita IS NULL THEN
    INSERT INTO public.financial_transactions(
      order_id, company_id, tipo, status, valor,
      pagamento, descricao, forma_pagamento, parcelas, account_id
    ) VALUES (
      NEW.id, NEW.company_id, 'RECEITA', status_fin, COALESCE(NEW.total,0),
      pagamento_fin,
      COALESCE(observ_txt, 'Venda #'||substring(NEW.id::text,1,8)),
      forma_txt, parcelas_num,
      CASE WHEN is_cartao THEN NULL ELSE acc_id END
    );
  ELSE
    UPDATE public.financial_transactions
       SET status = status_fin,
           valor = COALESCE(NEW.total, valor),
           pagamento = COALESCE(pagamento, pagamento_fin),
           forma_pagamento = COALESCE(forma_pagamento, forma_txt),
           parcelas = COALESCE(parcelas, parcelas_num),
           account_id = COALESCE(account_id, CASE WHEN is_cartao THEN NULL ELSE acc_id END),
           updated_at = now()
     WHERE id = ja_receita;
  END IF;

  IF NEW.trip_id IS NULL AND NEW.custo_lancado_em IS NULL THEN
    SELECT COALESCE(SUM(oi.quantidade * COALESCE(oi.custo_unitario, 0)),0) INTO custo_total
      FROM public.order_items oi
     WHERE oi.order_id = NEW.id;

    IF custo_total > 0 THEN
      dia_venda := CURRENT_DATE;
      dia_label := to_char(dia_venda, 'DD/MM/YYYY');
      desc_dia  := 'Custos das peças vendidas '||dia_label;

      SELECT id INTO ja_despesa_dia
        FROM public.financial_transactions
       WHERE tipo='DESPESA' AND order_id IS NULL AND descricao = desc_dia
       LIMIT 1;

      IF ja_despesa_dia IS NULL THEN
        INSERT INTO public.financial_transactions(order_id, company_id, tipo, status, valor, vencimento, descricao)
        VALUES (NULL, NULL, 'DESPESA', 'PENDENTE', custo_total,
                dia_venda + INTERVAL '30 days', desc_dia);
      ELSE
        UPDATE public.financial_transactions
           SET valor = valor + custo_total, updated_at = now()
         WHERE id = ja_despesa_dia;
      END IF;
    END IF;

    NEW.custo_lancado_em := now();
  END IF;

  RETURN NEW;
END; $function$;

-- 5) order_cancel_reverse usa custo congelado
CREATE OR REPLACE FUNCTION public.order_cancel_reverse()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  it RECORD;
  custo_pedido NUMERIC := 0;
  desp RECORD;
  dia_label TEXT;
  desc_dia TEXT;
BEGIN
  IF NOT (TG_OP = 'UPDATE' AND NEW.status = 'CANCELADO' AND OLD.status IS DISTINCT FROM 'CANCELADO') THEN
    RETURN NEW;
  END IF;

  IF OLD.status = 'ENTREGUE' THEN
    RAISE EXCEPTION 'Pedido já ENTREGUE não pode ser cancelado. Estorno manual necessário.';
  END IF;

  IF OLD.status NOT IN ('PAGO','EM_SEPARACAO','ENVIADO') THEN
    RETURN NEW;
  END IF;

  UPDATE public.financial_transactions
     SET status = 'ESTORNADO',
         updated_at = now(),
         descricao = COALESCE(descricao,'') || ' [Estorno cancelamento em ' || to_char(now(),'DD/MM/YYYY HH24:MI') || ']'
   WHERE order_id = NEW.id
     AND tipo = 'RECEITA'
     AND status <> 'ESTORNADO';

  SELECT COALESCE(SUM(oi.quantidade * COALESCE(oi.custo_unitario, 0)),0)
    INTO custo_pedido
    FROM public.order_items oi
   WHERE oi.order_id = NEW.id;

  IF NEW.trip_id IS NULL AND custo_pedido > 0 AND OLD.custo_lancado_em IS NOT NULL THEN
    dia_label := to_char(COALESCE(OLD.custo_lancado_em::date, OLD.created_at::date, CURRENT_DATE), 'DD/MM/YYYY');
    desc_dia  := 'Custos das peças vendidas ' || dia_label;

    SELECT id, valor INTO desp
      FROM public.financial_transactions
     WHERE tipo = 'DESPESA' AND order_id IS NULL AND descricao = desc_dia
     LIMIT 1;

    IF FOUND THEN
      IF desp.valor - custo_pedido <= 0 THEN
        DELETE FROM public.financial_transactions WHERE id = desp.id;
      ELSE
        UPDATE public.financial_transactions
           SET valor = valor - custo_pedido, updated_at = now()
         WHERE id = desp.id;
      END IF;
    END IF;
  END IF;

  NEW.custo_lancado_em := NULL;

  FOR it IN
    SELECT product_id, quantidade FROM public.order_items WHERE order_id = NEW.id
  LOOP
    IF NEW.trip_id IS NOT NULL THEN
      UPDATE public.trip_items
         SET qtd_vendida = GREATEST(qtd_vendida - it.quantidade, 0),
             updated_at = now()
       WHERE trip_id = NEW.trip_id
         AND product_id = it.product_id;
    ELSE
      UPDATE public.products
         SET estoque = COALESCE(estoque,0) + it.quantidade
       WHERE id = it.product_id;

      INSERT INTO public.stock_movements(product_id, tipo, quantidade, motivo, reference_id, user_id)
      VALUES (it.product_id, 'ENTRADA', it.quantidade,
              'Estorno de cancelamento — pedido ' || substring(NEW.id::text,1,8),
              NEW.id, auth.uid());
    END IF;
  END LOOP;

  IF NEW.trip_id IS NOT NULL THEN
    PERFORM public.trip_recalculate_items(NEW.trip_id);
  END IF;

  RETURN NEW;
END;
$function$;

-- 6) trip_close e trip_close_v2 usam custo congelado
CREATE OR REPLACE FUNCTION public.trip_close(_trip_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  rec RECORD;
  saldo NUMERIC;
  custo_total NUMERIC := 0;
  local_txt TEXT;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.trips WHERE id = _trip_id AND status = 'open') THEN
    RAISE EXCEPTION 'Viagem não está aberta';
  END IF;

  PERFORM public.trip_recalculate_items(_trip_id);

  FOR rec IN SELECT * FROM public.trip_items WHERE trip_id = _trip_id LOOP
    saldo := rec.qtd_carregada - rec.qtd_vendida - rec.qtd_devolvida;
    IF saldo > 0 THEN
      UPDATE public.products SET estoque = COALESCE(estoque,0) + saldo WHERE id = rec.product_id;
      UPDATE public.trip_items SET qtd_devolvida = qtd_devolvida + saldo WHERE id = rec.id;
      INSERT INTO public.stock_movements(product_id, tipo, quantidade, motivo, reference_id, user_id)
        VALUES (rec.product_id, 'ENTRADA', saldo, 'Retorno de viagem', _trip_id, auth.uid());
    END IF;
  END LOOP;

  SELECT COALESCE(SUM(oi.quantidade * COALESCE(oi.custo_unitario, 0)), 0)
    INTO custo_total
    FROM public.orders o
    JOIN public.order_items oi ON oi.order_id = o.id
   WHERE o.trip_id = _trip_id
     AND o.status <> 'CANCELADO';

  IF custo_total > 0 THEN
    SELECT CASE WHEN cidade IS NOT NULL THEN cidade || COALESCE('-' || estado, '') ELSE COALESCE(nome, 'Viagem') END
      INTO local_txt FROM public.trips WHERE id = _trip_id;

    INSERT INTO public.financial_transactions(tipo, valor, status, descricao, vencimento)
    VALUES ('DESPESA', custo_total, 'PENDENTE',
            'Custo peças vendidas — ' || local_txt,
            CURRENT_DATE + INTERVAL '30 days');
  END IF;

  UPDATE public.trips SET status = 'closed', closed_at = now() WHERE id = _trip_id;
END;
$function$;

CREATE OR REPLACE FUNCTION public.trip_close_v2(_trip_id uuid, _return_stock boolean DEFAULT true)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  rec RECORD;
  saldo NUMERIC;
  custo_total NUMERIC := 0;
  local_txt TEXT;
  trip_row RECORD;
  new_trip_id UUID := NULL;
BEGIN
  SELECT * INTO trip_row FROM public.trips WHERE id = _trip_id AND status = 'open';
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Viagem não está aberta';
  END IF;

  PERFORM public.trip_recalculate_items(_trip_id);

  IF _return_stock THEN
    FOR rec IN SELECT * FROM public.trip_items WHERE trip_id = _trip_id LOOP
      saldo := rec.qtd_carregada - rec.qtd_vendida - rec.qtd_devolvida;
      IF saldo > 0 THEN
        UPDATE public.products SET estoque = COALESCE(estoque,0) + saldo WHERE id = rec.product_id;
        UPDATE public.trip_items SET qtd_devolvida = qtd_devolvida + saldo WHERE id = rec.id;
        INSERT INTO public.stock_movements(product_id, tipo, quantidade, motivo, reference_id, user_id)
          VALUES (rec.product_id, 'ENTRADA', saldo, 'Retorno de viagem', _trip_id, auth.uid());
      END IF;
    END LOOP;
  ELSE
    INSERT INTO public.trips(nome, cidade, estado, status, vendedor_id, created_by, notas)
    VALUES (
      'Sobras de ' || COALESCE(trip_row.nome, 'viagem'),
      trip_row.cidade, trip_row.estado, 'open',
      COALESCE(trip_row.vendedor_id, auth.uid()),
      auth.uid(),
      'Gerada automaticamente ao encerrar viagem ' || COALESCE(trip_row.nome, _trip_id::text)
    )
    RETURNING id INTO new_trip_id;

    FOR rec IN SELECT * FROM public.trip_items WHERE trip_id = _trip_id LOOP
      saldo := rec.qtd_carregada - rec.qtd_vendida - rec.qtd_devolvida;
      IF saldo > 0 THEN
        INSERT INTO public.trip_items(trip_id, product_id, qtd_carregada)
          VALUES (new_trip_id, rec.product_id, saldo)
          ON CONFLICT (trip_id, product_id) DO UPDATE
            SET qtd_carregada = public.trip_items.qtd_carregada + EXCLUDED.qtd_carregada;
        UPDATE public.trip_items SET qtd_devolvida = qtd_devolvida + saldo WHERE id = rec.id;
        INSERT INTO public.stock_movements(product_id, tipo, quantidade, motivo, reference_id, user_id)
          VALUES (rec.product_id, 'TRANSFERENCIA', saldo, 'Transferência de saldo para nova viagem', new_trip_id, auth.uid());
      END IF;
    END LOOP;
  END IF;

  SELECT COALESCE(SUM(oi.quantidade * COALESCE(oi.custo_unitario, 0)), 0)
    INTO custo_total
    FROM public.orders o
    JOIN public.order_items oi ON oi.order_id = o.id
   WHERE o.trip_id = _trip_id
     AND o.status <> 'CANCELADO';

  IF custo_total > 0 THEN
    SELECT CASE WHEN cidade IS NOT NULL THEN cidade || COALESCE('-' || estado, '') ELSE COALESCE(nome, 'Viagem') END
      INTO local_txt FROM public.trips WHERE id = _trip_id;

    INSERT INTO public.financial_transactions(tipo, valor, status, descricao, vencimento)
    VALUES ('DESPESA', custo_total, 'PENDENTE',
            'Custo peças vendidas — ' || local_txt,
            CURRENT_DATE + INTERVAL '30 days');
  END IF;

  UPDATE public.trips SET status = 'closed', closed_at = now() WHERE id = _trip_id;
  RETURN new_trip_id;
END;
$function$;


-- MIGRATION: 20260711140414_cbb16819-3e14-4755-b5a9-a77c0ad75a05.sql

CREATE OR REPLACE FUNCTION public.finance_kpis(_from DATE, _to DATE)
 RETURNS TABLE(
   a_receber NUMERIC,
   a_receber_vencidas NUMERIC,
   contas_pagar NUMERIC,
   contas_pagar_vencidas NUMERIC,
   custo_pecas_periodo NUMERIC,
   despesas_viagem_periodo NUMERIC
 )
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT
    COALESCE((SELECT SUM(valor) FROM public.financial_transactions
              WHERE tipo='RECEITA' AND status IN ('PENDENTE','PARCIAL','ATRASADO')), 0),
    COALESCE((SELECT SUM(valor) FROM public.financial_transactions
              WHERE tipo='RECEITA' AND status='ATRASADO'), 0),
    COALESCE((SELECT SUM(valor) FROM public.financial_transactions
              WHERE tipo='DESPESA' AND status IN ('PENDENTE','PARCIAL','ATRASADO')
                AND descricao !~* 'custo.*pe[çc]a'), 0),
    COALESCE((SELECT SUM(valor) FROM public.financial_transactions
              WHERE tipo='DESPESA' AND status='ATRASADO'
                AND descricao !~* 'custo.*pe[çc]a'), 0),
    COALESCE((SELECT SUM(oi.quantidade * COALESCE(oi.custo_unitario,0))
                FROM public.orders o
                JOIN public.order_items oi ON oi.order_id = o.id
               WHERE o.status <> 'CANCELADO'
                 AND o.created_at::date BETWEEN _from AND _to), 0),
    COALESCE((SELECT SUM(valor) FROM public.trip_expenses
              WHERE data BETWEEN _from AND _to), 0)
$function$;

REVOKE ALL ON FUNCTION public.finance_kpis(DATE, DATE) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.finance_kpis(DATE, DATE) TO authenticated, service_role;


-- MIGRATION: 20260711140452_c4e85d13-34ef-4e3b-99df-7af978ed8aba.sql

DROP FUNCTION IF EXISTS public.finance_kpis(DATE, DATE);

CREATE OR REPLACE FUNCTION public.finance_kpis(_from DATE, _to DATE)
 RETURNS TABLE(
   a_receber NUMERIC,
   a_receber_vencidas NUMERIC,
   a_pagar_total NUMERIC,
   a_pagar_total_vencidas NUMERIC,
   contas_pagar NUMERIC,
   contas_pagar_vencidas NUMERIC,
   custo_pecas_periodo NUMERIC,
   despesas_viagem_periodo NUMERIC
 )
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT
    COALESCE((SELECT SUM(valor) FROM public.financial_transactions
              WHERE tipo='RECEITA' AND status IN ('PENDENTE','PARCIAL','ATRASADO')), 0),
    COALESCE((SELECT SUM(valor) FROM public.financial_transactions
              WHERE tipo='RECEITA' AND status='ATRASADO'), 0),
    COALESCE((SELECT SUM(valor) FROM public.financial_transactions
              WHERE tipo='DESPESA' AND status IN ('PENDENTE','PARCIAL','ATRASADO')), 0),
    COALESCE((SELECT SUM(valor) FROM public.financial_transactions
              WHERE tipo='DESPESA' AND status='ATRASADO'), 0),
    COALESCE((SELECT SUM(valor) FROM public.financial_transactions
              WHERE tipo='DESPESA' AND status IN ('PENDENTE','PARCIAL','ATRASADO')
                AND descricao !~* 'custo.*pe[çc]a'), 0),
    COALESCE((SELECT SUM(valor) FROM public.financial_transactions
              WHERE tipo='DESPESA' AND status='ATRASADO'
                AND descricao !~* 'custo.*pe[çc]a'), 0),
    COALESCE((SELECT SUM(oi.quantidade * COALESCE(oi.custo_unitario,0))
                FROM public.orders o
                JOIN public.order_items oi ON oi.order_id = o.id
               WHERE o.status <> 'CANCELADO'
                 AND o.created_at::date BETWEEN _from AND _to), 0),
    COALESCE((SELECT SUM(valor) FROM public.trip_expenses
              WHERE data BETWEEN _from AND _to), 0)
$function$;

REVOKE ALL ON FUNCTION public.finance_kpis(DATE, DATE) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.finance_kpis(DATE, DATE) TO authenticated, service_role;


-- MIGRATION: 20260711140610_b8e6b2e8-a970-41d4-a72e-1bef77d7d872.sql

-- financial_transactions
DROP POLICY IF EXISTS "admin manage fin tx" ON public.financial_transactions;
CREATE POLICY "manager manage fin tx"
  ON public.financial_transactions
  FOR ALL
  TO authenticated
  USING (public.is_manager(auth.uid()))
  WITH CHECK (public.is_manager(auth.uid()));

-- financial_entries
DROP POLICY IF EXISTS "admin manage fin entries" ON public.financial_entries;
CREATE POLICY "manager manage fin entries"
  ON public.financial_entries
  FOR ALL
  TO authenticated
  USING (public.is_manager(auth.uid()))
  WITH CHECK (public.is_manager(auth.uid()));

-- stock_movements: gerente lê e insere; admin pode tudo
DROP POLICY IF EXISTS "admin manage stock mov" ON public.stock_movements;
CREATE POLICY "manager manage stock mov"
  ON public.stock_movements
  FOR ALL
  TO authenticated
  USING (public.is_manager(auth.uid()))
  WITH CHECK (public.is_manager(auth.uid()));

-- Vendedores continuam podendo inserir stock_movements (ex.: separações, retornos)
CREATE POLICY "sales staff insert stock mov"
  ON public.stock_movements
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_sales_staff(auth.uid()));

CREATE POLICY "sales staff read stock mov"
  ON public.stock_movements
  FOR SELECT
  TO authenticated
  USING (public.is_sales_staff(auth.uid()));


-- MIGRATION: 20260712014155_3694324b-f991-4ecd-aa6c-9cf61723ed92.sql

-- ================================================================
-- B2: Unificar trip_close v1 e v2 (v1 delega para v2)
-- ================================================================
CREATE OR REPLACE FUNCTION public.trip_close(_trip_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  PERFORM public.trip_close_v2(_trip_id, true);
END;
$function$;

-- ================================================================
-- B3a: Corrigir policies USING(true) / WITH CHECK(true) permissivas
-- ================================================================

-- bank_transfers: restringir a admin/gerente (era ALL com true/true)
DROP POLICY IF EXISTS "Authenticated can manage bank transfers" ON public.bank_transfers;
CREATE POLICY "Managers can manage bank transfers"
  ON public.bank_transfers
  FOR ALL
  TO authenticated
  USING (public.is_manager(auth.uid()))
  WITH CHECK (public.is_manager(auth.uid()));

-- push_subscriptions: restringir UPDATE (qual=true era brecha para reassociar linhas)
DROP POLICY IF EXISTS "public subs update" ON public.push_subscriptions;
CREATE POLICY "subs update own or anonymous"
  ON public.push_subscriptions
  FOR UPDATE
  USING (
    ((auth.uid() IS NULL) AND (user_id IS NULL))
    OR ((auth.uid() IS NOT NULL) AND ((user_id = auth.uid()) OR (user_id IS NULL)))
  )
  WITH CHECK (
    ((auth.uid() IS NULL) AND (user_id IS NULL))
    OR ((auth.uid() IS NOT NULL) AND ((user_id = auth.uid()) OR (user_id IS NULL)))
  );

-- push_deliveries: apertar WITH CHECK (só permite marcar clicked_at, não zerar de volta)
DROP POLICY IF EXISTS "anon mark click once" ON public.push_deliveries;
CREATE POLICY "anon mark click once"
  ON public.push_deliveries
  FOR UPDATE
  USING (clicked_at IS NULL)
  WITH CHECK (clicked_at IS NOT NULL);

-- ================================================================
-- B3b: Revogar EXECUTE em SECURITY DEFINER internos (triggers/helpers)
-- Só funções chamadas via .rpc() do client mantêm EXECUTE.
-- ================================================================

-- Triggers (só o owner do trigger executa, cliente nunca precisa chamar)
REVOKE EXECUTE ON FUNCTION public.order_cancel_reverse() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.order_sync_financials() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.log_order_status() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.log_lead_stage() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.wa_touch_conversation() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.workflow_log_after_insert() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.products_set_ean13() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.products_set_sku() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- Helpers internos (só chamados por outras funções do banco)
REVOKE EXECUTE ON FUNCTION public.trip_recalculate_items(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.trip_apply_order(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.trip_record_sale(uuid, uuid, numeric) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.stock_apply_delta(uuid, numeric, text, text, uuid, boolean) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.generate_ean13(text) FROM PUBLIC, anon, authenticated;

-- RPCs públicas/autenticadas continuam callable:
-- has_role, is_manager, is_sales_staff, order_create_atomic,
-- trip_close, trip_close_v2, trip_load_items, stock_deduct_open_trips,
-- finance_kpis, bank_account_balance, get_shared_cart
GRANT EXECUTE ON FUNCTION public.order_create_atomic(jsonb) TO authenticated;
GRANT EXECUTE ON FUNCTION public.trip_close(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.trip_close_v2(uuid, boolean) TO authenticated;
GRANT EXECUTE ON FUNCTION public.trip_load_items(uuid, jsonb) TO authenticated;
GRANT EXECUTE ON FUNCTION public.stock_deduct_open_trips() TO authenticated;
GRANT EXECUTE ON FUNCTION public.finance_kpis(date, date) TO authenticated;
GRANT EXECUTE ON FUNCTION public.bank_account_balance(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_shared_cart(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_manager(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_sales_staff(uuid) TO authenticated;


-- MIGRATION: 20260712014405_afc15bea-25aa-41dc-8bc2-38f003a57e33.sql

CREATE UNIQUE INDEX IF NOT EXISTS payments_order_id_unique
  ON public.payments (order_id);

COMMENT ON INDEX public.payments_order_id_unique IS
  'Impede múltiplos pagamentos por pedido. Split payment (PIX+CARTAO) exige remover esta constraint e adaptar order_sync_financials para gerar uma financial_transactions por linha de payments.';


-- MIGRATION: 20260712015359_6714be8c-29e1-4cf0-9822-4fa1ab2da866.sql
-- ============ #2 AUDIT LOGGING ============
CREATE OR REPLACE FUNCTION public.audit_log_change()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE _old JSONB; _new JSONB; _action TEXT;
BEGIN
  IF TG_OP='INSERT' THEN _action:='INSERT'; _new:=to_jsonb(NEW);
  ELSIF TG_OP='UPDATE' THEN
    _action:='UPDATE'; _old:=to_jsonb(OLD); _new:=to_jsonb(NEW);
    IF _old = _new THEN RETURN NEW; END IF;
  ELSIF TG_OP='DELETE' THEN _action:='DELETE'; _old:=to_jsonb(OLD);
  END IF;
  INSERT INTO public.audit_logs(user_id, action, table_name, record_id, old_data, new_data, created_at)
  VALUES (auth.uid(), _action, TG_TABLE_NAME,
          COALESCE((_new->>'id')::uuid, (_old->>'id')::uuid), _old, _new, now());
  RETURN COALESCE(NEW, OLD);
END; $$;

DROP TRIGGER IF EXISTS audit_orders ON public.orders;
CREATE TRIGGER audit_orders AFTER INSERT OR UPDATE OR DELETE ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.audit_log_change();

DROP TRIGGER IF EXISTS audit_payments ON public.payments;
CREATE TRIGGER audit_payments AFTER INSERT OR UPDATE OR DELETE ON public.payments
FOR EACH ROW EXECUTE FUNCTION public.audit_log_change();

DROP TRIGGER IF EXISTS audit_financial_transactions ON public.financial_transactions;
CREATE TRIGGER audit_financial_transactions AFTER INSERT OR UPDATE OR DELETE ON public.financial_transactions
FOR EACH ROW EXECUTE FUNCTION public.audit_log_change();

DROP TRIGGER IF EXISTS audit_trip_expenses ON public.trip_expenses;
CREATE TRIGGER audit_trip_expenses AFTER INSERT OR UPDATE OR DELETE ON public.trip_expenses
FOR EACH ROW EXECUTE FUNCTION public.audit_log_change();

CREATE OR REPLACE FUNCTION public.audit_products_price()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF TG_OP='UPDATE' AND (
    COALESCE(OLD.preco_custo,0) IS DISTINCT FROM COALESCE(NEW.preco_custo,0)
    OR COALESCE(OLD.preco_unitario,0) IS DISTINCT FROM COALESCE(NEW.preco_unitario,0)
    OR COALESCE(OLD.preco_pacote,0) IS DISTINCT FROM COALESCE(NEW.preco_pacote,0)
  ) THEN
    INSERT INTO public.audit_logs(user_id, action, table_name, record_id, old_data, new_data)
    VALUES (auth.uid(), 'PRICE_CHANGE', 'products', NEW.id,
      jsonb_build_object('preco_custo', OLD.preco_custo, 'preco_unitario', OLD.preco_unitario, 'preco_pacote', OLD.preco_pacote),
      jsonb_build_object('preco_custo', NEW.preco_custo, 'preco_unitario', NEW.preco_unitario, 'preco_pacote', NEW.preco_pacote));
  END IF;
  RETURN NEW;
END; $$;

DROP TRIGGER IF EXISTS audit_products_price_trg ON public.products;
CREATE TRIGGER audit_products_price_trg AFTER UPDATE ON public.products
FOR EACH ROW EXECUTE FUNCTION public.audit_products_price();

-- ============ #10 STOCK MIN ALERT ============
CREATE OR REPLACE VIEW public.products_below_min AS
SELECT id, sku, nome, estoque, estoque_minimo,
       (COALESCE(estoque_minimo,0) - COALESCE(estoque,0)) AS falta,
       marca_id, categoria_id, status
FROM public.products
WHERE COALESCE(status, true) = true
  AND COALESCE(estoque_minimo,0) > 0
  AND COALESCE(estoque,0) < COALESCE(estoque_minimo,0);
GRANT SELECT ON public.products_below_min TO authenticated;

-- ============ #12 SALES TARGETS + FUNNEL ============
CREATE TABLE IF NOT EXISTS public.sales_targets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendedor_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mes_ref DATE NOT NULL,
  meta_valor NUMERIC NOT NULL DEFAULT 0,
  meta_qtd_pedidos INT DEFAULT 0,
  observacao TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (vendedor_id, mes_ref)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sales_targets TO authenticated;
GRANT ALL ON public.sales_targets TO service_role;
ALTER TABLE public.sales_targets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Vendedor vê própria meta" ON public.sales_targets FOR SELECT TO authenticated
USING (vendedor_id = auth.uid() OR public.is_manager(auth.uid()));
CREATE POLICY "Gerente gerencia metas" ON public.sales_targets FOR ALL TO authenticated
USING (public.is_manager(auth.uid())) WITH CHECK (public.is_manager(auth.uid()));
CREATE TRIGGER sales_targets_updated_at BEFORE UPDATE ON public.sales_targets
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE VIEW public.sales_targets_progress AS
SELECT st.id, st.vendedor_id, st.mes_ref, st.meta_valor, st.meta_qtd_pedidos,
  COALESCE(SUM(o.total),0) AS vendido_valor,
  COUNT(o.id) AS vendido_qtd,
  CASE WHEN st.meta_valor>0 THEN (COALESCE(SUM(o.total),0)/st.meta_valor)*100 ELSE 0 END AS pct_atingido
FROM public.sales_targets st
LEFT JOIN public.orders o ON o.created_by = st.vendedor_id
  AND o.status <> 'CANCELADO'
  AND date_trunc('month', o.created_at) = st.mes_ref
GROUP BY st.id;
GRANT SELECT ON public.sales_targets_progress TO authenticated;

CREATE OR REPLACE VIEW public.lead_funnel_metrics AS
SELECT status AS etapa, COUNT(*) AS quantidade,
  COUNT(*) FILTER (WHERE created_at >= now() - INTERVAL '30 days') AS ultimos_30_dias
FROM public.leads GROUP BY status;
GRANT SELECT ON public.lead_funnel_metrics TO authenticated;

-- ============ #16 LGPD ============
CREATE TABLE IF NOT EXISTS public.lgpd_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  requester_email TEXT NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('EXPORT','DELETE','ACCESS')),
  status TEXT NOT NULL DEFAULT 'PENDENTE' CHECK (status IN ('PENDENTE','EM_ANDAMENTO','CONCLUIDO','NEGADO')),
  observacao TEXT,
  processado_por UUID REFERENCES auth.users(id),
  processado_em TIMESTAMPTZ,
  export_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.lgpd_requests TO authenticated;
GRANT ALL ON public.lgpd_requests TO service_role;
ALTER TABLE public.lgpd_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Gerente gerencia LGPD" ON public.lgpd_requests FOR ALL TO authenticated
USING (public.is_manager(auth.uid())) WITH CHECK (public.is_manager(auth.uid()));
CREATE TRIGGER lgpd_requests_updated_at BEFORE UPDATE ON public.lgpd_requests
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ #9 CYCLIC INVENTORY ============
ALTER TABLE public.inventory_counts
  ADD COLUMN IF NOT EXISTS tipo TEXT NOT NULL DEFAULT 'CICLICO' CHECK (tipo IN ('CICLICO','GERAL','ESPOT')),
  ADD COLUMN IF NOT EXISTS aprovado_por UUID REFERENCES auth.users(id),
  ADD COLUMN IF NOT EXISTS aprovado_em TIMESTAMPTZ;

CREATE TABLE IF NOT EXISTS public.inventory_count_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  count_id UUID NOT NULL REFERENCES public.inventory_counts(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  qtd_sistema NUMERIC NOT NULL DEFAULT 0,
  qtd_contada NUMERIC,
  divergencia NUMERIC GENERATED ALWAYS AS (COALESCE(qtd_contada,0) - qtd_sistema) STORED,
  observacao TEXT,
  ajustado BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (count_id, product_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.inventory_count_items TO authenticated;
GRANT ALL ON public.inventory_count_items TO service_role;
ALTER TABLE public.inventory_count_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff gerencia contagem" ON public.inventory_count_items FOR ALL TO authenticated
USING (public.is_sales_staff(auth.uid())) WITH CHECK (public.is_sales_staff(auth.uid()));
CREATE TRIGGER inventory_count_items_updated_at BEFORE UPDATE ON public.inventory_count_items
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.inventory_apply_adjustments(_count_id UUID)
RETURNS INT LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE it RECORD; n INT := 0;
BEGIN
  IF NOT public.is_manager(auth.uid()) THEN
    RAISE EXCEPTION 'Somente gerente pode aprovar ajuste';
  END IF;
  FOR it IN
    SELECT * FROM public.inventory_count_items
    WHERE count_id = _count_id AND ajustado = false AND qtd_contada IS NOT NULL AND divergencia <> 0
  LOOP
    PERFORM public.stock_apply_delta(
      it.product_id, it.divergencia,
      CASE WHEN it.divergencia>0 THEN 'ENTRADA' ELSE 'SAIDA' END,
      'Ajuste inventário ' || substring(_count_id::text,1,8),
      _count_id, TRUE
    );
    UPDATE public.inventory_count_items SET ajustado = true WHERE id = it.id;
    n := n + 1;
  END LOOP;
  UPDATE public.inventory_counts SET aprovado_por = auth.uid(), aprovado_em = now() WHERE id = _count_id;
  RETURN n;
END; $$;

-- ============ #4 BANK RECONCILIATION ============
CREATE TABLE IF NOT EXISTS public.bank_statements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES public.bank_accounts(id) ON DELETE CASCADE,
  data DATE NOT NULL,
  descricao TEXT NOT NULL,
  valor NUMERIC NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('CREDITO','DEBITO')),
  documento TEXT,
  fitid TEXT,
  conciliado BOOLEAN NOT NULL DEFAULT false,
  transaction_id UUID REFERENCES public.financial_transactions(id) ON DELETE SET NULL,
  imported_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  imported_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (account_id, fitid)
);
CREATE INDEX IF NOT EXISTS idx_bank_statements_account_data ON public.bank_statements(account_id, data);
CREATE INDEX IF NOT EXISTS idx_bank_statements_pendentes ON public.bank_statements(conciliado) WHERE conciliado = false;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bank_statements TO authenticated;
GRANT ALL ON public.bank_statements TO service_role;
ALTER TABLE public.bank_statements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Gerente gerencia extratos" ON public.bank_statements FOR ALL TO authenticated
USING (public.is_manager(auth.uid())) WITH CHECK (public.is_manager(auth.uid()));
CREATE TRIGGER bank_statements_updated_at BEFORE UPDATE ON public.bank_statements
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ #11 ABANDONED CARTS ============
CREATE TABLE IF NOT EXISTS public.abandoned_carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
  cart_token TEXT,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  total NUMERIC NOT NULL DEFAULT 0,
  last_activity TIMESTAMPTZ NOT NULL DEFAULT now(),
  notified_at TIMESTAMPTZ,
  recovered_at TIMESTAMPTZ,
  recovery_order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_abandoned_carts_notify ON public.abandoned_carts(last_activity)
  WHERE notified_at IS NULL AND recovered_at IS NULL;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.abandoned_carts TO authenticated;
GRANT ALL ON public.abandoned_carts TO service_role;
ALTER TABLE public.abandoned_carts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff gerencia carrinhos" ON public.abandoned_carts FOR ALL TO authenticated
USING (public.is_sales_staff(auth.uid())) WITH CHECK (public.is_sales_staff(auth.uid()));
CREATE TRIGGER abandoned_carts_updated_at BEFORE UPDATE ON public.abandoned_carts
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ #14 ERROR LOG CENTRAL ============
CREATE TABLE IF NOT EXISTS public.error_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  origem TEXT NOT NULL CHECK (origem IN ('FRONTEND','BACKEND','EDGE','SERVER_FN')),
  nivel TEXT NOT NULL DEFAULT 'ERROR' CHECK (nivel IN ('DEBUG','INFO','WARN','ERROR','FATAL')),
  mensagem TEXT NOT NULL,
  stack TEXT,
  contexto JSONB,
  url TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_error_logs_created ON public.error_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_error_logs_nivel ON public.error_logs(nivel, created_at DESC);
GRANT SELECT, INSERT ON public.error_logs TO authenticated;
GRANT ALL ON public.error_logs TO service_role;
ALTER TABLE public.error_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Autenticado insere próprio erro" ON public.error_logs FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid() OR user_id IS NULL);
CREATE POLICY "Gerente lê erros" ON public.error_logs FOR SELECT TO authenticated
USING (public.is_manager(auth.uid()));

-- MIGRATION: 20260712015419_9a8de6f9-e1d9-4ef3-9c7f-6ab767f42f40.sql
ALTER VIEW public.products_below_min SET (security_invoker = true);
ALTER VIEW public.sales_targets_progress SET (security_invoker = true);
ALTER VIEW public.lead_funnel_metrics SET (security_invoker = true);

REVOKE ALL ON FUNCTION public.audit_log_change() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.audit_products_price() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.inventory_apply_adjustments(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.inventory_apply_adjustments(uuid) TO authenticated;

-- MIGRATION: 20260712015643_9088e7f9-f44f-416a-86b3-72779d03125b.sql
CREATE OR REPLACE FUNCTION public.audit_log_change()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE _old JSONB; _new JSONB; _action TEXT;
BEGIN
  IF TG_OP='INSERT' THEN _action:='INSERT'; _new:=to_jsonb(NEW);
  ELSIF TG_OP='UPDATE' THEN
    _action:='UPDATE'; _old:=to_jsonb(OLD); _new:=to_jsonb(NEW);
    IF _old = _new THEN RETURN NEW; END IF;
  ELSIF TG_OP='DELETE' THEN _action:='DELETE'; _old:=to_jsonb(OLD);
  END IF;
  INSERT INTO public.audit_logs(user_id, acao, entidade, entidade_id, payload, resultado, created_at)
  VALUES (
    auth.uid(), _action, TG_TABLE_NAME,
    COALESCE((_new->>'id'), (_old->>'id')),
    jsonb_build_object('old', _old, 'new', _new),
    'OK', now()
  );
  RETURN COALESCE(NEW, OLD);
END; $$;

CREATE OR REPLACE FUNCTION public.audit_products_price()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF TG_OP='UPDATE' AND (
    COALESCE(OLD.preco_custo,0) IS DISTINCT FROM COALESCE(NEW.preco_custo,0)
    OR COALESCE(OLD.preco_unitario,0) IS DISTINCT FROM COALESCE(NEW.preco_unitario,0)
    OR COALESCE(OLD.preco_pacote,0) IS DISTINCT FROM COALESCE(NEW.preco_pacote,0)
  ) THEN
    INSERT INTO public.audit_logs(user_id, acao, entidade, entidade_id, payload, resultado)
    VALUES (auth.uid(), 'PRICE_CHANGE', 'products', NEW.id::text,
      jsonb_build_object(
        'old', jsonb_build_object('preco_custo', OLD.preco_custo, 'preco_unitario', OLD.preco_unitario, 'preco_pacote', OLD.preco_pacote),
        'new', jsonb_build_object('preco_custo', NEW.preco_custo, 'preco_unitario', NEW.preco_unitario, 'preco_pacote', NEW.preco_pacote)
      ),
      'OK');
  END IF;
  RETURN NEW;
END; $$;

REVOKE ALL ON FUNCTION public.audit_log_change() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.audit_products_price() FROM PUBLIC, anon;

-- MIGRATION: 20260712020307_c47456c8-4996-45c4-bdbd-931e8a72cc13.sql
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Remove job antigo se existir (idempotente)
DO $$
BEGIN
  PERFORM cron.unschedule('abandoned-carts-notify');
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- A cada 1 hora, chama o endpoint que envia WhatsApp para carrinhos abandonados
SELECT cron.schedule(
  'abandoned-carts-notify',
  '0 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://project--f6fdd83d-738f-496c-8445-a3838d9aa7cf.lovable.app/api/public/hooks/abandoned-carts-notify',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2aGRkeWJ6cGpybndmbHRraXdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE3NTgxOTYsImV4cCI6MjA5NzMzNDE5Nn0.sk2txLJSs2F6lWUm7-kbtaL4PTwSu__6WUtQsPGWlv8'
    ),
    body := '{"source":"pg_cron"}'::jsonb
  ) AS request_id;
  $$
);

-- MIGRATION: 20260712144730_5f9b19d6-66b7-445a-8f97-b4a179679534.sql
GRANT SELECT, INSERT, UPDATE, DELETE ON public.push_subscriptions TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.push_subscriptions TO anon;
GRANT ALL ON public.push_subscriptions TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.push_campaigns TO authenticated;
GRANT ALL ON public.push_campaigns TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.push_deliveries TO authenticated;
GRANT ALL ON public.push_deliveries TO service_role;

DROP POLICY IF EXISTS "subs update own or anonymous" ON public.push_subscriptions;
CREATE POLICY "subs can refresh browser subscription"
ON public.push_subscriptions
FOR UPDATE
TO anon, authenticated
USING (
  user_id IS NULL
  OR auth.uid() = user_id
  OR public.is_sales_staff(auth.uid())
)
WITH CHECK (
  user_id IS NULL
  OR auth.uid() = user_id
  OR public.is_sales_staff(auth.uid())
);

-- MIGRATION: 20260712150103_65b8d633-57bd-492a-9585-ac3164a9287d.sql
DROP POLICY IF EXISTS "subs can refresh browser subscription" ON public.push_subscriptions;
DROP POLICY IF EXISTS "staff can refresh browser subscriptions" ON public.push_subscriptions;

CREATE POLICY "subs can refresh browser subscription"
ON public.push_subscriptions
FOR UPDATE
TO anon, authenticated
USING (
  user_id IS NULL
  OR auth.uid() = user_id
)
WITH CHECK (
  user_id IS NULL
  OR auth.uid() = user_id
);

CREATE POLICY "staff can refresh browser subscriptions"
ON public.push_subscriptions
FOR UPDATE
TO authenticated
USING (public.is_sales_staff(auth.uid()))
WITH CHECK (public.is_sales_staff(auth.uid()));

-- MIGRATION: 20260714153146_b90ac71f-d1a3-4f95-916c-0d58fae4bd03.sql
CREATE OR REPLACE FUNCTION public.audit_products_price()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF TG_OP='UPDATE' AND (
    COALESCE(OLD.preco_custo,0) IS DISTINCT FROM COALESCE(NEW.preco_custo,0)
    OR COALESCE(OLD.preco_unitario,0) IS DISTINCT FROM COALESCE(NEW.preco_unitario,0)
    OR COALESCE(OLD.preco_pacote,0) IS DISTINCT FROM COALESCE(NEW.preco_pacote,0)
  ) THEN
    INSERT INTO public.audit_logs(user_id, acao, entidade, entidade_id, payload, resultado)
    VALUES (auth.uid(), 'PRICE_CHANGE', 'products', NEW.id::text,
      jsonb_build_object(
        'old', jsonb_build_object('preco_custo', OLD.preco_custo, 'preco_unitario', OLD.preco_unitario, 'preco_pacote', OLD.preco_pacote),
        'new', jsonb_build_object('preco_custo', NEW.preco_custo, 'preco_unitario', NEW.preco_unitario, 'preco_pacote', NEW.preco_pacote)
      ),
      'SUCESSO');
  END IF;
  RETURN NEW;
END; $function$;

-- MIGRATION: 20260715161414_6a20f414-0b3a-409c-93b5-5b0f101d5d88.sql

CREATE OR REPLACE FUNCTION public.crm_sync_lead_for_company(_company_id uuid, _created_by uuid DEFAULT NULL)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_lead_id UUID;
  v_company RECORD;
  v_next_pos INT;
BEGIN
  IF _company_id IS NULL THEN RETURN; END IF;

  SELECT id INTO v_lead_id FROM public.leads WHERE company_id = _company_id LIMIT 1;

  IF v_lead_id IS NULL THEN
    SELECT c.legal_name, c.trade_name, c.phone, c.email, c.cidade, c.estado,
           c.latitude, c.longitude, c.owner_id
      INTO v_company
      FROM public.companies c WHERE c.id = _company_id;

    IF NOT FOUND THEN RETURN; END IF;

    SELECT COALESCE(MAX(position), 0) + 1 INTO v_next_pos
      FROM public.leads WHERE status = 'PEDIDO'::lead_status;

    INSERT INTO public.leads(
      empresa, contato, whatsapp, email, cidade, estado,
      latitude, longitude, segmento, status, company_id,
      created_by, responsavel_id, position, observacoes
    ) VALUES (
      COALESCE(v_company.trade_name, v_company.legal_name, 'Cliente'),
      COALESCE(v_company.trade_name, v_company.legal_name, 'Cliente'),
      v_company.phone, v_company.email, v_company.cidade, v_company.estado,
      v_company.latitude, v_company.longitude,
      'OUTRO'::lead_segmento, 'PEDIDO'::lead_status, _company_id,
      COALESCE(_created_by, v_company.owner_id),
      COALESCE(_created_by, v_company.owner_id),
      v_next_pos,
      'Criado automaticamente a partir de pedido pago'
    );
  ELSE
    UPDATE public.leads
       SET status = 'PEDIDO'::lead_status,
           ultimo_contato = now(),
           updated_at = now()
     WHERE id = v_lead_id
       AND status <> 'PEDIDO'::lead_status;
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION public.crm_sync_lead_from_order()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.company_id IS NULL THEN RETURN NEW; END IF;
  IF NOT (
    (TG_OP = 'INSERT' AND NEW.status = 'PAGO') OR
    (TG_OP = 'UPDATE' AND NEW.status = 'PAGO' AND NEW.status IS DISTINCT FROM OLD.status)
  ) THEN
    RETURN NEW;
  END IF;
  PERFORM public.crm_sync_lead_for_company(NEW.company_id, NEW.created_by);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_crm_sync_lead_from_order ON public.orders;
CREATE TRIGGER trg_crm_sync_lead_from_order
AFTER INSERT OR UPDATE OF status ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.crm_sync_lead_from_order();

-- Backfill: para cada empresa com pedido "pago em diante", sincroniza o lead
DO $$
DECLARE r RECORD;
BEGIN
  FOR r IN
    SELECT DISTINCT ON (company_id) company_id, created_by
      FROM public.orders
     WHERE status IN ('PAGO','EM_SEPARACAO','ENVIADO','ENTREGUE')
       AND company_id IS NOT NULL
     ORDER BY company_id, created_at DESC
  LOOP
    PERFORM public.crm_sync_lead_for_company(r.company_id, r.created_by);
  END LOOP;
END $$;


-- MIGRATION: 20260715161736_98d98aed-50eb-49b9-a30d-f539760b7228.sql

-- Normaliza dados existentes
UPDATE public.leads SET cidade = UPPER(TRIM(cidade)) WHERE cidade IS NOT NULL AND cidade <> UPPER(TRIM(cidade));
UPDATE public.companies SET cidade = UPPER(TRIM(cidade)) WHERE cidade IS NOT NULL AND cidade <> UPPER(TRIM(cidade));

-- Função de normalização
CREATE OR REPLACE FUNCTION public.normalize_cidade()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.cidade IS NOT NULL THEN
    NEW.cidade := UPPER(TRIM(NEW.cidade));
    IF NEW.cidade = '' THEN NEW.cidade := NULL; END IF;
  END IF;
  IF TG_TABLE_NAME IN ('leads','companies') AND NEW.estado IS NOT NULL THEN
    NEW.estado := UPPER(TRIM(NEW.estado));
    IF NEW.estado = '' THEN NEW.estado := NULL; END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_normalize_cidade_leads ON public.leads;
CREATE TRIGGER trg_normalize_cidade_leads
BEFORE INSERT OR UPDATE OF cidade, estado ON public.leads
FOR EACH ROW EXECUTE FUNCTION public.normalize_cidade();

DROP TRIGGER IF EXISTS trg_normalize_cidade_companies ON public.companies;
CREATE TRIGGER trg_normalize_cidade_companies
BEFORE INSERT OR UPDATE OF cidade, estado ON public.companies
FOR EACH ROW EXECUTE FUNCTION public.normalize_cidade();


-- MIGRATION: 20260715162220_46af6d10-d60b-4c46-a9da-8b9025d5fede.sql

-- Função genérica: uppercase + trim, mantendo NULL
CREATE OR REPLACE FUNCTION public._upper_trim(v text) RETURNS text
LANGUAGE sql IMMUTABLE AS $$
  SELECT CASE
    WHEN v IS NULL THEN NULL
    WHEN NULLIF(TRIM(v),'') IS NULL THEN NULL
    ELSE UPPER(TRIM(v))
  END
$$;

-- LEADS
CREATE OR REPLACE FUNCTION public.uppercase_leads() RETURNS TRIGGER
LANGUAGE plpgsql SET search_path=public AS $$
BEGIN
  NEW.empresa := public._upper_trim(NEW.empresa);
  NEW.contato := public._upper_trim(NEW.contato);
  NEW.cidade  := public._upper_trim(NEW.cidade);
  NEW.estado  := public._upper_trim(NEW.estado);
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS trg_normalize_cidade_leads ON public.leads;
DROP TRIGGER IF EXISTS trg_uppercase_leads ON public.leads;
CREATE TRIGGER trg_uppercase_leads BEFORE INSERT OR UPDATE ON public.leads
FOR EACH ROW EXECUTE FUNCTION public.uppercase_leads();

-- COMPANIES
CREATE OR REPLACE FUNCTION public.uppercase_companies() RETURNS TRIGGER
LANGUAGE plpgsql SET search_path=public AS $$
BEGIN
  NEW.legal_name := public._upper_trim(NEW.legal_name);
  NEW.trade_name := public._upper_trim(NEW.trade_name);
  NEW.cidade     := public._upper_trim(NEW.cidade);
  NEW.estado     := public._upper_trim(NEW.estado);
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS trg_normalize_cidade_companies ON public.companies;
DROP TRIGGER IF EXISTS trg_uppercase_companies ON public.companies;
CREATE TRIGGER trg_uppercase_companies BEFORE INSERT OR UPDATE ON public.companies
FOR EACH ROW EXECUTE FUNCTION public.uppercase_companies();

-- SUPPLIERS
CREATE OR REPLACE FUNCTION public.uppercase_suppliers() RETURNS TRIGGER
LANGUAGE plpgsql SET search_path=public AS $$
BEGIN
  NEW.razao_social  := public._upper_trim(NEW.razao_social);
  NEW.nome_fantasia := public._upper_trim(NEW.nome_fantasia);
  NEW.contato       := public._upper_trim(NEW.contato);
  NEW.cidade        := public._upper_trim(NEW.cidade);
  NEW.estado        := public._upper_trim(NEW.estado);
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS trg_uppercase_suppliers ON public.suppliers;
CREATE TRIGGER trg_uppercase_suppliers BEFORE INSERT OR UPDATE ON public.suppliers
FOR EACH ROW EXECUTE FUNCTION public.uppercase_suppliers();

-- ADDRESSES
CREATE OR REPLACE FUNCTION public.uppercase_addresses() RETURNS TRIGGER
LANGUAGE plpgsql SET search_path=public AS $$
BEGIN
  NEW.label      := public._upper_trim(NEW.label);
  NEW.street     := public._upper_trim(NEW.street);
  NEW.number     := public._upper_trim(NEW.number);
  NEW.complement := public._upper_trim(NEW.complement);
  NEW.district   := public._upper_trim(NEW.district);
  NEW.city       := public._upper_trim(NEW.city);
  NEW.state      := public._upper_trim(NEW.state);
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS trg_uppercase_addresses ON public.addresses;
CREATE TRIGGER trg_uppercase_addresses BEFORE INSERT OR UPDATE ON public.addresses
FOR EACH ROW EXECUTE FUNCTION public.uppercase_addresses();

-- PRODUCTS (apenas identificação, não descrições longas)
CREATE OR REPLACE FUNCTION public.uppercase_products() RETURNS TRIGGER
LANGUAGE plpgsql SET search_path=public AS $$
BEGIN
  NEW.nome                 := public._upper_trim(NEW.nome);
  NEW.modelo               := public._upper_trim(NEW.modelo);
  NEW.codigo_fabricante    := public._upper_trim(NEW.codigo_fabricante);
  NEW.localizacao          := public._upper_trim(NEW.localizacao);
  NEW.corredor             := public._upper_trim(NEW.corredor);
  NEW.prateleira           := public._upper_trim(NEW.prateleira);
  NEW.coluna               := public._upper_trim(NEW.coluna);
  NEW.posicao              := public._upper_trim(NEW.posicao);
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS trg_uppercase_products ON public.products;
CREATE TRIGGER trg_uppercase_products BEFORE INSERT OR UPDATE ON public.products
FOR EACH ROW EXECUTE FUNCTION public.uppercase_products();

-- BRANDS
CREATE OR REPLACE FUNCTION public.uppercase_brands() RETURNS TRIGGER
LANGUAGE plpgsql SET search_path=public AS $$
BEGIN
  NEW.nome := public._upper_trim(NEW.nome);
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS trg_uppercase_brands ON public.brands;
CREATE TRIGGER trg_uppercase_brands BEFORE INSERT OR UPDATE ON public.brands
FOR EACH ROW EXECUTE FUNCTION public.uppercase_brands();

-- CATEGORIES
CREATE OR REPLACE FUNCTION public.uppercase_categories() RETURNS TRIGGER
LANGUAGE plpgsql SET search_path=public AS $$
BEGIN
  NEW.nome := public._upper_trim(NEW.nome);
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS trg_uppercase_categories ON public.categories;
CREATE TRIGGER trg_uppercase_categories BEFORE INSERT OR UPDATE ON public.categories
FOR EACH ROW EXECUTE FUNCTION public.uppercase_categories();

-- Backfill dados existentes
UPDATE public.leads SET empresa=public._upper_trim(empresa), contato=public._upper_trim(contato), cidade=public._upper_trim(cidade), estado=public._upper_trim(estado);
UPDATE public.companies SET legal_name=public._upper_trim(legal_name), trade_name=public._upper_trim(trade_name), cidade=public._upper_trim(cidade), estado=public._upper_trim(estado);
UPDATE public.suppliers SET razao_social=public._upper_trim(razao_social), nome_fantasia=public._upper_trim(nome_fantasia), contato=public._upper_trim(contato), cidade=public._upper_trim(cidade), estado=public._upper_trim(estado);
UPDATE public.addresses SET label=public._upper_trim(label), street=public._upper_trim(street), number=public._upper_trim(number), complement=public._upper_trim(complement), district=public._upper_trim(district), city=public._upper_trim(city), state=public._upper_trim(state);
UPDATE public.products SET nome=public._upper_trim(nome), modelo=public._upper_trim(modelo), codigo_fabricante=public._upper_trim(codigo_fabricante), localizacao=public._upper_trim(localizacao), corredor=public._upper_trim(corredor), prateleira=public._upper_trim(prateleira), coluna=public._upper_trim(coluna), posicao=public._upper_trim(posicao);
UPDATE public.brands SET nome=public._upper_trim(nome);
UPDATE public.categories SET nome=public._upper_trim(nome);


-- MIGRATION: 20260715225324_421d8566-8160-450e-82d6-d2ac94436ac7.sql

ALTER TABLE public.whatsapp_templates 
  ADD COLUMN IF NOT EXISTS ativo BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS ordem INTEGER NOT NULL DEFAULT 0;

-- Permite leitura por qualquer usuário autenticado (para usar nas campanhas)
DROP POLICY IF EXISTS "Authenticated can read wa_templates" ON public.whatsapp_templates;
CREATE POLICY "Authenticated can read wa_templates"
  ON public.whatsapp_templates
  FOR SELECT
  TO authenticated
  USING (true);

-- Seed dos 3 templates iniciais
INSERT INTO public.whatsapp_templates (nome, categoria, conteudo, ordem, ativo)
VALUES
(
  'Aviso 1 semana antes da viagem',
  'PRE_VIAGEM',
  E'Olá {{nome}}! Tudo bem?\n\nSou da *Atacado Prime* e passo aqui pra avisar: na próxima semana nossa equipe estará em *{{cidade}}/{{estado}}* com pronta entrega de chaves canivete, controles remotos e acessórios automotivos.\n\nTemos condições especiais pra quem reservar antes da visita — e o pagamento pode ser feito no ato da entrega, com total segurança na sua primeira compra.\n\nQuer que eu já separe algo pra você? Me responde aqui!',
  1,
  true
),
(
  'Lembrete na semana da viagem',
  'SEMANA_VIAGEM',
  E'Oi {{nome}}, tudo bem?\n\nEssa semana estaremos aí em *{{cidade}}/{{estado}}* com o estoque completo da *Atacado Prime* — chaves canivete, controles e acessórios prontos pra entrega.\n\nGaranta seu pedido antes que acabe! Pagamento na entrega, sem risco pra você.\n\nMe manda o que precisa que já reservo em separado.',
  2,
  true
),
(
  'Chegamos na cidade',
  'NA_CIDADE',
  E'{{nome}}, chegamos! 🚗\n\nA equipe da *Atacado Prime* já está em *{{cidade}}/{{estado}}* com pronta entrega de chaves canivete, controles e acessórios.\n\nÚltima chance de garantir preço especial e pagar só na entrega. Me responde qual peça você precisa que passo aí hoje mesmo!',
  3,
  true
);


-- MIGRATION: 20260716002401_ccaad7fe-6e6d-4169-930e-470a912574a4.sql

CREATE TABLE public.post_sale_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL UNIQUE REFERENCES public.orders(id) ON DELETE CASCADE,
  company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  phone TEXT,
  message TEXT,
  send_at TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING','SENT','FAILED','SKIPPED','CANCELED')),
  sent_at TIMESTAMPTZ,
  error TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_post_sale_status_send_at ON public.post_sale_messages(status, send_at);
CREATE INDEX idx_post_sale_order ON public.post_sale_messages(order_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.post_sale_messages TO authenticated;
GRANT ALL ON public.post_sale_messages TO service_role;

ALTER TABLE public.post_sale_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Sales staff can view post_sale_messages"
  ON public.post_sale_messages FOR SELECT TO authenticated
  USING (public.is_sales_staff(auth.uid()));

CREATE POLICY "Sales staff can manage post_sale_messages"
  ON public.post_sale_messages FOR ALL TO authenticated
  USING (public.is_sales_staff(auth.uid()))
  WITH CHECK (public.is_sales_staff(auth.uid()));

CREATE TRIGGER trg_post_sale_messages_updated
  BEFORE UPDATE ON public.post_sale_messages
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Função que enfileira mensagem de pós-venda quando pedido vira PAGO
CREATE OR REPLACE FUNCTION public.enqueue_post_sale_message()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_phone TEXT;
  v_lead_id UUID;
BEGIN
  IF NOT (
    (TG_OP = 'INSERT' AND NEW.status = 'PAGO') OR
    (TG_OP = 'UPDATE' AND NEW.status = 'PAGO' AND NEW.status IS DISTINCT FROM OLD.status)
  ) THEN
    RETURN NEW;
  END IF;

  IF NEW.company_id IS NULL THEN
    RETURN NEW;
  END IF;

  -- Busca telefone e lead vinculado
  SELECT l.id, COALESCE(l.whatsapp, c.phone)
    INTO v_lead_id, v_phone
    FROM public.companies c
    LEFT JOIN public.leads l ON l.company_id = c.id
   WHERE c.id = NEW.company_id
   LIMIT 1;

  IF v_phone IS NULL OR length(regexp_replace(v_phone, '\D', '', 'g')) < 8 THEN
    RETURN NEW;
  END IF;

  INSERT INTO public.post_sale_messages(order_id, company_id, lead_id, phone, send_at, status)
  VALUES (NEW.id, NEW.company_id, v_lead_id, v_phone, now() + INTERVAL '3 days', 'PENDING')
  ON CONFLICT (order_id) DO NOTHING;

  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_orders_enqueue_post_sale
  AFTER INSERT OR UPDATE OF status ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.enqueue_post_sale_message();


-- MIGRATION: 20260716144305_888a03ed-04f2-484f-87ac-e409f5c405b2.sql
ALTER TABLE public.whatsapp_campaigns
ADD COLUMN IF NOT EXISTS send_limit integer;

COMMENT ON COLUMN public.whatsapp_campaigns.send_limit IS 'Número máximo de destinatários a enviar nesta campanha (null = sem limite)';

-- MIGRATION: 20260716150559_06a0473a-15b2-474b-9841-f07f2ea910a4.sql

ALTER TABLE public.whatsapp_campaigns
  ADD COLUMN IF NOT EXISTS batch_size INT,
  ADD COLUMN IF NOT EXISTS batch_pause_minutes INT,
  ADD COLUMN IF NOT EXISTS message_interval_seconds INT,
  ADD COLUMN IF NOT EXISTS last_batch_at TIMESTAMPTZ;


-- MIGRATION: 20260718024659_77651370-c9cf-486c-9300-56dbcffaeb8a.sql

-- product-images: revoke broad authenticated write/update/delete
DROP POLICY IF EXISTS "Auth insert images" ON storage.objects;
DROP POLICY IF EXISTS "Auth update images" ON storage.objects;
DROP POLICY IF EXISTS "Auth delete images" ON storage.objects;

-- visit-photos: revoke broad authenticated CRUD
DROP POLICY IF EXISTS "Auth read images" ON storage.objects;
DROP POLICY IF EXISTS "Auth insert visit images" ON storage.objects;
DROP POLICY IF EXISTS "Auth update visit images" ON storage.objects;
DROP POLICY IF EXISTS "Auth delete visit images" ON storage.objects;

-- Recreate scoped policies for visit-photos (staff only)
CREATE POLICY "visit-photos staff read"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'visit-photos' AND public.is_sales_staff(auth.uid()));

CREATE POLICY "visit-photos staff insert"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'visit-photos' AND public.is_sales_staff(auth.uid()));

CREATE POLICY "visit-photos staff update"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'visit-photos' AND public.is_sales_staff(auth.uid()))
WITH CHECK (bucket_id = 'visit-photos' AND public.is_sales_staff(auth.uid()));

CREATE POLICY "visit-photos staff delete"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'visit-photos' AND public.is_sales_staff(auth.uid()));

-- wa_campaign_images: restrict to admins
DROP POLICY IF EXISTS "wa_campaign_images_insert" ON storage.objects;
DROP POLICY IF EXISTS "wa_campaign_images_update" ON storage.objects;
DROP POLICY IF EXISTS "wa_campaign_images_delete" ON storage.objects;
DROP POLICY IF EXISTS "wa_campaign_images_read" ON storage.objects;

CREATE POLICY "wa_campaign_images admin read"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'wa-campaign-images' AND public.has_role(auth.uid(),'admin'));

CREATE POLICY "wa_campaign_images admin insert"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'wa-campaign-images' AND public.has_role(auth.uid(),'admin'));

CREATE POLICY "wa_campaign_images admin update"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'wa-campaign-images' AND public.has_role(auth.uid(),'admin'))
WITH CHECK (bucket_id = 'wa-campaign-images' AND public.has_role(auth.uid(),'admin'));

CREATE POLICY "wa_campaign_images admin delete"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'wa-campaign-images' AND public.has_role(auth.uid(),'admin'));


-- MIGRATION: 20260720143332_152e421a-52f0-4e85-a7ba-eb23c323c43b.sql
UPDATE public.products SET tipo = 'controle' WHERE sku = 'CP-025';

-- MIGRATION: 20260721221502_a4126300-f22d-4f8e-acb8-c4e157081301.sql
CREATE OR REPLACE FUNCTION public.audit_log_change()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE _old JSONB; _new JSONB; _action TEXT;
BEGIN
  IF TG_OP='INSERT' THEN _action:='INSERT'; _new:=to_jsonb(NEW);
  ELSIF TG_OP='UPDATE' THEN
    _action:='UPDATE'; _old:=to_jsonb(OLD); _new:=to_jsonb(NEW);
    IF _old = _new THEN RETURN NEW; END IF;
  ELSIF TG_OP='DELETE' THEN _action:='DELETE'; _old:=to_jsonb(OLD);
  END IF;
  INSERT INTO public.audit_logs(user_id, acao, entidade, entidade_id, payload, resultado, created_at)
  VALUES (
    auth.uid(), _action, TG_TABLE_NAME,
    COALESCE((_new->>'id'), (_old->>'id')),
    jsonb_build_object('old', _old, 'new', _new),
    'SUCESSO', now()
  );
  RETURN COALESCE(NEW, OLD);
END; $function$;

-- MIGRATION: 20260721221642_3b12d93f-9426-4719-b751-c91ab8adfcf4.sql
CREATE OR REPLACE FUNCTION public.order_create_atomic(_payload jsonb)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_company_id UUID := (_payload->>'company_id')::UUID;
  v_address_id UUID := NULLIF(_payload->>'address_id','')::UUID;
  v_origem     TEXT := _payload->>'origem';
  v_frete      NUMERIC := COALESCE((_payload->>'frete')::NUMERIC, 0);
  v_desconto   NUMERIC := COALESCE((_payload->>'desconto')::NUMERIC, 0);
  v_acrescimo  NUMERIC := COALESCE((_payload->>'acrescimo')::NUMERIC, 0);
  v_observacao TEXT := _payload->>'observacao';
  v_pagamento  TEXT := _payload->>'pagamento';
  v_trip_id    UUID := NULLIF(_payload->>'trip_id','')::UUID;
  v_created_by UUID := auth.uid();

  v_order_id   UUID;
  v_subtotal   NUMERIC := 0;
  v_total      NUMERIC := 0;

  it JSONB;
  v_product_id UUID;
  v_tipo_compra TEXT;
  v_qtd NUMERIC;
  v_preco_unit NUMERIC;
  v_preco_pac NUMERIC;
  v_preco_final NUMERIC;
  v_item_subtotal NUMERIC;
  v_custo_unit NUMERIC;
BEGIN
  IF v_company_id IS NULL THEN RAISE EXCEPTION 'company_id obrigatório'; END IF;
  IF v_origem IS NULL THEN RAISE EXCEPTION 'origem obrigatório'; END IF;
  IF v_pagamento IS NULL THEN RAISE EXCEPTION 'pagamento obrigatório'; END IF;
  IF jsonb_array_length(_payload->'items') = 0 THEN
    RAISE EXCEPTION 'Pedido precisa de pelo menos 1 item';
  END IF;

  INSERT INTO public.orders(
    company_id, address_id, origem, status,
    subtotal, frete, desconto, total,
    observacao, created_by, trip_id
  ) VALUES (
    v_company_id, v_address_id, v_origem::order_origem, 'AGUARDANDO_PAGAMENTO'::order_status,
    0, v_frete, v_desconto, 0,
    v_observacao, v_created_by, v_trip_id
  ) RETURNING id INTO v_order_id;

  FOR it IN SELECT * FROM jsonb_array_elements(_payload->'items')
  LOOP
    v_product_id := (it->>'product_id')::UUID;
    v_tipo_compra := COALESCE(it->>'tipo_compra','UNIDADE');
    v_qtd := (it->>'quantidade')::NUMERIC;
    v_preco_unit := (it->>'preco_unitario')::NUMERIC;
    v_preco_pac := NULLIF(it->>'preco_pacote','')::NUMERIC;

    IF v_qtd IS NULL OR v_qtd <= 0 THEN
      RAISE EXCEPTION 'Quantidade inválida para item %', v_product_id;
    END IF;

    v_preco_final := CASE
      WHEN v_tipo_compra = 'PACOTE' AND v_preco_pac IS NOT NULL THEN v_preco_pac
      ELSE v_preco_unit
    END;
    v_item_subtotal := v_preco_final * v_qtd;

    SELECT COALESCE(preco_custo, 0) INTO v_custo_unit
      FROM public.products WHERE id = v_product_id;

    INSERT INTO public.order_items(
      order_id, product_id, tipo_compra, quantidade,
      preco_unitario, preco_final, subtotal, custo_unitario
    ) VALUES (
      v_order_id, v_product_id, v_tipo_compra::compra_tipo, v_qtd,
      v_preco_unit, v_preco_final, v_item_subtotal, v_custo_unit
    );

    v_subtotal := v_subtotal + v_item_subtotal;

    IF v_trip_id IS NULL THEN
      PERFORM public.stock_apply_delta(
        v_product_id, -v_qtd, 'SAIDA',
        'Venda pedido ' || substring(v_order_id::text,1,8),
        v_order_id, TRUE
      );
    END IF;
  END LOOP;

  v_total := v_subtotal + v_frete - v_desconto + v_acrescimo;

  UPDATE public.orders SET subtotal = v_subtotal, total = v_total WHERE id = v_order_id;

  INSERT INTO public.payments(order_id, tipo, valor, status)
  VALUES (v_order_id, v_pagamento::payment_tipo, v_total, 'PENDENTE'::payment_status);

  IF v_trip_id IS NOT NULL THEN
    PERFORM public.trip_recalculate_items(v_trip_id);
  END IF;

  RETURN v_order_id;
END;
$function$;

-- MIGRATION: 20260722002034_3bf353ba-b493-430e-9df2-397d61d1468a.sql
CREATE OR REPLACE FUNCTION public.order_sync_financials()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  custo_total NUMERIC := 0;
  ja_receita UUID;
  ja_despesa_dia UUID;
  pay RECORD;
  pay_tipo TEXT;
  parcelas_num INT := 1;
  conta_txt TEXT;
  observ_txt TEXT;
  acc_id UUID;
  is_cartao BOOLEAN;
  status_fin TEXT;
  pagamento_fin DATE;
  forma_txt TEXT;
  descricao_txt TEXT;
  detalhe_txt TEXT;
  dia_venda DATE;
  dia_label TEXT;
  desc_dia TEXT;
  allowed_formas TEXT[] := ARRAY['PIX','CARTAO','BOLETO','DINHEIRO','TRANSFERENCIA','OUTRO'];
BEGIN
  IF NOT (
    (TG_OP='INSERT' AND NEW.status='PAGO') OR
    (TG_OP='UPDATE' AND NEW.status='PAGO' AND NEW.status IS DISTINCT FROM OLD.status)
  ) THEN RETURN NEW; END IF;

  SELECT tipo::text,
         COALESCE((payload->>'parcelas')::int, 1) AS parcelas,
         payload->>'conta' AS conta,
         payload->>'observacao' AS observ,
         account_id
    INTO pay
    FROM public.payments
   WHERE order_id = NEW.id
   ORDER BY created_at DESC
   LIMIT 1;

  pay_tipo := pay.tipo;
  parcelas_num := COALESCE(pay.parcelas, 1);
  conta_txt := pay.conta;
  observ_txt := pay.observ;
  acc_id := pay.account_id;

  IF acc_id IS NULL THEN
    IF pay_tipo = 'CARTAO' THEN
      SELECT id INTO acc_id FROM public.bank_accounts WHERE default_cartao AND ativo LIMIT 1;
    ELSIF pay_tipo = 'PIX' THEN
      SELECT id INTO acc_id FROM public.bank_accounts WHERE default_pix AND ativo LIMIT 1;
    ELSIF pay_tipo = 'DINHEIRO' THEN
      SELECT id INTO acc_id FROM public.bank_accounts WHERE default_dinheiro AND ativo LIMIT 1;
    END IF;
  END IF;

  is_cartao := pay_tipo = 'CARTAO';
  status_fin := CASE WHEN is_cartao THEN 'PENDENTE' ELSE 'PAGO' END;
  pagamento_fin := CASE WHEN is_cartao THEN NULL ELSE CURRENT_DATE END;

  -- forma_pagamento deve respeitar CHECK constraint
  forma_txt := CASE
    WHEN pay_tipo = ANY(allowed_formas) THEN pay_tipo
    ELSE 'OUTRO'
  END;

  detalhe_txt := CASE
    WHEN is_cartao AND conta_txt IS NOT NULL THEN conta_txt || ' · ' || parcelas_num || 'x'
    WHEN conta_txt IS NOT NULL THEN conta_txt
    ELSE NULL
  END;

  descricao_txt := COALESCE(observ_txt, 'Venda #'||substring(NEW.id::text,1,8));
  IF detalhe_txt IS NOT NULL THEN
    descricao_txt := descricao_txt || ' (' || detalhe_txt || ')';
  END IF;

  SELECT id INTO ja_receita
    FROM public.financial_transactions
   WHERE order_id = NEW.id AND tipo = 'RECEITA'
   LIMIT 1;

  IF ja_receita IS NULL THEN
    INSERT INTO public.financial_transactions(
      order_id, company_id, tipo, status, valor,
      pagamento, descricao, forma_pagamento, parcelas, account_id
    ) VALUES (
      NEW.id, NEW.company_id, 'RECEITA', status_fin, COALESCE(NEW.total,0),
      pagamento_fin,
      descricao_txt,
      forma_txt, parcelas_num,
      CASE WHEN is_cartao THEN NULL ELSE acc_id END
    );
  ELSE
    UPDATE public.financial_transactions
       SET status = status_fin,
           valor = COALESCE(NEW.total, valor),
           pagamento = COALESCE(pagamento, pagamento_fin),
           forma_pagamento = COALESCE(forma_pagamento, forma_txt),
           parcelas = COALESCE(parcelas, parcelas_num),
           account_id = COALESCE(account_id, CASE WHEN is_cartao THEN NULL ELSE acc_id END),
           updated_at = now()
     WHERE id = ja_receita;
  END IF;

  IF NEW.trip_id IS NULL AND NEW.custo_lancado_em IS NULL THEN
    SELECT COALESCE(SUM(oi.quantidade * COALESCE(oi.custo_unitario, 0)),0) INTO custo_total
      FROM public.order_items oi
     WHERE oi.order_id = NEW.id;

    IF custo_total > 0 THEN
      dia_venda := CURRENT_DATE;
      dia_label := to_char(dia_venda, 'DD/MM/YYYY');
      desc_dia  := 'Custos das peças vendidas '||dia_label;

      SELECT id INTO ja_despesa_dia
        FROM public.financial_transactions
       WHERE tipo='DESPESA' AND order_id IS NULL AND descricao = desc_dia
       LIMIT 1;

      IF ja_despesa_dia IS NULL THEN
        INSERT INTO public.financial_transactions(order_id, company_id, tipo, status, valor, vencimento, descricao)
        VALUES (NULL, NULL, 'DESPESA', 'PENDENTE', custo_total,
                dia_venda + INTERVAL '30 days', desc_dia);
      ELSE
        UPDATE public.financial_transactions
           SET valor = valor + custo_total, updated_at = now()
         WHERE id = ja_despesa_dia;
      END IF;
    END IF;

    NEW.custo_lancado_em := now();
  END IF;

  RETURN NEW;
END; $function$;

-- MIGRATION: 20260722210353_348c1c90-a3a6-4e35-bf45-fd8a25aa3041.sql

ALTER TABLE public.trip_expenses
  ADD COLUMN IF NOT EXISTS receipt_url TEXT,
  ADD COLUMN IF NOT EXISTS receipt_path TEXT;

-- RLS on trip-receipts storage: users authenticated leem/inserem/deletam apenas suas próprias fotos
CREATE POLICY "trip-receipts: authenticated read"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'trip-receipts');

CREATE POLICY "trip-receipts: authenticated insert"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'trip-receipts');

CREATE POLICY "trip-receipts: authenticated delete own"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'trip-receipts' AND owner = auth.uid());


-- MIGRATION: 20260722220152_eed15053-da62-426d-a965-63f0e91f7bf4.sql
ALTER TABLE public.trips ADD COLUMN IF NOT EXISTS destinos jsonb NOT NULL DEFAULT '[]'::jsonb;
COMMENT ON COLUMN public.trips.destinos IS 'Cidades adicionais da viagem: [{"cidade":"São José do Rio Preto","estado":"SP"}]';

-- MIGRATION: 20260722225052_3b40031a-f058-4056-a41a-fd0099b5f06d.sql

CREATE OR REPLACE FUNCTION public.orders_auto_link_trip()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_cidade text;
  v_estado text;
  v_trip uuid;
BEGIN
  IF NEW.trip_id IS NOT NULL THEN
    RETURN NEW;
  END IF;
  IF NEW.company_id IS NULL THEN
    RETURN NEW;
  END IF;

  SELECT UPPER(TRIM(cidade)), UPPER(TRIM(estado))
    INTO v_cidade, v_estado
    FROM public.companies WHERE id = NEW.company_id;

  IF v_cidade IS NULL OR v_cidade = '' THEN
    RETURN NEW;
  END IF;

  SELECT t.id INTO v_trip
    FROM public.trips t
   WHERE t.status = 'open'
     AND (
       (UPPER(TRIM(t.cidade)) = v_cidade AND (v_estado IS NULL OR UPPER(TRIM(t.estado)) = v_estado))
       OR EXISTS (
         SELECT 1 FROM jsonb_array_elements(COALESCE(t.destinos, '[]'::jsonb)) d
         WHERE UPPER(TRIM(d->>'cidade')) = v_cidade
           AND (v_estado IS NULL OR UPPER(TRIM(d->>'estado')) = v_estado)
       )
     )
   ORDER BY t.created_at DESC
   LIMIT 1;

  IF v_trip IS NOT NULL THEN
    NEW.trip_id := v_trip;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_orders_auto_link_trip ON public.orders;
CREATE TRIGGER trg_orders_auto_link_trip
  BEFORE INSERT ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.orders_auto_link_trip();


-- MIGRATION: 20260723011735_c848b443-6b3e-493a-ad34-f2e26afa51c1.sql

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS preco_nivel_1 numeric(10,2),
  ADD COLUMN IF NOT EXISTS preco_nivel_2 numeric(10,2),
  ADD COLUMN IF NOT EXISTS preco_nivel_3 numeric(10,2);

INSERT INTO public.system_settings (chave, valor, descricao, categoria)
SELECT 'pricing_tiers',
       jsonb_build_object('tier_2_min', 500, 'tier_3_min', 1000, 'enabled', true),
       'Faixas globais de pre�o por total do carrinho',
       'pricing'
WHERE NOT EXISTS (SELECT 1 FROM public.system_settings WHERE chave = 'pricing_tiers');

UPDATE public.products
SET preco_nivel_1 = 4.50, preco_nivel_2 = 4.30, preco_nivel_3 = 4.00, preco_unitario = 4.50
WHERE tipo = 'carcaca';

UPDATE public.products
SET preco_nivel_1 = 45.00, preco_nivel_2 = 43.00, preco_nivel_3 = 40.00, preco_unitario = 45.00
WHERE tipo = 'chave';

UPDATE public.products
SET preco_nivel_1 = 35.00, preco_nivel_2 = 33.00, preco_nivel_3 = 30.00, preco_unitario = 35.00
WHERE tipo = 'controle';

UPDATE public.products
SET preco_nivel_1 = COALESCE(preco_nivel_1, preco_unitario),
    preco_nivel_2 = COALESCE(preco_nivel_2, preco_unitario),
    preco_nivel_3 = COALESCE(preco_nivel_3, preco_unitario)
WHERE preco_nivel_1 IS NULL OR preco_nivel_2 IS NULL OR preco_nivel_3 IS NULL;

CREATE OR REPLACE FUNCTION public.pricing_tier_for_total(_total numeric)
RETURNS int
LANGUAGE sql
IMMUTABLE
SET search_path = public
AS $$
  SELECT CASE
    WHEN _total >= 1000 THEN 3
    WHEN _total >= 500  THEN 2
    ELSE 1
  END;
$$;

GRANT EXECUTE ON FUNCTION public.pricing_tier_for_total(numeric) TO anon, authenticated, service_role;


-- MIGRATION: 20260724140444_ca465de8-cc91-406a-8905-2f082ab16128.sql

CREATE TABLE public.fechamentos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  periodo_from DATE NOT NULL,
  periodo_to DATE NOT NULL,
  vendas_periodo NUMERIC NOT NULL DEFAULT 0,
  custo_pecas_periodo NUMERIC NOT NULL DEFAULT 0,
  pct_reserva NUMERIC NOT NULL DEFAULT 0,
  valor_reserva NUMERIC NOT NULL DEFAULT 0,
  valor_transferido NUMERIC NOT NULL DEFAULT 0,
  account_id UUID REFERENCES public.bank_accounts(id) ON DELETE SET NULL,
  observacao TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT fechamentos_periodo_check CHECK (periodo_to >= periodo_from)
);

CREATE INDEX idx_fechamentos_periodo ON public.fechamentos(periodo_from, periodo_to);
CREATE INDEX idx_fechamentos_account ON public.fechamentos(account_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.fechamentos TO authenticated;
GRANT ALL ON public.fechamentos TO service_role;

ALTER TABLE public.fechamentos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Sales staff can view fechamentos" ON public.fechamentos
  FOR SELECT TO authenticated
  USING (public.is_sales_staff(auth.uid()));

CREATE POLICY "Sales staff can insert fechamentos" ON public.fechamentos
  FOR INSERT TO authenticated
  WITH CHECK (public.is_sales_staff(auth.uid()) AND created_by = auth.uid());

CREATE POLICY "Managers can update fechamentos" ON public.fechamentos
  FOR UPDATE TO authenticated
  USING (public.is_manager(auth.uid()))
  WITH CHECK (public.is_manager(auth.uid()));

CREATE POLICY "Managers can delete fechamentos" ON public.fechamentos
  FOR DELETE TO authenticated
  USING (public.is_manager(auth.uid()));

CREATE TRIGGER trg_fechamentos_updated_at
  BEFORE UPDATE ON public.fechamentos
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Trigger: ao criar/atualizar fechamento, lançar como RECEITA na conta destino
CREATE OR REPLACE FUNCTION public.fechamento_sync_financeiro()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  desc_txt TEXT;
BEGIN
  desc_txt := 'Fechamento ' || to_char(NEW.periodo_from, 'DD/MM/YYYY') || ' a ' || to_char(NEW.periodo_to, 'DD/MM/YYYY');

  IF TG_OP = 'INSERT' AND NEW.valor_transferido > 0 AND NEW.account_id IS NOT NULL THEN
    INSERT INTO public.financial_entries (account_id, tipo, valor, data, descricao, created_by)
    VALUES (NEW.account_id, 'RECEITA', NEW.valor_transferido, NEW.periodo_to, desc_txt, NEW.created_by);
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_fechamento_sync_financeiro
  AFTER INSERT ON public.fechamentos
  FOR EACH ROW EXECUTE FUNCTION public.fechamento_sync_financeiro();


-- MIGRATION: 20260724140513_4a5da7f7-fab4-4b6e-87e3-e3d6c4cd51d0.sql

CREATE OR REPLACE FUNCTION public.fechamento_sync_financeiro()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  desc_txt TEXT;
BEGIN
  desc_txt := 'Fechamento ' || to_char(NEW.periodo_from, 'DD/MM/YYYY') || ' a ' || to_char(NEW.periodo_to, 'DD/MM/YYYY');

  IF TG_OP = 'INSERT' AND NEW.valor_transferido > 0 AND NEW.account_id IS NOT NULL THEN
    INSERT INTO public.financial_entries (account_id, tipo, valor, data, descricao)
    VALUES (NEW.account_id, 'RECEITA', NEW.valor_transferido, NEW.periodo_to, desc_txt);
  END IF;

  RETURN NEW;
END;
$$;


-- MIGRATION: 20260724145511_c849b207-4473-4a45-9dbb-cc7e9a34c83d.sql

ALTER TABLE public.fechamentos
  ADD COLUMN IF NOT EXISTS despesas_periodo numeric NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS lucro_liquido numeric NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS valor_retirada numeric NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS account_id_pessoal uuid REFERENCES public.bank_accounts(id);

CREATE OR REPLACE FUNCTION public.fechamento_sync_financeiro()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  desc_txt TEXT;
  desc_pessoal TEXT;
BEGIN
  desc_txt := 'Fechamento ' || to_char(NEW.periodo_from, 'DD/MM/YYYY') || ' a ' || to_char(NEW.periodo_to, 'DD/MM/YYYY');
  desc_pessoal := 'Retirada pessoal — fechamento ' || to_char(NEW.periodo_from, 'DD/MM/YYYY') || ' a ' || to_char(NEW.periodo_to, 'DD/MM/YYYY');

  IF TG_OP = 'INSERT' THEN
    IF NEW.valor_transferido > 0 AND NEW.account_id IS NOT NULL THEN
      INSERT INTO public.financial_entries (account_id, tipo, valor, data, descricao)
      VALUES (NEW.account_id, 'RECEITA', NEW.valor_transferido, NEW.periodo_to, desc_txt);
    END IF;

    IF NEW.valor_retirada > 0 AND NEW.account_id_pessoal IS NOT NULL THEN
      INSERT INTO public.financial_entries (account_id, tipo, valor, data, descricao)
      VALUES (NEW.account_id_pessoal, 'RECEITA', NEW.valor_retirada, NEW.periodo_to, desc_pessoal);
    END IF;
  END IF;

  RETURN NEW;
END;
$function$;


-- MIGRATION: 20260724145744_52140fb7-dc8f-4e93-bc85-befd4bcf4c1a.sql

CREATE OR REPLACE FUNCTION public.fechamento_sync_financeiro()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  desc_txt TEXT;
BEGIN
  desc_txt := 'Fechamento ' || to_char(NEW.periodo_from, 'DD/MM/YYYY') || ' a ' || to_char(NEW.periodo_to, 'DD/MM/YYYY');

  IF TG_OP = 'INSERT' THEN
    IF NEW.valor_transferido > 0 AND NEW.account_id IS NOT NULL THEN
      INSERT INTO public.financial_entries (account_id, tipo, valor, data, descricao)
      VALUES (NEW.account_id, 'RECEITA', NEW.valor_transferido, NEW.periodo_to, desc_txt || ' — Empresa (custo + reserva)');
    END IF;

    IF NEW.valor_retirada IS NOT NULL AND NEW.valor_retirada > 0 AND NEW.account_id_pessoal IS NOT NULL THEN
      INSERT INTO public.financial_entries (account_id, tipo, valor, data, descricao)
      VALUES (NEW.account_id_pessoal, 'RECEITA', NEW.valor_retirada, NEW.periodo_to, desc_txt || ' — Retirada pessoal (lucro − reserva)');
    END IF;
  END IF;

  RETURN NEW;
END;
$function$;


-- MIGRATION: 20260724163544_9fe400d6-2920-46b3-84d5-8a59e163df7b.sql

-- 1) Débito e PIX sem taxa (usuário não usa maquininha)
UPDATE public.payment_fees SET debito = 0, updated_at = now();

-- 2) Config global de antecipação (2,09%) + flag padrão desligada
INSERT INTO public.system_settings (categoria, chave, valor)
VALUES
  ('financeiro', 'antecipacao_taxa_percentual', '2.09'::jsonb),
  ('financeiro', 'antecipacao_padrao', 'false'::jsonb)
ON CONFLICT (categoria, chave) DO NOTHING;

-- 3) Payments: bandeira do cartão e sinalização de antecipação
ALTER TABLE public.payments
  ADD COLUMN IF NOT EXISTS bandeira text,
  ADD COLUMN IF NOT EXISTS antecipado boolean NOT NULL DEFAULT false;

-- 4) Financial transactions: identificar parcela e origem
ALTER TABLE public.financial_transactions
  ADD COLUMN IF NOT EXISTS parcela_num integer,
  ADD COLUMN IF NOT EXISTS parcelas_total integer,
  ADD COLUMN IF NOT EXISTS bandeira text,
  ADD COLUMN IF NOT EXISTS taxa_percentual numeric,
  ADD COLUMN IF NOT EXISTS valor_bruto numeric,
  ADD COLUMN IF NOT EXISTS antecipado boolean NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS idx_ft_order_parcela
  ON public.financial_transactions(order_id, parcela_num);


-- MIGRATION: 20260724163848_c9e92687-f3b8-49c1-af2a-7463f91d8e60.sql

CREATE OR REPLACE FUNCTION public.order_sync_financials()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  pay RECORD;
  pay_tipo TEXT;
  modalidade TEXT;
  bandeira TEXT;
  parcelas_num INT := 1;
  antecipado BOOLEAN := false;
  conta_txt TEXT;
  observ_txt TEXT;
  acc_id UUID;
  fee_rec RECORD;
  taxa_bandeira NUMERIC := 0;
  taxa_antec NUMERIC := 0;
  taxa_total_pct NUMERIC := 0;
  bruto_total NUMERIC := 0;
  liquido_total NUMERIC := 0;
  taxa_valor_total NUMERIC := 0;
  parcela_bruto NUMERIC := 0;
  parcela_liquido NUMERIC := 0;
  i INT;
  venc DATE;
  desc_base TEXT;
  desc_dia TEXT;
  ja_despesa_dia UUID;
  custo_total NUMERIC := 0;
  is_credito BOOLEAN;
  status_fin TEXT;
  pagamento_fin DATE;
  forma_txt TEXT;
  allowed_formas TEXT[] := ARRAY['PIX','CARTAO','BOLETO','DINHEIRO','TRANSFERENCIA','OUTRO'];
BEGIN
  IF NOT (
    (TG_OP='INSERT' AND NEW.status='PAGO') OR
    (TG_OP='UPDATE' AND NEW.status='PAGO' AND NEW.status IS DISTINCT FROM OLD.status)
  ) THEN RETURN NEW; END IF;

  -- Se já foi sincronizado, não repete
  IF EXISTS (SELECT 1 FROM public.financial_transactions WHERE order_id = NEW.id AND tipo = 'RECEITA') THEN
    RETURN NEW;
  END IF;

  SELECT tipo::text,
         COALESCE((payload->>'parcelas')::int, 1) AS parcelas,
         payload->>'conta' AS conta,
         payload->>'observacao' AS observ,
         payload->>'modalidade' AS modalidade,
         COALESCE(payments.bandeira, payload->>'bandeira') AS bandeira,
         COALESCE(payments.antecipado, (payload->>'antecipado')::boolean, false) AS antecipado,
         account_id
    INTO pay
    FROM public.payments
   WHERE order_id = NEW.id
   ORDER BY created_at DESC
   LIMIT 1;

  pay_tipo := pay.tipo;
  parcelas_num := GREATEST(COALESCE(pay.parcelas, 1), 1);
  conta_txt := pay.conta;
  observ_txt := pay.observ;
  acc_id := pay.account_id;
  bandeira := pay.bandeira;
  antecipado := COALESCE(pay.antecipado, false);
  modalidade := UPPER(COALESCE(pay.modalidade,
    CASE WHEN pay_tipo = 'CARTAO' AND parcelas_num > 1 THEN 'CREDITO'
         WHEN pay_tipo = 'CARTAO' THEN 'CREDITO'
         ELSE pay_tipo END));

  -- Conta padrão se não informada
  IF acc_id IS NULL THEN
    IF pay_tipo = 'CARTAO' THEN
      SELECT id INTO acc_id FROM public.bank_accounts WHERE default_cartao AND ativo LIMIT 1;
    ELSIF pay_tipo = 'PIX' THEN
      SELECT id INTO acc_id FROM public.bank_accounts WHERE default_pix AND ativo LIMIT 1;
    ELSIF pay_tipo = 'DINHEIRO' THEN
      SELECT id INTO acc_id FROM public.bank_accounts WHERE default_dinheiro AND ativo LIMIT 1;
    END IF;
  END IF;

  is_credito := (pay_tipo = 'CARTAO' AND modalidade = 'CREDITO');

  -- forma_pagamento compatível com CHECK
  forma_txt := CASE
    WHEN pay_tipo = ANY(allowed_formas) THEN pay_tipo
    ELSE 'OUTRO'
  END;

  desc_base := COALESCE(observ_txt, 'Venda #'||substring(NEW.id::text,1,8));

  bruto_total := COALESCE(NEW.total, 0);

  IF is_credito THEN
    -- Busca taxa da bandeira
    IF bandeira IS NOT NULL THEN
      SELECT * INTO fee_rec FROM public.payment_fees
       WHERE ativo AND LOWER(bandeira) = LOWER(pay.bandeira) LIMIT 1;
      IF FOUND THEN
        taxa_bandeira := CASE
          WHEN parcelas_num = 1 THEN COALESCE(fee_rec.credito_avista, 0)
          WHEN parcelas_num BETWEEN 2 AND 6 THEN COALESCE(fee_rec.credito_2_6, 0)
          ELSE COALESCE(fee_rec.credito_7_12, 0)
        END;
      END IF;
    END IF;

    -- Taxa de antecipação (se marcada)
    IF antecipado THEN
      SELECT COALESCE((valor->>0)::numeric, (valor)::text::numeric, 0)
        INTO taxa_antec
        FROM public.system_settings
       WHERE categoria='financeiro' AND chave='antecipacao_taxa_percentual';
      taxa_antec := COALESCE(taxa_antec, 2.09);
    END IF;

    taxa_total_pct := COALESCE(taxa_bandeira,0) + COALESCE(taxa_antec,0);
    taxa_valor_total := ROUND(bruto_total * taxa_total_pct / 100.0, 2);
    liquido_total := bruto_total - taxa_valor_total;

    -- Gera 1 lançamento por parcela
    parcela_bruto := ROUND(bruto_total / parcelas_num, 2);
    parcela_liquido := ROUND(liquido_total / parcelas_num, 2);

    FOR i IN 1..parcelas_num LOOP
      IF antecipado THEN
        venc := CURRENT_DATE + INTERVAL '1 day';
      ELSE
        venc := CURRENT_DATE + (INTERVAL '30 days' * i);
      END IF;

      -- Ajuste do último para fechar o total exato
      IF i = parcelas_num THEN
        parcela_bruto := bruto_total - ROUND(bruto_total / parcelas_num, 2) * (parcelas_num - 1);
        parcela_liquido := liquido_total - ROUND(liquido_total / parcelas_num, 2) * (parcelas_num - 1);
      END IF;

      INSERT INTO public.financial_transactions(
        order_id, company_id, tipo, status, valor, valor_bruto,
        vencimento, pagamento, descricao, forma_pagamento,
        parcelas, parcela_num, parcelas_total,
        bandeira, taxa_percentual, taxas, antecipado, account_id
      ) VALUES (
        NEW.id, NEW.company_id, 'RECEITA', 'PENDENTE',
        parcela_liquido, parcela_bruto,
        venc, NULL,
        desc_base || ' (' || i || '/' || parcelas_num || ' — ' || COALESCE(bandeira,'Cartão') ||
          CASE WHEN antecipado THEN ' antecipado' ELSE '' END || ')',
        forma_txt, parcelas_num, i, parcelas_num,
        bandeira, taxa_total_pct,
        ROUND(parcela_bruto * taxa_total_pct / 100.0, 2),
        antecipado, acc_id
      );
    END LOOP;

    -- Despesa única com o total das taxas
    IF taxa_valor_total > 0 THEN
      INSERT INTO public.financial_transactions(
        order_id, tipo, status, valor, vencimento, pagamento, descricao, forma_pagamento
      ) VALUES (
        NEW.id, 'DESPESA', 'PAGO', taxa_valor_total,
        CURRENT_DATE, CURRENT_DATE,
        'Taxa de cartão — Venda #' || substring(NEW.id::text,1,8) ||
          ' (' || COALESCE(bandeira,'?') || ' ' || parcelas_num || 'x' ||
          CASE WHEN antecipado THEN ' + antecipação' ELSE '' END || ')',
        'OUTRO'
      );
    END IF;

  ELSE
    -- PIX / Débito / Dinheiro: 1 linha, quitada hoje, sem taxa
    status_fin := 'PAGO';
    pagamento_fin := CURRENT_DATE;

    INSERT INTO public.financial_transactions(
      order_id, company_id, tipo, status, valor, valor_bruto,
      vencimento, pagamento, descricao, forma_pagamento,
      parcelas, parcela_num, parcelas_total, bandeira, taxa_percentual, taxas, antecipado, account_id
    ) VALUES (
      NEW.id, NEW.company_id, 'RECEITA', status_fin,
      bruto_total, bruto_total,
      CURRENT_DATE, pagamento_fin,
      desc_base || CASE
        WHEN modalidade = 'DEBITO' THEN ' (Débito' || COALESCE(' ' || bandeira,'') || ')'
        WHEN pay_tipo = 'PIX' THEN ' (PIX)'
        WHEN pay_tipo = 'DINHEIRO' THEN ' (Dinheiro)'
        ELSE ''
      END,
      forma_txt, 1, 1, 1, bandeira, 0, 0, false, acc_id
    );
  END IF;

  -- Custo das peças (mantém comportamento antigo)
  IF NEW.trip_id IS NULL AND NEW.custo_lancado_em IS NULL THEN
    SELECT COALESCE(SUM(oi.quantidade * COALESCE(oi.custo_unitario, 0)),0) INTO custo_total
      FROM public.order_items oi
     WHERE oi.order_id = NEW.id;

    IF custo_total > 0 THEN
      desc_dia := 'Custos das peças vendidas ' || to_char(CURRENT_DATE, 'DD/MM/YYYY');

      SELECT id INTO ja_despesa_dia
        FROM public.financial_transactions
       WHERE tipo='DESPESA' AND order_id IS NULL AND descricao = desc_dia
       LIMIT 1;

      IF ja_despesa_dia IS NULL THEN
        INSERT INTO public.financial_transactions(order_id, company_id, tipo, status, valor, vencimento, descricao)
        VALUES (NULL, NULL, 'DESPESA', 'PENDENTE', custo_total,
                CURRENT_DATE + INTERVAL '30 days', desc_dia);
      ELSE
        UPDATE public.financial_transactions
           SET valor = valor + custo_total, updated_at = now()
         WHERE id = ja_despesa_dia;
      END IF;
    END IF;

    NEW.custo_lancado_em := now();
  END IF;

  RETURN NEW;
END;
$function$;


-- MIGRATION: 20260724172940_9ef6bf86-ef26-49eb-975c-9ea6ead94cff.sql

-- 1) Novas taxas Ton (Débito 1,22 / Crédito 1x 3,02 / 2-6x 5,38 / 7-12x 6,11)
UPDATE public.payment_fees
   SET debito = 1.22,
       credito_avista = 3.02,
       credito_2_6 = 5.38,
       credito_7_12 = 6.11,
       updated_at = now()
 WHERE ativo;

-- 2) Antecipação zerada (D+1 vira padrão para todas as vendas)
INSERT INTO public.system_settings (categoria, chave, valor)
VALUES ('financeiro', 'antecipacao_taxa_percentual', to_jsonb(0::numeric))
ON CONFLICT (categoria, chave) DO UPDATE SET valor = EXCLUDED.valor, updated_at = now();

-- 3) Banco Ton
INSERT INTO public.bank_accounts (nome, banco, tipo, ativo, default_cartao, default_pix, default_dinheiro, saldo_inicial)
VALUES ('TON', 'TON (Stone)', 'CORRENTE', true, true, false, false, 0)
ON CONFLICT DO NOTHING;

-- 3.1) Ton passa a ser o default de cartão
UPDATE public.bank_accounts SET default_cartao = false WHERE default_cartao = true AND nome <> 'TON';
UPDATE public.bank_accounts SET default_cartao = true WHERE nome = 'TON';

-- 4) Trigger: todas as vendas de cartão em D+1 (crédito e débito), sem taxa de antecipação
CREATE OR REPLACE FUNCTION public.order_sync_financials()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  pay RECORD;
  pay_tipo TEXT;
  modalidade TEXT;
  bandeira TEXT;
  parcelas_num INT := 1;
  conta_txt TEXT;
  observ_txt TEXT;
  acc_id UUID;
  fee_rec RECORD;
  taxa_bandeira NUMERIC := 0;
  taxa_total_pct NUMERIC := 0;
  bruto_total NUMERIC := 0;
  liquido_total NUMERIC := 0;
  taxa_valor_total NUMERIC := 0;
  parcela_bruto NUMERIC := 0;
  parcela_liquido NUMERIC := 0;
  i INT;
  venc DATE;
  desc_base TEXT;
  desc_dia TEXT;
  ja_despesa_dia UUID;
  custo_total NUMERIC := 0;
  is_credito BOOLEAN;
  is_cartao BOOLEAN;
  status_fin TEXT;
  pagamento_fin DATE;
  forma_txt TEXT;
  allowed_formas TEXT[] := ARRAY['PIX','CARTAO','BOLETO','DINHEIRO','TRANSFERENCIA','OUTRO'];
BEGIN
  IF NOT (
    (TG_OP='INSERT' AND NEW.status='PAGO') OR
    (TG_OP='UPDATE' AND NEW.status='PAGO' AND NEW.status IS DISTINCT FROM OLD.status)
  ) THEN RETURN NEW; END IF;

  IF EXISTS (SELECT 1 FROM public.financial_transactions WHERE order_id = NEW.id AND tipo = 'RECEITA') THEN
    RETURN NEW;
  END IF;

  SELECT tipo::text,
         COALESCE((payload->>'parcelas')::int, 1) AS parcelas,
         payload->>'conta' AS conta,
         payload->>'observacao' AS observ,
         payload->>'modalidade' AS modalidade,
         COALESCE(payments.bandeira, payload->>'bandeira') AS bandeira,
         account_id
    INTO pay
    FROM public.payments
   WHERE order_id = NEW.id
   ORDER BY created_at DESC
   LIMIT 1;

  pay_tipo := pay.tipo;
  parcelas_num := GREATEST(COALESCE(pay.parcelas, 1), 1);
  conta_txt := pay.conta;
  observ_txt := pay.observ;
  acc_id := pay.account_id;
  bandeira := pay.bandeira;
  modalidade := UPPER(COALESCE(pay.modalidade,
    CASE WHEN pay_tipo = 'CARTAO' THEN 'CREDITO' ELSE pay_tipo END));

  is_cartao := (pay_tipo = 'CARTAO');
  is_credito := (is_cartao AND modalidade = 'CREDITO');

  -- Conta padrão: cartão sempre no default_cartao (Ton)
  IF acc_id IS NULL THEN
    IF is_cartao THEN
      SELECT id INTO acc_id FROM public.bank_accounts WHERE default_cartao AND ativo LIMIT 1;
    ELSIF pay_tipo = 'PIX' THEN
      SELECT id INTO acc_id FROM public.bank_accounts WHERE default_pix AND ativo LIMIT 1;
    ELSIF pay_tipo = 'DINHEIRO' THEN
      SELECT id INTO acc_id FROM public.bank_accounts WHERE default_dinheiro AND ativo LIMIT 1;
    END IF;
  END IF;

  forma_txt := CASE WHEN pay_tipo = ANY(allowed_formas) THEN pay_tipo ELSE 'OUTRO' END;
  desc_base := COALESCE(observ_txt, 'Venda #'||substring(NEW.id::text,1,8));
  bruto_total := COALESCE(NEW.total, 0);

  IF is_cartao THEN
    -- Busca taxa da bandeira
    IF bandeira IS NOT NULL THEN
      SELECT * INTO fee_rec FROM public.payment_fees
       WHERE ativo AND LOWER(payment_fees.bandeira) = LOWER(bandeira) LIMIT 1;
      IF FOUND THEN
        IF NOT is_credito THEN
          taxa_bandeira := COALESCE(fee_rec.debito, 0);
        ELSIF parcelas_num = 1 THEN
          taxa_bandeira := COALESCE(fee_rec.credito_avista, 0);
        ELSIF parcelas_num BETWEEN 2 AND 6 THEN
          taxa_bandeira := COALESCE(fee_rec.credito_2_6, 0);
        ELSE
          taxa_bandeira := COALESCE(fee_rec.credito_7_12, 0);
        END IF;
      END IF;
    END IF;

    taxa_total_pct := COALESCE(taxa_bandeira, 0);
    taxa_valor_total := ROUND(bruto_total * taxa_total_pct / 100.0, 2);
    liquido_total := bruto_total - taxa_valor_total;

    -- Débito: 1 parcela; Crédito: N parcelas — todas D+1
    IF NOT is_credito THEN parcelas_num := 1; END IF;

    parcela_bruto := ROUND(bruto_total / parcelas_num, 2);
    parcela_liquido := ROUND(liquido_total / parcelas_num, 2);

    FOR i IN 1..parcelas_num LOOP
      -- D+1 para TODAS as parcelas (débito e crédito)
      venc := CURRENT_DATE + INTERVAL '1 day';

      IF i = parcelas_num THEN
        parcela_bruto := bruto_total - ROUND(bruto_total / parcelas_num, 2) * (parcelas_num - 1);
        parcela_liquido := liquido_total - ROUND(liquido_total / parcelas_num, 2) * (parcelas_num - 1);
      END IF;

      INSERT INTO public.financial_transactions(
        order_id, company_id, tipo, status, valor, valor_bruto,
        vencimento, pagamento, descricao, forma_pagamento,
        parcelas, parcela_num, parcelas_total,
        bandeira, taxa_percentual, taxas, antecipado, account_id
      ) VALUES (
        NEW.id, NEW.company_id, 'RECEITA', 'PENDENTE',
        parcela_liquido, parcela_bruto,
        venc, NULL,
        desc_base || CASE WHEN is_credito THEN ' (' || i || '/' || parcelas_num || ' — ' || COALESCE(bandeira,'Cartão') || ' D+1)'
                          ELSE ' (Débito ' || COALESCE(bandeira,'') || ' D+1)' END,
        forma_txt, parcelas_num, i, parcelas_num,
        bandeira, taxa_total_pct,
        ROUND(parcela_bruto * taxa_total_pct / 100.0, 2),
        false, acc_id
      );
    END LOOP;

    IF taxa_valor_total > 0 THEN
      INSERT INTO public.financial_transactions(
        order_id, tipo, status, valor, vencimento, pagamento, descricao, forma_pagamento
      ) VALUES (
        NEW.id, 'DESPESA', 'PAGO', taxa_valor_total,
        CURRENT_DATE, CURRENT_DATE,
        'Taxa Ton — Venda #' || substring(NEW.id::text,1,8) ||
          ' (' || COALESCE(bandeira,'?') || ' ' ||
          CASE WHEN is_credito THEN parcelas_num || 'x' ELSE 'Débito' END || ')',
        'OUTRO'
      );
    END IF;

  ELSE
    -- PIX / Dinheiro: 1 linha, quitada hoje, sem taxa
    status_fin := 'PAGO';
    pagamento_fin := CURRENT_DATE;

    INSERT INTO public.financial_transactions(
      order_id, company_id, tipo, status, valor, valor_bruto,
      vencimento, pagamento, descricao, forma_pagamento,
      parcelas, parcela_num, parcelas_total, bandeira, taxa_percentual, taxas, antecipado, account_id
    ) VALUES (
      NEW.id, NEW.company_id, 'RECEITA', status_fin,
      bruto_total, bruto_total,
      CURRENT_DATE, pagamento_fin,
      desc_base || CASE
        WHEN pay_tipo = 'PIX' THEN ' (PIX)'
        WHEN pay_tipo = 'DINHEIRO' THEN ' (Dinheiro)'
        ELSE ''
      END,
      forma_txt, 1, 1, 1, bandeira, 0, 0, false, acc_id
    );
  END IF;

  -- Custo das peças
  IF NEW.trip_id IS NULL AND NEW.custo_lancado_em IS NULL THEN
    SELECT COALESCE(SUM(oi.quantidade * COALESCE(oi.custo_unitario, 0)),0) INTO custo_total
      FROM public.order_items oi
     WHERE oi.order_id = NEW.id;

    IF custo_total > 0 THEN
      desc_dia := 'Custos das peças vendidas ' || to_char(CURRENT_DATE, 'DD/MM/YYYY');

      SELECT id INTO ja_despesa_dia
        FROM public.financial_transactions
       WHERE tipo='DESPESA' AND order_id IS NULL AND descricao = desc_dia
       LIMIT 1;

      IF ja_despesa_dia IS NULL THEN
        INSERT INTO public.financial_transactions(order_id, company_id, tipo, status, valor, vencimento, descricao)
        VALUES (NULL, NULL, 'DESPESA', 'PENDENTE', custo_total,
                CURRENT_DATE + INTERVAL '30 days', desc_dia);
      ELSE
        UPDATE public.financial_transactions
           SET valor = valor + custo_total, updated_at = now()
         WHERE id = ja_despesa_dia;
      END IF;
    END IF;

    NEW.custo_lancado_em := now();
  END IF;

  RETURN NEW;
END;
$function$;


-- MIGRATION: 20260724174403_7e29aea1-ce56-4e78-9b9c-72f571f8f370.sql

DROP INDEX IF EXISTS public.financial_transactions_order_receita_uniq;
CREATE UNIQUE INDEX financial_transactions_order_receita_parcela_uniq
  ON public.financial_transactions (order_id, COALESCE(parcela_num, 1))
  WHERE tipo = 'RECEITA' AND order_id IS NOT NULL;


-- MIGRATION: 20260724182752_44767299-d540-40fa-9d27-3546961076e1.sql
CREATE OR REPLACE FUNCTION public.order_sync_financials()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  pay RECORD;
  pay_tipo TEXT;
  modalidade TEXT;
  bandeira TEXT;
  parcelas_num INT := 1;
  conta_txt TEXT;
  observ_txt TEXT;
  acc_id UUID;
  fee_rec RECORD;
  taxa_bandeira NUMERIC := 0;
  taxa_total_pct NUMERIC := 0;
  bruto_total NUMERIC := 0;
  liquido_total NUMERIC := 0;
  taxa_valor_total NUMERIC := 0;
  parcela_bruto NUMERIC := 0;
  parcela_liquido NUMERIC := 0;
  i INT;
  venc DATE;
  desc_base TEXT;
  desc_dia TEXT;
  ja_despesa_dia UUID;
  custo_total NUMERIC := 0;
  is_credito BOOLEAN;
  is_cartao BOOLEAN;
  status_fin TEXT;
  pagamento_fin DATE;
  forma_txt TEXT;
  allowed_formas TEXT[] := ARRAY['PIX','CARTAO','BOLETO','DINHEIRO','TRANSFERENCIA','OUTRO'];
BEGIN
  IF NOT (
    (TG_OP='INSERT' AND NEW.status='PAGO') OR
    (TG_OP='UPDATE' AND NEW.status='PAGO' AND NEW.status IS DISTINCT FROM OLD.status)
  ) THEN RETURN NEW; END IF;

  IF EXISTS (SELECT 1 FROM public.financial_transactions WHERE order_id = NEW.id AND tipo = 'RECEITA') THEN
    RETURN NEW;
  END IF;

  SELECT tipo::text,
         COALESCE((payload->>'parcelas')::int, 1) AS parcelas,
         payload->>'conta' AS conta,
         payload->>'observacao' AS observ,
         payload->>'modalidade' AS modalidade,
         COALESCE(payments.bandeira, payload->>'bandeira') AS bandeira,
         account_id
    INTO pay
    FROM public.payments
   WHERE order_id = NEW.id
   ORDER BY created_at DESC
   LIMIT 1;

  pay_tipo := pay.tipo;
  parcelas_num := GREATEST(COALESCE(pay.parcelas, 1), 1);
  conta_txt := pay.conta;
  observ_txt := pay.observ;
  acc_id := pay.account_id;
  bandeira := pay.bandeira;
  modalidade := UPPER(COALESCE(pay.modalidade,
    CASE WHEN pay_tipo = 'CARTAO' THEN 'CREDITO' ELSE pay_tipo END));

  is_cartao := (pay_tipo = 'CARTAO');
  is_credito := (is_cartao AND modalidade = 'CREDITO');

  IF acc_id IS NULL THEN
    IF is_cartao THEN
      SELECT id INTO acc_id FROM public.bank_accounts WHERE default_cartao AND ativo LIMIT 1;
    ELSIF pay_tipo = 'PIX' THEN
      SELECT id INTO acc_id FROM public.bank_accounts WHERE default_pix AND ativo LIMIT 1;
    ELSIF pay_tipo = 'DINHEIRO' THEN
      SELECT id INTO acc_id FROM public.bank_accounts WHERE default_dinheiro AND ativo LIMIT 1;
    END IF;
  END IF;

  forma_txt := CASE WHEN pay_tipo = ANY(allowed_formas) THEN pay_tipo ELSE 'OUTRO' END;
  desc_base := COALESCE(observ_txt, 'Venda #'||substring(NEW.id::text,1,8));
  bruto_total := COALESCE(NEW.total, 0);

  IF is_cartao THEN
    IF bandeira IS NOT NULL THEN
      SELECT * INTO fee_rec FROM public.payment_fees
       WHERE ativo AND LOWER(payment_fees.bandeira) = LOWER(bandeira) LIMIT 1;
      IF FOUND THEN
        IF NOT is_credito THEN
          taxa_bandeira := COALESCE(fee_rec.debito, 0);
        ELSIF parcelas_num = 1 THEN
          taxa_bandeira := COALESCE(fee_rec.credito_avista, 0);
        ELSIF parcelas_num = 2 THEN
          taxa_bandeira := COALESCE(fee_rec.credito_2_6, 0);
        ELSE
          -- 3x (máximo permitido) usa faixa credito_7_12 conforme tabela Ton atual
          taxa_bandeira := COALESCE(fee_rec.credito_7_12, 0);
        END IF;
      END IF;
    END IF;

    taxa_total_pct := COALESCE(taxa_bandeira, 0);
    taxa_valor_total := ROUND(bruto_total * taxa_total_pct / 100.0, 2);
    liquido_total := bruto_total - taxa_valor_total;

    IF NOT is_credito THEN parcelas_num := 1; END IF;

    parcela_bruto := ROUND(bruto_total / parcelas_num, 2);
    parcela_liquido := ROUND(liquido_total / parcelas_num, 2);

    FOR i IN 1..parcelas_num LOOP
      venc := CURRENT_DATE + INTERVAL '1 day';

      IF i = parcelas_num THEN
        parcela_bruto := bruto_total - ROUND(bruto_total / parcelas_num, 2) * (parcelas_num - 1);
        parcela_liquido := liquido_total - ROUND(liquido_total / parcelas_num, 2) * (parcelas_num - 1);
      END IF;

      INSERT INTO public.financial_transactions(
        order_id, company_id, tipo, status, valor, valor_bruto,
        vencimento, pagamento, descricao, forma_pagamento,
        parcelas, parcela_num, parcelas_total,
        bandeira, taxa_percentual, taxas, antecipado, account_id
      ) VALUES (
        NEW.id, NEW.company_id, 'RECEITA', 'PENDENTE',
        parcela_liquido, parcela_bruto,
        venc, NULL,
        desc_base || CASE WHEN is_credito THEN ' (' || i || '/' || parcelas_num || ' — ' || COALESCE(bandeira,'Cartão') || ' D+1)'
                          ELSE ' (Débito ' || COALESCE(bandeira,'') || ' D+1)' END,
        forma_txt, parcelas_num, i, parcelas_num,
        bandeira, taxa_total_pct,
        ROUND(parcela_bruto * taxa_total_pct / 100.0, 2),
        false, acc_id
      );
    END LOOP;

    IF taxa_valor_total > 0 THEN
      INSERT INTO public.financial_transactions(
        order_id, tipo, status, valor, vencimento, pagamento, descricao, forma_pagamento
      ) VALUES (
        NEW.id, 'DESPESA', 'PAGO', taxa_valor_total,
        CURRENT_DATE, CURRENT_DATE,
        'Taxa Ton — Venda #' || substring(NEW.id::text,1,8) ||
          ' (' || COALESCE(bandeira,'?') || ' ' ||
          CASE WHEN is_credito THEN parcelas_num || 'x' ELSE 'Débito' END || ')',
        'OUTRO'
      );
    END IF;

  ELSE
    status_fin := 'PAGO';
    pagamento_fin := CURRENT_DATE;

    INSERT INTO public.financial_transactions(
      order_id, company_id, tipo, status, valor, valor_bruto,
      vencimento, pagamento, descricao, forma_pagamento,
      parcelas, parcela_num, parcelas_total, bandeira, taxa_percentual, taxas, antecipado, account_id
    ) VALUES (
      NEW.id, NEW.company_id, 'RECEITA', status_fin,
      bruto_total, bruto_total,
      CURRENT_DATE, pagamento_fin,
      desc_base || CASE
        WHEN pay_tipo = 'PIX' THEN ' (PIX)'
        WHEN pay_tipo = 'DINHEIRO' THEN ' (Dinheiro)'
        ELSE ''
      END,
      forma_txt, 1, 1, 1, bandeira, 0, 0, false, acc_id
    );
  END IF;

  IF NEW.trip_id IS NULL AND NEW.custo_lancado_em IS NULL THEN
    SELECT COALESCE(SUM(oi.quantidade * COALESCE(oi.custo_unitario, 0)),0) INTO custo_total
      FROM public.order_items oi
     WHERE oi.order_id = NEW.id;

    IF custo_total > 0 THEN
      desc_dia := 'Custos das peças vendidas ' || to_char(CURRENT_DATE, 'DD/MM/YYYY');

      SELECT id INTO ja_despesa_dia
        FROM public.financial_transactions
       WHERE tipo='DESPESA' AND order_id IS NULL AND descricao = desc_dia
       LIMIT 1;

      IF ja_despesa_dia IS NULL THEN
        INSERT INTO public.financial_transactions(order_id, company_id, tipo, status, valor, vencimento, descricao)
        VALUES (NULL, NULL, 'DESPESA', 'PENDENTE', custo_total,
                CURRENT_DATE + INTERVAL '30 days', desc_dia);
      ELSE
        UPDATE public.financial_transactions
           SET valor = valor + custo_total, updated_at = now()
         WHERE id = ja_despesa_dia;
      END IF;
    END IF;

    NEW.custo_lancado_em := now();
  END IF;

  RETURN NEW;
END;
$function$;

-- MIGRATION: 20260724190801_30cdcf4e-c954-489e-92e6-72daea1f8a77.sql
ALTER TABLE public.bank_accounts ADD COLUMN IF NOT EXISTS incluir_saldo_total BOOLEAN NOT NULL DEFAULT TRUE;
UPDATE public.bank_accounts SET incluir_saldo_total = FALSE WHERE nome IN ('DENYS - C6BANK','DENYS PESSOAL');

-- MIGRATION: 20260724192303_6800967c-68eb-483f-be8f-d5c625ab1099.sql

CREATE TABLE public.personal_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL CHECK (tipo IN ('RECEITA','DESPESA')),
  descricao TEXT NOT NULL,
  valor NUMERIC(14,2) NOT NULL CHECK (valor >= 0),
  vencimento DATE NOT NULL DEFAULT CURRENT_DATE,
  pagamento DATE,
  status TEXT NOT NULL DEFAULT 'PENDENTE' CHECK (status IN ('PENDENTE','PAGO')),
  categoria TEXT,
  observacao TEXT,
  origem TEXT NOT NULL DEFAULT 'MANUAL' CHECK (origem IN ('MANUAL','FECHAMENTO')),
  fechamento_id UUID REFERENCES public.fechamentos(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX personal_entries_user_idx ON public.personal_entries(user_id);
CREATE INDEX personal_entries_status_idx ON public.personal_entries(user_id, status);
CREATE INDEX personal_entries_fechamento_idx ON public.personal_entries(fechamento_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.personal_entries TO authenticated;
GRANT ALL ON public.personal_entries TO service_role;

ALTER TABLE public.personal_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "personal_entries_owner_all"
  ON public.personal_entries
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER personal_entries_set_updated_at
  BEFORE UPDATE ON public.personal_entries
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Espelha retirada pessoal do fechamento como RECEITA PAGA no Particular do dono
CREATE OR REPLACE FUNCTION public.fechamento_mirror_personal()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user UUID;
BEGIN
  IF NEW.valor_retirada IS NULL OR NEW.valor_retirada <= 0 THEN
    RETURN NEW;
  END IF;

  v_user := COALESCE(NEW.created_by, auth.uid());
  IF v_user IS NULL THEN
    RETURN NEW;
  END IF;

  INSERT INTO public.personal_entries(
    user_id, tipo, descricao, valor, vencimento, pagamento, status, categoria, origem, fechamento_id
  ) VALUES (
    v_user, 'RECEITA',
    'Retirada de fechamento ' || to_char(NEW.periodo_from,'DD/MM/YYYY') || ' a ' || to_char(NEW.periodo_to,'DD/MM/YYYY'),
    NEW.valor_retirada, NEW.periodo_to, NEW.periodo_to, 'PAGO',
    'Retirada', 'FECHAMENTO', NEW.id
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_fechamento_mirror_personal ON public.fechamentos;
CREATE TRIGGER trg_fechamento_mirror_personal
  AFTER INSERT ON public.fechamentos
  FOR EACH ROW EXECUTE FUNCTION public.fechamento_mirror_personal();


-- MIGRATION: 20260725151759_20137b3d-7777-4969-83ba-b10af8d25113.sql

CREATE OR REPLACE FUNCTION public.generate_ean13(_prefix text DEFAULT '789'::text)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  base TEXT;
  d INT;
  s INT := 0;
  i INT;
  chk INT;
BEGIN
  base := _prefix || lpad((floor(random() * 1000000000)::bigint)::text, 9, '0');
  base := left(base, 12);
  FOR i IN 1..12 LOOP
    d := substring(base FROM i FOR 1)::int;
    IF i % 2 = 1 THEN s := s + d; ELSE s := s + d * 3; END IF;
  END LOOP;
  chk := (10 - (s % 10)) % 10;
  RETURN base || chk::text;
END $function$;

CREATE OR REPLACE FUNCTION public.products_set_ean13()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE novo TEXT;
BEGIN
  IF NEW.ean13 IS NULL OR NEW.ean13 = '' THEN
    LOOP
      novo := public.generate_ean13('789');
      EXIT WHEN NOT EXISTS (SELECT 1 FROM public.products WHERE ean13 = novo);
    END LOOP;
    NEW.ean13 := novo;
  END IF;
  RETURN NEW;
END $function$;

CREATE OR REPLACE FUNCTION public.products_set_sku()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  prefix TEXT;
  start_n INT;
  pad INT;
  next_n INT;
  candidate TEXT;
BEGIN
  IF NEW.sku IS NOT NULL AND NEW.sku <> '' THEN
    RETURN NEW;
  END IF;

  IF NEW.tipo IS NULL THEN
    RETURN NEW;
  END IF;

  IF NEW.tipo = 'carcaca'::product_tipo THEN
    prefix := 'CP-'; start_n := 10;  pad := 3;
  ELSIF NEW.tipo = 'controle'::product_tipo THEN
    prefix := 'CT-'; start_n := 100; pad := 3;
  ELSIF NEW.tipo = 'chave'::product_tipo THEN
    prefix := 'CH-'; start_n := 200; pad := 3;
  ELSE
    RETURN NEW;
  END IF;

  SELECT COALESCE(MAX(
    NULLIF(regexp_replace(substring(sku FROM char_length(prefix) + 1), '\D', '', 'g'), '')::int
  ), start_n - 1) + 1
  INTO next_n
  FROM public.products
  WHERE sku LIKE prefix || '%';

  IF next_n < start_n THEN next_n := start_n; END IF;

  LOOP
    candidate := prefix || lpad(next_n::text, pad, '0');
    EXIT WHEN NOT EXISTS (SELECT 1 FROM public.products WHERE sku = candidate);
    next_n := next_n + 1;
  END LOOP;

  NEW.sku := candidate;
  RETURN NEW;
END;
$function$;

GRANT EXECUTE ON FUNCTION public.generate_ean13(text) TO authenticated, service_role;


-- MIGRATION: 20260726160820_48087ff8-1773-4323-acaa-42516d75fb26.sql
DROP FUNCTION IF EXISTS public.get_shared_cart(text);

CREATE FUNCTION public.get_shared_cart(_token text)
RETURNS TABLE (
  items jsonb,
  subtotal numeric,
  observacoes text,
  status public.shared_cart_status,
  expires_at timestamptz
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT sc.items, sc.subtotal, sc.observacoes, sc.status, sc.expires_at
  FROM public.shared_carts sc
  WHERE sc.token = _token
    AND (sc.expires_at IS NULL OR sc.expires_at > now())
  LIMIT 1
$function$;

REVOKE ALL ON FUNCTION public.get_shared_cart(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_shared_cart(text) TO anon, authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.bank_account_balance(uuid) FROM anon, PUBLIC;
GRANT EXECUTE ON FUNCTION public.bank_account_balance(uuid) TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.crm_sync_lead_for_company(uuid, uuid) FROM anon, PUBLIC;
GRANT EXECUTE ON FUNCTION public.crm_sync_lead_for_company(uuid, uuid) TO authenticated, service_role;

-- MIGRATION: 20260726162344_c348ec69-8734-4ad5-ad3d-0b7ea4d5ca3b.sql
-- 1) Devolver saldo das viagens ABERTAS ao estoque da loja
DO $$
DECLARE rec RECORD; saldo NUMERIC;
BEGIN
  FOR rec IN
    SELECT ti.* FROM public.trip_items ti
    JOIN public.trips t ON t.id = ti.trip_id
    WHERE t.status = 'open'
  LOOP
    saldo := COALESCE(rec.qtd_carregada,0) - COALESCE(rec.qtd_vendida,0) - COALESCE(rec.qtd_devolvida,0);
    IF saldo > 0 THEN
      UPDATE public.products SET estoque = COALESCE(estoque,0) + saldo, updated_at = now() WHERE id = rec.product_id;
      UPDATE public.trip_items SET qtd_devolvida = COALESCE(qtd_devolvida,0) + saldo, updated_at = now() WHERE id = rec.id;
      INSERT INTO public.stock_movements(product_id, tipo, quantidade, motivo, reference_id)
      VALUES (rec.product_id, 'ENTRADA', saldo, 'Unificação de estoque: retorno de viagem', rec.trip_id);
    END IF;
  END LOOP;
END $$;

-- 2) Vendas sempre dão baixa no estoque da loja
CREATE OR REPLACE FUNCTION public.order_create_atomic(_payload jsonb)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_company_id UUID := (_payload->>'company_id')::UUID;
  v_address_id UUID := NULLIF(_payload->>'address_id','')::UUID;
  v_origem     TEXT := _payload->>'origem';
  v_frete      NUMERIC := COALESCE((_payload->>'frete')::NUMERIC, 0);
  v_desconto   NUMERIC := COALESCE((_payload->>'desconto')::NUMERIC, 0);
  v_acrescimo  NUMERIC := COALESCE((_payload->>'acrescimo')::NUMERIC, 0);
  v_observacao TEXT := _payload->>'observacao';
  v_pagamento  TEXT := _payload->>'pagamento';
  v_trip_id    UUID := NULLIF(_payload->>'trip_id','')::UUID;
  v_created_by UUID := auth.uid();

  v_order_id   UUID;
  v_subtotal   NUMERIC := 0;
  v_total      NUMERIC := 0;

  it JSONB;
  v_product_id UUID;
  v_tipo_compra TEXT;
  v_qtd NUMERIC;
  v_preco_unit NUMERIC;
  v_preco_pac NUMERIC;
  v_preco_final NUMERIC;
  v_item_subtotal NUMERIC;
  v_custo_unit NUMERIC;
BEGIN
  IF v_company_id IS NULL THEN RAISE EXCEPTION 'company_id obrigatório'; END IF;
  IF v_origem IS NULL THEN RAISE EXCEPTION 'origem obrigatório'; END IF;
  IF v_pagamento IS NULL THEN RAISE EXCEPTION 'pagamento obrigatório'; END IF;
  IF jsonb_array_length(_payload->'items') = 0 THEN
    RAISE EXCEPTION 'Pedido precisa de pelo menos 1 item';
  END IF;

  INSERT INTO public.orders(
    company_id, address_id, origem, status,
    subtotal, frete, desconto, total,
    observacao, created_by, trip_id
  ) VALUES (
    v_company_id, v_address_id, v_origem::order_origem, 'AGUARDANDO_PAGAMENTO'::order_status,
    0, v_frete, v_desconto, 0,
    v_observacao, v_created_by, v_trip_id
  ) RETURNING id INTO v_order_id;

  FOR it IN SELECT * FROM jsonb_array_elements(_payload->'items')
  LOOP
    v_product_id := (it->>'product_id')::UUID;
    v_tipo_compra := COALESCE(it->>'tipo_compra','UNIDADE');
    v_qtd := (it->>'quantidade')::NUMERIC;
    v_preco_unit := (it->>'preco_unitario')::NUMERIC;
    v_preco_pac := NULLIF(it->>'preco_pacote','')::NUMERIC;

    IF v_qtd IS NULL OR v_qtd <= 0 THEN
      RAISE EXCEPTION 'Quantidade inválida para item %', v_product_id;
    END IF;

    v_preco_final := CASE
      WHEN v_tipo_compra = 'PACOTE' AND v_preco_pac IS NOT NULL THEN v_preco_pac
      ELSE v_preco_unit
    END;
    v_item_subtotal := v_preco_final * v_qtd;

    SELECT COALESCE(preco_custo, 0) INTO v_custo_unit
      FROM public.products WHERE id = v_product_id;

    INSERT INTO public.order_items(
      order_id, product_id, tipo_compra, quantidade,
      preco_unitario, preco_final, subtotal, custo_unitario
    ) VALUES (
      v_order_id, v_product_id, v_tipo_compra::compra_tipo, v_qtd,
      v_preco_unit, v_preco_final, v_item_subtotal, v_custo_unit
    );

    v_subtotal := v_subtotal + v_item_subtotal;

    -- Estoque único: sempre dá baixa na loja
    PERFORM public.stock_apply_delta(
      v_product_id, -v_qtd, 'SAIDA',
      'Venda pedido ' || substring(v_order_id::text,1,8),
      v_order_id, TRUE
    );
  END LOOP;

  v_total := v_subtotal + v_frete - v_desconto + v_acrescimo;

  UPDATE public.orders SET subtotal = v_subtotal, total = v_total WHERE id = v_order_id;

  INSERT INTO public.payments(order_id, tipo, valor, status)
  VALUES (v_order_id, v_pagamento::payment_tipo, v_total, 'PENDENTE'::payment_status);

  IF v_trip_id IS NOT NULL THEN
    PERFORM public.trip_recalculate_items(v_trip_id);
  END IF;

  RETURN v_order_id;
END;
$function$;

-- 3) Cancelamento devolve sempre ao estoque da loja
CREATE OR REPLACE FUNCTION public.order_cancel_reverse()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  it RECORD;
  custo_pedido NUMERIC := 0;
  desp RECORD;
  dia_label TEXT;
  desc_dia TEXT;
BEGIN
  IF NOT (TG_OP = 'UPDATE' AND NEW.status = 'CANCELADO' AND OLD.status IS DISTINCT FROM 'CANCELADO') THEN
    RETURN NEW;
  END IF;

  IF OLD.status = 'ENTREGUE' THEN
    RAISE EXCEPTION 'Pedido já ENTREGUE não pode ser cancelado. Estorno manual necessário.';
  END IF;

  IF OLD.status NOT IN ('PAGO','EM_SEPARACAO','ENVIADO') THEN
    RETURN NEW;
  END IF;

  UPDATE public.financial_transactions
     SET status = 'ESTORNADO',
         updated_at = now(),
         descricao = COALESCE(descricao,'') || ' [Estorno cancelamento em ' || to_char(now(),'DD/MM/YYYY HH24:MI') || ']'
   WHERE order_id = NEW.id
     AND tipo = 'RECEITA'
     AND status <> 'ESTORNADO';

  SELECT COALESCE(SUM(oi.quantidade * COALESCE(oi.custo_unitario, 0)),0)
    INTO custo_pedido
    FROM public.order_items oi
   WHERE oi.order_id = NEW.id;

  IF custo_pedido > 0 AND OLD.custo_lancado_em IS NOT NULL THEN
    dia_label := to_char(COALESCE(OLD.custo_lancado_em::date, OLD.created_at::date, CURRENT_DATE), 'DD/MM/YYYY');
    desc_dia  := 'Custos das peças vendidas ' || dia_label;

    SELECT id, valor INTO desp
      FROM public.financial_transactions
     WHERE tipo = 'DESPESA' AND order_id IS NULL AND descricao = desc_dia
     LIMIT 1;

    IF FOUND THEN
      IF desp.valor - custo_pedido <= 0 THEN
        DELETE FROM public.financial_transactions WHERE id = desp.id;
      ELSE
        UPDATE public.financial_transactions
           SET valor = valor - custo_pedido, updated_at = now()
         WHERE id = desp.id;
      END IF;
    END IF;
  END IF;

  NEW.custo_lancado_em := NULL;

  FOR it IN
    SELECT product_id, quantidade FROM public.order_items WHERE order_id = NEW.id
  LOOP
    UPDATE public.products
       SET estoque = COALESCE(estoque,0) + it.quantidade
     WHERE id = it.product_id;

    INSERT INTO public.stock_movements(product_id, tipo, quantidade, motivo, reference_id, user_id)
    VALUES (it.product_id, 'ENTRADA', it.quantidade,
            'Estorno de cancelamento — pedido ' || substring(NEW.id::text,1,8),
            NEW.id, auth.uid());
  END LOOP;

  IF NEW.trip_id IS NOT NULL THEN
    PERFORM public.trip_recalculate_items(NEW.trip_id);
  END IF;

  RETURN NEW;
END;
$function$;

-- 4) Encerrar viagem não movimenta mais estoque
CREATE OR REPLACE FUNCTION public.trip_close_v2(_trip_id uuid, _return_stock boolean DEFAULT true)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  custo_total NUMERIC := 0;
  local_txt TEXT;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.trips WHERE id = _trip_id AND status = 'open') THEN
    RAISE EXCEPTION 'Viagem não está aberta';
  END IF;

  PERFORM public.trip_recalculate_items(_trip_id);

  SELECT COALESCE(SUM(oi.quantidade * COALESCE(oi.custo_unitario, 0)), 0)
    INTO custo_total
    FROM public.orders o
    JOIN public.order_items oi ON oi.order_id = o.id
   WHERE o.trip_id = _trip_id
     AND o.status <> 'CANCELADO';

  IF custo_total > 0 THEN
    SELECT CASE WHEN cidade IS NOT NULL THEN cidade || COALESCE('-' || estado, '') ELSE COALESCE(nome, 'Viagem') END
      INTO local_txt FROM public.trips WHERE id = _trip_id;

    INSERT INTO public.financial_transactions(tipo, valor, status, descricao, vencimento)
    VALUES ('DESPESA', custo_total, 'PENDENTE',
            'Custo peças vendidas — ' || local_txt,
            CURRENT_DATE + INTERVAL '30 days');
  END IF;

  UPDATE public.trips SET status = 'closed', closed_at = now() WHERE id = _trip_id;
  RETURN NULL;
END;
$function$;

-- 5) Carga de viagem desativada
CREATE OR REPLACE FUNCTION public.trip_load_items(_trip_id uuid, _items jsonb)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  RAISE EXCEPTION 'Estoque unificado: não é mais necessário carregar peças na viagem. As vendas dão baixa direto no estoque da loja.';
END;
$function$;

-- 6) Rotina de dedução de viagens abertas vira inofensiva
CREATE OR REPLACE FUNCTION public.stock_deduct_open_trips()
 RETURNS TABLE(product_id uuid, deduzido numeric, insuficientes boolean)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  RETURN;
END;
$function$;

-- MIGRATION: 20260728181858_1fd1ad64-2f65-4c4e-a1ba-148a95833044.sql
ALTER TYPE payment_tipo ADD VALUE IF NOT EXISTS 'FATURADO';

-- MIGRATION: 20260728182016_049f0718-cf83-4482-81c5-0289dcbaeb97.sql
CREATE OR REPLACE FUNCTION public.order_sync_financials()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  pay RECORD;
  pay_tipo TEXT;
  modalidade TEXT;
  bandeira TEXT;
  parcelas_num INT := 1;
  conta_txt TEXT;
  observ_txt TEXT;
  acc_id UUID;
  fee_rec RECORD;
  taxa_bandeira NUMERIC := 0;
  taxa_total_pct NUMERIC := 0;
  bruto_total NUMERIC := 0;
  liquido_total NUMERIC := 0;
  taxa_valor_total NUMERIC := 0;
  parcela_bruto NUMERIC := 0;
  parcela_liquido NUMERIC := 0;
  i INT;
  venc DATE;
  desc_base TEXT;
  desc_dia TEXT;
  ja_despesa_dia UUID;
  custo_total NUMERIC := 0;
  is_credito BOOLEAN;
  is_cartao BOOLEAN;
  status_fin TEXT;
  pagamento_fin DATE;
  forma_txt TEXT;
  prazos INT[];
  prazos_json JSONB;
  allowed_formas TEXT[] := ARRAY['PIX','CARTAO','BOLETO','DINHEIRO','TRANSFERENCIA','OUTRO'];
BEGIN
  IF NOT (
    (TG_OP='INSERT' AND NEW.status='PAGO') OR
    (TG_OP='UPDATE' AND NEW.status='PAGO' AND NEW.status IS DISTINCT FROM OLD.status)
  ) THEN RETURN NEW; END IF;

  IF EXISTS (SELECT 1 FROM public.financial_transactions WHERE order_id = NEW.id AND tipo = 'RECEITA') THEN
    RETURN NEW;
  END IF;

  SELECT tipo::text,
         COALESCE((payload->>'parcelas')::int, 1) AS parcelas,
         payload->>'conta' AS conta,
         payload->>'observacao' AS observ,
         payload->>'modalidade' AS modalidade,
         COALESCE(payments.bandeira, payload->>'bandeira') AS bandeira,
         account_id,
         payload->'prazos' AS prazos
    INTO pay
    FROM public.payments
   WHERE order_id = NEW.id
   ORDER BY created_at DESC
   LIMIT 1;

  pay_tipo := pay.tipo;
  parcelas_num := GREATEST(COALESCE(pay.parcelas, 1), 1);
  conta_txt := pay.conta;
  observ_txt := pay.observ;
  acc_id := pay.account_id;
  bandeira := pay.bandeira;
  prazos_json := pay.prazos;
  modalidade := UPPER(COALESCE(pay.modalidade,
    CASE WHEN pay_tipo = 'CARTAO' THEN 'CREDITO' ELSE pay_tipo END));

  is_cartao := (pay_tipo = 'CARTAO');
  is_credito := (is_cartao AND modalidade = 'CREDITO');

  IF acc_id IS NULL THEN
    IF is_cartao THEN
      SELECT id INTO acc_id FROM public.bank_accounts WHERE default_cartao AND ativo LIMIT 1;
    ELSIF pay_tipo = 'PIX' THEN
      SELECT id INTO acc_id FROM public.bank_accounts WHERE default_pix AND ativo LIMIT 1;
    ELSIF pay_tipo = 'DINHEIRO' THEN
      SELECT id INTO acc_id FROM public.bank_accounts WHERE default_dinheiro AND ativo LIMIT 1;
    END IF;
  END IF;

  forma_txt := CASE WHEN pay_tipo = ANY(allowed_formas) THEN pay_tipo ELSE 'OUTRO' END;
  desc_base := COALESCE(observ_txt, 'Venda #'||substring(NEW.id::text,1,8));
  bruto_total := COALESCE(NEW.total, 0);

  IF pay_tipo = 'FATURADO' THEN
    -- Prazos em dias (ex.: [30], [30,60], [30,60,90])
    IF prazos_json IS NOT NULL AND jsonb_typeof(prazos_json) = 'array' AND jsonb_array_length(prazos_json) > 0 THEN
      SELECT array_agg((value)::text::int ORDER BY (value)::text::int)
        INTO prazos FROM jsonb_array_elements(prazos_json);
    ELSE
      prazos := ARRAY[30];
    END IF;

    parcelas_num := array_length(prazos, 1);
    parcela_bruto := ROUND(bruto_total / parcelas_num, 2);

    FOR i IN 1..parcelas_num LOOP
      IF i = parcelas_num THEN
        parcela_bruto := bruto_total - ROUND(bruto_total / parcelas_num, 2) * (parcelas_num - 1);
      ELSE
        parcela_bruto := ROUND(bruto_total / parcelas_num, 2);
      END IF;
      venc := CURRENT_DATE + (prazos[i] || ' days')::interval;

      INSERT INTO public.financial_transactions(
        order_id, company_id, tipo, status, valor, valor_bruto,
        vencimento, pagamento, descricao, forma_pagamento,
        parcelas, parcela_num, parcelas_total,
        bandeira, taxa_percentual, taxas, antecipado, account_id
      ) VALUES (
        NEW.id, NEW.company_id, 'RECEITA', 'PENDENTE',
        parcela_bruto, parcela_bruto,
        venc, NULL,
        desc_base || ' (Faturado ' || i || '/' || parcelas_num || ' — ' || prazos[i] || ' dias)',
        'OUTRO', parcelas_num, i, parcelas_num,
        NULL, 0, 0, false, acc_id
      );
    END LOOP;

  ELSIF is_cartao THEN
    IF bandeira IS NOT NULL THEN
      SELECT * INTO fee_rec FROM public.payment_fees
       WHERE ativo AND LOWER(payment_fees.bandeira) = LOWER(bandeira) LIMIT 1;
      IF FOUND THEN
        IF NOT is_credito THEN
          taxa_bandeira := COALESCE(fee_rec.debito, 0);
        ELSIF parcelas_num = 1 THEN
          taxa_bandeira := COALESCE(fee_rec.credito_avista, 0);
        ELSIF parcelas_num = 2 THEN
          taxa_bandeira := COALESCE(fee_rec.credito_2_6, 0);
        ELSE
          taxa_bandeira := COALESCE(fee_rec.credito_7_12, 0);
        END IF;
      END IF;
    END IF;

    taxa_total_pct := COALESCE(taxa_bandeira, 0);
    taxa_valor_total := ROUND(bruto_total * taxa_total_pct / 100.0, 2);
    liquido_total := bruto_total - taxa_valor_total;

    IF NOT is_credito THEN parcelas_num := 1; END IF;

    parcela_bruto := ROUND(bruto_total / parcelas_num, 2);
    parcela_liquido := ROUND(liquido_total / parcelas_num, 2);

    FOR i IN 1..parcelas_num LOOP
      venc := CURRENT_DATE + INTERVAL '1 day';

      IF i = parcelas_num THEN
        parcela_bruto := bruto_total - ROUND(bruto_total / parcelas_num, 2) * (parcelas_num - 1);
        parcela_liquido := liquido_total - ROUND(liquido_total / parcelas_num, 2) * (parcelas_num - 1);
      END IF;

      INSERT INTO public.financial_transactions(
        order_id, company_id, tipo, status, valor, valor_bruto,
        vencimento, pagamento, descricao, forma_pagamento,
        parcelas, parcela_num, parcelas_total,
        bandeira, taxa_percentual, taxas, antecipado, account_id
      ) VALUES (
        NEW.id, NEW.company_id, 'RECEITA', 'PENDENTE',
        parcela_liquido, parcela_bruto,
        venc, NULL,
        desc_base || CASE WHEN is_credito THEN ' (' || i || '/' || parcelas_num || ' — ' || COALESCE(bandeira,'Cartão') || ' D+1)'
                          ELSE ' (Débito ' || COALESCE(bandeira,'') || ' D+1)' END,
        forma_txt, parcelas_num, i, parcelas_num,
        bandeira, taxa_total_pct,
        ROUND(parcela_bruto * taxa_total_pct / 100.0, 2),
        false, acc_id
      );
    END LOOP;

    IF taxa_valor_total > 0 THEN
      INSERT INTO public.financial_transactions(
        order_id, tipo, status, valor, vencimento, pagamento, descricao, forma_pagamento
      ) VALUES (
        NEW.id, 'DESPESA', 'PAGO', taxa_valor_total,
        CURRENT_DATE, CURRENT_DATE,
        'Taxa Ton — Venda #' || substring(NEW.id::text,1,8) ||
          ' (' || COALESCE(bandeira,'?') || ' ' ||
          CASE WHEN is_credito THEN parcelas_num || 'x' ELSE 'Débito' END || ')',
        'OUTRO'
      );
    END IF;

  ELSE
    status_fin := 'PAGO';
    pagamento_fin := CURRENT_DATE;

    INSERT INTO public.financial_transactions(
      order_id, company_id, tipo, status, valor, valor_bruto,
      vencimento, pagamento, descricao, forma_pagamento,
      parcelas, parcela_num, parcelas_total, bandeira, taxa_percentual, taxas, antecipado, account_id
    ) VALUES (
      NEW.id, NEW.company_id, 'RECEITA', status_fin,
      bruto_total, bruto_total,
      CURRENT_DATE, pagamento_fin,
      desc_base || CASE
        WHEN pay_tipo = 'PIX' THEN ' (PIX)'
        WHEN pay_tipo = 'DINHEIRO' THEN ' (Dinheiro)'
        ELSE ''
      END,
      forma_txt, 1, 1, 1, bandeira, 0, 0, false, acc_id
    );
  END IF;

  IF NEW.trip_id IS NULL AND NEW.custo_lancado_em IS NULL THEN
    SELECT COALESCE(SUM(oi.quantidade * COALESCE(oi.custo_unitario, 0)),0) INTO custo_total
      FROM public.order_items oi
     WHERE oi.order_id = NEW.id;

    IF custo_total > 0 THEN
      desc_dia := 'Custos das peças vendidas ' || to_char(CURRENT_DATE, 'DD/MM/YYYY');

      SELECT id INTO ja_despesa_dia
        FROM public.financial_transactions
       WHERE tipo='DESPESA' AND order_id IS NULL AND descricao = desc_dia
       LIMIT 1;

      IF ja_despesa_dia IS NULL THEN
        INSERT INTO public.financial_transactions(order_id, company_id, tipo, status, valor, vencimento, descricao)
        VALUES (NULL, NULL, 'DESPESA', 'PENDENTE', custo_total,
                CURRENT_DATE + INTERVAL '30 days', desc_dia);
      ELSE
        UPDATE public.financial_transactions
           SET valor = valor + custo_total, updated_at = now()
         WHERE id = ja_despesa_dia;
      END IF;
    END IF;

    NEW.custo_lancado_em := now();
  END IF;

  RETURN NEW;
END;
$function$;

-- MIGRATION: 20260729004224_cd984396-926f-4a31-9ece-1a18715b47c6.sql
CREATE OR REPLACE FUNCTION public.norm_cidade_txt(v text)
RETURNS text
LANGUAGE sql
IMMUTABLE
SET search_path = public
AS $$
  SELECT UPPER(TRIM(TRANSLATE(COALESCE(v,''),
    'áàâãäéèêëíìîïóòôõöúùûüçÁÀÂÃÄÉÈÊËÍÌÎÏÓÒÔÕÖÚÙÛÜÇ',
    'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC')))
$$;

CREATE OR REPLACE FUNCTION public.orders_auto_link_trip()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_cidade text;
  v_estado text;
  v_trip uuid;
BEGIN
  IF NEW.trip_id IS NOT NULL OR NEW.company_id IS NULL THEN
    RETURN NEW;
  END IF;

  SELECT public.norm_cidade_txt(cidade), public.norm_cidade_txt(estado)
    INTO v_cidade, v_estado
    FROM public.companies WHERE id = NEW.company_id;

  IF v_cidade IS NULL OR v_cidade = '' THEN
    RETURN NEW;
  END IF;

  SELECT t.id INTO v_trip
    FROM public.trips t
   WHERE t.status = 'open'
     AND (
       (public.norm_cidade_txt(t.cidade) = v_cidade AND (v_estado IS NULL OR v_estado = '' OR public.norm_cidade_txt(t.estado) = v_estado))
       OR EXISTS (
         SELECT 1 FROM jsonb_array_elements(COALESCE(t.destinos, '[]'::jsonb)) d
         WHERE public.norm_cidade_txt(d->>'cidade') = v_cidade
           AND (v_estado IS NULL OR v_estado = '' OR public.norm_cidade_txt(d->>'estado') = v_estado)
       )
     )
   ORDER BY t.created_at DESC
   LIMIT 1;

  IF v_trip IS NOT NULL THEN
    NEW.trip_id := v_trip;
  END IF;

  RETURN NEW;
END;
$$;

-- Backfill: pedidos sem viagem que pertencem a uma viagem aberta pela cidade do cliente
UPDATE public.orders o
SET trip_id = t.id
FROM public.trips t, public.companies c
WHERE o.trip_id IS NULL
  AND o.company_id = c.id
  AND t.status = 'open'
  AND o.created_at >= t.created_at
  AND public.norm_cidade_txt(c.cidade) <> ''
  AND (
    public.norm_cidade_txt(t.cidade) = public.norm_cidade_txt(c.cidade)
    OR EXISTS (
      SELECT 1 FROM jsonb_array_elements(COALESCE(t.destinos, '[]'::jsonb)) d
      WHERE public.norm_cidade_txt(d->>'cidade') = public.norm_cidade_txt(c.cidade)
    )
  );

-- MIGRATION: 20260729004517_5ac4dd57-388a-4ff0-abc0-b020317a6d5a.sql
CREATE OR REPLACE FUNCTION public.normalize_cidade()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $function$
BEGIN
  IF NEW.cidade IS NOT NULL THEN
    NEW.cidade := public.norm_cidade_txt(NEW.cidade);
    IF NEW.cidade = '' THEN NEW.cidade := NULL; END IF;
  END IF;
  IF TG_TABLE_NAME IN ('leads','companies') AND NEW.estado IS NOT NULL THEN
    NEW.estado := public.norm_cidade_txt(NEW.estado);
    IF NEW.estado = '' THEN NEW.estado := NULL; END IF;
  END IF;
  RETURN NEW;
END;
$function$;

-- MIGRATION: 20260729011737_4897cc91-54c9-4ab2-b90a-7bce21008061.sql
CREATE OR REPLACE FUNCTION public.stock_apply_delta(_product_id uuid, _delta numeric, _tipo text, _motivo text, _ref uuid DEFAULT NULL::uuid, _allow_negative boolean DEFAULT false)
 RETURNS numeric
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  novo NUMERIC;
BEGIN
  IF auth.uid() IS NOT NULL
     AND NOT public.is_sales_staff(auth.uid())
     AND NOT public.has_role(auth.uid(), 'operador'::app_role) THEN
    RAISE EXCEPTION 'Sem permissão para movimentar estoque';
  END IF;

  IF _delta = 0 THEN
    SELECT COALESCE(estoque,0) INTO novo FROM public.products WHERE id = _product_id;
    RETURN novo;
  END IF;

  UPDATE public.products
     SET estoque = COALESCE(estoque,0) + _delta,
         updated_at = now()
   WHERE id = _product_id
  RETURNING estoque INTO novo;

  IF novo IS NULL THEN
    RAISE EXCEPTION 'Produto % não encontrado', _product_id;
  END IF;

  IF novo < 0 AND NOT _allow_negative THEN
    UPDATE public.products SET estoque = COALESCE(estoque,0) - _delta WHERE id = _product_id;
    RAISE EXCEPTION 'Estoque insuficiente para o produto (saldo ficaria %). Operação cancelada.', novo;
  END IF;

  INSERT INTO public.stock_movements(product_id, tipo, quantidade, motivo, reference_id, user_id)
  VALUES (_product_id, _tipo, ABS(_delta), _motivo, _ref, auth.uid());

  RETURN novo;
END;
$function$;

GRANT EXECUTE ON FUNCTION public.stock_apply_delta(uuid, numeric, text, text, uuid, boolean) TO authenticated;

-- MIGRATION: 20260729012125_68b5f0e0-51b7-4617-bb5d-75b072c8ab11.sql
ALTER TABLE public.financial_transactions ADD COLUMN purchase_order_id uuid REFERENCES public.purchase_orders(id) ON DELETE SET NULL;

COMMENT ON COLUMN public.financial_transactions.purchase_order_id IS 'Vínculo com a compra de material que gerou esta transação financeira';

-- MIGRATION: 20260729015748_f9ac32de-4ad5-4825-b627-6ddccaa14d9c.sql
ALTER TABLE public.financial_entries ADD COLUMN IF NOT EXISTS fechamento_id UUID REFERENCES public.fechamentos(id) ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_financial_entries_fechamento ON public.financial_entries(fechamento_id);

CREATE OR REPLACE FUNCTION public.fechamento_sync_financeiro()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  desc_txt TEXT;
BEGIN
  desc_txt := 'Fechamento ' || to_char(NEW.periodo_from, 'DD/MM/YYYY') || ' a ' || to_char(NEW.periodo_to, 'DD/MM/YYYY');

  IF TG_OP = 'INSERT' THEN
    -- A parcela "empresa (custo + reserva)" NAO gera lancamento: o dinheiro das vendas
    -- ja foi creditado na conta pela baixa dos recebimentos. Lancar de novo duplicaria o saldo.

    -- A retirada pessoal e uma transferencia real: sai da conta da empresa, entra na pessoal.
    IF NEW.valor_retirada IS NOT NULL AND NEW.valor_retirada > 0
       AND NEW.account_id IS NOT NULL AND NEW.account_id_pessoal IS NOT NULL THEN
      INSERT INTO public.financial_entries (account_id, tipo, valor, data, descricao, fechamento_id)
      VALUES (NEW.account_id, 'DESPESA', NEW.valor_retirada, NEW.periodo_to, desc_txt || ' — Retirada pessoal (saida da empresa)', NEW.id);

      INSERT INTO public.financial_entries (account_id, tipo, valor, data, descricao, fechamento_id)
      VALUES (NEW.account_id_pessoal, 'RECEITA', NEW.valor_retirada, NEW.periodo_to, desc_txt || ' — Retirada pessoal (entrada)', NEW.id);
    END IF;
  END IF;

  RETURN NEW;
END;
$function$;

-- Corrige os lancamentos ja gravados do acerto de julho
DO $$
DECLARE
  f RECORD;
BEGIN
  FOR f IN SELECT * FROM public.fechamentos LOOP
    DELETE FROM public.financial_entries
     WHERE descricao LIKE 'Fechamento ' || to_char(f.periodo_from,'DD/MM/YYYY') || ' a ' || to_char(f.periodo_to,'DD/MM/YYYY') || '%'
       AND fechamento_id IS NULL;

    IF f.valor_retirada > 0 AND f.account_id IS NOT NULL AND f.account_id_pessoal IS NOT NULL THEN
      INSERT INTO public.financial_entries (account_id, tipo, valor, data, descricao, fechamento_id)
      VALUES (f.account_id, 'DESPESA', f.valor_retirada, f.periodo_to,
              'Fechamento ' || to_char(f.periodo_from,'DD/MM/YYYY') || ' a ' || to_char(f.periodo_to,'DD/MM/YYYY') || ' — Retirada pessoal (saida da empresa)', f.id),
             (f.account_id_pessoal, 'RECEITA', f.valor_retirada, f.periodo_to,
              'Fechamento ' || to_char(f.periodo_from,'DD/MM/YYYY') || ' a ' || to_char(f.periodo_to,'DD/MM/YYYY') || ' — Retirada pessoal (entrada)', f.id);
    END IF;
  END LOOP;
END $$;

-- MIGRATION: 20260729022238_af810125-96ca-448e-b693-52cfd262bc56.sql
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS fechamento_id uuid REFERENCES public.fechamentos(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_orders_fechamento_id ON public.orders(fechamento_id);

-- Backfill: pedidos criados até a data em que cada acerto foi realizado,
-- dentro do período do acerto, ficam marcados como já acertados.
UPDATE public.orders o
SET fechamento_id = f.id
FROM public.fechamentos f
WHERE o.fechamento_id IS NULL
  AND o.status <> 'CANCELADO'
  AND o.created_at <= f.created_at
  AND (o.created_at AT TIME ZONE 'America/Sao_Paulo')::date >= f.periodo_from
  AND (o.created_at AT TIME ZONE 'America/Sao_Paulo')::date <= f.periodo_to;

-- MIGRATION: 20260729120324_aea04a47-28a1-49a3-bf2f-40cd9ec0abb9.sql
ALTER TABLE public.fechamentos
  ADD COLUMN IF NOT EXISTS valor_empresa_pendente numeric NOT NULL DEFAULT 0;

-- MIGRATION: 20260729162346_fca3463c-251c-4755-b876-7e2c88a8ec0c.sql
CREATE TABLE public.product_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  descricao TEXT NOT NULL,
  quantidade NUMERIC NOT NULL DEFAULT 1,
  company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  cliente_nome TEXT,
  cidade TEXT,
  observacao TEXT,
  prioridade TEXT NOT NULL DEFAULT 'MEDIA' CHECK (prioridade IN ('BAIXA','MEDIA','ALTA')),
  status TEXT NOT NULL DEFAULT 'PENDENTE' CHECK (status IN ('PENDENTE','COMPRADO','DESCARTADO')),
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_product_requests_status ON public.product_requests(status);
CREATE INDEX idx_product_requests_product ON public.product_requests(product_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.product_requests TO authenticated;
GRANT ALL ON public.product_requests TO service_role;

ALTER TABLE public.product_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Equipe pode ver demandas" ON public.product_requests
  FOR SELECT TO authenticated USING (public.is_sales_staff(auth.uid()) OR public.has_role(auth.uid(),'operador'::app_role));

CREATE POLICY "Equipe pode criar demandas" ON public.product_requests
  FOR INSERT TO authenticated WITH CHECK (public.is_sales_staff(auth.uid()) OR public.has_role(auth.uid(),'operador'::app_role));

CREATE POLICY "Equipe pode atualizar demandas" ON public.product_requests
  FOR UPDATE TO authenticated USING (public.is_sales_staff(auth.uid()) OR public.has_role(auth.uid(),'operador'::app_role));

CREATE POLICY "Gerente pode apagar demandas" ON public.product_requests
  FOR DELETE TO authenticated USING (public.is_manager(auth.uid()));

CREATE TRIGGER trg_product_requests_updated_at
  BEFORE UPDATE ON public.product_requests
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- MIGRATION: 20260801215231_8342a9dd-c998-4bc0-9584-b78deec61159.sql
DROP POLICY IF EXISTS "trip-receipts: authenticated read" ON storage.objects;
DROP POLICY IF EXISTS "trip-receipts: authenticated insert" ON storage.objects;

CREATE POLICY "trip-receipts: owner read" ON storage.objects
FOR SELECT TO authenticated
USING (bucket_id = 'trip-receipts' AND owner = auth.uid());

CREATE POLICY "trip-receipts: owner insert" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'trip-receipts' AND owner = auth.uid());

-- MIGRATION: 20260802123917_5c096fb7-fa75-4b58-b319-57bde9d3596e.sql
CREATE OR REPLACE FUNCTION public.products_set_sku()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  prefix TEXT;
  start_n INT;
  pad INT := 3;
  next_n INT;
  candidate TEXT;
BEGIN
  IF NEW.sku IS NOT NULL AND NEW.sku <> '' THEN
    RETURN NEW;
  END IF;

  CASE COALESCE(NEW.tipo::text, 'outro')
    WHEN 'carcaca'     THEN prefix := 'CP-'; start_n := 10;
    WHEN 'controle'    THEN prefix := 'CT-'; start_n := 100;
    WHEN 'chave'       THEN prefix := 'CH-'; start_n := 200;
    WHEN 'alarme'      THEN prefix := 'AL-'; start_n := 300;
    WHEN 'modulo'      THEN prefix := 'MD-'; start_n := 400;
    WHEN 'transponder' THEN prefix := 'TR-'; start_n := 500;
    WHEN 'lamina'      THEN prefix := 'LM-'; start_n := 600;
    WHEN 'bateria'     THEN prefix := 'BT-'; start_n := 700;
    WHEN 'acessorio'   THEN prefix := 'AC-'; start_n := 800;
    ELSE                    prefix := 'PR-'; start_n := 900;
  END CASE;

  SELECT COALESCE(MAX(
    NULLIF(regexp_replace(substring(sku FROM char_length(prefix) + 1), '\D', '', 'g'), '')::int
  ), start_n - 1) + 1
  INTO next_n
  FROM public.products
  WHERE sku LIKE prefix || '%';

  IF next_n IS NULL OR next_n < start_n THEN next_n := start_n; END IF;

  LOOP
    candidate := prefix || lpad(next_n::text, pad, '0');
    EXIT WHEN NOT EXISTS (SELECT 1 FROM public.products WHERE sku = candidate);
    next_n := next_n + 1;
  END LOOP;

  NEW.sku := candidate;
  RETURN NEW;
END;
$function$;

-- MIGRATION: 20260802124218_0e1f44cd-1dcf-4aa8-a65e-a628732886a8.sql
CREATE OR REPLACE FUNCTION public.products_set_sku()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  prefix TEXT;
  start_n INT;
  pad INT := 3;
  next_n INT;
  candidate TEXT;
  t TEXT;
  n TEXT;
BEGIN
  IF NEW.sku IS NOT NULL AND NEW.sku <> '' THEN
    RETURN NEW;
  END IF;

  t := NULLIF(NEW.tipo::text, '');
  n := public.norm_cidade_txt(COALESCE(NEW.nome, ''));

  IF t IS NULL THEN
    t := CASE
      WHEN n LIKE '%CARCACA%' THEN 'carcaca'
      WHEN n LIKE '%CONTROLE%' THEN 'controle'
      WHEN n LIKE '%CHAVE%' OR n LIKE '%CANIVETE%' THEN 'chave'
      WHEN n LIKE '%ALARME%' THEN 'alarme'
      WHEN n LIKE '%MODULO%' THEN 'modulo'
      WHEN n LIKE '%TRANSPONDER%' OR n LIKE '%CHIP%' THEN 'transponder'
      WHEN n LIKE '%LAMINA%' THEN 'lamina'
      WHEN n LIKE '%BATERIA%' THEN 'bateria'
      WHEN n LIKE '%ACESSORIO%' THEN 'acessorio'
      ELSE 'outro'
    END;
  END IF;

  CASE t
    WHEN 'carcaca'     THEN prefix := 'CP-'; start_n := 10;
    WHEN 'controle'    THEN prefix := 'CT-'; start_n := 100;
    WHEN 'chave'       THEN prefix := 'CH-'; start_n := 200;
    WHEN 'alarme'      THEN prefix := 'AL-'; start_n := 300;
    WHEN 'modulo'      THEN prefix := 'MD-'; start_n := 400;
    WHEN 'transponder' THEN prefix := 'TR-'; start_n := 500;
    WHEN 'lamina'      THEN prefix := 'LM-'; start_n := 600;
    WHEN 'bateria'     THEN prefix := 'BT-'; start_n := 700;
    WHEN 'acessorio'   THEN prefix := 'AC-'; start_n := 800;
    ELSE                    prefix := 'PR-'; start_n := 900;
  END CASE;

  SELECT COALESCE(MAX(
    NULLIF(regexp_replace(substring(sku FROM char_length(prefix) + 1), '\D', '', 'g'), '')::int
  ), start_n - 1) + 1
  INTO next_n
  FROM public.products
  WHERE sku LIKE prefix || '%';

  IF next_n IS NULL OR next_n < start_n THEN next_n := start_n; END IF;

  LOOP
    candidate := prefix || lpad(next_n::text, pad, '0');
    EXIT WHEN NOT EXISTS (SELECT 1 FROM public.products WHERE sku = candidate);
    next_n := next_n + 1;
  END LOOP;

  NEW.sku := candidate;
  RETURN NEW;
END;
$function$;

-- MIGRATION: 20260802190053_a7d0540f-7399-4994-a60d-1e8642520cec.sql
ALTER TABLE public.fechamentos
ADD COLUMN IF NOT EXISTS despesa_viagem_periodo numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS despesa_empresa_periodo numeric DEFAULT 0;

-- MIGRATION: 20260802191311_b376e9cc-a9ab-4eb7-a931-c6195e9d3487.sql
ALTER TABLE public.fechamentos ADD COLUMN IF NOT EXISTS taxas_periodo numeric DEFAULT 0;

