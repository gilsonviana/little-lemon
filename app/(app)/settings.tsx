import {
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native'
import { Text } from '@/components/Text'
import { Button } from '@/components/Button'
import { Avatar, AvatarRef } from '@/components/Avatar'
import { Input } from '@/components/Input'
import Checkbox from 'expo-checkbox'
import { useAuth } from '@/hooks/useAuth'
import { useRef } from 'react'
import { useTheme } from '@/hooks/useTheme'

export default function Settings() {
  const theme = useTheme()
  const { logout } = useAuth()
  const avatarRef = useRef<AvatarRef>(null)

  const onRemoveAvatar = async () => {
    await avatarRef.current?.removeImage()
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={[{ alignItems: 'flex-start' }, theme.spacings.container.md]}
        >
          <View>
            <View>
              <View
                style={[
                  theme.spacings.view.flexHorizontal,
                  theme.spacings.view.gap3,
                  {
                    alignItems: 'center',
                  },
                ]}
              >
                <Avatar ref={avatarRef} storage size="lg" label="Avatar" />
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <Button onPress={onRemoveAvatar} text="Remove" />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.formGroup}>
            <Input autoComplete="off" label="First name" />
          </View>
          <View style={styles.formGroup}>
            <Input autoComplete="off" label="Last name" />
          </View>
          <View style={styles.formGroup}>
            <Input inputMode="email" label="Email" />
          </View>
          <View style={styles.formGroup}>
            <Input inputMode="tel" label="Phone number" />
          </View>
          <View style={styles.formGroup}>
            <Text>Email notifications</Text>
          </View>
          <View style={styles.formGroupCheckBox}>
            <Checkbox />
            <Text>Order status</Text>
          </View>
          <View style={styles.formGroupCheckBox}>
            <Checkbox />
            <Text>Password changes</Text>
          </View>
          <View style={styles.formGroupCheckBox}>
            <Checkbox />
            <Text>Special offers</Text>
          </View>
          <View style={styles.formGroupCheckBox}>
            <Checkbox />
            <Text>Newsletter</Text>
          </View>
          <Button text="Logout" onPress={logout} />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  formGroup: {
    marginBlock: 8,
    width: '100%',
  },
  formGroupCheckBox: {
    marginBlock: 8,
    flexDirection: 'row',
    gap: 8,
  },
})
