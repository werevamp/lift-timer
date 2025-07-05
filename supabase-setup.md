# Supabase Database Setup

## Create the workout_rooms table

```sql
-- Create the workout_rooms table
CREATE TABLE workout_rooms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE workout_rooms ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to perform all operations
-- (For demo purposes - you may want to restrict this later)
CREATE POLICY "Public access for workout_rooms" ON workout_rooms
  FOR ALL 
  USING (true)
  WITH CHECK (true);
```

## How to apply these scripts

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the SQL above
4. Click "Run" to execute the scripts

## What this creates

- **workout_rooms** table with:
  - `id`: Auto-generated unique identifier
  - `name`: The name of the workout room
  - `created_at`: Timestamp when the room was created
  
- **Security**: Row Level Security is enabled with a permissive policy allowing public access to create, read, update, and delete workout rooms

## Notes

- The current policy allows anyone with your anon key to perform any operation on workout_rooms
- For production, you may want to add authentication and more restrictive policies
- You can modify the policy later through the Supabase dashboard or SQL editor