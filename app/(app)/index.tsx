import { useAuth } from '@/hooks/useAuth';
import { Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function Index() {
  const { logout } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 24 }}>
      <Link push href="./settings">View user</Link>
      <Text
        onPress={() => {
          logout();
        }}>
        Sign Out
      </Text>
    </View>
  );
}
