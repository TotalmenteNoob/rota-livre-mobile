import { Formik } from 'formik'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import carroValidator from '../../validators/carroValidator'
import Validacao from '../../components/Validacao'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Picker } from '@react-native-picker/picker'
import { mask } from 'remask'

const CarrosForm = ({ navigation, route }) => {

  let carro = {
    marca: '',
    modelo: '',
    quilometragem: '',
    placa: '',
    ano: '',
    tipoCarro: '',
    cor: '',
  }

  const id = route.params?.id

  if (id >= 0) {
    carro = route.params?.carro
  }

  function salvar(dados) {

    AsyncStorage.getItem('carros').then(resultado => {

      const carros = JSON.parse(resultado) || []

      if (id >= 0) {
        carros.splice(id, 1, dados)
      } else {
        carros.push(dados)
      }

      AsyncStorage.setItem('carros', JSON.stringify(carros))

      navigation.goBack()
    })
  }

  return (
    <>
      <ScrollView style={{ margin: 15 }}>
        <Text>preencha as informações abaixo para cadastrar um novo carro</Text>

        <Formik
          initialValues={carro}
          validationSchema={carroValidator}
          onSubmit={values => salvar(values)}
        >
          {({ values, handleChange, handleSubmit, errors, touched }) => (
            <View>
              <TextInput
                style={{ margin: 10 }}
                mode='outlined'
                label='Marca'
                value={values.marca}
                onChangeText={handleChange('marca')}
              />
              <Validacao errors={errors.marca} touched={touched.marca} />
              <TextInput
                style={{ margin: 10 }}
                mode='outlined'
                label='Modelo'
                value={values.modelo}
                onChangeText={handleChange('modelo')}
              />
              <Validacao errors={errors.modelo} touched={touched.modelo} />
              <TextInput
                style={{ margin: 10 }}
                mode='outlined'
                label='Quilometragem'
                keyboardType='decimal-pad'
                value={values.quilometragem}
                onChangeText={handleChange('quilometragem')}
              />
              <Validacao errors={errors.quilometragem} touched={touched.quilometragem} />
              <TextInput
                style={{ margin: 10 }}
                mode='outlined'
                label='Placa'
                value={values.placa}
                onChangeText={handleChange('placa')}
              />
              <Validacao errors={errors.placa} touched={touched.placa} />
              <TextInput
                style={{ margin: 10 }}
                mode='outlined'
                label='Ano'
                keyboardType='decimal-pad'
                value={values.ano}
                onChangeText={handleChange('ano')}
              />
              <Validacao errors={errors.ano} touched={touched.ano} />
              <Picker
                selectedValue={values.tipoCarro}
                onValueChange={handleChange('tipoCarro')}>
                <Picker.Item label="Carroceria" value="" />
                <Picker.Item label="Hatch" value="Hatch" />
                <Picker.Item label="Sedan" value="Sedan" />
                <Picker.Item label="SUV" value="SUV" />
                <Picker.Item label="Picape" value="Picape" />
                <Picker.Item label="Perua" value="Perua" />
                <Picker.Item label="Utilitário" value="Utilitário" />
              </Picker>
              <Validacao errors={errors.tipoCarro} touched={touched.tipoCarro} />
              <TextInput
                style={{ margin: 10 }}
                mode='outlined'
                label='Cor'
                value={values.cor}
                onChangeText={handleChange('cor')}
              />
              <Validacao errors={errors.cor} touched={touched.cor} />

              <Button onPress={handleSubmit}>Salvar</Button>

            </View>
          )}

        </Formik>
      </ScrollView>
    </>
  )
}

export default CarrosForm