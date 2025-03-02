import useSWR from 'swr'
import { useDB } from './useDB'
import { useCallback, useState } from 'react'
import { isEmpty } from 'lodash'

export type MenuItemType = {
  name: string
  price: number
  description: string
  image: string
  category: string
}

type MenuType = {
  menu: MenuItemType[]
}

type Filters = {
  query?: string
  categories?: string[]
}

export const useMenu = () => {
  const [filtereDbMenu, setFilteredDbMenu] = useState<MenuItemType[]>()

  const { db } = useDB()

  const { data, error, isLoading } = useSWR<MenuType>(
    `https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json`,
    null,
    {
      onSuccess: async (data) => {
        setFilteredDbMenu(data.menu)
        try {
          const dbMenu =
            await db.getAllAsync<MenuItemType>('SELECT * FROM menu')

          if (isEmpty(dbMenu)) {
            await db.execAsync('DELETE FROM menu')
            data.menu.forEach(async (item) => {
              await db.runAsync(
                'INSERT INTO menu (name, price, description, image, category) VALUES (?, ?, ?, ?, ?)',
                [
                  item.name,
                  item.price,
                  item.description,
                  item.image,
                  item.category,
                ],
              )
            })
          }
        } catch (error) {
          console.error('Table does not exist', error)
          await db.execAsync(
            'CREATE TABLE IF NOT EXISTS menu (name TEXT, price REAL, description TEXT, image TEXT, category TEXT)',
          )
        }
      },
    },
  )

  const filterMenu = useCallback(
    async (filters: Filters = { query: '', categories: [] }) => {
      try {
        let query = 'SELECT * FROM menu'
        let params: string[] = []

        if (filters?.categories && filters.categories.length > 0) {
          query +=
            ' WHERE category IN (' +
            filters.categories.map(() => '?').join(',') +
            ')'
          params = filters.categories.map((f) => f.toLowerCase())
        }

        if (filters?.query) {
          query +=
            filters.categories && filters.categories.length > 0
              ? ' AND'
              : ' WHERE'
          query += ' (name LIKE ? OR description LIKE ?)'
          params.push(`%${filters.query}%`, `%${filters.query}%`)
        }

        const dbMenu = await db.getAllAsync<MenuItemType>(query, params)
        if (dbMenu) {
          setFilteredDbMenu(dbMenu)
        }
      } catch (error) {
        console.error('Failed to select from menu table', error)
      }
    },
    [db],
  )

  return {
    menu: filtereDbMenu ?? data?.menu,
    isLoading: isLoading,
    hasError: error,
    filterMenu,
  }
}
