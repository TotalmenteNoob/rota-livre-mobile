import { Formik } from 'formik'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import locacaoValidator from '../../validators/locacaoValidator'
import Validacao from '../../components/Validacao'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { mask } from 'remask'

const LocacoesForm = ({ navigation, route }) => {

  let locacao = {
    custo: '',
    inicioLocacao: '',
    fimLocacao: '',
  }

  const id = route.params?.id

  if (id >= 0) {
    locacao = route.params?.locacao
  }

  function salvar(dados) {

    AsyncStorage.getItem('locacoes').then(resultado => {

      const locacoes = JSON.parse(resultado) || []

      if (id >= 0) {
        locacoes.splice(id, 1, dados)
      } else {
        locacoes.push(dados)
      }

      AsyncStorage.setItem('locacoes', JSON.stringify(locacoes))

      navigation.goBack()
    })
  }

  return (
    <>
      <ScrollView style={{ margin: 15 }}>
        <Text>preencha as informações abaixo para cadastrar um novo carro</Text>

        <Formik
          initialValues={locacao}
          validationSchema={locacaoValidator}
          onSubmit={values => salvar(values)}
        >
          {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
            <View>
              <TextInput
                style={{ margin: 10 }}
                mode='outlined'
                label='Custo'
                value={values.custo}
                onChangeText={(value) => { setFieldValue('custo', mask(value, '99999.99')) }}
              />
              <Validacao errors={errors.custo} touched={touched.custo} />
              <TextInput
                style={{ margin: 10 }}
                mode='outlined'
                label='Início da locação'
                keyboardType='decimal-pad'
                value={values.inicioLocacao}
                onChangeText={(value) => { setFieldValue('inicioLocacao', mask(value, '99/99/9999')) }}
              />
              <Validacao errors={errors.inicioLocacao} touched={touched.inicioLocacao} />
              <TextInput
                style={{ margin: 10 }}
                mode='outlined'
                label='Fim da locação'
                keyboardType='decimal-pad'
                value={values.fimLocacao}
                onChangeText={(value) => { setFieldValue('fimLocacao', mask(value, '99/99/9999')) }}
              />
              <Validacao errors={errors.fimLocacao} touched={touched.fimLocacao} />

              <Button onPress={handleSubmit}>Salvar</Button>

            </View>
          )}

        </Formik>
      </ScrollView>
    </>
  )
}

export default LocacoesForm