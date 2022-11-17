import styled, { css } from 'styled-components';

interface MedalImageProps {
	position: 'GOLD' | 'SILVER' | 'BRONZE' | 'OTHER';
}

const medalColor = {
	GOLD: '#fbff19',
	SILVER: '#c2c2c2',
	BRONZE: '#d4803f',
	OTHER: '#4615c2',
};

export const Container = styled.div``;

export const MedalContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 10px;

	width: fit-content;
	align-items: center;

	background-color: #32a852;
`;

export const MedalImage = styled.div<MedalImageProps>`
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

export const MedalInfo = styled.div`
	display: flex;
	width: fit-content;
	max-width: 100%;
	padding: 10px;

	border-width: 2px;
	border-style: solid;

	background-color: #a83232;
`;
