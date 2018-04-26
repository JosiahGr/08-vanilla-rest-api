#### Feature Tasks
* create a custom body parser module that uses promises to parse the JSON body of `POST` and `PUT` requests
* create a router constructor that handles requests to `GET`, `POST`, `PUT`, and `DELETE` requests
* create a storage module that will store resources by their schema type (ex: note) and id

## Server Endpoints
### `/api/simple-resource-name`
* `POST` request
 * pass data as stringifed JSON in the body of a **POST** request to create a new resource
* `GET` request
 * pass `?id=<uuid>` as a query string parameter to retrieve a specific resource (as JSON)
 * `GET ALL (storage.fetchAll)` request
 * think of an API endpoint that makes sense, e.g.`/api/v1/notes`, and use that endpoint to retrieve an array of all the resource ID's
* `DELETE` request
 * pass `?id=<uuid>` in the query string to **DELETE** a specific resource
 * this should return a 204 status code with no content in the body

## Tests
* write a test to ensure that your api returns a status code of 404 for routes that have not been registered
* write tests to ensure the `/api/simple-resource-name` endpoint responds as described for each condition below:
 * `GET`: test 404, it should respond with 'not found' for valid requests made with an id that was not found
 * `GET`: test 400, it should respond with 'bad request' if no id was provided in the request
 * `GET`: test 200, it should contain a response body for a request made with a valid id
 * `POST`: test 400, it should respond with 'bad request' if no request body was provided or the body was invalid
 * `POST`: test 200, it should respond with the body content for a post request with a valid body

