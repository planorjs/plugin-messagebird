import createMessagebirdClient from 'messagebird';
import { PlanorService } from '@planorjs/core';

class PlanorServiceMessagebird extends PlanorService {
  constructor(credentials, opts = {}) {
    super('messagebird', 'sms');
    this.credentialKeys = ['origin', 'accessKey'];
    this.setCredentials(credentials);
    this.setOpts(opts);
  }

  async getClient() {
    const creds = super.getCredentials();
    this.client = createMessagebirdClient(creds.accessKey);
    return this.client;
  }

  async send(msg, msgopts) {
    const self = this;
    const creds = super.getCredentials();
    if (typeof msgopts.to == 'string') msgopts.to = [msgopts.to];
    return new Promise(function (resolve, reject) {
      const payload = {
        originator: creds.origin,
        recipients: msgopts.to.map(r => r.replace('+', '')),
        body: msg
      };
      self.client.messages.create(payload, function (err, resp) {
        if (err) {
          return reject(new Error(`Couldn't send sms.`, {
            cause: err
          }));
        }

        return resolve(resp);
      });
    });
  }

}

export { PlanorServiceMessagebird as default };
//# sourceMappingURL=index.js.map
