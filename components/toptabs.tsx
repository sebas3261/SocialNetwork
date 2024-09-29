import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Posts from './posts';
import Saved from './saved';
import Reels from './reels';

const Tab = createMaterialTopTabNavigator();

export function Toptabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="posts" component={Posts} />
      <Tab.Screen name="reels" component={Reels} />
      <Tab.Screen name="saved" component={Saved} />
    </Tab.Navigator>
  );
}