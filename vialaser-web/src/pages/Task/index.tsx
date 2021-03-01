import React, { useState, useCallback, useEffect } from 'react';
import TaskModal from '../../components/TaskModal'

import { FiPower, FiCheck, FiTrash, FiEdit, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Section,
  Task as TaskDiv,
  TaskContainer
} from './styles';
import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

interface Task {
  id: string;
  title: string;
  description: string;
  done: boolean;
  createdAt: Date;
  accountId: string;
}

const TaskPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { signOut, user } = useAuth();

  const loadAll = useCallback(() => {
    api.get<Task[]>('/api/task/', { params: { accountId: user.id, }, })
       .then(response => {
        setTasks(response.data);
      });
  }, [])

  useEffect(() => {
    loadAll()
  }, [loadAll]);

  const handleDone = useCallback((task) => {
    const eddited = {
      ...task,
      done: !task.done,
    }
    api.put<Task>('/api/task/', eddited)
       .then(() => {
          loadAll()
      });
  }, [loadAll])

  const handleDelete = useCallback((task) => {
    api.delete<Task>('/api/task/' + task.id)
       .then(() => {
          loadAll()
      });
  }, [loadAll])

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Profile>
            <div>
              <span>Bem-vindo,</span>
              <Link to="#">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiPower size={20} />
          </button>
        </HeaderContent>
        <Content>
          <Schedule>
            <div className="add">
              <TaskModal onSuccess={loadAll} icon={FiPlus}  />
            </div>

            <Section>
              {tasks.length === 0 && (
                <p>Nenhuma tarefa cadastrada</p>
              )}

              {tasks.map(task => (
                <TaskDiv key={task.id}>
                  <TaskContainer isDone={task.done}>
                    <strong>{task.title}</strong>

                    <div>
                      <TaskModal task={task} onSuccess={loadAll} icon={FiEdit}/>
                      <span className="done" onClick={() => handleDone(task)}>
                        <FiCheck />
                      </span>
                      <span className="trash" onClick={() => handleDelete(task)}>
                        <FiTrash />
                      </span>
                    </div>
                  </TaskContainer>
                </TaskDiv>
              ))}
            </Section>
          </Schedule>
        </Content>
      </Header>
    </Container>
  );
};

export default TaskPage;
