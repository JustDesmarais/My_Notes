import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
    const workboxSW = new Workbox('/service-worker.js');
    workboxSW.register()
    .catch(error => {
      console.error('Error registering service worker:', error);
    });
} else {
  console.error('Service workers are not supported in this browser.');
}

/**    if ('serviceWorker' in navigator) {
       // Use the window load event to keep the page load performant
       window.addEventListener('load', () => {
           navigator.serviceWorker.register('/service-worker.js');
       });
   } */
