import { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const root = document.getElementById('modal');
export class Modal extends Component {
  closeModalBackdrop = event => {
    if (event.target === event.currentTarget) {
      this.props.onModalClose();
    }
  };
  handlePressKey = event => {
    if (event.code === 'Escape') {
      this.props.onModalClose();
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handlePressKey);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handlePressKey);
  }
  render() {
    const { children } = this.props;
    return ReactDOM.createPortal(
      <>
        <ModalBackdrop onClick={this.closeModalBackdrop}>
          <ModalBody>{children}</ModalBody>
        </ModalBackdrop>
      </>,
      root
    );
  }
}

Modal.propTypes = {
  onModalClose: PropTypes.func.isRequired,
};

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
`;
const ModalBody = styled.div`
  position: absolute;
  overflow: hidden;
  top: 10%;
  left: 50%;
  transform: translate(-50%, 0%);
  max-width: 80%;
  max-height: 80%;
`;
