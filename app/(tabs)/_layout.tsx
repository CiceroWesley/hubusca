import { Tabs } from 'expo-router';

export default function Layout() {
  return <Tabs>
      <Tabs.Screen
        name='search'
        options={{headerShown: false}}
        />
        <Tabs.Screen
        name='users/index'
        options={{headerShown: false}}
        />
        <Tabs.Screen
        name='user/[username]'
        options={{headerShown: false, href: null}}
        />
    </Tabs>;
}
