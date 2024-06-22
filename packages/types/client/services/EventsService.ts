/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Event } from '../models/Event';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EventsService {
    /**
     * Create a new event
     * @param requestBody
     * @returns Event Event created successfully
     * @throws ApiError
     */
    public static postEvents(
        requestBody: Event,
    ): CancelablePromise<Event> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/events',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input`,
            },
        });
    }
    /**
     * Get a list of events
     * @returns Event List of events retrieved successfully
     * @throws ApiError
     */
    public static getEvents(): CancelablePromise<Array<Event>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/events',
        });
    }
    /**
     * Get event details
     * @param eventId
     * @returns Event Event details retrieved successfully
     * @throws ApiError
     */
    public static getEvents1(
        eventId: number,
    ): CancelablePromise<Event> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/events/{event_id}',
            path: {
                'event_id': eventId,
            },
            errors: {
                404: `Event not found`,
            },
        });
    }
    /**
     * Update event details
     * @param eventId
     * @param requestBody
     * @returns Event Event updated successfully
     * @throws ApiError
     */
    public static putEvents(
        eventId: number,
        requestBody: Event,
    ): CancelablePromise<Event> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/events/{event_id}',
            path: {
                'event_id': eventId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input`,
                404: `Event not found`,
            },
        });
    }
    /**
     * Delete event
     * @param eventId
     * @returns void
     * @throws ApiError
     */
    public static deleteEvents(
        eventId: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/events/{event_id}',
            path: {
                'event_id': eventId,
            },
            errors: {
                404: `Event not found`,
            },
        });
    }
    /**
     * Publish event
     * @param eventId
     * @returns any Event published successfully
     * @throws ApiError
     */
    public static putEventsPublish(
        eventId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/events/{event_id}/publish',
            path: {
                'event_id': eventId,
            },
            errors: {
                404: `Event not found`,
            },
        });
    }
    /**
     * Cancel event
     * @param eventId
     * @returns any Event cancelled successfully
     * @throws ApiError
     */
    public static putEventsCancel(
        eventId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/events/{event_id}/cancel',
            path: {
                'event_id': eventId,
            },
            errors: {
                404: `Event not found`,
            },
        });
    }
}
