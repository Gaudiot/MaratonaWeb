import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	justify-content: flex-start;
	margin: 50px 200px;
	padding: 50px;
	background: #f08d8d;
`;

export const Content = styled.div`
	display: flex;

	img {
		background-color: #ccffdc;
		width: 200px;
		height: 200px;
		border-radius: 50%;
	}
`;

export const Info = styled.div`
	display: flex;
	flex-direction: column;
`;
