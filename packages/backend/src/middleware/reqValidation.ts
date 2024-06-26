import { body, param, query } from 'express-validator';

// Validation rules for registerUser request
export const registerUserValidator = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password_hash').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('first_name').optional().isString().withMessage('First name must be a string'),
    body('last_name').optional().isString().withMessage('Last name must be a string'),
    body('bio').optional().isString().withMessage('Bio must be a string'),
    body('profile_picture_url').optional().isURL().withMessage('Profile picture URL must be a valid URL'),
    body('social_links').optional().isObject().withMessage('Social links must be an object'),
    body('address').optional().isString().withMessage('Address must be a string'),
];

// Validation rules for updateUser request
export const updateUserValidator = [
    param('user_id').isInt().withMessage('User ID must be an integer'),
    body('username').optional().notEmpty().withMessage('Username is required'),
    body('email').optional().isEmail().withMessage('Invalid email format'),
    body('password_hash').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('first_name').optional().isString().withMessage('First name must be a string'),
    body('last_name').optional().isString().withMessage('Last name must be a string'),
    body('bio').optional().isString().withMessage('Bio must be a string'),
    body('profile_picture_url').optional().isURL().withMessage('Profile picture URL must be a valid URL'),
    body('social_links').optional().isObject().withMessage('Social links must be an object'),
    body('address').optional().isString().withMessage('Address must be a string'),
];

// Validation rules for changeUserPassword request
export const changeUserPasswordValidator = [
    param('user_id').isInt().withMessage('User ID must be an integer'),
    body('password_hash').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

// Validation rules for createEvent request
export const createEventValidator = [
    param('user_id').isInt().withMessage('User ID must be an integer'),
    body('name').notEmpty().withMessage('Name is required'),
    body('date').isISO8601({ strict: true, strictSeparator: true }).toDate().withMessage('Start time must be a valid time'),
    body('end_time').optional().isISO8601({ strict: true, strictSeparator: true }).toDate().withMessage('End time must be a valid time'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('location').optional().isString().withMessage('Location must be a string'),
    body('pricing_info').optional().isFloat().withMessage('Pricing info must be a number'),
    body('thumbnail_url').optional().isURL().withMessage('Thumbnail URL must be a valid URL'),
    body('capacity').optional().isInt().withMessage('Capacity must be an integer'),
    body('state').isIn(['PUBLISHED', 'DRAFT', 'CANCELLED']).withMessage('State must be one of PUBLISHED, DRAFT, CANCELLED'),
];

// Validation rules for updateEvent request
export const updateEventValidator = [
    param('event_id').isInt().withMessage('Event ID must be an integer'),
    body('name').optional().notEmpty().withMessage('Name is required'),
    body('date').optional().isISO8601().withMessage('Date must be a valid date'),
    body('start_time').optional().isISO8601().withMessage('Start time must be a valid time'),
    body('end_time').optional().isISO8601().withMessage('End time must be a valid time'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('location').optional().isString().withMessage('Location must be a string'),
    body('pricing_info').optional().isFloat().withMessage('Pricing info must be a number'),
    body('thumbnail_url').optional().isURL().withMessage('Thumbnail URL must be a valid URL'),
    body('capacity').optional().isInt().withMessage('Capacity must be an integer'),
    body('state').optional().isIn(['PUBLISHED', 'DRAFT', 'CANCELLED']).withMessage('State must be one of PUBLISHED, DRAFT, CANCELLED'),
];

// Validation rules for getAllEvents request
export const getAllEventsValidator = [
    query('state').optional().isIn(['PUBLISHED', 'DRAFT', 'CANCELLED']).withMessage('State must be one of PUBLISHED, DRAFT, CANCELLED'),
    query('user_id').optional().isInt().withMessage('User ID must be an integer'),
];

// Validation rules for getEvent request
export const getEventValidator = [
    param('event_id').isInt().withMessage('Event ID must be an integer'),
];
// Validation rules for feedback request
export const feedbackValidator = [
    body('message').notEmpty().withMessage('Feedback message is required'),
];

// Validation rules for getUserById request
export const getUserByIdValidator = [
    param('user_id').isInt().withMessage('User ID must be an integer'),
];


// Validation rules for RSVP request
export const PostrsvpValidator = [
    param('user_id').isInt().withMessage('User ID must be an integer'),
    body('event_id').isInt().withMessage('Event ID must be an integer'),
    body('rsvp_date').optional().isISO8601().withMessage('rsvp_date must be a valid time'),
];

// Validation rules for my get RSVP's request
export const GetrsvpValidator = [
    param('user_id').isInt().withMessage('User ID must be an integer'),
];

// Validation rules for getUserRSVPs request
export const RSVPsValidator = [
    param('event_id').isInt().withMessage('Event ID must be an integer').notEmpty(),
    param('user_id').isInt().withMessage('User ID must be an integer'),
];

// Validation rules for cancelRSVP request
export const cancelRSVPValidator = [
    param('participant_id').isInt().withMessage('Participant ID must be an integer'),
];

// Validation rules for getEventParticipants request
export const getEventParticipantsValidator = [
    param('event_id').isInt().withMessage('Event ID must be an integer'),
    query('status').optional().isIn(['GOING', 'INTERESTED', 'NOT_GOING']).withMessage('Status must be one of GOING, INTERESTED, NOT_GOING'),
];

// Validation rules for updateEventState request
export const updateEventStateValidator = [
    param('event_id').isInt().withMessage('Event ID must be an integer'),
    body('state').isIn(['PUBLISHED', 'DRAFT', 'CANCELLED']).withMessage('State must be one of PUBLISHED, DRAFT, CANCELLED'),
];


// Validation rules for deleteEvent request
export const deleteEventValidator = [
    param('event_id').isInt().withMessage('Event ID must be an integer'),
    param('user_id').isInt().withMessage('User ID must be an integer'),

];

// Validation rules for deleteUser request
export const deleteUserValidator = [
    param('user_id').isInt().withMessage('User ID must be an integer'),
];

// Validation rules for deleteFeedback request
export const deleteFeedbackValidator = [
    param('feedback_id').isInt().withMessage('Feedback ID must be an integer'),
];

// Validation rules for getFeedbacks request
export const getFeedbacksValidator = [
    query('user_id').optional().isInt().withMessage('User ID must be an integer'),
];

// Validation rules for searchEvents request
export const searchEventsValidator = [
    query('keyword').notEmpty().isString().withMessage('Keyword must be a string')

];

export const filterhEventsValidator = [
    query('date').optional().isISO8601().withMessage('Date must be in ISO8601 format'),
    query('location').optional().isString().withMessage('Location must be a string'),
    query('category').optional().isArray().withMessage('Category must be an array of strings'),
    query('category.*').optional().isString().withMessage('Each category must be a string'),
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
];


// Validation rules for searchUsers request
export const searchUsersValidator = [
    query('username').optional().isString().withMessage('Username must be a string'),
    query('email').optional().isEmail().withMessage('Invalid email format'),
];

// Validation rules for createCategory request
export const createCategoryValidator = [
    body('categories').notEmpty().withMessage('Category name is required').isArray().withMessage('Category must be an array'),
];

// Validation rules for updateCategory request
export const updateCategoryValidator = [
    param('category_id').isInt().withMessage('Category ID must be an integer'),
    body('name').optional().notEmpty().withMessage('Category name is required'),
];

// Validation rules for deleteCategory request
export const deleteCategoryValidator = [
    param('category_id').isInt().withMessage('Category ID must be an integer'),
];

// Validation rules for createNotification request
export const createNotificationValidator = [
    body('user_id').isInt().withMessage('User ID must be an integer'),
    body('message').notEmpty().withMessage('Notification message is required'),
];

// Validation rules for getNotifications request
export const getNotificationsValidator = [
    param('user_id').isInt().withMessage('User ID must be an integer'),
];

// Validation rules for deleteNotification request
export const deleteNotificationValidator = [
    param('notification_id').isInt().withMessage('Notification ID must be an integer'),
];

// Validation rules for addParticipant request
export const addParticipantValidator = [
    body('user_id').isInt().withMessage('User ID must be an integer'),
    body('event_id').isInt().withMessage('Event ID must be an integer'),
    body('rsvp_date').optional().isISO8601().withMessage('RSVP date must be a valid date'),
    body('payment_status').optional().isBoolean().withMessage('Payment status must be a boolean'),
];

// Validation rules for removeParticipant request
export const removeParticipantValidator = [
    param('user_id').isInt().withMessage('Participant ID must be an integer'),
];

// Validation rules for loginUser request
export const loginUserValidator = [
    body('username').notEmpty().withMessage('Username is required'),
    body('password_hash').notEmpty().withMessage('Password is required'),
];

// Validation rules for logoutUser request
export const logoutUserValidator = [
    // No specific validations needed for logout
];
