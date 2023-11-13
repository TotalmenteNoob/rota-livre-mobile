import React from 'react'
import Funcionarios from './Funcionarios'
import FuncionariosForm from './FuncionariosForm'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const FuncionariosStack = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen name="funcionarios" component={Funcionarios} options={{ title: "Funcionarios" }} />
        <Stack.Screen name="funcionarios-form" component={FuncionariosForm} options={{ title: "Cadastro de carro" }} />
      </Stack.Navigator>
    </>
  )
}

export default FuncionariosStack