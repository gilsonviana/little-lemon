import AsyncStorage from '@react-native-async-storage/async-storage'

export function useAsyncStorage() {
  const storeData = async <T>(key: string, value: T): Promise<void> => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (error) {
      console.error('Error storing data:', error)
    }
  }

  const getData = async <T>(key: string): Promise<T | undefined> => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (error) {
      console.error('Error reading data:', error)
    }
  }

  const removeData = async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key)
    } catch (error) {
      console.error('Error removing data:', error)
    }
  }

  const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch (e) {
      console.error('clearAll failed.', e)
    }
  }

  return {
    storeData,
    getData,
    removeData,
    clearAll,
  }
}
