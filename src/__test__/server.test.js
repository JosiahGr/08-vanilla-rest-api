'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

const testPort = 5000;
const mockResource = { title: 'test title', content: 'test content' };
let mockId = null;

beforeAll(() => server.start(testPort));
afterAll(() => server.stop());

describe('VALID request to the API', () => {
  describe('POST /api/v1/note', () => {
    it('should respond with status 201 and created a new note', () => {
      return superagent.post(`:${testPort}/api/v1/note`)
        .send(mockResource)
        .then((res) => {
          mockId = res.body.id;
          expect(res.body.title).toEqual(mockResource.title);
          expect(res.body.content).toEqual(mockResource.content);
          expect(res.status).toEqual(201);
        });
    });
  });

  describe('GET /api/v1/note', () => {
    it('should respond with the a previously created note', () => {
      return superagent.get(`:${testPort}/api/v1/note?id=${mockId}`)
        .then((res) => {
          expect(res.body.title).toEqual(mockResource.title);
          expect(res.body.content).toEqual(mockResource.content);
          expect(res.status).toEqual(200);
        });
    });
  });
});


describe('INVALID request to the API', () => {
  describe('GET /api/v1/cowsaypage', () => {
    it('should err out with 404 status code for not sending anything', () => {
      return superagent.get(`:${testPort}/api/v1/cowsay`)
        .query({})
        .then(() => {})
        .catch((err) => {
          expect(err.status).toEqual(404);
          expect(err).toBeTruthy();
        });
    });
  });
  describe('GET: /api/v1/note', () => {
    it('should respond with not found if id was not found', () => {
      return superagent.get(`:${testPort}/api/v1/note?id=5`)
        .query({})
        .catch((err) => {
          expect(err.status).toEqual(404);
          expect(err).toBeTruthy();
        });
    });
    it('it should respond with bad request if no id was provided', () => {
      return superagent.get(`:${testPort}/api/v1/note?id=`)
        .query({})
        .catch((err) => {
          expect(err.status).toEqual(400);
          expect(err).toBeTruthy();
        });
    });
    it('it should respond with bad request if no body was provided', () => {
      return superagent.get(`:${testPort}/api/v1/note?id=${mockId}`)
        .query({})
        .catch((err) => {
          expect(err.status).toEqual(400);
          expect(err).toBeTruthy();
        });
    });
  });
});
