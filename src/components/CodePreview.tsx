import { useEffect, useRef } from 'react';

interface CodePreviewProps {
	code: string;
}

const html = `
		<html lang="en">
		<head></head>
		<body>
			<div id="root"></div>
		<script>
			window.addEventListener('message', (e) => {
				try {
				eval(e.data);
				} catch (err) {
					const root = document.querySelector("#root");
					root.innerHTML = '<div style="color: red;"><h4>Error:</h4>' + err + '</div>';
					console.error(err);
				}
			})
		</script>
		</body>
		</html>
	`;

const CodePreview: React.FC<CodePreviewProps> = ({ code }) => {
	const iframeRef = useRef<HTMLIFrameElement>(null);

	useEffect(() => {
		if (iframeRef.current) iframeRef.current.srcdoc = html;
		iframeRef?.current?.contentWindow?.postMessage(code, '*');
	}, [code]);

	return (
		<iframe
			title='Output'
			ref={iframeRef}
			srcDoc={html}
			frameBorder='5'
			sandbox='allow-scripts'
			style={{ display: 'block' }}
		></iframe>
	);
};

export default CodePreview;
