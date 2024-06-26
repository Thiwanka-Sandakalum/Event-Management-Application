const request = require('supertest');
const express = require('express');
import app from '../src/app';

describe('API Endpoints', () => {
    let userId: number;
    let eventId: number;

    // Test case for registering a new user
    it('should register a new user', async () => {
        const userData = {
            username: "dunu",
            email: "johndssdunuoe@exnample.com",
            password_hash: "5f4cf99",
            first_name: "John",
            last_name: "Doe",
            bio: "A software developer with a passion for coding and technology.",
            profile_picture_url: "https://example.com/images/johndoe.jpg",
            social_links: {
                twitter: "https://twitter.com/johndoe"
            },
            address: "123 Main Street, Anytown, AT 12345",
            created_at: "2023-01-01T12:00:00Z",
            updated_at: "2023-06-24T12:00:00Z"
        };

        const response = await request(app)
            .post('/api/users')
            .send(userData)
            .expect('Content-Type', /json/)
            .expect(201);


        userId = response.body.user_id;
    });


    it('should fetch user profile', async () => {
        await request(app)
            .get(`/api/users/${userId}`)
            .expect('Content-Type', /json/)
            .expect(200);
    });


    it('should update user profile', async () => {
        const updatedUserData = {
            password_hash: 'newpasswordhash',
            first_name: 'Updated',
            last_name: 'User',
            bio: 'Updated bio',
            profile_picture_url: 'https://example.com/images/updateduser.jpg',
            social_links: {
                twitter: 'https://twitter.com/updateduser'
            },
            address: '456 Updated Street, Anytown, AT 54321',
            created_at: '2023-01-01T12:00:00Z',
            updated_at: '2023-06-24T12:00:00Z'
        };

        await request(app)
            .put(`/api/users/${userId}`)
            .send(updatedUserData)
            .expect('Content-Type', /json/)
            .expect(200);
    });


    // Test case for getting user events
    it('should fetch user events', async () => {
        await request(app)
            .get(`/api/users/${userId}/events`)
            .expect('Content-Type', /json/)
            .expect(200);
    });

    // Test case for creating a new event
    it('should create a new event', async () => {
        const eventData = {
            user_id: userId,
            name: "Sample Event",
            description: "This is a sample event",
            date: "2023-07-01T10:00:00Z",
            end_time: "2023-07-01T12:00:00Z",
            location: "456 Event Street, Anytown, AT 65432",
            pricing_info: 0.0,
            thumbnail_url: "https://example.com/images/sample-event.jpg",
            capacity: 100,
            state: "DRAFT",
            created_at: "2023-06-25T12:00:00Z",
            updated_at: "2023-06-25T12:00:00Z"
        };

        const response = await request(app)
            .post(`/api/users/${userId}/events`)
            .send(eventData)
            .expect('Content-Type', /json/)
            .expect(201);

        eventId = response.body.event_id;
    });

    // Test case for getting a specific event by ID
    it('should fetch event by ID', async () => {
        await request(app)
            .get(`/api/users/${userId}/events/${eventId}`)
            .expect('Content-Type', /json/)
            .expect(200);
    });

    // Test case for updating an event
    it('should update an event', async () => {
        const updatedEventData = {
            name: "Updated Event",
            description: "This is an updated event",
            date: "2023-07-02T10:00:00Z",
            end_time: "2023-07-02T12:00:00Z",
            location: "789 Updated Street, Anytown, AT 98765",
            pricing_info: 0.0,
            thumbnail_url: "https://example.com/images/updated-event.jpg",
            capacity: 100,
            state: "PUBLISHED",
            created_at: "2023-06-25T12:00:00Z",
            updated_at: "2023-06-25T12:00:00Z"
        };

        await request(app)
            .put(`/api/users/${userId}/events/${eventId}`)
            .send(updatedEventData)
            .expect('Content-Type', /json/)
            .expect(200);
    });

    it('should get all RSVPs for a user', async () => {
        await request(app)
            .get(`/api/users/${userId}/rsvps`)
            .expect('Content-Type', /json/)
            .expect(200);
    });

    it('should add a participant (RSVP) to an event', async () => {
        const rsvpData = {
            user_id: userId,
            event_id: eventId
        };

        await request(app)
            .post(`/api/users/${userId}/rsvps`)
            .send(rsvpData)
            .expect('Content-Type', /json/)
            .expect(201);
    });

    it('should get RSVP details for a specific event', async () => {
        await request(app)
            .get(`/api/users/${userId}/rsvps/${eventId}`)
            .expect('Content-Type', /json/)
            .expect(200);
    });

    it('should update a participant (RSVP) for an event', async () => {
        const updatedRsvpData = {
            payment_status: true
        };

        await request(app)
            .put(`/api/users/${userId}/rsvps/${eventId}`)
            .send(updatedRsvpData)
            .expect('Content-Type', /json/)
            .expect(200);
    });


    it('should filter events', async () => {
        const filterData = {
            category: ['Sports', 'Music'],
            page: 1,
            limit: 10
        };

        await request(app)
            .get('/api/events/filter')
            .query(filterData)
            .expect('Content-Type', /json/)
            .expect(200);
    });

    it('should search events', async () => {
        const searchData = {
            keyword: "Join us"
        };

        await request(app)
            .get('/api/events/search')
            .query(searchData)
            .expect('Content-Type', /json/)
            .expect(200);
    });

    it('should get all events', async () => {
        await request(app)
            .get('/api/events')
            .expect('Content-Type', /json/)
            .expect(200);
    });

    it('should get an event by ID', async () => {
        await request(app)
            .get(`/api/events/${eventId}`)
            .expect('Content-Type', /json/)
            .expect(200);
    });

    it('should get participants for an event', async () => {
        await request(app)
            .get(`/api/events/${eventId}/participants`)
            .expect('Content-Type', /json/)
            .expect(200);
    });

    it('should remove a participant (RSVP) from an event', async () => {
        await request(app)
            .delete(`/api/users/${userId}/rsvps/${eventId}`)
            .expect(204);
    });

    // Test case for deleting an event
    it('should delete an event', async () => {
        await request(app)
            .delete(`/api/users/${userId}/events/${eventId}`)
            .expect(204);
    });

    // Test case for getting event participants
    it('should fetch event participants', async () => {
        await request(app)
            .post(`/api/users/${userId}/events/${eventId}/rsvps`)
            .expect('Content-Type', /json/)
            .expect(200);
    });

    // Test case for deleting user account
    it('should delete user account', async () => {
        await request(app)
            .delete(`/api/users/${userId}`)
            .expect(204);
    });
});
