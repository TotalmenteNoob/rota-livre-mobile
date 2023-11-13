import { Formik } from 'formik'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Text, TextInput } from 'react-native-paper'
import funcionarioValidator from '../../validators/funcionarioValidator'

const FuncionariosForm = ({ navigation, route }) => {

  let funcionario = {
    nome: '',
    cpf: '',
    matricula: '',
    cargo: '',
    dataNascimento: '',
    email: '',
    telefone: '',
    salario: '',
    cep: '',
    logradouro: '',
    complemento: '',
    numero: '',
    bairro: '',
  }

  const id = route.params?.id

  if (id >= 0) {
    funcionario = route.params?.funcionario
  }

  function salvar(dados) {

    AsyncStorage.getItem('funcionarios').then(resultado => {

      const funcionarios = JSON.parse(resultado) || []

      if (id >= 0) {
        funcionarios.splice(id, 1, dados)
      } else {
        funcionarios.push(dados)
      }

      AsyncStorage.setItem('funcionarios', JSON.stringify(funcionarios))

      navigation.goBack()
    })
  }

  return (
    <>
      <ScrollView style={{ margin: 15 }}>
        <Text>preencha as informações abaixo para cadastrar um novo carro</Text>

        <Formik
          initialValues={funcionario}
          validationSchema={funcionarioValidator}
          onSubmit={values => salvar(values)}
        >
          {({ values, handleChange, handleSubmit, errors, touched }) => (
            <View>
              <TextInput
                style={{margin:10}}
                mode='outlined'
                label='none'
                onChangeText={handleChange('nome')}
              />
            </View>
          )}

        </Formik>
      </ScrollView>
    </>
  )
}

export default FuncionariosForm