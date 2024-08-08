'use strict';

/**
 * income service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::income.income');
