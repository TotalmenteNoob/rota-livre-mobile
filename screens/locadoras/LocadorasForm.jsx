import { Formik } from 'formik'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import locadoraValidator from '../../validators/locadoraValidator'
import Validacao from '../../components/Validacao'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Picker } from '@react-native-picker/picker'
import { mask } from 'remask'
import * as ApiService from '../../services/api';

const LocadorasForm = ({ navigation, route }) => {

  const UFs = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  let locadora = {
    email: '',
    telefone: '',
    uf: '',
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
          {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
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
                onChangeText={(value) => { setFieldValue('telefone', mask(value, '(99) 99999-9999')) }}
              />
              <Validacao errors={errors.telefone} touched={touched.telefone} />
              <TextInput
                style={{ margin: 10 }}
                mode='outlined'
                label='CEP'
                keyboardType='decimal-pad'
                value={values.cep}
                onChangeText={(value) => {
                  setFieldValue('cep', mask(value, '99999-999'));
                  if (value.length === 9) {
                    ApiService.buscarEnderecoPorCEP(value, setFieldValue);
                  }
                }}
              />
              <Validacao errors={errors.cep} touched={touched.cep} />
              <Picker
                selectedValue={values.uf}
                onValueChange={handleChange('uf')}>
                <Picker.Item label="Selecione a UF" value="" />
                {UFs.map((uf) => (
                  <Picker.Item key={uf} label={uf} value={uf} />
                ))}
              </Picker>
              <Validacao errors={errors.uf} touched={touched.uf} />
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