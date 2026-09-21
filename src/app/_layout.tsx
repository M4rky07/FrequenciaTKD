import {
  Tabs,
} from 'expo-router';

import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import {
  Ionicons,
} from '@expo/vector-icons';

export default function RootLayout() {
  const insets =
    useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor: '#111',
          borderTopColor: '#2a2a2a',
          height:
            65 + insets.bottom,
          paddingBottom:
            8 + insets.bottom,
          paddingTop: 8,
        },

        tabBarActiveTintColor:
          '#fff',

        tabBarInactiveTintColor:
          '#777',

        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: 'bold',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Alunos',

          tabBarIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="people-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="chamada"
        options={{
          title: 'Chamada',

          tabBarIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="checkmark-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="historico"
        options={{
          title: 'Histórico',

          tabBarIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="time-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="backup"
        options={{
          title: 'Backup',

          tabBarIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="cloud-upload-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}