import { useRef, useEffect } from 'react';

interface PreviewProps {
	code: string | null;
	err: string | null;
}

const html = `
    <html>
      <head>
        <style>html { background-color: white; }</style>
      </head>
      <body>
        <div id="root"></div>
        <script>
          const handleError = (err) => {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4>Error:</h4>' + err + '</div>';
            console.error(err);
          };
          window.show = (data) => {
            const showResults = document.createElement('div');
            showResults.innerHTML = '<pre>' + data + '</pre>';
            document.body.appendChild(showResults);
          };
          // handles asynchronous errors
          window.addEventListener('error', (event) => {
            event.preventDefault();
            handleError(event.error);
          })
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              handleError(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;

const CodePreview: React.FC<PreviewProps> = ({ code, err }) => {
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
			{err && <div className='bundling-error'>{err}</div>}
		</div>
	);
};

export default CodePreview;
