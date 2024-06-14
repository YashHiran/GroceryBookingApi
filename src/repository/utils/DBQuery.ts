import { pool } from "./DBconfig";

async function query<T>(sql: string, params: any[] = []): Promise<T[]> {
  const client = await pool.connect();
  try {
    console.log("Executing query:", sql);
    const result = await client.query(sql, params);
    console.log('Result of above query is ', result.rows);
    return result.rows as T[];
  } catch (error) {
    console.error("Error executing query:", sql, error);
    throw error;
  } finally {
    client.release();
  }
}

export default query;
