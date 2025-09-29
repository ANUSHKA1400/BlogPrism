// Simple script to start the backend server
const { spawn } = require('child_process');
const path = require('path');

// Get the backend directory path
const backendDir = path.join(__dirname, 'backend');

console.log('Starting backend server...');
console.log('Backend directory:', backendDir);

// Spawn the node process to run the server
const backendProcess = spawn('node', ['server.js'], {
  cwd: backendDir,
  stdio: 'inherit',
  env: {
    ...process.env,
    PORT: process.env.PORT || 5001
  }
});

backendProcess.on('error', (error) => {
  console.error('Failed to start backend server:', error.message);
});

backendProcess.on('close', (code) => {
  console.log(`Backend server process exited with code ${code}`);
});

console.log('Backend server started. Press Ctrl+C to stop.');