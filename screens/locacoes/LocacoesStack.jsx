import React from 'react'
import Locacoes from './Locacoes'
import LocacoesForm from './LocacoesForm'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const LocacoesStack = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen name="locacoes" component={Locacoes} options={{ title: "Locacões" }} />
        <Stack.Screen name="locacoes-form" component={LocacoesForm} options={{ title: "Cadastro de locação" }} />
      </Stack.Navigator>
    </>
  )
}

export default LocacoesStack