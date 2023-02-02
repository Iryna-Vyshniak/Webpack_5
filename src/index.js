import Post from '@models/Post';
import json from './assets/json';
import WebpackLogo from './assets/images/webpack-logo.png';
import xml from './assets/data.xml';
import csv from './assets/people-100.csv';
import './babel';
import './styles/style.css';
import './main.scss';

const post = new Post('Webpack Post Title', WebpackLogo);
console.log('Post to String', post.toString());
console.log('JSON: ', json);
console.log('XML: ', xml);
console.log('CSV: ', csv);
