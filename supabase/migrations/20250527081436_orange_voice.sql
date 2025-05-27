/*
  # Initial Schema Setup for Nigerian Author Publishing Platform

  1. New Tables
    - `users`
      - `id` (uuid, primary key): User's unique identifier
      - `email` (text): User's email address
      - `full_name` (text): User's full name
      - `avatar_url` (text): URL to user's avatar image
      - `bio` (text): User's biography
      - `role` (text): User's role (author, editor, admin)
      - `created_at` (timestamptz): Account creation timestamp
      - `updated_at` (timestamptz): Last update timestamp

    - `manuscripts`
      - `id` (uuid, primary key): Manuscript's unique identifier
      - `title` (text): Manuscript title
      - `description` (text): Manuscript description
      - `author_id` (uuid): Reference to users table
      - `status` (text): Current status (editing, design, review, published)
      - `version` (text): Current version number
      - `word_count` (integer): Total word count
      - `page_count` (integer): Total page count
      - `cover_image_url` (text): URL to cover image
      - `file_url` (text): URL to manuscript file
      - `created_at` (timestamptz): Upload timestamp
      - `updated_at` (timestamptz): Last update timestamp

    - `manuscript_versions`
      - `id` (uuid, primary key): Version's unique identifier
      - `manuscript_id` (uuid): Reference to manuscripts table
      - `version_number` (text): Version number
      - `file_url` (text): URL to version file
      - `changes` (text): Description of changes
      - `created_at` (timestamptz): Version creation timestamp

    - `comments`
      - `id` (uuid, primary key): Comment's unique identifier
      - `manuscript_id` (uuid): Reference to manuscripts table
      - `user_id` (uuid): Reference to users table
      - `text` (text): Comment content
      - `created_at` (timestamptz): Comment timestamp

    - `format_checks`
      - `id` (uuid, primary key): Check's unique identifier
      - `manuscript_id` (uuid): Reference to manuscripts table
      - `check_name` (text): Name of the check
      - `status` (text): Status (pass, warning, error)
      - `message` (text): Result message
      - `details` (text[]): Additional details
      - `created_at` (timestamptz): Check timestamp

  2. Security
    - Enable RLS on all tables
    - Add policies for data access based on user roles
    - Secure file access and storage

  3. Changes
    - Initial schema creation
    - Setup RLS policies
    - Create necessary indexes
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  avatar_url text,
  bio text,
  role text NOT NULL DEFAULT 'author',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create manuscripts table
CREATE TABLE IF NOT EXISTS manuscripts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  author_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  status text NOT NULL DEFAULT 'editing',
  version text NOT NULL DEFAULT '1.0',
  word_count integer,
  page_count integer,
  cover_image_url text,
  file_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create manuscript_versions table
CREATE TABLE IF NOT EXISTS manuscript_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  manuscript_id uuid REFERENCES manuscripts(id) ON DELETE CASCADE NOT NULL,
  version_number text NOT NULL,
  file_url text NOT NULL,
  changes text,
  created_at timestamptz DEFAULT now()
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  manuscript_id uuid REFERENCES manuscripts(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  text text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create format_checks table
CREATE TABLE IF NOT EXISTS format_checks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  manuscript_id uuid REFERENCES manuscripts(id) ON DELETE CASCADE NOT NULL,
  check_name text NOT NULL,
  status text NOT NULL,
  message text NOT NULL,
  details text[],
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE manuscripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE manuscript_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE format_checks ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create policies for manuscripts table
CREATE POLICY "Authors can CRUD own manuscripts"
  ON manuscripts
  FOR ALL
  TO authenticated
  USING (auth.uid() = author_id);

CREATE POLICY "Editors and admins can read all manuscripts"
  ON manuscripts
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND (users.role = 'editor' OR users.role = 'admin')
    )
  );

-- Create policies for manuscript_versions table
CREATE POLICY "Authors can CRUD own manuscript versions"
  ON manuscript_versions
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM manuscripts
      WHERE manuscripts.id = manuscript_versions.manuscript_id
      AND manuscripts.author_id = auth.uid()
    )
  );

-- Create policies for comments table
CREATE POLICY "Users can read comments on accessible manuscripts"
  ON comments
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM manuscripts
      WHERE manuscripts.id = comments.manuscript_id
      AND (
        manuscripts.author_id = auth.uid()
        OR EXISTS (
          SELECT 1 FROM users
          WHERE users.id = auth.uid()
          AND (users.role = 'editor' OR users.role = 'admin')
        )
      )
    )
  );

CREATE POLICY "Users can create comments on accessible manuscripts"
  ON comments
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM manuscripts
      WHERE manuscripts.id = manuscript_id
      AND (
        manuscripts.author_id = auth.uid()
        OR EXISTS (
          SELECT 1 FROM users
          WHERE users.id = auth.uid()
          AND (users.role = 'editor' OR users.role = 'admin')
        )
      )
    )
  );

-- Create policies for format_checks table
CREATE POLICY "Users can read format checks on accessible manuscripts"
  ON format_checks
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM manuscripts
      WHERE manuscripts.id = format_checks.manuscript_id
      AND (
        manuscripts.author_id = auth.uid()
        OR EXISTS (
          SELECT 1 FROM users
          WHERE users.id = auth.uid()
          AND (users.role = 'editor' OR users.role = 'admin')
        )
      )
    )
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS manuscripts_author_id_idx ON manuscripts(author_id);
CREATE INDEX IF NOT EXISTS manuscript_versions_manuscript_id_idx ON manuscript_versions(manuscript_id);
CREATE INDEX IF NOT EXISTS comments_manuscript_id_idx ON comments(manuscript_id);
CREATE INDEX IF NOT EXISTS comments_user_id_idx ON comments(user_id);
CREATE INDEX IF NOT EXISTS format_checks_manuscript_id_idx ON format_checks(manuscript_id);