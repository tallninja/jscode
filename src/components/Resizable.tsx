import { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

interface ResizableProps {
	direction: 'horizontal' | 'vertical';
	children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
	let resizableProps: ResizableBoxProps;
	const [innerWidth, setInnerWidth] = useState(window.innerWidth);
	const [innerHeight, setInnerHeight] = useState(window.innerHeight);
	const [width, setWidth] = useState(innerWidth * 0.65);

	useEffect(() => {
		let timer: any;
		const listener = () => {
			// debouncing
			if (timer) clearTimeout(timer);
			timer = setTimeout(() => {
				setInnerHeight(window.innerHeight);
				setInnerWidth(window.innerWidth);
				if (window.innerWidth * 0.65 < width) {
					setWidth(window.innerWidth * 0.65);
				}
			}, 100);
		};
		window.addEventListener('resize', listener);
		return () => {
			window.removeEventListener('resize', listener);
		};
	}, []);

	if (direction == 'vertical') {
		resizableProps = {
			width: Infinity,
			height: 300,
			resizeHandles: ['s'],
			maxConstraints: [Infinity, innerHeight * 0.94],
			minConstraints: [Infinity, 45],
		};
	} else {
		resizableProps = {
			className: 'resize-horizontal',
			width: width,
			height: Infinity,
			resizeHandles: ['e'],
			maxConstraints: [innerWidth * 0.8, Infinity],
			minConstraints: [innerWidth * 0.2, Infinity],
			onResizeStop: (event, data) => {
				setWidth(data.size.width);
			},
		};
	}

	return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
