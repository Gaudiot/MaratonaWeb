import { useField } from '@unform/core';
import React, { useEffect, useRef } from 'react';

interface Option {
	value: string;
	text: string;
}

interface DropdownProps {
	name: string;
	options: Option[];
}

const Dropdown: React.FC<DropdownProps> = ({ options, name }) => {
	const dropdownRef = useRef(null);
	const {fieldName, registerField, defaultValue, error} = useField(name);

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: dropdownRef.current,
			path: 'value'
		});
	}, [fieldName, registerField]);

	return (
		<div>
			<select ref={dropdownRef}>
				{options.map((option) => {
					const {text, value} = option;

					return (
						<option key={value} value={value}>{text}</option>
					);
				})}
			</select>
			{error && <span>{error}</span>}
		</div>
	);
};

export default Dropdown;