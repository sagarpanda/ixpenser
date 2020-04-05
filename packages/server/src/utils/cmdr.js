const childProcess = require("child_process");
/*
Example
cmdr('./batch/firstnode.js').then(out => {
  console.log('out: ', out);
  res.send(out);
})
.catch(err => {
  console.log('err out: ', err);
  res.send('error')
});
*/

const cmdr = (command) => {

  return new Promise(function(resolve, reject) {

    childProcess.exec(command, function(error, standardOutput, standardError) {
      if (error) {
        reject(error);
      }

      if (standardError) {
        reject(standardError);
      }

      resolve(standardOutput);
    });
  });
}

export default cmdr;
