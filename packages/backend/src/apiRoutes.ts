import { Router } from 'express';
import {
    registerUserValidator,
    updateUserValidator,
    createEventValidator,
    updateEventValidator,
    getAllEventsValidator,
    getEventValidator,
    getUserByIdValidator,
    getEventParticipantsValidator,
    deleteEventValidator,
    deleteUserValidator,
    searchEventsValidator,
    createCategoryValidator,
    updateCategoryValidator,
    deleteCategoryValidator,
    GetrsvpValidator,
    RSVPsValidator,
    PostrsvpValidator,
    filterhEventsValidator
} from './middleware/reqValidation';
import { UserController } from './controllers/userController';
import { EventController } from './controllers/eventController';
import { ParticipantController } from './controllers/participantController';
import { CategoryController } from './controllers/categoryController';
import { SearchController } from './controllers/SearchController';

const router = Router();



// User routes
router.post('/users', registerUserValidator, UserController.registerUser); // Register a new user
router.get('/users/:user_id', getUserByIdValidator, UserController.getUserById); // Get user by ID
router.put('/users/:user_id', updateUserValidator, UserController.updateUser); // Update user by ID
router.delete('/users/:user_id', deleteUserValidator, UserController.deleteUser); // Delete user by ID
router.get('/users/:user_id/events', GetrsvpValidator, UserController.getUserEvents); // Get events of a user
router.post('/users/:user_id/events', createEventValidator, EventController.createEvent); // Create a new event for a user
router.get('/users/:user_id/events/:event_id', getEventValidator, EventController.getEventById); // Get event by ID
router.post('/users/:user_id/events/:event_id/rsvps', RSVPsValidator, ParticipantController.getEventParticipants); // Get participants of an event
router.put('/users/:user_id/events/:event_id', updateEventValidator, EventController.updateEvent); // Update event by ID
router.delete('/users/:user_id/events/:event_id', deleteEventValidator, EventController.deleteEvent); // Delete event by ID
router.get('/users/:user_id/rsvps', GetrsvpValidator, UserController.getUserRSVPs); // Get RSVPs of a user
router.get('/users/:user_id/rsvps/:event_id', RSVPsValidator, ParticipantController.getUserRSVPsdetails); // Get RSVP details of a user for a specific event
router.post('/users/:user_id/rsvps', PostrsvpValidator, ParticipantController.addParticipant); // Add a participant to an event
router.delete('/users/:user_id/rsvps/:event_id', RSVPsValidator, ParticipantController.removeParticipant); // Remove a participant from an event
router.put('/users/:user_id/rsvps/:event_id', RSVPsValidator, ParticipantController.updateParticipant); // Update participant details

// Event routes
router.get('/events/filter', filterhEventsValidator, SearchController.filterEvents); // Filter events
router.get('/events/search', searchEventsValidator, SearchController.searchEvents); // Search events
router.get('/events', getAllEventsValidator, EventController.getAllEvents); // Get all events
router.get('/events/:event_id', getEventValidator, EventController.getEventById); // Get event by ID
router.get('/events/:event_id/participants', getEventParticipantsValidator, ParticipantController.getEventParticipants); // Get participants of an event

// Category routes
router.post('/categories', createCategoryValidator, CategoryController.createCategory); // Create a new category
router.put('/categories/:category_id', updateCategoryValidator, CategoryController.updateCategory); // Update category by ID
router.delete('/categories/:category_id', deleteCategoryValidator, CategoryController.deleteCategory); // Delete category by ID

// User routes
router.post('/users', registerUserValidator, UserController.registerUser); // Register a new user
router.get('/users/:user_id', getUserByIdValidator, UserController.getUserById); // Get user by ID
router.put('/users/:user_id', updateUserValidator, UserController.updateUser); // Update user by ID
router.delete('/users/:user_id', deleteUserValidator, UserController.deleteUser); // Delete user by ID
// router.put('/users/:user_id/password', changeUserPasswordValidator, UserController.changeUserPassword);

router.get('/users/:user_id/events', GetrsvpValidator, UserController.getUserEvents); // Get events of a user
router.post('/users/:user_id/events', createEventValidator, EventController.createEvent); // Create a new event for a user
router.get('/users/:user_id/events/:event_id', getEventValidator, EventController.getEventById); // Get event by ID
router.post('/users/:user_id/events/:event_id/rsvps', RSVPsValidator, ParticipantController.getEventParticipants); // Get participants of an event
router.put('/users/:user_id/events/:event_id', updateEventValidator, EventController.updateEvent); // Update event by ID
router.delete('/users/:user_id/events/:event_id', deleteEventValidator, EventController.deleteEvent); // Delete event by ID

router.get('/users/:user_id/rsvps', GetrsvpValidator, UserController.getUserRSVPs); // Get RSVPs of a user
router.get('/users/:user_id/rsvps/:event_id', RSVPsValidator, ParticipantController.getUserRSVPsdetails); // Get RSVP details of a user for a specific event
router.post('/users/:user_id/rsvps', PostrsvpValidator, ParticipantController.addParticipant); // Add a participant to an event
router.delete('/users/:user_id/rsvps/:event_id', RSVPsValidator, ParticipantController.removeParticipant); // Remove a participant from an event
router.put('/users/:user_id/rsvps/:event_id', RSVPsValidator, ParticipantController.updateParticipant); // Update participant details

// Event routes
router.get('/events/filter', filterhEventsValidator, SearchController.filterEvents); // Filter events
router.get('/events/search', searchEventsValidator, SearchController.searchEvents); // Search events

router.get('/events', getAllEventsValidator, EventController.getAllEvents); // Get all events
router.get('/events/:event_id', getEventValidator, EventController.getEventById); // Get event by ID
router.get('/events/:event_id/participants', getEventParticipantsValidator, ParticipantController.getEventParticipants); // Get participants of an event

// // Authentication routes
// router.post('/auth/login', loginUserValidator, UserController.loginUser);
// router.post('/auth/logout', logoutUserValidator, UserController.logoutUser);

// Category routes
router.post('/categories', createCategoryValidator, CategoryController.createCategory); // Create a new category
router.put('/categories/:category_id', updateCategoryValidator, CategoryController.updateCategory); // Update category by ID
router.delete('/categories/:category_id', deleteCategoryValidator, CategoryController.deleteCategory); // Delete category by ID

// // Notification routes
// router.post('/notifications', createNotificationValidator, NotificationController.createNotification);
// router.get('/notifications/:user_id', getNotificationsValidator, NotificationController.getNotifications);
// router.delete('/notifications/:notification_id', deleteNotificationValidator, NotificationController.deleteNotification);

// // Feedback routes
// router.post('/feedback', feedbackValidator, FeedbackController.createFeedback);
// router.delete('/feedback/:feedback_id', deleteFeedbackValidator, FeedbackController.deleteFeedback);
// router.get('/feedbacks', getFeedbacksValidator, FeedbackController.getFeedbacks);

export default router;
