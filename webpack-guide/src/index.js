// import Print from './print'
import _ from 'lodash'

function component() {
  // return import('lodash').then(({ default: _ }) => {
  // const element = document.createElement('div');

  // element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  // return element;
  // }).catch((error) => 'An error occurred while loading the component');

  const element = document.createElement('div');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  // element.onclick = Print.bind(this, 'Hello webpack');

  return element;
}

document.body.appendChild(component());