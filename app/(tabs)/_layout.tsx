import { Tabs } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return <Tabs>
      <Tabs.Screen
        name='search'
        options={{
          headerShown: false,
          tabBarIcon: () => <Ionicons name="search" size={24} color="black" />,
          tabBarLabel: 'Buscar usuário'
        }}
        />
        <Tabs.Screen
        name='users/index'
        options={{
          headerShown: false,
          tabBarIcon: () => <Feather name="list" size={24} color="black" />,
          tabBarLabel: 'Usuários recentes'
        }}
        />
        <Tabs.Screen
        name='user/[username]'
        options={{headerShown: false, href: null}}
        />
    </Tabs>;
}
