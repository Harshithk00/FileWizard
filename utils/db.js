import { Pool } from "pg";

export const poolAuth = new Pool({ connectionString: process.env.DATABASE_URL });