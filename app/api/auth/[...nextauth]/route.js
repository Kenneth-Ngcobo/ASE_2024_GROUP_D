import { handlers } from "../../../../auth";


/**
 * Re-exports the authentication handlers for handling HTTP requests.
 * 
 * @constant
 * @type {{ GET: function, POST: function }}
 * @property {function} GET - The handler function for GET requests related to authentication.
 * @property {function} POST - The handler function for POST requests related to authentication.
 */
export const { GET, POST } = handlers;