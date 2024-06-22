import * as api from './api';

// Exporting schemas
export type User = api.components['schemas']['User'];
export type Event = api.components['schemas']['Event'];
export type Category = api.components['schemas']['Category'];
export type Participant = api.components['schemas']['Participant'];
export type Notification = api.components['schemas']['Notification'];

// Users endpoint types
export type RegisterUserRequest =
    | api.paths['/users']['post']['requestBody']['content']['application/json'];
export type RegisterUserResponse =
    | api.paths['/users']['post']['responses']['201']['content']['application/json']
    | api.paths['/users']['post']['responses']['400'];

export type GetUserRequest =
    | api.paths['/users/{user_id}']['get']['parameters']['path'];
export type GetUserResponse =
    | api.paths['/users/{user_id}']['get']['responses']['200']['content']['application/json']
    | api.paths['/users/{user_id}']['get']['responses']['404'];

export type UpdateUserRequest =
    | api.paths['/users/{user_id}']['put']['parameters']['path']
    | api.paths['/users/{user_id}']['put']['requestBody']['content']['application/json'];
export type UpdateUserResponse =
    | api.paths['/users/{user_id}']['put']['responses']['200']['content']['application/json']
    | api.paths['/users/{user_id}']['put']['responses']['400']
    | api.paths['/users/{user_id}']['put']['responses']['404'];

export type DeleteUserRequest =
    | api.paths['/users/{user_id}']['delete']['parameters']['path'];
export type DeleteUserResponse =
    | api.paths['/users/{user_id}']['delete']['responses']['204']
    | api.paths['/users/{user_id}']['delete']['responses']['404'];

// Events endpoint types
export type GetEventsRequest =
    | api.paths['/events']['get']['parameters']['query'];
export type GetEventsResponse =
    | api.paths['/events']['get']['responses']['200']['content']['application/json'];

export type CreateEventRequest =
    | api.paths['/events']['post']['requestBody']['content']['application/json'];
export type CreateEventResponse =
    | api.paths['/events']['post']['responses']['201']['content']['application/json']
    | api.paths['/events']['post']['responses']['400'];

export type GetEventDetailsRequest =
    | api.paths['/events/{event_id}']['get']['parameters']['path'];
export type GetEventDetailsResponse =
    | api.paths['/events/{event_id}']['get']['responses']['200']['content']['application/json']
    | api.paths['/events/{event_id}']['get']['responses']['404'];

export type UpdateEventRequest =
    | api.paths['/events/{event_id}']['put']['parameters']['path']
    | api.paths['/events/{event_id}']['put']['requestBody']['content']['application/json'];
export type UpdateEventResponse =
    | api.paths['/events/{event_id}']['put']['responses']['200']['content']['application/json']
    | api.paths['/events/{event_id}']['put']['responses']['400']
    | api.paths['/events/{event_id}']['put']['responses']['404'];

export type DeleteEventRequest =
    | api.paths['/events/{event_id}']['delete']['parameters']['path'];
export type DeleteEventResponse =
    | api.paths['/events/{event_id}']['delete']['responses']['204']
    | api.paths['/events/{event_id}']['delete']['responses']['404'];

// Participants endpoint types
export type RsvpEventRequest =
    | api.paths['/participants']['post']['requestBody']['content']['application/json'];
export type RsvpEventResponse =
    | api.paths['/participants']['post']['responses']['201']['content']['application/json']
    | api.paths['/participants']['post']['responses']['400'];

export type CancelRsvpRequest =
    | api.paths['/participants']['delete']['parameters']['path'];
export type CancelRsvpResponse =
    | api.paths['/participants']['delete']['responses']['204']
    | api.paths['/participants']['delete']['responses']['404'];

// Notifications endpoint types
export type GetNotificationsRequest =
    | api.paths['/notifications']['get']['parameters']['query'];
export type GetNotificationsResponse =
    | api.paths['/notifications']['get']['responses']['200']['content']['application/json'];

export type DeleteNotificationRequest =
    | api.paths['/notifications/{notification_id}']['delete']['parameters']['path'];
export type DeleteNotificationResponse =
    | api.paths['/notifications/{notification_id}']['delete']['responses']['204']
    | api.paths['/notifications/{notification_id}']['delete']['responses']['404'];
