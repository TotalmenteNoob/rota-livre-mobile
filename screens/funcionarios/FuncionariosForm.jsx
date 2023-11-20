import { Formik } from 'formik';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import funcionarioValidator from '../../validators/funcionarioValidator';
import Validacao from '../../components/Validacao';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { mask } from 'remask';
import * as ApiService from '../../services/api';

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

  const [cpfValidationStatus, setCPFValidationStatus] = useState(null);


  return (
    <>
      <ScrollView style={{ margin: 15 }}>
        <Text>preencha as informações abaixo para cadastrar um novo funcionário</Text>

        <Formik
          initialValues={funcionario}
          validationSchema={funcionarioValidator}
          onSubmit={values => salvar(values)}
        >
          {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
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
                onChangeText={async (value) => {
                  setFieldValue('cpf', mask(value, '999.999.999-99'));
                  if (value.length === 14) {
                    const { isValid, message } = await ApiService.validarCPF(value);
                    if (!isValid) {
                      setCPFValidationStatus(message);
                    } else {
                      setCPFValidationStatus(null);
                    }
                  }
                }}
              />
              <Validacao errors={cpfValidationStatus ? [cpfValidationStatus] : []} touched={{ cpf: touched.cpf }} />
              <TextInput
                style={{ margin: 10 }}
                mode='outlined'
                label='Matrícula'
                keyboardType='decimal-pad'
                value={values.matricula}
                onChangeText={handleChange('matricula')}
              />
              <Validacao errors={errors.matricula} touched={touched.matricula} />
              <Picker
                selectedValue={values.cargo}
                onValueChange={handleChange('cargo')}>
                <Picker.Item label="Cargo" value="" />
                <Picker.Item label="Gerente" value="Gerente" />
                <Picker.Item label="Atendente" value="Atendente" />
                <Picker.Item label="Motorista" value="Motorista" />
              </Picker>
              <Validacao errors={errors.cargo} touched={touched.cargo} />
              <TextInput
                style={{ margin: 10 }}
                mode='outlined'
                label='Data de nascimento'
                value={values.dataNascimento}
                onChangeText={(value) => { setFieldValue('dataNascimento', mask(value, '99/99/9999')) }}
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
                onChangeText={(value) => { setFieldValue('telefone', mask(value, '(99) 99999-9999')) }}
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
                onChangeText={(value) => {
                  setFieldValue('cep', mask(value, '99999-999'));
                  if (value.length === 9) {
                    ApiService.buscarEnderecoPorCEP(value, setFieldValue);
                  }
                }}
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