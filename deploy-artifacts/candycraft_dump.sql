--
-- PostgreSQL database dump
--

\restrict qyjSrdbR15eo9R7AllbbQo11UIFu1M6LHOBbdOrBegg4M7g1e1zYz3D1DwuyjRX

-- Dumped from database version 18.3 (Debian 18.3-1.pgdg12+1)
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.user_addresses DROP CONSTRAINT IF EXISTS user_addresses_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS "products_categoryId_fkey";
ALTER TABLE IF EXISTS ONLY public.payments DROP CONSTRAINT IF EXISTS payments_order_id_fkey;
ALTER TABLE IF EXISTS ONLY public.payment_webhook_events DROP CONSTRAINT IF EXISTS payment_webhook_events_payment_id_fkey;
ALTER TABLE IF EXISTS ONLY public.payment_attempts DROP CONSTRAINT IF EXISTS payment_attempts_payment_id_fkey;
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS orders_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.order_status_history DROP CONSTRAINT IF EXISTS order_status_history_order_id_fkey;
ALTER TABLE IF EXISTS ONLY public.order_status_history DROP CONSTRAINT IF EXISTS order_status_history_changed_by_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.order_items DROP CONSTRAINT IF EXISTS order_items_product_id_fkey;
ALTER TABLE IF EXISTS ONLY public.order_items DROP CONSTRAINT IF EXISTS order_items_order_id_fkey;
ALTER TABLE IF EXISTS ONLY public.order_addresses DROP CONSTRAINT IF EXISTS order_addresses_order_id_fkey;
ALTER TABLE IF EXISTS ONLY public.inventory_movements DROP CONSTRAINT IF EXISTS inventory_movements_product_id_fkey;
ALTER TABLE IF EXISTS ONLY public.inventory_movements DROP CONSTRAINT IF EXISTS inventory_movements_order_id_fkey;
ALTER TABLE IF EXISTS ONLY public.carts DROP CONSTRAINT IF EXISTS carts_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.cart_items DROP CONSTRAINT IF EXISTS cart_items_product_id_fkey;
ALTER TABLE IF EXISTS ONLY public.cart_items DROP CONSTRAINT IF EXISTS cart_items_cart_id_fkey;
ALTER TABLE IF EXISTS ONLY public."RefreshToken" DROP CONSTRAINT IF EXISTS "RefreshToken_userId_fkey";
DROP INDEX IF EXISTS public."users_yandexId_key";
DROP INDEX IF EXISTS public."users_vkId_key";
DROP INDEX IF EXISTS public.users_phone_key;
DROP INDEX IF EXISTS public."users_googleId_key";
DROP INDEX IF EXISTS public.users_email_key;
DROP INDEX IF EXISTS public.user_addresses_user_id_is_default_idx;
DROP INDEX IF EXISTS public.user_addresses_user_id_idx;
DROP INDEX IF EXISTS public.products_slug_key;
DROP INDEX IF EXISTS public.products_sku_key;
DROP INDEX IF EXISTS public.products_is_active_deleted_at_idx;
DROP INDEX IF EXISTS public.products_in_stock_reserved_qty_idx;
DROP INDEX IF EXISTS public."products_categoryId_idx";
DROP INDEX IF EXISTS public.payments_status_idx;
DROP INDEX IF EXISTS public.payments_provider_payment_id_key;
DROP INDEX IF EXISTS public.payments_order_id_idx;
DROP INDEX IF EXISTS public.payments_idempotency_key_key;
DROP INDEX IF EXISTS public.payment_webhook_events_received_at_idx;
DROP INDEX IF EXISTS public.payment_webhook_events_provider_event_id_key;
DROP INDEX IF EXISTS public.payment_webhook_events_payment_id_idx;
DROP INDEX IF EXISTS public.payment_webhook_events_event_type_idx;
DROP INDEX IF EXISTS public.payment_attempts_payment_id_idx;
DROP INDEX IF EXISTS public.orders_user_id_idx;
DROP INDEX IF EXISTS public.orders_user_id_idempotency_key_key;
DROP INDEX IF EXISTS public.orders_public_order_number_key;
DROP INDEX IF EXISTS public.order_status_history_order_id_idx;
DROP INDEX IF EXISTS public.order_status_history_created_at_idx;
DROP INDEX IF EXISTS public.order_status_history_changed_by_user_id_idx;
DROP INDEX IF EXISTS public.order_items_product_id_idx;
DROP INDEX IF EXISTS public.order_items_order_id_idx;
DROP INDEX IF EXISTS public.order_addresses_order_id_key;
DROP INDEX IF EXISTS public.order_addresses_city_idx;
DROP INDEX IF EXISTS public.inventory_movements_product_id_created_at_idx;
DROP INDEX IF EXISTS public.inventory_movements_order_id_idx;
DROP INDEX IF EXISTS public.categories_name_key;
DROP INDEX IF EXISTS public.carts_user_id_key;
DROP INDEX IF EXISTS public.cart_items_product_id_idx;
DROP INDEX IF EXISTS public.cart_items_cart_id_product_id_key;
DROP INDEX IF EXISTS public.cart_items_cart_id_idx;
DROP INDEX IF EXISTS public."RefreshToken_userId_idx";
DROP INDEX IF EXISTS public."RefreshToken_tokenHash_key";
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.user_addresses DROP CONSTRAINT IF EXISTS user_addresses_pkey;
ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_pkey;
ALTER TABLE IF EXISTS ONLY public.payments DROP CONSTRAINT IF EXISTS payments_pkey;
ALTER TABLE IF EXISTS ONLY public.payment_webhook_events DROP CONSTRAINT IF EXISTS payment_webhook_events_pkey;
ALTER TABLE IF EXISTS ONLY public.payment_attempts DROP CONSTRAINT IF EXISTS payment_attempts_pkey;
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS orders_pkey;
ALTER TABLE IF EXISTS ONLY public.order_status_history DROP CONSTRAINT IF EXISTS order_status_history_pkey;
ALTER TABLE IF EXISTS ONLY public.order_items DROP CONSTRAINT IF EXISTS order_items_pkey;
ALTER TABLE IF EXISTS ONLY public.order_addresses DROP CONSTRAINT IF EXISTS order_addresses_pkey;
ALTER TABLE IF EXISTS ONLY public.inventory_movements DROP CONSTRAINT IF EXISTS inventory_movements_pkey;
ALTER TABLE IF EXISTS ONLY public.categories DROP CONSTRAINT IF EXISTS categories_pkey;
ALTER TABLE IF EXISTS ONLY public.carts DROP CONSTRAINT IF EXISTS carts_pkey;
ALTER TABLE IF EXISTS ONLY public.cart_items DROP CONSTRAINT IF EXISTS cart_items_pkey;
ALTER TABLE IF EXISTS ONLY public._prisma_migrations DROP CONSTRAINT IF EXISTS _prisma_migrations_pkey;
ALTER TABLE IF EXISTS ONLY public."RefreshToken" DROP CONSTRAINT IF EXISTS "RefreshToken_pkey";
ALTER TABLE IF EXISTS public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.user_addresses ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.products ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.payments ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.payment_webhook_events ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.payment_attempts ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.orders ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.order_status_history ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.order_items ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.order_addresses ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.inventory_movements ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.categories ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.carts ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.cart_items ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public."RefreshToken" ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.users_id_seq;
DROP TABLE IF EXISTS public.users;
DROP SEQUENCE IF EXISTS public.user_addresses_id_seq;
DROP TABLE IF EXISTS public.user_addresses;
DROP SEQUENCE IF EXISTS public.products_id_seq;
DROP TABLE IF EXISTS public.products;
DROP SEQUENCE IF EXISTS public.payments_id_seq;
DROP TABLE IF EXISTS public.payments;
DROP SEQUENCE IF EXISTS public.payment_webhook_events_id_seq;
DROP TABLE IF EXISTS public.payment_webhook_events;
DROP SEQUENCE IF EXISTS public.payment_attempts_id_seq;
DROP TABLE IF EXISTS public.payment_attempts;
DROP SEQUENCE IF EXISTS public.orders_id_seq;
DROP TABLE IF EXISTS public.orders;
DROP SEQUENCE IF EXISTS public.order_status_history_id_seq;
DROP TABLE IF EXISTS public.order_status_history;
DROP SEQUENCE IF EXISTS public.order_items_id_seq;
DROP TABLE IF EXISTS public.order_items;
DROP SEQUENCE IF EXISTS public.order_addresses_id_seq;
DROP TABLE IF EXISTS public.order_addresses;
DROP SEQUENCE IF EXISTS public.inventory_movements_id_seq;
DROP TABLE IF EXISTS public.inventory_movements;
DROP SEQUENCE IF EXISTS public.categories_id_seq;
DROP TABLE IF EXISTS public.categories;
DROP SEQUENCE IF EXISTS public.carts_id_seq;
DROP TABLE IF EXISTS public.carts;
DROP SEQUENCE IF EXISTS public.cart_items_id_seq;
DROP TABLE IF EXISTS public.cart_items;
DROP TABLE IF EXISTS public._prisma_migrations;
DROP SEQUENCE IF EXISTS public."RefreshToken_id_seq";
DROP TABLE IF EXISTS public."RefreshToken";
DROP TYPE IF EXISTS public."Role";
DROP TYPE IF EXISTS public."PaymentStatus";
DROP TYPE IF EXISTS public."PaymentProvider";
DROP TYPE IF EXISTS public."OrderStatus";
DROP TYPE IF EXISTS public."InventoryMovementType";
-- *not* dropping schema, since initdb creates it
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


--
-- Name: InventoryMovementType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."InventoryMovementType" AS ENUM (
    'RESERVE',
    'RELEASE',
    'OUT',
    'IN',
    'ADJUSTMENT'
);


--
-- Name: OrderStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."OrderStatus" AS ENUM (
    'PENDING',
    'PAID',
    'PROCESSING',
    'SHIPPED',
    'COMPLETED',
    'CANCELED'
);


--
-- Name: PaymentProvider; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."PaymentProvider" AS ENUM (
    'YOOKASSA'
);


--
-- Name: PaymentStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."PaymentStatus" AS ENUM (
    'PENDING',
    'WAITING_FOR_CAPTURE',
    'SUCCEEDED',
    'CANCELED',
    'FAILED'
);


--
-- Name: Role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."Role" AS ENUM (
    'USER',
    'ADMIN'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: RefreshToken; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."RefreshToken" (
    id integer NOT NULL,
    "tokenHash" text NOT NULL,
    "userId" integer NOT NULL,
    "revokedAt" timestamp(3) without time zone,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: RefreshToken_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."RefreshToken_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: RefreshToken_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."RefreshToken_id_seq" OWNED BY public."RefreshToken".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


--
-- Name: cart_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cart_items (
    id integer NOT NULL,
    cart_id integer NOT NULL,
    product_id integer,
    quantity integer DEFAULT 1 NOT NULL,
    custom_name text,
    custom_config jsonb,
    custom_preview_url text,
    custom_price integer
);


--
-- Name: cart_items_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cart_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cart_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cart_items_id_seq OWNED BY public.cart_items.id;


--
-- Name: carts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carts (
    id integer NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


--
-- Name: carts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.carts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.carts_id_seq OWNED BY public.carts.id;


--
-- Name: categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    "imageUrl" text NOT NULL
);


--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: inventory_movements; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.inventory_movements (
    id integer NOT NULL,
    product_id integer NOT NULL,
    order_id integer,
    type public."InventoryMovementType" NOT NULL,
    quantity integer NOT NULL,
    note text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: inventory_movements_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.inventory_movements_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: inventory_movements_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.inventory_movements_id_seq OWNED BY public.inventory_movements.id;


--
-- Name: order_addresses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.order_addresses (
    id integer NOT NULL,
    order_id integer NOT NULL,
    country text DEFAULT 'Россия'::text NOT NULL,
    city text,
    street text,
    house text,
    apartment text,
    entrance text,
    floor text,
    intercom text,
    postal_code text,
    comment text,
    recipient_name text,
    recipient_phone text,
    full_address text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


--
-- Name: order_addresses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.order_addresses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: order_addresses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.order_addresses_id_seq OWNED BY public.order_addresses.id;


--
-- Name: order_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.order_items (
    id integer NOT NULL,
    order_id integer NOT NULL,
    product_id integer,
    product_name text NOT NULL,
    quantity integer DEFAULT 1 NOT NULL,
    price integer NOT NULL,
    custom_config jsonb,
    custom_preview_url text
);


--
-- Name: order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.order_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_items.id;


--
-- Name: order_status_history; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.order_status_history (
    id integer NOT NULL,
    order_id integer NOT NULL,
    from_status public."OrderStatus",
    to_status public."OrderStatus" NOT NULL,
    reason text,
    changed_by_user_id integer,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: order_status_history_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.order_status_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: order_status_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.order_status_history_id_seq OWNED BY public.order_status_history.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    user_id integer NOT NULL,
    status public."OrderStatus" DEFAULT 'PENDING'::public."OrderStatus" NOT NULL,
    total_price integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    address text NOT NULL,
    currency text DEFAULT 'RUB'::text NOT NULL,
    subtotal_minor integer DEFAULT 0 NOT NULL,
    discount_total_minor integer DEFAULT 0 NOT NULL,
    tax_total_minor integer DEFAULT 0 NOT NULL,
    delivery_fee_minor integer DEFAULT 0 NOT NULL,
    final_amount_minor integer DEFAULT 0 NOT NULL,
    public_order_number text,
    idempotency_key text,
    gift_total_minor integer DEFAULT 0 NOT NULL
);


--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: payment_attempts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payment_attempts (
    id integer NOT NULL,
    payment_id integer NOT NULL,
    request_payload jsonb,
    response_payload jsonb,
    http_status integer,
    error_message text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: payment_attempts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payment_attempts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payment_attempts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payment_attempts_id_seq OWNED BY public.payment_attempts.id;


--
-- Name: payment_webhook_events; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payment_webhook_events (
    id integer NOT NULL,
    payment_id integer,
    provider public."PaymentProvider" NOT NULL,
    event_type text NOT NULL,
    provider_event_id text,
    payload jsonb NOT NULL,
    is_processed boolean DEFAULT false NOT NULL,
    processing_error text,
    received_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    processed_at timestamp(3) without time zone
);


--
-- Name: payment_webhook_events_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payment_webhook_events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payment_webhook_events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payment_webhook_events_id_seq OWNED BY public.payment_webhook_events.id;


--
-- Name: payments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payments (
    id integer NOT NULL,
    order_id integer NOT NULL,
    provider public."PaymentProvider" NOT NULL,
    status public."PaymentStatus" DEFAULT 'PENDING'::public."PaymentStatus" NOT NULL,
    amount_minor integer NOT NULL,
    currency text NOT NULL,
    provider_payment_id text,
    idempotency_key text,
    confirmation_url text,
    paid_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


--
-- Name: payments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payments_id_seq OWNED BY public.payments.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    price integer NOT NULL,
    in_stock integer DEFAULT 0 NOT NULL,
    "imageUrl" text NOT NULL,
    "categoryId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    sku text NOT NULL,
    slug text NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    deleted_at timestamp(3) without time zone,
    reserved_qty integer DEFAULT 0 NOT NULL
);


--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: user_addresses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_addresses (
    id integer NOT NULL,
    user_id integer NOT NULL,
    label text,
    country text DEFAULT 'Россия'::text NOT NULL,
    city text,
    street text,
    house text,
    apartment text,
    entrance text,
    floor text,
    intercom text,
    postal_code text,
    comment text,
    recipient_name text,
    recipient_phone text,
    full_address text NOT NULL,
    is_default boolean DEFAULT false NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


--
-- Name: user_addresses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_addresses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_addresses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_addresses_id_seq OWNED BY public.user_addresses.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    "passwordHash" text NOT NULL,
    phone text,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL,
    "googleId" text,
    "yandexId" text,
    "vkId" text
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: RefreshToken id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."RefreshToken" ALTER COLUMN id SET DEFAULT nextval('public."RefreshToken_id_seq"'::regclass);


--
-- Name: cart_items id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart_items ALTER COLUMN id SET DEFAULT nextval('public.cart_items_id_seq'::regclass);


--
-- Name: carts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts ALTER COLUMN id SET DEFAULT nextval('public.carts_id_seq'::regclass);


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: inventory_movements id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inventory_movements ALTER COLUMN id SET DEFAULT nextval('public.inventory_movements_id_seq'::regclass);


--
-- Name: order_addresses id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_addresses ALTER COLUMN id SET DEFAULT nextval('public.order_addresses_id_seq'::regclass);


--
-- Name: order_items id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);


--
-- Name: order_status_history id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_status_history ALTER COLUMN id SET DEFAULT nextval('public.order_status_history_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: payment_attempts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_attempts ALTER COLUMN id SET DEFAULT nextval('public.payment_attempts_id_seq'::regclass);


--
-- Name: payment_webhook_events id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_webhook_events ALTER COLUMN id SET DEFAULT nextval('public.payment_webhook_events_id_seq'::regclass);


--
-- Name: payments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payments ALTER COLUMN id SET DEFAULT nextval('public.payments_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: user_addresses id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_addresses ALTER COLUMN id SET DEFAULT nextval('public.user_addresses_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: RefreshToken; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."RefreshToken" (id, "tokenHash", "userId", "revokedAt", "expiresAt", "createdAt", "updatedAt") FROM stdin;
1	$argon2id$v=19$m=65536,t=3,p=4$pYMtTUI9IGAijVqTc2oFVw$ZsZy8aX3tr0QQpEDNdQhWdkFU7OWTUpUPF+LSJew7nU	1	2026-05-23 03:58:19.382	2026-06-22 03:49:25.488	2026-05-23 03:49:25.49	2026-05-23 03:58:19.385
2	$argon2id$v=19$m=65536,t=3,p=4$YKD2g/fGuQG4sjthvvvrvg$UXyNQDmfULLd9gglxQrwJM/eH7fl/xd0oRiNjfDb7oY	1	2026-05-23 04:08:48.382	2026-06-22 04:06:20.583	2026-05-23 04:06:20.583	2026-05-23 04:08:48.382
3	$argon2id$v=19$m=65536,t=3,p=4$5/HaNs8He9JkM5HIVg2Rzg$1sUJ90/q25EgLmusvLyQ8CdlS1GjFiUJi9dCb8KBleQ	2	2026-05-23 04:59:32.604	2026-06-22 04:59:07.106	2026-05-23 04:59:07.108	2026-05-23 04:59:32.607
4	$argon2id$v=19$m=65536,t=3,p=4$tN9urwUkoKuyhFTDNFbu3A$nr4/mYBgLJ5do0fTjqNFR6i08JCTVGX3f/Gd5XSbQQw	1	2026-05-23 05:31:56.691	2026-06-22 05:29:28.991	2026-05-23 05:29:28.997	2026-05-23 05:31:56.692
5	$argon2id$v=19$m=65536,t=3,p=4$MJDeAtpUPyuAJeYtP/Q3oA$XsjqjHv1xrtK5iPDFnrzAWtZjiCCOLF4WZDzQBstgOg	1	\N	2026-06-22 05:36:11.99	2026-05-23 05:36:11.991	2026-05-23 05:36:11.991
6	$argon2id$v=19$m=65536,t=3,p=4$NFBUPVRSZ07qK+CKTsGAhg$iEVphSq47Wq4HqOnfEn9aVBf3cABYUAvG+bkXCIRfEI	1	2026-05-23 22:55:06.094	2026-06-22 05:37:21.091	2026-05-23 05:37:21.091	2026-05-23 22:55:06.101
7	$argon2id$v=19$m=65536,t=3,p=4$PQDSR4e8cqgoNC1soBdBXw$pdelQ9yjVCGqQ8Iru4bA7dX9CXJy7WU0KndqhSTOqTM	1	2026-05-23 22:57:06.49	2026-06-22 22:55:07.688	2026-05-23 22:55:07.691	2026-05-23 22:57:06.491
8	$argon2id$v=19$m=65536,t=3,p=4$lHOctGnlETAKJ6oiNtie1g$mWt0c021XAHogbUFM9ZJNjVNMO4OXkR3odqM+kacx5w	2	2026-05-23 23:06:32.191	2026-06-22 22:57:33.589	2026-05-23 22:57:33.59	2026-05-23 23:06:32.192
9	$argon2id$v=19$m=65536,t=3,p=4$w+tbQ3N5yna+fZpCCFNL5A$ODt+eK+xKxC4I09CQ3rovJbIPKHpo1nytRb56Y/FMXM	1	2026-05-23 23:08:44.692	2026-06-22 23:06:44.892	2026-05-23 23:06:44.892	2026-05-23 23:08:44.692
10	$argon2id$v=19$m=65536,t=3,p=4$iyzLndp3mkQF91F4A05n4w$/MHHnAIV0tX2YIYRaWCYFbsxFuhjgR0ZDj1SLqPpF6M	1	\N	2026-06-22 23:09:15.887	2026-05-23 23:09:15.888	2026-05-23 23:09:15.888
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
3ebec56b-65fc-4665-972c-1fb972937bf9	271266803e02428f1e950454d144bb0ae983145a9c655b21bfe3d70a91811e97	2026-05-23 02:08:40.901083+00	20260125093739_init	\N	\N	2026-05-23 02:08:40.616732+00	1
89106083-748b-4c43-bba0-b9cae072acd5	4e2ddec9850efa2400d7f16f0e3a1b2d11587012adb2347c9608889c56fca7f9	2026-05-23 02:08:40.991716+00	20260131041319_add_refresh_tokens	\N	\N	2026-05-23 02:08:40.902985+00	1
8eeebdd5-3494-4353-b2d7-a1d3b8804cc4	31dec13a548e708623cd2d06e986ee41ca5a5bf78dc5e75b6594c3dd3620d62b	2026-05-23 04:54:20.905323+00	20260429193000_add_custom_candy_cakes	\N	\N	2026-05-23 04:54:20.890425+00	1
1d3e08f0-e154-45ac-8f6d-6de79c3514f2	051fa02a64148cd4deb72882ee9f0a7f5b0227fa3aa87f36e1c4fd74e1dffbaa	2026-05-23 02:08:41.00593+00	20260204072058_add_role_enum	\N	\N	2026-05-23 02:08:40.993978+00	1
4c152203-e4ad-4ce2-b83d-2b922d4b1cd1	1529d564a75981359364503534fcc7991cb3c12a17c4df701fbb1478becdf1ad	2026-05-23 02:08:41.016502+00	20260212090000_add_google_id	\N	\N	2026-05-23 02:08:41.008669+00	1
a1547fcf-7fdf-4b3a-a154-91738073893d	09a09d6c04ab16b57b6011b0c1944d994a22a66841d4bc8daeffd367a5bc716a	2026-05-23 02:08:41.100167+00	20260413160000_order_commercial_money_fields	\N	\N	2026-05-23 02:08:41.018244+00	1
47c8494e-3559-4f03-94d9-6c586db01d85	9ff6cd8f5b3abcb9f88ea99d260253aee0e758fcaaf9ba660b1b080965c4b006	2026-05-23 04:54:20.924658+00	20260523143000_add_yandex_vk_oauth_ids	\N	\N	2026-05-23 04:54:20.907185+00	1
fac1e4b8-e3bd-43b7-9b5e-147e43db846f	39d34ada9c00aed474b1e7270c61b049056901a20095908eb9b526d2d695490c	2026-05-23 02:08:41.198597+00	20260413172000_add_order_status_history	\N	\N	2026-05-23 02:08:41.101947+00	1
faa8f0b9-113a-4ae2-b71c-72557522ee62	45f4646cf46fdfe3f85ebeab4c462c39c71b3faaca0506639d54d5a59051e630	2026-05-23 02:08:41.292707+00	20260413183000_add_order_addresses	\N	\N	2026-05-23 02:08:41.200728+00	1
efb66a34-d8d0-4103-9f2a-208d700c213c	70b7f7828f7ebff6c3aa56ae58c5857dcf776272fb375f6536d76ea928d542fe	2026-05-23 02:08:41.501411+00	20260413191000_add_payments_yookassa	\N	\N	2026-05-23 02:08:41.296118+00	1
e19093be-24c5-487c-a9e7-084d716d926d	f39edcad46447d54f1fa80875772cf727a61ad996fd8e582552aa57102e5cd69	2026-05-23 02:08:41.561256+00	20260413223000_add_product_catalog_fields	\N	\N	2026-05-23 02:08:41.504922+00	1
7e26965b-1860-4f36-a392-f0ae4c6642da	09a33d7a2d0698f67a7b67c8b9956f34427213c7486570738d43db1a2918b67f	2026-05-23 02:08:41.601256+00	20260413232000_add_user_addresses	\N	\N	2026-05-23 02:08:41.563249+00	1
83dd61ae-9106-4831-b3e7-a953b6f3789e	5dcd2664d5ff9415fd0258ffe3cb5b1823f14f45976b308f17d732127b2af9b3	2026-05-23 02:08:41.691649+00	20260414001000_add_inventory_reservations	\N	\N	2026-05-23 02:08:41.602997+00	1
e80cf0e6-4cc1-4bc2-9796-df2eb485b129	fb56090ecf2f669a237531edcc0556299583ca1f8d2cbfd3dd55d2eece482c80	2026-05-23 02:08:41.706496+00	20260414011000_add_order_public_number_and_idempotency	\N	\N	2026-05-23 02:08:41.693431+00	1
9de8da3f-ef33-4333-a937-2ecf1276aa13	85d4bd12808133f7b70b5d2420439de121559b61a250af72a159334e26c1288d	2026-05-23 02:08:41.71504+00	20260414022000_add_order_gift_total_minor	\N	\N	2026-05-23 02:08:41.708101+00	1
\.


--
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.cart_items (id, cart_id, product_id, quantity, custom_name, custom_config, custom_preview_url, custom_price) FROM stdin;
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts (id, user_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.categories (id, name, description, "imageUrl") FROM stdin;
\.


--
-- Data for Name: inventory_movements; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.inventory_movements (id, product_id, order_id, type, quantity, note, created_at) FROM stdin;
\.


--
-- Data for Name: order_addresses; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.order_addresses (id, order_id, country, city, street, house, apartment, entrance, floor, intercom, postal_code, comment, recipient_name, recipient_phone, full_address, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.order_items (id, order_id, product_id, product_name, quantity, price, custom_config, custom_preview_url) FROM stdin;
\.


--
-- Data for Name: order_status_history; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.order_status_history (id, order_id, from_status, to_status, reason, changed_by_user_id, created_at) FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders (id, user_id, status, total_price, created_at, updated_at, address, currency, subtotal_minor, discount_total_minor, tax_total_minor, delivery_fee_minor, final_amount_minor, public_order_number, idempotency_key, gift_total_minor) FROM stdin;
\.


--
-- Data for Name: payment_attempts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payment_attempts (id, payment_id, request_payload, response_payload, http_status, error_message, created_at) FROM stdin;
\.


--
-- Data for Name: payment_webhook_events; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payment_webhook_events (id, payment_id, provider, event_type, provider_event_id, payload, is_processed, processing_error, received_at, processed_at) FROM stdin;
\.


--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payments (id, order_id, provider, status, amount_minor, currency, provider_payment_id, idempotency_key, confirmation_url, paid_at, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products (id, name, description, price, in_stock, "imageUrl", "categoryId", "createdAt", "updatedAt", sku, slug, is_active, deleted_at, reserved_qty) FROM stdin;
\.


--
-- Data for Name: user_addresses; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.user_addresses (id, user_id, label, country, city, street, house, apartment, entrance, floor, intercom, postal_code, comment, recipient_name, recipient_phone, full_address, is_default, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, email, "createdAt", "firstName", "lastName", "passwordHash", phone, "updatedAt", role, "googleId", "yandexId", "vkId") FROM stdin;
2	den.pnndn@yandex.ru	2026-05-23 04:59:05.516	Данила	Беляк	$argon2id$v=19$m=65536,t=3,p=4$+hqlDLPT+BHt1qqGftOcMA$tmc07jkP9H+T0b1qaBE9NM+wJKOe3UAxIGdLAM2L5j0	\N	2026-05-23 04:59:05.516	USER	\N	1698205808	\N
1	belakdanila9@gmail.com	2026-05-23 03:49:23.888	Данила	Беляк	$argon2id$v=19$m=65536,t=3,p=4$FPsBem4AzFUwrrGhnI56Lw$olhBiHdnXrzYfhzXGpx+KymKo158jt66cuXCQyipHBQ	+79963103028	2026-05-23 05:31:40.021	ADMIN	106742092135652465189	\N	\N
\.


--
-- Name: RefreshToken_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."RefreshToken_id_seq"', 10, true);


--
-- Name: cart_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.cart_items_id_seq', 1, false);


--
-- Name: carts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.carts_id_seq', 1, false);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.categories_id_seq', 1, false);


--
-- Name: inventory_movements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.inventory_movements_id_seq', 1, false);


--
-- Name: order_addresses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.order_addresses_id_seq', 1, false);


--
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.order_items_id_seq', 1, false);


--
-- Name: order_status_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.order_status_history_id_seq', 1, false);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.orders_id_seq', 1, false);


--
-- Name: payment_attempts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payment_attempts_id_seq', 1, false);


--
-- Name: payment_webhook_events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payment_webhook_events_id_seq', 1, false);


--
-- Name: payments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payments_id_seq', 1, false);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.products_id_seq', 1, false);


--
-- Name: user_addresses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_addresses_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: RefreshToken RefreshToken_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."RefreshToken"
    ADD CONSTRAINT "RefreshToken_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: cart_items cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id);


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: inventory_movements inventory_movements_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inventory_movements
    ADD CONSTRAINT inventory_movements_pkey PRIMARY KEY (id);


--
-- Name: order_addresses order_addresses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_addresses
    ADD CONSTRAINT order_addresses_pkey PRIMARY KEY (id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- Name: order_status_history order_status_history_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_status_history
    ADD CONSTRAINT order_status_history_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: payment_attempts payment_attempts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_attempts
    ADD CONSTRAINT payment_attempts_pkey PRIMARY KEY (id);


--
-- Name: payment_webhook_events payment_webhook_events_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_webhook_events
    ADD CONSTRAINT payment_webhook_events_pkey PRIMARY KEY (id);


--
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: user_addresses user_addresses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_addresses
    ADD CONSTRAINT user_addresses_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: RefreshToken_tokenHash_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "RefreshToken_tokenHash_key" ON public."RefreshToken" USING btree ("tokenHash");


--
-- Name: RefreshToken_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "RefreshToken_userId_idx" ON public."RefreshToken" USING btree ("userId");


--
-- Name: cart_items_cart_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cart_items_cart_id_idx ON public.cart_items USING btree (cart_id);


--
-- Name: cart_items_cart_id_product_id_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX cart_items_cart_id_product_id_key ON public.cart_items USING btree (cart_id, product_id);


--
-- Name: cart_items_product_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cart_items_product_id_idx ON public.cart_items USING btree (product_id);


--
-- Name: carts_user_id_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX carts_user_id_key ON public.carts USING btree (user_id);


--
-- Name: categories_name_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX categories_name_key ON public.categories USING btree (name);


--
-- Name: inventory_movements_order_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX inventory_movements_order_id_idx ON public.inventory_movements USING btree (order_id);


--
-- Name: inventory_movements_product_id_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX inventory_movements_product_id_created_at_idx ON public.inventory_movements USING btree (product_id, created_at);


--
-- Name: order_addresses_city_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX order_addresses_city_idx ON public.order_addresses USING btree (city);


--
-- Name: order_addresses_order_id_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX order_addresses_order_id_key ON public.order_addresses USING btree (order_id);


--
-- Name: order_items_order_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX order_items_order_id_idx ON public.order_items USING btree (order_id);


--
-- Name: order_items_product_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX order_items_product_id_idx ON public.order_items USING btree (product_id);


--
-- Name: order_status_history_changed_by_user_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX order_status_history_changed_by_user_id_idx ON public.order_status_history USING btree (changed_by_user_id);


--
-- Name: order_status_history_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX order_status_history_created_at_idx ON public.order_status_history USING btree (created_at);


--
-- Name: order_status_history_order_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX order_status_history_order_id_idx ON public.order_status_history USING btree (order_id);


--
-- Name: orders_public_order_number_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX orders_public_order_number_key ON public.orders USING btree (public_order_number);


--
-- Name: orders_user_id_idempotency_key_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX orders_user_id_idempotency_key_key ON public.orders USING btree (user_id, idempotency_key);


--
-- Name: orders_user_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX orders_user_id_idx ON public.orders USING btree (user_id);


--
-- Name: payment_attempts_payment_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payment_attempts_payment_id_idx ON public.payment_attempts USING btree (payment_id);


--
-- Name: payment_webhook_events_event_type_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payment_webhook_events_event_type_idx ON public.payment_webhook_events USING btree (event_type);


--
-- Name: payment_webhook_events_payment_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payment_webhook_events_payment_id_idx ON public.payment_webhook_events USING btree (payment_id);


--
-- Name: payment_webhook_events_provider_event_id_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX payment_webhook_events_provider_event_id_key ON public.payment_webhook_events USING btree (provider_event_id);


--
-- Name: payment_webhook_events_received_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payment_webhook_events_received_at_idx ON public.payment_webhook_events USING btree (received_at);


--
-- Name: payments_idempotency_key_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX payments_idempotency_key_key ON public.payments USING btree (idempotency_key);


--
-- Name: payments_order_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payments_order_id_idx ON public.payments USING btree (order_id);


--
-- Name: payments_provider_payment_id_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX payments_provider_payment_id_key ON public.payments USING btree (provider_payment_id);


--
-- Name: payments_status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payments_status_idx ON public.payments USING btree (status);


--
-- Name: products_categoryId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "products_categoryId_idx" ON public.products USING btree ("categoryId");


--
-- Name: products_in_stock_reserved_qty_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX products_in_stock_reserved_qty_idx ON public.products USING btree (in_stock, reserved_qty);


--
-- Name: products_is_active_deleted_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX products_is_active_deleted_at_idx ON public.products USING btree (is_active, deleted_at);


--
-- Name: products_sku_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX products_sku_key ON public.products USING btree (sku);


--
-- Name: products_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX products_slug_key ON public.products USING btree (slug);


--
-- Name: user_addresses_user_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_addresses_user_id_idx ON public.user_addresses USING btree (user_id);


--
-- Name: user_addresses_user_id_is_default_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_addresses_user_id_is_default_idx ON public.user_addresses USING btree (user_id, is_default);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: users_googleId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "users_googleId_key" ON public.users USING btree ("googleId");


--
-- Name: users_phone_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX users_phone_key ON public.users USING btree (phone);


--
-- Name: users_vkId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "users_vkId_key" ON public.users USING btree ("vkId");


--
-- Name: users_yandexId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "users_yandexId_key" ON public.users USING btree ("yandexId");


--
-- Name: RefreshToken RefreshToken_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."RefreshToken"
    ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: cart_items cart_items_cart_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.carts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: cart_items cart_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: carts carts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: inventory_movements inventory_movements_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inventory_movements
    ADD CONSTRAINT inventory_movements_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: inventory_movements inventory_movements_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inventory_movements
    ADD CONSTRAINT inventory_movements_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: order_addresses order_addresses_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_addresses
    ADD CONSTRAINT order_addresses_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: order_items order_items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: order_items order_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: order_status_history order_status_history_changed_by_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_status_history
    ADD CONSTRAINT order_status_history_changed_by_user_id_fkey FOREIGN KEY (changed_by_user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: order_status_history order_status_history_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_status_history
    ADD CONSTRAINT order_status_history_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: orders orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: payment_attempts payment_attempts_payment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_attempts
    ADD CONSTRAINT payment_attempts_payment_id_fkey FOREIGN KEY (payment_id) REFERENCES public.payments(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: payment_webhook_events payment_webhook_events_payment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_webhook_events
    ADD CONSTRAINT payment_webhook_events_payment_id_fkey FOREIGN KEY (payment_id) REFERENCES public.payments(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: payments payments_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: products products_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: user_addresses user_addresses_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_addresses
    ADD CONSTRAINT user_addresses_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict qyjSrdbR15eo9R7AllbbQo11UIFu1M6LHOBbdOrBegg4M7g1e1zYz3D1DwuyjRX

