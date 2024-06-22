/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Event = {
    readonly event_id?: number;
    user_id?: number;
    name?: string;
    description?: string;
    date?: string;
    start_time?: string;
    end_time?: string;
    location?: string;
    pricing_info?: number;
    thumbnail_url?: string;
    capacity?: number;
    state?: Event.state;
    readonly created_at?: string;
    readonly updated_at?: string;
};
export namespace Event {
    export enum state {
        PUBLISHED = 'PUBLISHED',
        DRAFT = 'DRAFT',
        CANCELLED = 'CANCELLED',
    }
}

