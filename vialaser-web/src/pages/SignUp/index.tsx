import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content } from './styles';

import Button from '../../components/Button';
import Input from '../../components/Input';

interface FormRequest {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: FormRequest) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No mínimo 6 digitos'),
          passwordConfirmation: Yup.string().oneOf(
            [Yup.ref('password'), undefined],
            'Confirmação incorreta',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/api/signup', data);

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu logon no GoBarber',
        });
        history.push('/');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Content>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input name="name" type="text" placeholder="Nome" icon={FiUser} />
            <Input
              name="email"
              type="text"
              placeholder="E-mail"
              icon={FiMail}
            />
            <Input
              name="password"
              type="password"
              placeholder="Senha"
              icon={FiLock}
            />

            <Input
              name="passwordConfirmation"
              type="password"
              placeholder="Confirmação de senha"
              icon={FiLock}
            />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
      </Content>
    </Container>
  );
};

export default SignUp;
