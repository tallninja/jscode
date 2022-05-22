# JSCODE

Java script code editor

The code is bundled on the client side

Using [unpkg.com](https://unpkg.com) to include external libraries

The requests are cached in indexedDB using [localforage](https://www.npmjs.com/package/localforage)

User's code is executed inside an iframe element in order to provide some level of isolation from the user's browser. By default iframe element allows communication between the parent and the child using `parent` in the child and `\<iframe_element\>.contentWindow` from the parent.
Iframes have sandbox property which allows communcation between the parent and child `sandbox="allow-same-origin"`. To sandbox the iframe we set the sandbox property to an empty string `sandbox=""`.
Another way to disable communication is using a different port, domain name or protocol.
The app uses message event listener to post code from the parent to the child iframe. Passing the code as an attribute to the script tag can be problematic since the code can be really long in the case of external modules also the code can contain tags which can break the code logic.