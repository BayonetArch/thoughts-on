 CREATE TABLE IF NOT EXISTS 
    thoughts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    thought TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
