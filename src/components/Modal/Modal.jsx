import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { ModalStyled, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, largeImageURL, tags }) => {
  useEffect(() => {
    const onEscKey = e => {
      if (e.code === 'Escape') onClose();
    };

    window.addEventListener('keydown', onEscKey);

    return () => {
      window.removeEventListener('keydown', onEscKey);
    };
  }, [onClose]);

  const handleBackdrop = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdrop}>
      <ModalStyled>
        <img src={largeImageURL} alt={tags} />;
      </ModalStyled>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  // children: PropTypes.node,
  onClose: PropTypes.func,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
};
