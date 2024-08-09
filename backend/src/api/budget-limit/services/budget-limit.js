'use strict';

/**
 * budget-limit service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::budget-limit.budget-limit');
