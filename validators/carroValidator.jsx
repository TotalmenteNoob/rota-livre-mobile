import * as Yup from 'yup';

const carroValidator = Yup.object().shape({
    marca: Yup.string()
        .required('Campo marca é obrigatório'),
    modelo: Yup.string()
        .required('Campo modelo é obrigatório'),
    quilometragem: Yup.number()
        .typeError('Quilometragem deve ser um número')
        .min(0, 'Quilometragem não pode ser negativa')
        .required('Campo quilometragem é obrigatório'),
    placa: Yup.string()
        .matches(
            /^(?:[A-Z]{3}-\d{4}|[A-Z]{3}[0-9][A-Z][0-9]{2})$/,
            'Informe uma placa no formato antigo (AAA-1234) ou no formato Mercosul (AAA1D23)'
        )
        .required('Campo placa é obrigatório'),
    ano: Yup.number()
        .typeError('Ano deve ser um número')
        .positive('Ano deve ser um número positivo')
        .integer('Ano deve ser um número inteiro')
        .max(new Date().getFullYear(), 'Ano não pode ser superior ao ano atual')
        .required('Campo ano é obrigatório'),
    tipoCarro: Yup.string()
        .required('Campo tipoCarro é obrigatório'),
    cor: Yup.string()
        .required('Campo cor é obrigatório'),
});

export default carroValidator;
