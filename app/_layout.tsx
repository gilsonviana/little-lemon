import { Slot } from "expo-router";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "@/hooks/useTheme";
import { SWRConfig } from "swr";
import axios from "axios";
import { SQLiteProvider } from "expo-sqlite";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Root() {
  return (
    <SQLiteProvider databaseName="littleLemon.db">
      <ThemeProvider>
        <SWRConfig
          value={{
            refreshInterval: 3000,
            fetcher: fetcher,
          }}
        >
          <AuthProvider>
            <Slot />
          </AuthProvider>
        </SWRConfig>
      </ThemeProvider>
    </SQLiteProvider>
  );
}
