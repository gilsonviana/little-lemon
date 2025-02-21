
import { useSQLiteContext } from 'expo-sqlite';

export const useDB = () => {
  const db = useSQLiteContext();

  async function selectFrom<T>(tableName: string) {
    return await db.getAllAsync<T>(`SELECT * FROM ${tableName}`);
  }

  return {
    db,
    selectFrom
  };
};
