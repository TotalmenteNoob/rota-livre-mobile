import { Formik } from 'formik'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import clienteValidator from '../../validators/clienteValidator'
import Validacao from '../../components/Validacao'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ClientesForm = ({ navigation, route }) => {

  let cliente = {
    nome: '',
    cpf: '',
    dataNascimento: '',
    email: '',
    telefone: '',
    cep: '',
    logradouro: '',
    complemento: '',
    numero: '',
    bairro: '',
  }

  const id = route.params?.id

  if (id >= 0) {
    cliente = route.params?.cliente
  }

  function salvar(dados) {

    AsyncStorage.getItem('clientes').then(resultado => {

      const clientes = JSON.parse(resultado) || []

      if (id >= 0) {
        clientes.splice(id, 1, dados)
      } else {
        clientes.push(dados)
      }

      AsyncStorage.setItem('clientes', JSON.stringify(clientes))

      navigation.goBack()
    })
  }

  return (
    <>
      <ScrollView style={{ margin: 15 }}>
        <Text>preencha as informações abaixo para cadastrar um novo carro</Text>

        <Formik
          initialValues={cliente}
          validationSchema={clienteValidator}
          onSubmit={values => salvar(values)}
        >
          {({ values, handleChange, handleSubmit, errors, touched }) => (
            <View>
              <TextInput
                style={{ margin: 10 }}
                mode='outlined'
                label='Nome'
                value={values.nome}
                onChangeText={handleChange('nome')}
              />
              <Validacao errors={errors.nome} touched={touched.nome} />
              <TextInput
                style={{ margin: 10 }}
                mode='outlined'
                label='CPF'
                keyboardType='decimal-pad'
                value={values.cpf}
                onChangeText={handleChange('cpf')}
              />
              <Validacao errors={errors.cpf} touched={touched.cpf} />
              <TextInput
                style={{ margin: 10 }}
                mode='outlined'
                label='Data de nascimento'
                keyboardType='decimal-pad'
                value={values.dataNascimento}
                onChangeText={handleChange('dataNascimento')}
              />
              <Validacao errors={errors.dataNascimento} touched={touched.dataNascimento} />
              <TextInput
                style={{ margin: 10 }}
                mode='outlined'
                label='Email'
                value={values.email}
                onChangeText={handleChange('email')}
              />
              <Validacao errors={errors.email} touched={touched.email} />
              <TextInput
                style={{ margin: 10 }}
                mode='outlined'
                label='Telefone'
                keyboardType='decimal-pad'
                value={values.telefone}
                onChangeText={handleChange('telefone')}
              />
              <Validacao errors={errors.telefone} touched={touched.telefone} />
              <TextInput
                style={{ margin: 10 }}
                mode='outlined'
                label='CEP'
                keyboardType='decimal-pad'
                value={values.cep}
                onChangeText={handleChange('cep')}
              />
              <Validacao errors={errors.cep} touched={touched.cep} />
              <TextInput
                style={{ margin: 10 }}
                mode='outlined'
                label='Logradouro'
                value={values.logradouro}
                onChangeText={handleChange('logradouro')}
              />
              <Validacao errors={errors.logradouro} touched={touched.logradouro} />
              <TextInput
                style={{ margin: 10 }}
                mode='outlined'
                label='Complemento'
                value={values.complemento}
                onChangeText={handleChange('complemento')}
              />
              <Validacao errors={errors.complemento} touched={touched.complemento} />
              <TextInput
                style={{ margin: 10 }}
                mode='outlined'
                label='Número'
                value={values.numero}
                onChangeText={handleChange('numero')}
              />
              <Validacao errors={errors.numero} touched={touched.numero} />
              <TextInput
                style={{ margin: 10 }}
                mode='outlined'
                label='Bairro'
                value={values.bairro}
                onChangeText={handleChange('bairro')}
              />
              <Validacao errors={errors.bairro} touched={touched.bairro} />
              <Button onPress={handleSubmit}>Salvar</Button>

            </View>
          )}

        </Formik>
      </ScrollView>
    </>
  )
}

export default ClientesForm