import { spawn } from 'child_process';

const shScriptPath = process.env.SH_SCRIPT_PATH;

const runShell = (filename, args = [], cb) => {
  const ls = spawn(`${shScriptPath}/${filename}`, args);
  ls.stdout.on('data', function (data) {
    console.log('stdout: ' + data.toString());
  });

  ls.stderr.on('data', function (data) {
    console.log('stderr: ' + data.toString());
  });

  ls.on('exit', function (code) {
    console.log('child process exited with code ' + code.toString());
    cb(code);
  });
}

export default runShell;
