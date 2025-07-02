
const { spawn } = require('child_process');

console.log('Starting Next.js production server...');

// Using spawn is better for long-running processes like a web server.
// 'inherit' pipes the output (logs) from the child process to this process,
// so you can see Next.js logs in your DirectAdmin logs.
const child = spawn('npm', ['run', 'start'], { stdio: 'inherit' });

child.on('close', (code) => {
  console.log(`Application process exited with code ${code}`);
});

child.on('error', (err) => {
  console.error('Failed to start application:', err);
});
