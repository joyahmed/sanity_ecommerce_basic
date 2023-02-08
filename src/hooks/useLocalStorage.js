// import { useEffect, useState } from 'react';

// const localStorage =
// 	typeof window !== 'undefined' ? window.localStorage : null;

// export const useLocalStorage = (key, initialValue) => {
// 	const [value, setValue] = useState(() => {
// 		if (typeof window) {
// 			try {
// 				const jsonValue = localStorage?.getItem(key);
// 				if (jsonValue !== null) {
// 					const data = jsonValue.trim();
// 					return JSON.parse(data);
// 				}
// 			} catch (error) {
// 				console.error('Data is not valid JSON:', error);
// 			}
// 			return typeof initialValue === 'function'
// 				? initialValue()
// 				: initialValue;
// 		}
// 	});

// 	useEffect(() => {
// 		localStorage.setItem(key, JSON.stringify(value));
// 	}, [key, value]);

// 	return [value, setValue];
// };

import { useEffect, useState } from 'react';

const localStorage =
	typeof window !== 'undefined' ? window.localStorage : null;

export const useLocalStorage = (key, initialValue) => {
	const [value, setValue] = useState(() => {
		if (localStorage) {
			const jsonValue = localStorage.getItem(key);
			if (jsonValue !== null) {
				try {
					const data = jsonValue.trim();
					return JSON.parse(data);
				} catch (error) {
					console.error('Data is not valid JSON:', error);
				}
			}
		}
		return typeof initialValue === 'function'
			? initialValue()
			: initialValue;
	});

	useEffect(() => {
		if (localStorage) {
			localStorage.setItem(key, JSON.stringify(value));
		}
	}, [key, value]);

	return [value, setValue];
};
