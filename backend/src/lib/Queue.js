import Bee from 'bee-queue';
import transportOrderCreateMail from '../app/jobs/transportOrderCreateMail';
import transportOrderCancelMail from '../app/jobs/transportOrderCancelMail';
import transportOrderUpdateMail from '../app/jobs/transportOrderUpdateMail';
import transportOrderEndedMail from '../app/jobs/transportOrderEndedMail';
import transportOrderDeleteMail from '../app/jobs/transportOrderDeleteMail';
import redisConfig from '../config/redis';

const jobs = [
  transportOrderCreateMail,
  transportOrderCancelMail,
  transportOrderUpdateMail,
  transportOrderEndedMail,
  transportOrderDeleteMail,
];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
