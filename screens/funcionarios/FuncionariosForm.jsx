import { Formik } from 'formik'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import funcionarioValidator from '../../validators/funcionarioValidator'
import Validacao from '../../components/Validacao'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
                label='Matrícula'
                keyboardType='decimal-pad'
                value={values.matricula}
                onChangeText={handleChange('matricula')}
              />
              <Validacao errors={errors.matricula} touched={touched.matricula} />
              <TextInput
                style={{ margin: 10 }}
                mode='outlined'
                label='Cargo'
                value={values.cargo}
                onChangeText={handleChange('cargo')}
              />
              <Validacao errors={errors.cargo} touched={touched.cargo} />
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
                label='Salário'
                value={values.salario}
                onChangeText={handleChange('salario')}
              />
              <Validacao errors={errors.salario} touched={touched.salario} />
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

export default FuncionariosForm