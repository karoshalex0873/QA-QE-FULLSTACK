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




-- Update  Procedure


-- Drop the procedure first to avoid duplicate function errors
DROP PROCEDURE IF EXISTS update_users;
-- Update Procedure
CREATE PROCEDURE update_users(
    p_id INTEGER,
    p_name VARCHAR,
    p_email VARCHAR,
    p_password VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE users
    SET name = p_name, 
        email = p_email, 
        password = p_password
    WHERE id = p_id;

    RAISE NOTICE 'User updated successfully!';
END;
$$;

-- Calling Update Procedure  (updates)
CALL update_users(2, 'Jane Doe', 'janedoe@Update.com', 'passwordUpdate');



-- Delete Procedure 


-- Drop the procedure first to avoid duplicate function errors
DROP PROCEDURE IF EXISTS delete_users;
-- Delete Procedure
CREATE PROCEDURE delete_users(
  p_id INTEGER
)
  LANGUAGE plpgsql
AS $$
BEGIN
  DELETE FROM users WHERE id = p_id;

  RAISE NOTICE 'User deleted successfully!';
END;
$$;

-- Calling Delete Procedure (deletes)
CALL delete_users(4);



-- Reading Procedure for all user

-- Drop the procedure if it exists
DROP PROCEDURE IF EXISTS read_all_users;
CREATE PROCEDURE read_all_users()
LANGUAGE plpgsql
AS $$
DECLARE
    user_record RECORD;
BEGIN
    FOR user_record IN (SELECT * FROM users) 
    LOOP
        RAISE NOTICE 'ID: %, Name: %, Email: %', 
            user_record.id, user_record.name, user_record.email;
    END LOOP;
END;
$$;
-- Call the procedure 
CALL read_all_users();


-- Get and Update 


-- Drop the procedure if it exists
DROP PROCEDURE IF EXISTS update_and_get_user;

-- Create the procedure that updates a user and logs the updated data
CREATE PROCEDURE update_and_get_user(
    p_id INTEGER,
    p_name VARCHAR,
    p_email VARCHAR,
    p_password VARCHAR
)
LANGUAGE plpgsql
AS $$
DECLARE
    user_record RECORD;
BEGIN
    -- Update the user
    UPDATE users
    SET name = p_name,
        email = p_email,
        password = p_password
    WHERE id = p_id;

    -- Check if update was successful
    IF FOUND THEN
        RAISE NOTICE 'User updated successfully!';
    ELSE
        RAISE NOTICE 'User not found!';
        RETURN;
    END IF;

    -- Fetch and log the updated user
    FOR user_record IN (SELECT * FROM users WHERE id = p_id)
    LOOP
        RAISE NOTICE 'Updated User: ID: %, Name: %, Email: %, Password: %',
            user_record.id, user_record.name, user_record.email, user_record.password;
    END LOOP;
END;
$$;

-- Call the procedure to update and log
CALL update_and_get_user(4, 'Updated Name', 'updated@example.com', 'password123');


