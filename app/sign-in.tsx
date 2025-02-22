import { useMemo, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { router } from 'expo-router'
import {
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Platform,
} from 'react-native'
import { Input } from '@/components/Input'
import { useTheme } from '@/hooks/useTheme'
import { isEmpty } from 'lodash'
import { Button } from '@/components/Button'
import { Text } from '@/components/Text'

export default function SignUp() {
  const { login } = useAuth()
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const theme = useTheme()

  const isFormValid = useMemo(
    () => !isEmpty(password) && !isEmpty(email),
    [email, password],
  )

  const handleSignUp = async () => {
    await login({ email, password })
    router.replace('/')
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ ...theme.spacings.container.md }}>
        <View style={[theme.spacings.view.mb4]}>
          <Text variant="display">Welcome</Text>
          <Text variant="subheading">
            Please, sign up to have full access to our app.
          </Text>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <Input
            label="Email"
            placeholder="joe@doe.com"
            value={email}
            onChangeText={setEmail}
            containerStyle={[theme.spacings.view.mb3]}
          />
          <Input
            secureTextEntry
            label="Create password"
            value={password}
            onChangeText={setPassword}
            containerStyle={[theme.spacings.view.mb4]}
          />
          <Button
            disabled={!isFormValid}
            text="Sign Up"
            onPress={handleSignUp}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}
