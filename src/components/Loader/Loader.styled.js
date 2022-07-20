import styled from 'styled-components';

export const LoaderStyled = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: 40px;
  height: 40px;

  & span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: rotate(calc(18deg * var(--i)));

    &:before {
      content: '';
      position: absolute;
      right: 0;
      top: calc(50% - 1.5px);
      width: 4px;
      height: 4px;
      background: #3f51b5;
      border-radius: 50%;
      box-shadow: 0 0 1px #3f51b5, 0 0 4px #3f51b5, 0 0 4px #3f51b5;
      transform: scale(0.4);
      animation: spin 2s linear infinite;
      animation-delay: calc(0.1s * var(--i));
    }
  }

  @keyframes spin {
    0% {
      transform: scale(1);
    }

    100% {
      transform: scale(0.1);
    }
  }
`;
