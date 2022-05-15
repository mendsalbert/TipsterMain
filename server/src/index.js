import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { MoralisProvider } from "react-moralis";

ReactDOM.render(<MoralisProvider appId="lxSuTb9jk96yKPnb6G5338FZjW0gA3YWGLH8oJIY" serverUrl="https://hocigizmneqq.usemoralis.com:2053/server">
<App />
</MoralisProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
