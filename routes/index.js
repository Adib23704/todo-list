'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const tasks = [];
    return reply.view('todo.ejs', { tasks });
  })
}
