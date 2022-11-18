import React from 'react';
import { Container, Overlay } from './styles';

interface ModalProps {
	children?: React.ReactNode;
	isOpen: boolean;
	toggle: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, toggle }) => {
	return (
		<>
			{isOpen && (
				<Overlay onClick={toggle}>
					<Container onClick={(e) => e.stopPropagation()}>
						{children}
					</Container>
				</Overlay>
			)}
		</>
	);
};

export default Modal;