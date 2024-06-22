/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Notification } from '../models/Notification';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class NotificationsService {
    /**
     * Get notifications
     * @returns Notification Notifications retrieved successfully
     * @throws ApiError
     */
    public static getNotifications(): CancelablePromise<Array<Notification>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/notifications',
        });
    }
    /**
     * Delete notification
     * @param notificationId
     * @returns void
     * @throws ApiError
     */
    public static deleteNotifications(
        notificationId: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/notifications/{notification_id}',
            path: {
                'notification_id': notificationId,
            },
            errors: {
                404: `Notification not found`,
            },
        });
    }
}
