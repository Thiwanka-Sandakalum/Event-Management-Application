/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Participant } from '../models/Participant';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ParticipantsService {
    /**
     * RSVP to an event
     * @param requestBody
     * @returns Participant RSVP successful
     * @throws ApiError
     */
    public static postParticipants(
        requestBody: {
            user_id?: number;
            event_id?: number;
        },
    ): CancelablePromise<Participant> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/participants',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input`,
            },
        });
    }
    /**
     * Cancel RSVP
     * @param participantId
     * @returns void
     * @throws ApiError
     */
    public static deleteParticipants(
        participantId: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/participants',
            path: {
                'participant_id': participantId,
            },
            errors: {
                404: `Participant not found`,
            },
        });
    }
}
