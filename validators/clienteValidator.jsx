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
    dataNascimento: Yup.string()
        .required('Campo obrigatório')
        .test('idade', 'O cliente deve ter ao menos 18 anos.', function (value) {
            const today = new Date();
            const [day, month, year] = value.split("/");
            const birthDate = new Date(year, month - 1, day);
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age >= 18;
        })
});

export default funcionarioValidador;