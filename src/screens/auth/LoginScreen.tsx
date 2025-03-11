import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AuthStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';
import { AuthService } from '../../services/auth';
import { RootState } from '../../store';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Login'>;
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleLogin = async () => {
    try {
      dispatch(loginStart());
      const user = await AuthService.login(email, password);
      dispatch(loginSuccess(user));
    } catch (err) {
      dispatch(loginFailure(err instanceof Error ? err.message : 'שגיאה בהתחברות'));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>התחברות</Text>
      
      {error && <Text style={styles.error}>{error}</Text>}
      
      <TextInput
        label="אימייל"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />
      
      <TextInput
        label="סיסמה"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      
      <Button
        mode="contained"
        onPress={handleLogin}
        loading={loading}
        style={styles.button}
      >
        התחבר
      </Button>
      
      <Button
        mode="text"
        onPress={() => navigation.navigate('Register')}
        style={styles.linkButton}
      >
        אין לך חשבון? הירשם כאן
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  linkButton: {
    marginTop: 16,
  },
  error: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
}); 