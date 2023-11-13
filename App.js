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
          <Tab.Navigator>
            <Tab.Screen
              name="Carros"
              component={CarrosStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="car" size={26}/>
                ),
              }}
            />
            <Tab.Screen
              name="Clientes"
              component={ClientesStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="human-handsdown" size={26}/>
                ),
              }}
            />
            <Tab.Screen
              name="Funcionários"
              component={FuncionariosStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="face-agent" size={26}/>
                ),
              }}
            />
            <Tab.Screen
              name="Locações"
              component={LocacoesStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="clipboard-outline" size={26}/>
                ),
              }}
            />
            <Tab.Screen
              name="Locadoras"
              component={LocadorasStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="store" size={26}/>
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
