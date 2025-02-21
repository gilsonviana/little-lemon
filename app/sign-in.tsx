import { useAuth } from '@/hooks/useAuth';
import { router } from 'expo-router';
import { Text, View } from 'react-native';



export default function SignIn() {
  const { login } = useAuth()
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        onPress={() => {
          login();
          router.replace('/');
        }}>
        Sign In
      </Text>
    </View>
  );
}
