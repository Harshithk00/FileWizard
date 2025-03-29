import { Pool } from "pg";

export const poolAuth = new Pool({ connectionString: process.env.DATABASE_URL });


/*CREATE TABLE files (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    file_name TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
*/