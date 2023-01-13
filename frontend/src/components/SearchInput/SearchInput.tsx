import React, { useState, useEffect, useCallback } from 'react';
import Input from '../Input/Input';

interface SearchInputProps {
	onInputChange: Function;
}

const SearchInput: React.FunctionComponent<SearchInputProps> = (props: SearchInputProps) => {
	const [value, setValue]: [string, Function] = useState('');
	const [debouncedValue, setDebouncedValue]: [string, Function] = useState('');

	function debounce(cb: Function, delay: number) {
		let timer: number;
		return (...args: any[]) => {
			clearTimeout(timer);
			timer = window.setTimeout(() => cb(...args), delay);
		};
	}

  const debounceSetDebouncedSearchValue = useCallback(debounce(setDebouncedValue, 500), []);

	useEffect(() => {
    debounceSetDebouncedSearchValue(value);
	}, [value]);

	useEffect(() => {
		props.onInputChange(debouncedValue);
	}, [debouncedValue]);

	return <Input
		type="text"
		value={value}
		onChange={event => setValue(event.target.value)}
		placeholder="Search news"
		noMargin
	/>
}

export default SearchInput;