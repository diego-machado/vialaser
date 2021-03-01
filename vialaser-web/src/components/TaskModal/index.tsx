import React, {
  useRef,
  useState,
  useCallback,
} from 'react';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Container, Center, ModalContainer } from './styles';

import { IconBaseProps } from 'react-icons';

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Input from '../Input';
import Button from '../Button';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface TaskProps {
  task?: Task;
  onSuccess(): void;
  icon?: React.ComponentType<IconBaseProps>;
}

interface FormRequest {
  title: string;
  description: string;
}

interface Task {
  id?: string;
  title: string;
  description: string;
  done: boolean;
  createdAt: Date;
  accountId: string;
}

const TaskModal: React.FC<TaskProps> = ({
  task,
  onSuccess,
  icon: Icon,
  ...rest
}) => {
  const formRef = useRef<FormHandles>(null);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const { addToast } = useToast();

  const handleSubmit = useCallback(async (data: FormRequest) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        title: Yup.string().required('Título obrigatório'),
        description: Yup.string().required('Descrição obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (task && task.id) {
        api.put<Task>('/api/task', {
          id: task.id,
          title: data.title,
          description: data.description,
          done: false,
          createdAt: new Date(),
          accountId: user.id
        }).then(() => {
          addToast({
            type: 'success',
            title: 'Editada com sucesso',
            description: 'Sua tarefa foi editada com sucesso',
          });

        }).catch(() => {
          addToast({
            type: 'error',
            title: 'Erro ao cadastrar',
            description: 'Ocorreu um erro ao cadastrar a tarefa.',
          });
        })
      } else {
        api.post<Task>('/api/task', {
          title: data.title,
          description: data.description,
          done: false,
          createdAt: new Date(),
          accountId: user.id
        }).then(() => {
          addToast({
            type: 'success',
            title: 'Salvo com sucesso',
            description: 'Sua tarefa foi salva com sucesso',
          });

        }).catch(() => {
          addToast({
            type: 'error',
            title: 'Erro ao cadastrar',
            description: 'Ocorreu um erro ao cadastrar a tarefa.',
          });
        })
      }

      onSuccess()
      onCloseModal()

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);

        formRef.current?.setErrors(errors);
        return;
      }

      addToast({
        type: 'error',
        title: 'Erro na autenticação',
        description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
      });
    }
  }, [])

  return (
    <ModalContainer>
      <span onClick={onOpenModal}>
        {Icon && <Icon size={task?.id ? 10 : 50 } />}
        { !task?.id && <h1>Tarefas</h1> }
      </span>
      <Modal open={open} onClose={onCloseModal} center>
        <Container>
          <Form ref={formRef} onSubmit={handleSubmit} initialData={task}>
            <Center>
              <Input name="title" type="text" placeholder="Título"  />
              <Input
                name="description"
                type="text"
                placeholder="Descrição"
              />

              <Button type="submit">Cadastrar</Button>
            </Center>
          </Form>
        </Container>
      </Modal>
    </ModalContainer>
  );
};
export default TaskModal;
