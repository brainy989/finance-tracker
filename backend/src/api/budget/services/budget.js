'use strict';

/**
 * budget service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::budget.budget');
