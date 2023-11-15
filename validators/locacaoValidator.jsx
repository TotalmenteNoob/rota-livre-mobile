import * as Yup from 'yup';

const locacaoValidador = Yup.object().shape({
    custo: Yup.number()
        .required('Campo obrigatório')
        .positive('O custo deve ser um valor positivo')
        .max(99999.99, 'O custo não pode exceder 99999.99')
        .typeError('Por favor, insira apenas números no campo de custo.'),
    inicioLocacao: Yup.date()
        .required('Campo obrigatório')
        .transform((value, originalValue) => {
            if (originalValue) {
                const [day, month, year] = originalValue.split('/');
                return new Date(`${year}-${month}-${day}`);
            }
            return value;
        })
        .typeError('Por favor, insira uma data no formato DD/MM/AAAA.'),
    fimLocacao: Yup.date()
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

export default locacaoValidador;
