import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CarrosStack from './screens/carros/CarrosStack';
import ClientesStack from './screens/clientes/ClientesStack';
import FuncionariosStack from './screens/funcionarios/FuncionariosStack';
import LocacoesStack from './screens/locacoes/LocacoesStack';
import LocadorasStack from './screens/locadoras/LocadorasStack';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <>
      <PaperProvider>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Home"
            activeColor="#FF5733"
            inactiveColor="white"
            barStyle={{ backgroundColor: '#2ECC71' }}
          >
            <Tab.Screen
              name="Carros"
              component={CarrosStack}
              options={{
                tabBarIcon: ({ focused }) => (
                  <MaterialCommunityIcons name="car" color={focused ? "#FF5733" : "white"} size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="Clientes"
              component={ClientesStack}
              options={{
                tabBarIcon: ({ focused }) => (
                  <MaterialCommunityIcons name="human-handsdown" color={focused ? "#FF5733" : "white"} size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="Funcionários"
              component={FuncionariosStack}
              options={{
                tabBarIcon: ({ focused }) => (
                  <MaterialCommunityIcons name="face-agent" color={focused ? "#FF5733" : "white"} size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="Locações"
              component={LocacoesStack}
              options={{
                tabBarIcon: ({ focused }) => (
                  <MaterialCommunityIcons name="clipboard-outline" color={focused ? "#FF5733" : "white"} size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="Locadoras"
              component={LocadorasStack}
              options={{
                tabBarIcon: ({ focused }) => (
                  <MaterialCommunityIcons name="store" color={focused ? "#FF5733" : "white"} size={26} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
