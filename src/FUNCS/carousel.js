onload = () => {
	let carouselSlider = document?.querySelector('.carousel-slider');
	let list = document?.querySelector('.carousel-list');
	let list2;

	const speed = 1;

	const width = list?.offsetWidth;
	let x = 0;
	let x2 = width;

	const clone = () => {
		list2 = list?.cloneNode(true);
		carouselSlider?.appendChild(list2);
		if (list2) {
			list2.style.left = `${width}px`;
		}
	};

	const moveFirst = () => {
		x -= speed;

		if (width >= Math.abs(x)) {
			list.style.left = `${x}px`;
		} else {
			x = width;
		}
	};

	const moveSecond = () => {
		x2 -= speed;
		if (list2) {
			if (list2.offsetWidth >= Math.abs(x2)) {
				list2.style.left = `${x2}px`;
			} else {
				x2 = width;
			}
		}
	};

	let a = setInterval(moveFirst, 10);
	let b = setInterval(moveSecond, 10);

	const hover = () => {
		clearInterval(a);
		clearInterval(b);
	};

	const unhover = () => {
		a = setInterval(moveFirst, 10);
		b = setInterval(moveSecond, 10);
	};

	clone();

	carouselSlider.addEventListener('mouseenter', hover);
	carouselSlider.addEventListener('mouseleave', unhover);
};
