'use strict';

var createMessagebirdClient = require('messagebird');
var core = require('@planorjs/core');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var createMessagebirdClient__default = /*#__PURE__*/_interopDefaultLegacy(createMessagebirdClient);

class PlanorServiceMessagebird extends core.PlanorService {
  constructor(credentials, opts={}) {
    super('messagebird', 'sms');

    this.credentialKeys = ['origin', 'accessKey'];

    this.setCredentials(credentials);
    this.setOpts(opts);
  }

  async getClient() {
    const creds = super.getCredentials();

    this.client = createMessagebirdClient__default["default"](creds.accessKey);

    return this.client
  }

  async send(msg, msgopts) {
    const self = this;
    const creds = super.getCredentials();

    return new Promise(function(resolve, reject) {
      const payload = {
        originator: creds.origin,
        recipients: msgopts.recipients.map(r => r.replace('+', '')),
        body: msg
      };

      self.client.messages.create(payload, function(err, resp) {
        if (err) {
          return reject(new Error(`Couldn't send sms.`, {cause: err}))
        }

        return resolve(resp)
      });
    })
  }
}

module.exports = PlanorServiceMessagebird;
//# sourceMappingURL=index.js.map
