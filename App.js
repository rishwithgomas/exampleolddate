import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    checkBiometricAvailability();
  }, []);

  const checkBiometricAvailability = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) {
      console.log('Biometric hardware not available');
    }
  };

  const handleAuthenticate = async () => {
    // Prevent duplicate taps
    if (isAuthenticating) return;

    setIsAuthenticating(true);

    try {
      // Check if hardware is available
      const compatible = await LocalAuthentication.hasHardwareAsync();
      
      if (!compatible) {
        Alert.alert('Error', 'Biometric authentication not supported on this device.');
        setIsAuthenticating(false);
        return;
      }

      // Check if biometrics are enrolled
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      
      if (!enrolled) {
        Alert.alert('Error', 'No biometrics enrolled. Please add a fingerprint or face in Settings.');
        setIsAuthenticating(false);
        return;
      }

      // Perform authentication
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to continue',
        fallbackLabel: 'Use Passcode',
        cancelLabel: 'Cancel',
        disableDeviceFallback: false,
      });

      if (result.success) {
        // Success - update status
        setIsAuthenticated(true);
      } else {
        // Handle different failure types
        if (result.error === 'user_cancel') {
          Alert.alert('Canceled', 'Authentication canceled.');
        } else if (result.error === 'lockout' || result.error === 'lockout_permanent') {
          Alert.alert('Error', 'Biometric hardware unavailable. Try again later.');
        } else {
          Alert.alert('Error', 'Authentication failed.');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
      Alert.alert('Error', 'Biometric hardware unavailable. Try again later.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>
        {isAuthenticated ? 'Authenticated' : 'Not authenticated'}
      </Text>
      
      <TouchableOpacity
        style={[styles.button, isAuthenticating && styles.buttonDisabled]}
        onPress={handleAuthenticate}
        disabled={isAuthenticating}
        accessibilityLabel="Authenticate"
        accessibilityRole="button"
        accessibilityHint="Tap to authenticate using fingerprint or face"
      >
        <Text style={styles.buttonText}>Authenticate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  statusText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonDisabled: {
    backgroundColor: '#A0A0A0',
    elevation: 0,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});