-- Create users table (if it doesn’t exist)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE, -- Ensures unique emails
    password VARCHAR(255)
);

-- Drop the procedure first to avoid duplicate function errors
DROP PROCEDURE IF EXISTS insert_users;

-- Insert Procedure
CREATE PROCEDURE insert_users(
    p_name VARCHAR,
    p_email VARCHAR,
    p_password VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO users (name, email, password)
    VALUES (p_name, p_email, p_password);

    RAISE NOTICE 'User inserted successfully!';
END;
$$;

-- Calling Insert Procedure (Now with Unique Emails)
CALL insert_users('John Doe', 'johndoe1@example.com', 'password123');
CALL insert_users('Jane Doe', 'janedoe@example.com', 'securepass456');
CALL insert_users('Alice Smith', 'alice@example.com', 'letmein789');
CALL insert_users('Bob Johnson', 'bob@example.com', 'strongpass999');