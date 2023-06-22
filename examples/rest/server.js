/**
 * @license
 * Copyright (C) 2021–2023 Pryv S.A. https://pryv.com - All Rights Reserved
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the 3-Clause BSD License
 * SPDX-License-Identifier: BSD-3-Clause
 */
const express = require('express');
const { PassThrough } = require('stream');
const errors = require('../../src/errors');

module.exports = serve;

/**
 * @param {ds} DataStore - a datastore already initialized with id and name
 * @param {port} number
 * @param {options} Object
 * @param {options.prefix} [string] - prefix for your server
 * @param {options.middleware} [ExpressMiddleware] - as Function (req, res, next) {... }
 */
async function serve (ds, port, options) {
  const router = express.Router();
  const app = express();
  app.use(express.json());

  if (options.middleware) {
    router.use(options.middleware);
  }

  // ---------------------- user ------------------- //
  router.delete('/:userId', async (req, res) => {
    await ds.deleteUser(req.params.userId);
    res.json({ OK: true });
  });

  router.get('/:userId/storageSize', async (req, res) => {
    const storageSize = await ds.getUserStorageSize (req.params.userId);
    res.json({ storageSize });
  });

  // ---------------------- streams ------------------ //

  router.post('/:userId/streamGET', async (req, res, next) => {
    const streams = await ds.streams.getOne(req.params.userId, req.body.query || {}, req.body.options || {});
    res.json(streams);
  });

  router.post('/:userId/streamsGET', async (req, res, next) => {
    const streams = await ds.streams.get(req.params.userId, req.body.query || {}, req.body.options || {});
    res.json(streams);
  });

  router.post('/:userId/streams', async (req, res, next) => {
    const stream = await ds.streams.create(req.params.userId, req.body);
    res.json(stream);
  });

  router.put('/:userId/streams/:streamId', async (req, res, next) => {
    const updateData = Object.assign({}, req.body);
    updateData.id = req.params.streamId;
    const stream = await ds.streams.update(req.params.userId, updateData);
    res.json(stream);
  });

  router.delete('/:userId/streams/:streamId', async (req, res, next) => {
    const result = await ds.streams.updateDelete(req.params.userId, req.params.streamId);
    res.json(result);
  });

  router.delete('/:userId/streams', async (req, res, next) => {
    const result = await ds.streams.deleteAll(req.params.userId);
    res.json(result);
  });

  router.get('/:userId/streamsDeletions', async (req, res, next) => {
    const deletions = await ds.streams.getDeletions(req.params.userId, req.query.deletionsSince);
    res.json(deletions);
  });

  router.post('/:userId/streamsDeletions', async (req, res, next) => {
    const deletions = await ds.streams.createDeleted(req.params.userId, req.body);
    res.json(deletions);
  });

  router.delete('/:userId/streamsDeletions/:streamId', async (req, res, next) => {
    const result = await ds.streams.delete(req.params.userId, req.params.streamId);
    res.json(result);
  });

  // ---------------------- events ------------------ //

  router.post('/:userId/eventsGET', async (req, res, next) => {
    const events = await ds.events.get(req.params.userId, req.body.query || {}, req.body.options || {});
    res.json(events);
  });

  router.post('/:userId/eventsGETStreamed', async (req, res, next) => {
    const eventsStream = await ds.events.getStreamed(req.params.userId, req.body.query || {}, req.body.options || {});
    streamJSONwOneItemPerLine(eventsStream, res);
  });

  router.post('/:userId/eventsGETDeletionsStreamed', async (req, res, next) => {
    const eventsStream = await ds.events.getDeletionsStreamed(req.params.userId, req.body.query || {}, req.body.options || {});
    streamJSONwOneItemPerLine(eventsStream, res);
  });

  router.get('/:userId/events/:eventId', async (req, res, next) => {
    const event = await ds.events.getOne(req.params.userId, req.params.eventId);
    res.json(event);
  });

  router.get('/:userId/events/:eventId/history', async (req, res, next) => {
    const events = await ds.events.getHistory(req.params.userId, req.params.eventId);
    res.json(events);
  });

  router.post('/:userId/events', async (req, res, next) => {
    try {
      const event = await ds.events.create(req.params.userId, req.body);
      res.json(event);
    } catch (e) {
      res.status(400);
      res.json(errorToJSON(e));
    }
  });

  router.put('/:userId/events', async (req, res, next) => {
    const event = await ds.events.update(req.params.userId, req.body);
    res.json(event);
  });

  router.post('/:userId/eventsDELETE/:eventId', async (req, res, next) => {
    const deleted = await ds.events.delete(req.params.userId, req.body);
    res.json(deleted);
  });

  router.get('/:userId/removeAllNonAccountEventsForUser', async (req, res, next) => {
    const result = await ds.events.removeAllNonAccountEventsForUser(req.params.userId);
    res.json(result);
  });

  router.post('/:userId/eventsDELETE/:eventId', async (req, res, next) => {
    const deleted = await ds.events.delete(req.params.userId, req.body);
    res.json(deleted);
  });

  router.post('/:userId/events/:eventId/attachment/', async (req, res, next) => {
    const attachmentItem = {
      fileName: req.query.fileName,
      type: req.query.type,
      size: parseInt(req.query.size),
      integrity: req.query.integrity
    };

    const readableStream = new PassThrough();
    req.pipe(readableStream);
    attachmentItem.attachmentData = readableStream;
    const event = await ds.events.addAttachment(req.params.userId, req.params.eventId, attachmentItem);
    res.json(event);
  });

  router.get('/:userId/events/:eventId/attachments/:fileId', async (req, res, next) => {
    const readableData = await ds.events.getAttachment(req.params.userId, req.params.eventId, req.params.fileId);
    readableData.pipe(res);
  });

  router.delete('/:userId/events/:eventId/attachments/:fileId', async (req, res, next) => {
    const deleted = await ds.events.deleteAttachment(req.params.userId, req.params.eventId, req.params.fileId);
    res.json(deleted);
  });

  app.use(options.prefix || '/', router);
  app.listen(port);
  return app;
}

/**
 * Read an object stream source and send them with one item per line,
 * @param {ReadableStream} readableSource
 * @param {Response} res
 */
function streamJSONwOneItemPerLine (readableSource, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Transfer-Encoding', 'chunked');

  let buffer = '';
  const MAX_BUFF_SIZE = 1024;

  readableSource.on('data', function (event) {
    buffer += JSON.stringify(event) + '\n';
    if (buffer.length > MAX_BUFF_SIZE) {
      res.write(buffer);
      buffer = '';
    }
  });

  readableSource.on('end', function () {
    res.write(buffer);
    res.end();
  });
}

/**
 * @param {any} error
 */
function errorToJSON (error) {
  const dsError = error.id != null ? error : errors.unexpectedError('', null, error);
  const holder = {
    id: dsError.id,
    message: dsError.message,
    data: dsError.data
    // innerError: investigate how we could serialize innerError
  };
  return JSON.stringify(holder);
}
