import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Nav = styled.nav`
	display: flex;
	justify-content: space-between;
	align-items: center;

	background-color: #e5e5e5;
	padding: 15px;
`;

export const Dashboard = styled(Link)`
	display: flex;
`;

export const Logo = styled.img`
	max-height: 50px;
`;

export const Status = styled.div``;
