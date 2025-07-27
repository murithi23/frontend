// scripts/brave-start.js
const { exec } = require('child_process');

const startCommand = process.platform === 'win32' 
  ? 'start brave' 
  : 'brave-browser';

exec(`${startCommand} http://localhost:3000`, (error) => {
  if (error) {
    console.error(`Error launching Brave: ${error}`);
    return;
  }
  console.log('Brave browser launched successfully!');
});