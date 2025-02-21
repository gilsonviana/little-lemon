import { KeyboardAvoidingView, SafeAreaView, View, StyleSheet, ScrollView } from "react-native";
import { Text } from "@/components/Text";
import { Button } from "@/components/Button";
import { Avatar } from "@/components/Avatar";
import { Input } from "@/components/Input";
import Checkbox from 'expo-checkbox';
import { useAuth } from "@/hooks/useAuth";

export default function Settings() {
  const { logout } = useAuth();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1, padding: 16, gap: 16 }}>
        <ScrollView contentContainerStyle={{ alignItems: 'flex-start' }}>
          <View>
            <Text>Personal information</Text>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 24 }}>
                <Avatar label="Avatar" />
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <Button text="Change" />
                  <Button text="Remove" />
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
        </ScrollView>
        <Button text="Logout" onPress={logout} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  formGroup: {
    marginBlock: 8,
    width: '100%'
  },
  formGroupCheckBox: {
    marginBlock: 8,
    flexDirection: 'row',
    gap: 8
  }
})