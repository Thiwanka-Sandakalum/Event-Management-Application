/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * Register a new user
     * @param requestBody
     * @returns User User created successfully
     * @throws ApiError
     */
    public static postUsers(
        requestBody: User,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input`,
            },
        });
    }
    /**
     * Get user profile
     * @param userId
     * @returns User User profile retrieved successfully
     * @throws ApiError
     */
    public static getUsers(
        userId: number,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{user_id}',
            path: {
                'user_id': userId,
            },
            errors: {
                404: `User not found`,
            },
        });
    }
    /**
     * Update user profile
     * @param userId
     * @param requestBody
     * @returns User User profile updated successfully
     * @throws ApiError
     */
    public static putUsers(
        userId: number,
        requestBody: User,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/users/{user_id}',
            path: {
                'user_id': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input`,
                404: `User not found`,
            },
        });
    }
    /**
     * Delete user account
     * @param userId
     * @returns void
     * @throws ApiError
     */
    public static deleteUsers(
        userId: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/users/{user_id}',
            path: {
                'user_id': userId,
            },
            errors: {
                404: `User not found`,
            },
        });
    }
}
