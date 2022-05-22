import { useRef, useEffect } from 'react';

interface PreviewProps {
	code: string;
}

const html = `
    <html>
      <head>
        <style>html { background-color: white; }</style>
      </head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"><h4>Runtime</h4>' + err + '</div>';
              console.error(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;

const CodePreview: React.FC<PreviewProps> = ({ code }) => {
	const iframeRef = useRef<any>();

	useEffect(() => {
		iframeRef.current.srcdoc = html;
		setTimeout(() => {
			iframeRef.current.contentWindow.postMessage(code, '*');
		}, 50);
	}, [code]);

	return (
		<div className='preview-wrapper'>
			<iframe
				title='preview'
				ref={iframeRef}
				sandbox='allow-scripts'
				srcDoc={html}
			/>
		</div>
	);
};

export default CodePreview;
