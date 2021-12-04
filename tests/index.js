import assert from 'assert'
import {Planor, PlanorService, PlanorTemplate} from '@planorjs/core'
import PlanorServiceMessagebird from '../src/index.js'
import credentials from '../credentials.js'

const planor = new Planor()

const smsTemplate = new PlanorTemplate('sms', 'VERIFY_SIGNIN', 'en_US', [
  'You have requested to signin to {{project}} and your verification code is "{{code}}"'
])
planor.addTemplate(smsTemplate)

await planor.addService(new PlanorServiceMessagebird(credentials.messagebird))

planor.updateTemplateLiterals({project: 'SomeApp'})

const result = await planor.sendSms('VERIFY_SIGNIN', {recipients: credentials.messagebird.recipients}, {code: '918273'})

console.log(result)
console.log(planor.getErrors())

assert.strictEqual(typeof result.id, 'string')
