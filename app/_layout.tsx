import { Slot } from 'expo-router'
import { AuthProvider } from '@/hooks/useAuth'
import { ThemeProvider } from '@/hooks/useTheme'
import { SWRConfig } from 'swr'
import axios from 'axios'
import { SQLiteProvider } from 'expo-sqlite'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export default function Root() {
  return (
    <SQLiteProvider
      databaseName="littleLemon.db"
      onInit={async (db) => {
        await db.execAsync(
          'CREATE TABLE IF NOT EXISTS menu (name TEXT, price REAL, description TEXT, image TEXT, category TEXT)',
        )
      }}
    >
      <ThemeProvider>
        <SWRConfig
          value={{
            fetcher: fetcher,
          }}
        >
          <AuthProvider>
            <Slot />
          </AuthProvider>
        </SWRConfig>
      </ThemeProvider>
    </SQLiteProvider>
  )
}
