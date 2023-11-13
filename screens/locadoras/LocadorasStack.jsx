import React from 'react'
import Locadoras from './Locadoras'
import LocadorasForm from './LocadorasForm'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const LocadorasStack = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen name="locadoras" component={Locadoras} options={{ title: "Locadoras" }} />
        <Stack.Screen name="locadoras-form" component={LocadorasForm} options={{ title: "Cadastro de carro" }} />
      </Stack.Navigator>
    </>
  )
}

export default LocadorasStack