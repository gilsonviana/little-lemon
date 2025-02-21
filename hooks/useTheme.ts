import { useColorScheme } from '@/hooks/useColorScheme'
import { Colors } from '@/constants/Colors'

export const useTheme = () => {
  const colorScheme = useColorScheme()
  return Colors[colorScheme ?? 'light']
}