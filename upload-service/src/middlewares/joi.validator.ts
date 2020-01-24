import * as Joi from '@hapi/joi';
import { validatorErr } from '../utils'
/**
 * Helper function to validate an object against the provided schema,
 * and to throw a custom error if object is not valid.
 *
 * @param {Object} object The object to be validated.
 * @param {String} label The label to use in the error message.
 * @param {JoiSchema} schema The Joi schema to validate the object against.
 */
async function validateObject(object = {}, label, schema, options) {
    // Skip validation if no schema is provided
    if (schema) {
        schema = Joi.object(schema)
        // Validate the object against the provided schema
        try {
            const value = await schema.validateAsync(object, options)
        } catch (error) {
            // Throw error with custom message if validation failed
            consolelog(process.cwd(), "validation error", error.message, false)
            return  Promise.reject(error.message)
        }
    }
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
export const validate = function (validationObj) {
    // Return a Koa middleware function
    return async (ctx, next) => {
        try {
            // Validate each request data object in the Koa context object
            await validateObject(ctx.headers, 'Headers', validationObj.headers, { allowUnknown: true })
            await validateObject(ctx.params, 'URL Parameters', validationObj.params, { abortEarly: true })
            await validateObject(ctx.query, 'URL Query', validationObj.query, { abortEarly: true })

            if (ctx.request.body) {
                await validateObject(ctx.request.body, 'Request Body', validationObj.body, { abortEarly: true })
            }

            return next()
        } catch (error) {
            // If any of the objects fails validation, send an HTTP 400 response.
            return Promise.reject(validatorErr(error))
        }
    }
}
