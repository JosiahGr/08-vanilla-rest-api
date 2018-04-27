'use strict';

const logger = require('../lib/logger');
const Painting = require('../model/painting');
const storage = require('../lib/storage');

module.exports = function routePainting(router) {
  router.post('/api/v1/painting', (req, res) => {
    logger.log(logger.INFO, 'PAINTING-ROUTE: POST /api/v1/painting');
    try {
      const newPainting = new Painting(req.body.title, req.body.content);
      storage.create('Painting', newPainting)
        .then((painting) => {
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(painting));
          res.end();
          return undefined;
        });
    } catch (err) {
      logger.log(logger.ERROR, `PAINTING-ROUTE: There was a bad request ${err}`);
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('Bad request');
      res.end();
      return undefined;
    }
    return undefined;
  });
  router.get('/api/v1/painting', (req, res) => {
    if (req.url.query.id) {
      storage.fetchOne('Painting', req.url.query.id)
        .then((item) => {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(item));
          res.end();
          return undefined;
        })
        .catch((err) => {
          logger.log(logger.ERROR, err, JSON.stringify(err));
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.write('Resource not found');
          res.end();
          return undefined;
        });
    } else {
      storage.fetchAll('Paintings')
        .then((item) => {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(item));
          res.end();
          return undefined;
        })
        .catch((err) => {
          logger.log(logger.ERROR, err, JSON.stringify(err));
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.write('Resource not found');
          res.end();
          return undefined;
        });
    }
  }); 
  router.delete('/api/v1/painting', (req, res) => {
    storage.delete('Painting', req.url.query.id)
      .then(() => {
        res.writeHead(204, { 'Content-Type': 'text/plain' });
        res.write('No content in the body');
        res.end();
        return undefined;
      })
      .catch((err) => {
        logger.log(logger.ERROR, err, JSON.stringify(err));
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Resource not found');
        res.end();
        return undefined;
      });
    return undefined;
  });
};
