import { Formik } from 'formik'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import locadoraValidator from '../../validators/locadoraValidator'
import Validacao from '../../components/Validacao'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LocadorasForm = ({ navigation, route }) => {

  let locadora = {
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
    locadora = route.params?.locadora
  }

  function salvar(dados) {

    AsyncStorage.getItem('locadoras').then(resultado => {

      const locadoras = JSON.parse(resultado) || []

      if (id >= 0) {
        locadoras.splice(id, 1, dados)
      } else {
        locadoras.push(dados)
      }

      AsyncStorage.setItem('locadoras', JSON.stringify(locadoras))

      navigation.goBack()
    })
  }

  return (
    <>
      <ScrollView style={{ margin: 15 }}>
        <Text>preencha as informações abaixo para cadastrar um novo carro</Text>

        <Formik
          initialValues={locadora}
          validationSchema={locadoraValidator}
          onSubmit={values => salvar(values)}
        >
          {({ values, handleChange, handleSubmit, errors, touched }) => (
            <View>
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

export default LocadorasForm