import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AuthStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';
import { AuthService } from '../../services/auth';
import { RootState } from '../../store';

type RegisterScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Register'>;
};

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'שם פרטי הוא שדה חובה';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'שם משפחה הוא שדה חובה';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'אימייל הוא שדה חובה';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'כתובת אימייל לא תקינה';
    }
    if (!formData.password) {
      newErrors.password = 'סיסמה היא שדה חובה';
    } else if (formData.password.length < 6) {
      newErrors.password = 'הסיסמה חייבת להכיל לפחות 6 תווים';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'הסיסמאות אינן תואמות';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      dispatch(loginStart());
      const user = await AuthService.register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      dispatch(loginSuccess(user));
    } catch (err) {
      dispatch(loginFailure(err instanceof Error ? err.message : 'שגיאה בהרשמה'));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>הרשמה</Text>

      <TextInput
        label="שם פרטי"
        value={formData.firstName}
        onChangeText={(text) => setFormData({ ...formData, firstName: text })}
        style={styles.input}
        error={!!errors.firstName}
      />
      {errors.firstName && <Text style={styles.error}>{errors.firstName}</Text>}

      <TextInput
        label="שם משפחה"
        value={formData.lastName}
        onChangeText={(text) => setFormData({ ...formData, lastName: text })}
        style={styles.input}
        error={!!errors.lastName}
      />
      {errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}

      <TextInput
        label="אימייל"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        error={!!errors.email}
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <TextInput
        label="סיסמה"
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        style={styles.input}
        secureTextEntry
        error={!!errors.password}
      />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}

      <TextInput
        label="אימות סיסמה"
        value={formData.confirmPassword}
        onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
        style={styles.input}
        secureTextEntry
        error={!!errors.confirmPassword}
      />
      {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}

      <Button
        mode="contained"
        onPress={handleRegister}
        loading={loading}
        style={styles.button}
      >
        הירשם
      </Button>

      <Button
        mode="text"
        onPress={() => navigation.navigate('Login')}
        style={styles.linkButton}
      >
        כבר יש לך חשבון? התחבר כאן
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    marginBottom: 8,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
    marginTop: -4,
  },
  button: {
    marginTop: 16,
  },
  linkButton: {
    marginTop: 8,
  },
}); 