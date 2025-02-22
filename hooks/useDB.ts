import { useSQLiteContext } from 'expo-sqlite'

export const useDB = () => {
  const db = useSQLiteContext()

  return {
    db,
  }
}
