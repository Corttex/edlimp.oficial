-- Script para Zerar e Configurar Banco de Dados ED Limp
-- Execute este script no SQL Editor do Supabase

-- 0. Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Limpeza de Dados Existentes (Remove tabelas se existirem para um reset total)
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS schedule_events CASCADE;
DROP TABLE IF EXISTS finance_transactions CASCADE;
DROP TABLE IF EXISTS inventory_items CASCADE;
DROP TABLE IF EXISTS quick_notes CASCADE;
DROP TABLE IF EXISTS clients CASCADE;

-- 2. Criação das Tabelas

-- Tabela de Perfis de Usuário / Acesso por PIN
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'dnei',
    pin TEXT NOT NULL UNIQUE,
    permissions JSONB DEFAULT '["dashboard", "schedule", "inventory", "finance", "quote", "os", "clients", "notes", "marketing", "settings"]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir usuário mestre inicial com o PIN seguro do administrador
INSERT INTO profiles (name, role, pin, permissions)
VALUES (
    'Administrador ED Limp',
    'dnei',
    '220022',
    '["dashboard", "schedule", "inventory", "finance", "quote", "os", "clients", "notes", "marketing", "settings"]'::jsonb
) ON CONFLICT (pin) DO NOTHING;


-- Tabela de Clientes
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    address TEXT,
    cpf TEXT,
    category TEXT DEFAULT 'Padrão',
    status TEXT DEFAULT 'Ativo',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Estoque / Insumos
CREATE TABLE inventory_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category TEXT,
    quantity INTEGER DEFAULT 0,
    min_quantity INTEGER DEFAULT 5,
    unit TEXT DEFAULT 'un',
    price DECIMAL(10,2) DEFAULT 0.00,
    last_restock DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Transações Financeiras
CREATE TABLE finance_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    description TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    type TEXT CHECK (type IN ('income', 'expense')),
    category TEXT,
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Agenda de Serviços
CREATE TABLE schedule_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE,
    location TEXT,
    status TEXT DEFAULT 'Agendado',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Notas e Lembretes
CREATE TABLE quick_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT,
    category TEXT DEFAULT 'Geral',
    archived BOOLEAN DEFAULT FALSE,
    date TEXT DEFAULT TO_CHAR(NOW(), 'DD/MM/YYYY'),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Comentários para documentação (Opcional)
COMMENT ON TABLE clients IS 'Base de clientes e leads da ED Limp';
COMMENT ON TABLE inventory_items IS 'Controle de insumos e patrimônio';
COMMENT ON TABLE schedule_events IS 'Agenda de serviços de limpeza e impermeabilização';

