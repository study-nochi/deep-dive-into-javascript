import _ from "lodash";
import "./style.css";
import PNG from './Bee_Mad_Emote.png'
import WEBP from './Bee_Mad_Emote.webp'
import Data from './data.xml';
import Notes from "./data.csv";
import toml from './data.toml';
import yaml from './data.yaml';
import json from './data.json5'

console.log(toml.title);
console.log(toml.owner.name);

console.log(yaml.title);
console.log(yaml.owner.name);

console.log(json.title);
console.log(json.owner.name);

function component() {
  const element = document.createElement('div');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  const myPNG = new Image();
  myPNG.src = PNG;
  const myWEBP = new Image();
  myWEBP.src = WEBP;

  element.appendChild(myPNG)
  element.appendChild(myWEBP)

  console.log(Data)
  console.log(Notes)

  return element;
}

document.body.appendChild(component());