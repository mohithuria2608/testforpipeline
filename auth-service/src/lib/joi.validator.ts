import * as Joi from '@hapi/joi';

/**
 * Helper function to validate an object against the provided schema,
 * and to throw a custom error if object is not valid.
 *
 * @param {Object} object The object to be validated.
 * @param {String} label The label to use in the error message.
 * @param {JoiSchema} schema The Joi schema to validate the object against.
 */
function validateObject(object = {}, label, schema, options) {
    try {
        if (schema) {
            schema = Joi.object({ schema })
            // Validate the object against the provided schema
            const { error, value } = schema.validate(object, options)
            return {}
        }
    } catch (error) {
        throw new Error(`Invalid ${label} - ${error.message}`)
    }
    // Skip validation if no schema is provided

}

/**
 * Generate a Koa middleware function to validate a request using
 * the provided validation objects.
 *
 * @param {Object} validationObj
 * @param {Object} validationObj.headers The request headers schema
 * @param {Object} validationObj.params The request params schema
 * @param {Object} validationObj.query The request query schema
 * @param {Object} validationObj.body The request body schema
 * @returns A validation middleware function.
 */
export let validate = function (validationObj) {
    // Return a Koa middleware function
    return (ctx, next) => {
        try {
            // Validate each request data object in the Koa context object
            validateObject(ctx.headers, 'Headers', validationObj.headers, { allowUnknown: true, abortEarly: true })
            validateObject(ctx.params, 'URL Parameters', validationObj.params, { abortEarly: true })
            validateObject(ctx.query, 'URL Query', validationObj.query, { abortEarly: true })

            if (ctx.request.body) {
                validateObject(ctx.request.body, 'Request Body', validationObj.body, { abortEarly: true })
            }

            return next()
        } catch (err) {
            // If any of the objects fails validation, send an HTTP 400 response.
            ctx.throw(400, err.message)
        }
    }
}

// module.exports = validate
