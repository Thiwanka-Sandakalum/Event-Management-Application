import { Prisma } from '@prisma/client';
import CustomError from './customError';

// Mapping Prisma error codes to HTTP status codes
const prismaErrorCodeToStatusCode: { [key: string]: { statusCode: number; message: string } } = {
    // Authentication and connection errors
    P1000: { statusCode: 401, message: "DB Authentication failed" },
    P1001: { statusCode: 500, message: "Can't reach database server" },
    P1002: { statusCode: 500, message: "Database server timed out" },
    P1003: { statusCode: 500, message: "Database does not exist" },
    P1008: { statusCode: 500, message: "Operations timed out" },
    P1010: { statusCode: 403, message: "User was denied access" },
    P1017: { statusCode: 500, message: "Server has closed the connection" },
    // Query engine errors
    P2000: { statusCode: 400, message: "Provided value for the column is too long" },
    P2001: { statusCode: 404, message: "Record does not exist" },
    P2002: { statusCode: 409, message: "Unique constraint failed" },
    P2003: { statusCode: 400, message: "Foreign key constraint failed" },
    P2004: { statusCode: 400, message: "Constraint failed on the database" },
    P2005: { statusCode: 400, message: "Invalid value stored in the database" },
    P2006: { statusCode: 400, message: "Provided value is not valid" },
    P2007: { statusCode: 400, message: "Data validation error" },
    P2008: { statusCode: 400, message: "Failed to parse the query" },
    P2009: { statusCode: 400, message: "Failed to validate the query" },
    P2010: { statusCode: 400, message: "Raw query failed" },
    P2011: { statusCode: 400, message: "Null constraint violation" },
    P2012: { statusCode: 400, message: "Missing required value" },
    P2013: { statusCode: 400, message: "Missing required argument" },
    P2014: { statusCode: 400, message: "Required relation violation" },
    P2015: { statusCode: 400, message: "Related record not found" },
    P2016: { statusCode: 400, message: "Query interpretation error" },
    P2017: { statusCode: 400, message: "Records not connected" },
    P2018: { statusCode: 400, message: "Required connected records not found" },
    P2019: { statusCode: 400, message: "Input error" },
    P2020: { statusCode: 400, message: "Value out of range" },
    P2021: { statusCode: 404, message: "Table does not exist" },
    P2022: { statusCode: 404, message: "Column does not exist" },
    P2023: { statusCode: 500, message: "Inconsistent column data" },
    P2024: { statusCode: 500, message: "Connection pool timeout" },
    P2025: { statusCode: 404, message: "Operation depends on missing records" },
    P2026: { statusCode: 400, message: "Feature not supported by the current database" },
    P2027: { statusCode: 500, message: "Multiple database errors occurred" },
    P2028: { statusCode: 500, message: "Transaction API error" },
    P2029: { statusCode: 400, message: "Query parameter limit exceeded" },
    P2030: { statusCode: 400, message: "Fulltext index not found" },
    P2031: { statusCode: 400, message: "MongoDB replica set required" },
    P2033: { statusCode: 400, message: "Number too large for 64-bit integer" },
    P2034: { statusCode: 400, message: "Transaction failed due to write conflict or deadlock" },
    P2035: { statusCode: 500, message: "Assertion violation on the database" },
    P2036: { statusCode: 500, message: "Error in external connector" },
    P2037: { statusCode: 500, message: "Too many database connections opened" },
};
/**
 * Handles Prisma client known request errors and maps them to CustomError with appropriate status code.
 * @param err Prisma.PrismaClientKnownRequestError - The error thrown by Prisma client.
 * @returns CustomError - Custom error object with mapped status code and error message.
 */
export const handlePrismaError = (err: Prisma.PrismaClientKnownRequestError): CustomError => {
    const statusCode = prismaErrorCodeToStatusCode[err.code]?.statusCode || 500;
    const message = `${prismaErrorCodeToStatusCode[err.code]?.message} : ${err.meta?.target} ${err.meta?.field_name} ` || '';
    return new CustomError(message, statusCode);
};
