import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;

  > img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    line-height: 24px;

    span {
      color: #f4ede8;
    }

    a {
      text-decoration: none;
      color: #ff9000;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;

export const Schedule = styled.div`
  div.add {
    display:flex;

  }

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: #ff9000;
    display: flex;
    align-items: center;
    font-weight: 500;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      background: #ff9000;
      margin: 0 8px;
    }
  }

  .button {
    background-color: green;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
  }
`;

export const Section = styled.section`
  margin-top: 48px;

  p {
    color: #999591;
  }

  > strong {
    color: #999591;
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid #3e3b47;
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }
`;


export const Task = styled.div`
  display: flex;
  margin-right: 8px;

  & + div {
    margin-top: 16px;
  }

  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: #999591;

    svg {
      color: #ff9000;
      margin-right: 8px;
    }
  }

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  strong {
    margin-left: 24px;
    color: #fff;
    font-size: 20px;
  }
`;

interface TaskProps {
  isDone?: boolean;
};

export const TaskContainer = styled.div<TaskProps>`
  flex: 1;
  background: ${props => props.isDone ? '#8FBC8F' : '#3e3b47' };
  opacity: ${props => props.isDone ? '0.5' : '1' };
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-radius: 10px;
  cursor: pointer;

  div {
    display: flex;
    width: 100px;
    justify-content: space-between;

    span.done {
      svg {
        height: 30;
        color: #008000;
      }

      &:hover {
        cursor: pointer;

        svg {
          color: #ffffff;
        }
      }
    }

    span.trash {
      svg {
        height: 30;
        color: #FF0000;
      }

      &:hover {
        cursor: pointer;

        svg {
          color: #ffffff;
        }
      }
    }
  }
`
