import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Nav = styled.nav`
	display: flex;
	justify-content: space-between;
	align-items: center;

	background-color: #e5e5e5;
	padding: 15px;
`;

export const Logo = styled(Link)``;

export const LogoImg = styled.img`
	max-height: 50px;
`;

export const LeftHand = styled.div`
	display: flex;
	align-items: center;
`;

export const RightHand = styled.div`
	display: flex;
	align-items: center;
`;
