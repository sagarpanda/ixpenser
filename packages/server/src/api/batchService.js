import events from 'events';
import ldPick from 'lodash/pick';
import ldFind from 'lodash/find';
import cmdr from '../utils/cmdr';
import runShell from '../utils/runShell';
import Queue from '../models/Queue';

const eventEmitter = new events.EventEmitter();
const nextQueue = () => {
   console.log('nextQueue called');
   Queue.findAll({ where: {status: ['open', 'inProgress']}  })
     .then(dd => {
       let option = null;
       const progressItem = ldFind(dd, { status: 'inProgress' });
       if (!progressItem) { // if nothing is in progress
         const item = dd.sort((a, b) => a.priority - b.priority).pop(); // pop the high priority item
         if (item) { // if exist then run shell
           option = item;
         }
       }
       return option;
     })
     .then(item => {
       if (!item) return;
       const params = item.params ? item.params.split(' ') : [];
       return Queue.update({status: 'inProgress'}, { where: { id: item.id } })
         .then(d => {
           /**** Start Shell Run ****/
           runShell(
             `${item.batchName}.sh`,
             params,
             (exitCode) => {
               eventEmitter.emit('endqueue', item.id, exitCode);
             }
           );
           /**** End Shell Run ****/
         });
     })
     .catch(err => {
       console.log('nextQueue error');
     });
}
const endQueue = (queueId, exitCode) => {
   console.log('endQueue: ', queueId, exitCode);
   const status = exitCode ? 'error' : 'done';
   Queue.update({status}, { where: { id: queueId } })
     .then(d => {
       eventEmitter.emit('nextqueue');
     });
}
eventEmitter.on('nextqueue', nextQueue);
eventEmitter.on('endqueue', endQueue);


const add = (req, res) => {
    const { batchName, params } = req.body;
    const opt = ldPick(req.body, ['batchName', 'params', 'priority']);
    Queue.create({ ...opt })
      .then(record => {
        eventEmitter.emit('nextqueue');
        res.status(200).json({ status: true });
      })
      .catch(err => {
        res.status(500).json({ status: false });
      });
};

const update = (req, res) => {
 const { id } = req.params;
 const opt = ldPick(req.body, ['priority']);
 Queue.update(opt, { where: { id } })
   .then(d => {
     if (d[0] === 0) {
       res.status(404).json({ status: false });
     } else {
       res.status(200).json({ status: true });
     }
   })
   .catch(err => {
     res.status(500).json({ status: false });
   })
}

const del = (req, res) => {
 const { id } = req.params;
 Queue.destroy({ where: { id } }).then(count => {
   if (count === 0) {
     res.status(404).json({ status: false });
   } else {
     res.status(200).json({ status: true });
   }
 });
};

const getAll = (req, res) => {
  const attributes = { include: ['id', 'batchName', 'params', 'priority'] };
  Queue.findAll({attributes})
    .then(dd => {
      res.status(200).json(dd)
    })
    .catch(err => {
      res.status(500).json({ status: false });
    });
}

export default { getAll, add, update, del };
