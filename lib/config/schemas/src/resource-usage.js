'use strict';

// Resource usage schema

const schema = require('abacus-schema');

const string = schema.string;
const number = schema.number;
const time = schema.time;
const arrayOf = schema.arrayOf;
const objectType = schema.objectType;
const enumType = schema.enumType;
const required = schema.required;

// Consumer schema
const consumer = () => objectType('consumer', {
  type: enumType('consumerType',
    ['cloud_foundry_application', 'external'], 'cloud_foundry_application'),
  value: required(string())
});

// Metric schema
const metric = () => objectType('metric', {
  name: string(),
  unit: required(string()),
  quantity: required(number())
});

// Export our public functions
const usage = () => objectType('usage', {
  start: required(time()),
  end: required(time()),
  region: string(),
  organization_id: required(string()),
  space_id: required(string()),
  consumer: consumer(),
  resource_id: required(string()),
  plan_id: required(string()),
  resource_instance_id: required(string()),
  metrics: required(arrayOf(metric()))
});

// Resource instance schema
const resourceUsage = () => objectType('resourceUsage', {
  usage: arrayOf(usage())
});

// Export our schema
module.exports = resourceUsage;
module.exports.usage = usage;
module.exports.consumer = consumer;
module.exports.metric = metric;

