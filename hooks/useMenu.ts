import useSWR from "swr";
import { useDB } from "./useDB";
import { useEffect, useState } from "react";
import { conditionalKey } from "@/utils/conditionalKey";
import { isArray } from "lodash";

export type MenuItemType = {
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

type MenuType = {
  menu: MenuItemType[];
};

type Filters = {
  query?: string;
  categories?: string[];
};

export const useMenu = (filters?: Filters) => {
  const [isReady, setIsReady] = useState(false)
  const [storedMenu, setStoredMenu] = useState<MenuItemType[]>();
  const { db, selectFrom } = useDB();

  useEffect(() => {
    const attemptLoadFromDb = async () => {
      try {
        const dbMenu = await selectFrom<MenuItemType>("menu");
        if (dbMenu) {
          setStoredMenu(dbMenu);
        }
      } catch (error) {
        console.error('Failed to select from menu table')
      } finally {
        setIsReady(true)
      }
    };
    attemptLoadFromDb();
  }, []);

  const { data, error, isLoading } = useSWR<MenuType>(
    conditionalKey(
      !isArray(storedMenu) && isReady,
      `https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json`
    ),
    null,
    {
      onSuccess: async (data) => {
        setIsReady(false)
        await db.execAsync(
          "CREATE TABLE IF NOT EXISTS menu (name TEXT, price REAL, description TEXT, image TEXT, category TEXT)"
        );
        await db.execAsync("DELETE FROM menu");
        data.menu.forEach(async (item) => {
          await db.runAsync(
            "INSERT INTO menu (name, price, description, image, category) VALUES (?, ?, ?, ?, ?)",
            [item.name, item.price, item.description, item.image, item.category]
          );
        });
        setIsReady(true)
      },
    }
  );

  return {
    menu: storedMenu ?? data?.menu,
    isReady,
    isLoading: isLoading,
    hasError: error,
  };
};
