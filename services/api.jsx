import axios from 'axios';
import config from '../config';

export const buscarEnderecoPorCEP = async (cep, setFieldValue) => {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const data = response.data;

        if (!data.erro) {
            setFieldValue('logradouro', data.logradouro || '');
            setFieldValue('complemento', data.complemento || '');
            setFieldValue('bairro', data.bairro || '');
            setFieldValue('uf', data.uf || '');
        }
    } catch (error) {
        console.error('Erro ao buscar endereço por CEP:', error);
    }
};

export const validarCPF = async (cpf) => {
    try {
        const response = await axios.get(`https://api.invertexto.com/v1/validator?token=${config.TOKEN_INVERTEXTO}&value=${cpf}&type=cpf`);
        console.log('Resposta da API:', response.data);
        const isValid = response.data.valid;

        return { isValid, message: isValid ? null : 'CPF inválido' };
    } catch (error) {
        console.error('Erro ao validar CPF:', error);
        return { isValid: false, message: 'Erro ao validar CPF' };
    }
};
