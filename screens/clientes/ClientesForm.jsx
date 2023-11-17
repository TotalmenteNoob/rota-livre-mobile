import { Formik } from 'formik'
import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import clienteValidator from '../../validators/clienteValidator'
import Validacao from '../../components/Validacao'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { mask } from 'remask'
import axios from 'axios'
import config from '../../config'

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

  const buscarEnderecoPorCEP = async (cep, setFieldValue) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;

      if (!data.erro) {
        // Preencher os campos de endereço com os dados obtidos
        setFieldValue('logradouro', data.logradouro || '');
        setFieldValue('complemento', data.complemento || '');
        setFieldValue('bairro', data.bairro || '');
        setFieldValue('uf', data.uf || '');
      }
    } catch (error) {
      console.error('Erro ao buscar endereço por CEP:', error);
    }
  };

  const [cpfValidationStatus, setCPFValidationStatus] = useState(null);

  const validarCPF = async (cpf) => {
    try {
      const response = await axios.get(`https://api.invertexto.com/v1/validator?token=${config.TOKEN_INVERTEXTO}&value=${cpf}&type=cpf`);
      console.log('Resposta da API:', response.data);
      const isValid = response.data.valid;

      setCPFValidationStatus(isValid ? null : 'CPF inválido');

      return isValid;
    } catch (error) {
      console.error('Erro ao validar CPF:', error);
      setCPFValidationStatus('Erro ao validar CPF');
      return false;
    }
  };


  return (
    <>
      <ScrollView style={{ margin: 15 }}>
        <Text>preencha as informações abaixo para cadastrar um novo carro</Text>

        <Formik
          initialValues={cliente}
          validationSchema={clienteValidator}
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
                    const cpfValido = await validarCPF(value);
                    if (!cpfValido) {
                    }
                  }
                }}
              />
              {/* Exibe a mensagem de erro do CPF no componente Validacao */}
              <Validacao errors={cpfValidationStatus ? [cpfValidationStatus] : []} touched={{ cpf: touched.cpf }} />
              <TextInput
                style={{ margin: 10 }}
                mode='outlined'
                label='Data de nascimento'
                keyboardType='decimal-pad'
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
                label='CEP'
                keyboardType='decimal-pad'
                value={values.cep}
                onChangeText={(value) => {
                  setFieldValue('cep', mask(value, '99999-999'));
                  if (value.length === 9) {
                    // Passar setFieldValue para a função buscarEnderecoPorCEP
                    buscarEnderecoPorCEP(value, setFieldValue);
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

export default ClientesForm