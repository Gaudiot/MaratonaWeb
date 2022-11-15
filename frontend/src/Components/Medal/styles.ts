import styled, { css } from 'styled-components';

interface ContainerProps {
	position: 'gold' | 'silver' | 'bronze';
}

const medalColor = {
	gold: '#fbff19',
	silver: '#c2c2c2',
	bronze: '#d4803f',
};

export const Container = styled.div<ContainerProps>`
	height: 100px;
	width: 100px;
	background-color: #6c3aa1;
	border-radius: 100%;
	border-style: solid;
	border-width: 10px;

	${(props) => {
		return css`
			border-color: ${medalColor[props.position]}
		`;
	}}
`;
