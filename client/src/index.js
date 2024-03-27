import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {createStore} from "redux"

let intialStore={
  userDetails:{},
};

let reducer=(latestStore,dispatchObj)=>{
  console.log(dispatchObj);
  if(dispatchObj.type=="login"){
    return{
      ...latestStore,userDetails:dispatchObj.data
    };
  }
  return intialStore;
}
let store= createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
 <Provider store={store}>
      <App />
    </Provider>
      </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
