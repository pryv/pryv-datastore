/**
 * @license
 * Copyright (C) 2021–2023 Pryv S.A. https://pryv.com - All Rights Reserved
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the 3-Clause BSD License
 * SPDX-License-Identifier: BSD-3-Clause
 */

const { expect } = require('chai');
const ds = require('../../src');

describe('Backup/Restore methods', function () {
  describe('UserStreams', function () {
    it('prototype has exportAll, importAll, clearAll', function () {
      const streams = ds.createUserStreams({});
      expect(streams).to.have.property('exportAll').that.is.a('function');
      expect(streams).to.have.property('importAll').that.is.a('function');
      expect(streams).to.have.property('clearAll').that.is.a('function');
    });

    it('default exportAll throws unsupported-operation', async function () {
      const streams = ds.createUserStreams({});
      try {
        await streams.exportAll('user1');
        expect.fail('should have thrown');
      } catch (err) {
        expect(err.id).to.equal('unsupported-operation');
        expect(err.id).to.equal('unsupported-operation');
      }
    });

    it('default importAll throws unsupported-operation', async function () {
      const streams = ds.createUserStreams({});
      try {
        await streams.importAll('user1', []);
        expect.fail('should have thrown');
      } catch (err) {
        expect(err.id).to.equal('unsupported-operation');
        expect(err.id).to.equal('unsupported-operation');
      }
    });

    it('default clearAll throws unsupported-operation', async function () {
      const streams = ds.createUserStreams({});
      try {
        await streams.clearAll('user1');
        expect.fail('should have thrown');
      } catch (err) {
        expect(err.id).to.equal('unsupported-operation');
        expect(err.id).to.equal('unsupported-operation');
      }
    });

    it('can be overridden in implementation', async function () {
      const store = [];
      const streams = ds.createUserStreams({
        async exportAll (userId) {
          return store.filter(s => s.userId === userId);
        },
        async importAll (userId, items) {
          for (const item of items) {
            store.push(Object.assign({ userId }, item));
          }
        },
        async clearAll (userId) {
          store.length = 0;
        }
      });

      await streams.importAll('u1', [{ id: 's1', name: 'Stream 1' }]);
      expect(store).to.have.length(1);

      const exported = await streams.exportAll('u1');
      expect(exported).to.have.length(1);
      expect(exported[0].id).to.equal('s1');

      await streams.clearAll('u1');
      expect(store).to.have.length(0);
    });
  });

  describe('UserEvents', function () {
    it('prototype has exportAll, importAll, clearAll', function () {
      const events = ds.createUserEvents({});
      expect(events).to.have.property('exportAll').that.is.a('function');
      expect(events).to.have.property('importAll').that.is.a('function');
      expect(events).to.have.property('clearAll').that.is.a('function');
    });

    it('default exportAll throws unsupported-operation', async function () {
      const events = ds.createUserEvents({});
      try {
        await events.exportAll('user1');
        expect.fail('should have thrown');
      } catch (err) {
        expect(err.id).to.equal('unsupported-operation');
        expect(err.id).to.equal('unsupported-operation');
      }
    });

    it('default importAll throws unsupported-operation', async function () {
      const events = ds.createUserEvents({});
      try {
        await events.importAll('user1', []);
        expect.fail('should have thrown');
      } catch (err) {
        expect(err.id).to.equal('unsupported-operation');
        expect(err.id).to.equal('unsupported-operation');
      }
    });

    it('default clearAll throws unsupported-operation', async function () {
      const events = ds.createUserEvents({});
      try {
        await events.clearAll('user1');
        expect.fail('should have thrown');
      } catch (err) {
        expect(err.id).to.equal('unsupported-operation');
        expect(err.id).to.equal('unsupported-operation');
      }
    });

    it('can be overridden in implementation', async function () {
      const store = [];
      const events = ds.createUserEvents({
        async exportAll (userId) {
          return store.filter(e => e.userId === userId);
        },
        async importAll (userId, items) {
          for (const item of items) {
            store.push(Object.assign({ userId }, item));
          }
        },
        async clearAll (userId) {
          store.length = 0;
        }
      });

      await events.importAll('u1', [
        { id: 'e1', type: 'note/txt', content: 'hello' },
        { id: 'e2', type: 'note/txt', content: 'world' }
      ]);
      expect(store).to.have.length(2);

      const exported = await events.exportAll('u1');
      expect(exported).to.have.length(2);

      await events.clearAll('u1');
      expect(store).to.have.length(0);
    });
  });

  describe('Properties are frozen on prototype', function () {
    it('UserStreams backup methods are non-configurable', function () {
      const proto = Object.getPrototypeOf(ds.createUserStreams({}));
      for (const method of ['exportAll', 'importAll', 'clearAll']) {
        const desc = Object.getOwnPropertyDescriptor(proto, method);
        expect(desc.configurable, `${method} should be non-configurable`).to.be.false;
      }
    });

    it('UserEvents backup methods are non-configurable', function () {
      const proto = Object.getPrototypeOf(ds.createUserEvents({}));
      for (const method of ['exportAll', 'importAll', 'clearAll']) {
        const desc = Object.getOwnPropertyDescriptor(proto, method);
        expect(desc.configurable, `${method} should be non-configurable`).to.be.false;
      }
    });
  });
});
