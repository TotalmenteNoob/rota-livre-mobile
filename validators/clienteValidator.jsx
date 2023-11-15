import * as Yup from 'yup';

const funcionarioValidador = Yup.object().shape({
    nome: Yup.string()
        .required('Campo obrigatório'),
    cpf: Yup.string()
        .required('Campo obrigatório')
        .typeError('Por favor, insira apenas números no campo de CPF.'),
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
    dataNascimento: Yup.date()
        .required('Campo obrigatório')
        .transform((value, originalValue) => {
            if (originalValue) {
                const [day, month, year] = originalValue.split('/');
                return new Date(`${year}-${month}-${day}`);
            }
            return value;
        })
        .typeError('Por favor, insira uma data no formato DD/MM/AAAA.'),
});

export default funcionarioValidador;