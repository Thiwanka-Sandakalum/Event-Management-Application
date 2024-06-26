import * as api from './api';

// Exporting schemas
export type User = api.components['schemas']['User'];
export type Event = api.components['schemas']['Event'];
export type Category = api.components['schemas']['Category'];
export type Participant = api.components['schemas']['Participant'];
export type Notification = api.components['schemas']['Notification'];
export type Error = api.components['schemas']['Error'];

// POST /users
export type CreateUserRequest = api.paths['/users']['post']['requestBody']['content']['application/json'];
export type CreateUserResponse =
    | api.paths['/users']['post']['responses']['201']['content']['application/json']
    | api.paths['/users']['post']['responses']['400']['content']['application/json']
    | api.paths['/users']['post']['responses']['500']['content']['application/json'];

// POST /auth/login
export type LoginRequest = {
    email?: string;
    password?: string;
};
export type LoginResponse =
    | { token?: string }
    | { status: 401 }
    | api.paths['/auth/login']['post']['responses']['500']['content']['application/json'];

// POST /auth/logout
export type LogoutResponse = { status: 204 } | api.paths['/auth/logout']['post']['responses']['500']['content']['application/json'];

// GET /users/{user_id}
export type GetUserResponse =
    | api.paths['/users/{user_id}']['get']['responses']['200']['content']['application/json']
    | api.paths['/users/{user_id}']['get']['responses']['404']['content']['application/json']
    | api.paths['/users/{user_id}']['get']['responses']['500']['content']['application/json'];

// PUT /users/{user_id}
export type UpdateUserRequest = api.paths['/users/{user_id}']['put']['requestBody']['content']['application/json'];
export type UpdateUserResponse =
    | api.paths['/users/{user_id}']['put']['responses']['200']['content']['application/json']
    | api.paths['/users/{user_id}']['put']['responses']['400']['content']['application/json']
    | api.paths['/users/{user_id}']['put']['responses']['404']['content']['application/json']
    | api.paths['/users/{user_id}']['put']['responses']['500']['content']['application/json'];

// DELETE /users/{user_id}
export type DeleteUserResponse =
    | { status: 204 }
    | { status: 404 }
    | api.paths['/users/{user_id}']['delete']['responses']['500']['content']['application/json'];

// PUT /users/{user_id}/password
export type UpdatePasswordRequest = { password?: string };
export type UpdatePasswordResponse =
    | { status: 200 }
    | api.paths['/users/{user_id}/password']['put']['responses']['400']['content']['application/json']
    | api.paths['/users/{user_id}/password']['put']['responses']['404']['content']['application/json']
    | api.paths['/users/{user_id}/password']['put']['responses']['500']['content']['application/json'];

// GET /users/{user_id}/events
export type GetUserEventsResponse =
    | api.paths['/users/{user_id}/events']['get']['responses']['200']['content']['application/json']
    | api.paths['/users/{user_id}/events']['get']['responses']['404']['content']['application/json']
    | api.paths['/users/{user_id}/events']['get']['responses']['500']['content']['application/json'];

// POST /users/{user_id}/events
export type CreateEventRequest = api.paths['/users/{user_id}/events']['post']['requestBody']['content']['application/json'];
export type CreateEventResponse =
    | api.paths['/users/{user_id}/events']['post']['responses']['201']['content']['application/json']
    | api.paths['/users/{user_id}/events']['post']['responses']['400']['content']['application/json']
    | api.paths['/users/{user_id}/events']['post']['responses']['500']['content']['application/json'];

// GET /users/{user_id}/events/{event_id}
export type GetEventResponse =
    | api.paths['/users/{user_id}/events/{event_id}']['get']['responses']['200']['content']['application/json']
    | api.paths['/users/{user_id}/events/{event_id}']['get']['responses']['404']['content']['application/json']
    | api.paths['/users/{user_id}/events/{event_id}']['get']['responses']['500']['content']['application/json'];

// PUT /users/{user_id}/events/{event_id}
export type UpdateEventRequest = api.paths['/users/{user_id}/events/{event_id}']['put']['requestBody']['content']['application/json'];
export type UpdateEventResponse =
    | api.paths['/users/{user_id}/events/{event_id}']['put']['responses']['200']['content']['application/json']
    | api.paths['/users/{user_id}/events/{event_id}']['put']['responses']['400']['content']['application/json']
    | api.paths['/users/{user_id}/events/{event_id}']['put']['responses']['404']['content']['application/json']
    | api.paths['/users/{user_id}/events/{event_id}']['put']['responses']['500']['content']['application/json'];

// DELETE /users/{user_id}/events/{event_id}
export type DeleteEventResponse =
    | { status: 204 }
    | api.paths['/users/{user_id}/events/{event_id}']['delete']['responses']['404']['content']['application/json']
    | api.paths['/users/{user_id}/events/{event_id}']['delete']['responses']['500']['content']['application/json'];

// GET /users/{user_id}/rsvps/rsvps_id
export type GetUserRsvpsResponse =
    | api.paths['/users/{user_id}/rsvps/rsvps_id']['get']['responses']['200']['content']['application/json']
    | api.paths['/users/{user_id}/rsvps/rsvps_id']['get']['responses']['404']['content']['application/json']
    | api.paths['/users/{user_id}/rsvps/rsvps_id']['get']['responses']['500']['content']['application/json'];

// PUT /users/{user_id}/rsvps/rsvps_id
export type UpdateRsvpPaymentRequest = { payment_status?: boolean };
export type UpdateRsvpPaymentResponse =
    | { status: 204 }
    | api.paths['/users/{user_id}/rsvps/rsvps_id']['put']['responses']['404']['content']['application/json']
    | api.paths['/users/{user_id}/rsvps/rsvps_id']['put']['responses']['500']['content']['application/json'];

// POST /users/{user_id}/rsvps/rsvps_id
export type CreateRsvpRequest = api.paths['/users/{user_id}/rsvps/rsvps_id']['post']['requestBody']['content']['application/json'];
export type CreateRsvpResponse =
    | api.paths['/users/{user_id}/rsvps/rsvps_id']['post']['responses']['201']['content']['application/json']
    | api.paths['/users/{user_id}/rsvps/rsvps_id']['post']['responses']['400']['content']['application/json']
    | api.paths['/users/{user_id}/rsvps/rsvps_id']['post']['responses']['500']['content']['application/json'];

// DELETE /users/{user_id}/rsvps/rsvps_id
export type DeleteRsvpResponse =
    | { status: 204 }
    | api.paths['/users/{user_id}/rsvps/rsvps_id']['delete']['responses']['404']['content']['application/json']
    | api.paths['/users/{user_id}/rsvps/rsvps_id']['delete']['responses']['500']['content']['application/json'];


// GET /events
export type GetEventsResponse =
    | api.paths['/events']['get']['responses']['200']['content']['application/json']
    | api.paths['/events']['get']['responses']['400']['content']['application/json']
    | api.paths['/events']['get']['responses']['404']['content']['application/json']
    | api.paths['/events']['get']['responses']['500']['content']['application/json'];

// GET /events/search
export type SearchEventsRequest = {
    keyword?: string;
};
export type SearchEventsResponse =
    | api.paths['/events/search']['get']['responses']['200']['content']['application/json']
    | api.paths['/events/search']['get']['responses']['404']['content']['application/json']
    | api.paths['/events/search']['get']['responses']['500']['content']['application/json'];

// GET /events/filter
export type FilterEventsRequest = {
    date?: string;
    location?: string;
    category?: string[];
    page?: number;
    limit?: number;
};
export type FilterEventsResponse =
    | api.paths['/events/filter']['get']['responses']['200']['content']['application/json']
    | api.paths['/events/filter']['get']['responses']['404']['content']['application/json']
    | api.paths['/events/filter']['get']['responses']['500']['content']['application/json'];

// GET /events/{event_id}/participants
export type GetEventParticipantsRequest = {
    event_id: number;
};
export type GetEventParticipantsResponse =
    | api.paths['/events/{event_id}/participants']['get']['responses']['200']['content']['application/json']
    | api.paths['/events/{event_id}/participants']['get']['responses']['404']['content']['application/json']
    | api.paths['/events/{event_id}/participants']['get']['responses']['500']['content']['application/json'];

// POST /categories
export type CreateCategoryRequest = api.paths['/categories']['post']['requestBody']['content']['application/json'];
export type CreateCategoryResponse =
    | api.paths['/categories']['post']['responses']['201']['content']['application/json']
    | api.paths['/categories']['post']['responses']['400']['content']['application/json']
    | api.paths['/categories']['post']['responses']['500']['content']['application/json'];

// PUT /categories/{category_id}
export type UpdateCategoryRequest = api.paths['/categories/{category_id}']['put']['requestBody']['content']['application/json'];
export type UpdateCategoryResponse =
    | api.paths['/categories/{category_id}']['put']['responses']['200']['content']['application/json']
    | api.paths['/categories/{category_id}']['put']['responses']['404']['content']
    | api.paths['/categories/{category_id}']['put']['responses']['500']['content']['application/json'];

// DELETE /categories/{category_id}
export type DeleteCategoryResponse =
    | { status: 204 }
    | api.paths['/categories/{category_id}']['delete']['responses']['404']['content']['application/json']
    | api.paths['/categories/{category_id}']['delete']['responses']['500']['content']['application/json'];

// GET /admin/users
export type GetUsersResponse =
    | api.paths['/admin/users']['get']['responses']['200']['content']['application/json']
    | api.paths['/admin/users']['get']['responses']['500']['content']['application/json'];

// DELETE /admin/users/{user_id}
export type BanUserResponse =
    | api.paths['/admin/users/{user_id}']['delete']['responses']['200']['content']['application/json']
    | api.paths['/admin/users/{user_id}']['delete']['responses']['404']['content']['application/json']
    | api.paths['/admin/users/{user_id}']['delete']['responses']['500']['content']['application/json'];

// POST /feedback
export type SendFeedbackRequest = api.paths['/feedback']['post']['requestBody']['content']['application/json'];
export type SendFeedbackResponse =
    | api.paths['/feedback']['post']['responses']['201']['content']['application/json']
    | api.paths['/feedback']['post']['responses']['400']['content']['application/json']
    | api.paths['/feedback']['post']['responses']['500']['content']['application/json'];