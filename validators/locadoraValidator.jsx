import * as Yup from 'yup';

const locadoraValidador = Yup.object().shape({
    email: Yup.string()
        .min(3, 'O email deve conter ao menos 3 caracteres')
        .email('Deve ser um email válido')
        .required('Campo obrigatório'),
    telefone: Yup.string()
        .required('Campo obrigatório')
        .typeError('Por favor, insira apenas números no campo de telefone.'),
    cep: Yup.string()
        .required('Campo obrigatório')
        .typeError('Por favor, insira apenas números no campo de CEP.'),
    logradouro: Yup.string()
        .required('Campo obrigatório'),
    complemento: Yup.string(),
    numero: Yup.number()
        .typeError('Por favor, insira apenas números no campo de número.'),
    bairro: Yup.string(),
});

export default locadoraValidador