import AsyncStorage from '@react-native-async-storage/async-storage';

type StorageKey = string;

export function useAsyncStorage() {
  const storeData = async <T>(key: StorageKey, value: T): Promise<void> => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error storing data:', error);
      throw error;
    }
  };

  const getData = async <T>(key: StorageKey): Promise<T | null> => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error reading data:', error);
      throw error;
    }
  };

  const removeData = async (key: StorageKey): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data:', error);
      throw error;
    }
  };

  const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      console.error('clearAll failed.')
    }
    console.log('clearAll.')
  }

  return {
    storeData,
    getData,
    removeData,
    clearAll,
  };
}
