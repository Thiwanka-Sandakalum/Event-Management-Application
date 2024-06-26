import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// Function to seed initial data
async function seedData() {
    try {
        await createUsers([
            {
                username: 'john_doe',
                email: 'john.doe@example.com',
                password_hash: 'hashedpassword1',
                first_name: 'John',
                last_name: 'Doe',
                bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                profile_picture_url: 'https://example.com/johndoe.jpg',
                social_links: {
                    twitter: 'https://twitter.com/johndoe',
                    linkedin: 'https://linkedin.com/in/johndoe',
                },
                address: '123 Main St, Anytown, USA',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                username: 'jane_smith',
                email: 'jane.smith@example.com',
                password_hash: 'hashedpassword2',
                first_name: 'Jane',
                last_name: 'Smith',
                bio: 'Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.',
                profile_picture_url: 'https://example.com/janesmith.jpg',
                social_links: {
                    twitter: 'https://twitter.com/janesmith',
                    linkedin: 'https://linkedin.com/in/janesmith',
                },
                address: '456 Oak Ave, Anycity, USA',
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]);

        await createCategories([
            { name: 'Music' },
            { name: 'Technology' },
            { name: 'Food & Drink' },
        ]);

        await createEvents([
            {
                user_id: 1,
                name: 'Summer Music Festival',
                description: 'Join us for a day of live music and fun!',
                date: new Date(),
                location: 'Central Park, New York',
                pricing_info: 29.99,
                thumbnail_url: 'https://example.com/summerfestival.jpg',
                capacity: 5000,
                categoryNames: ['Music'],
            },
            {
                user_id: 2,
                name: 'Tech Expo 2024',
                description: 'Discover the latest in technology innovations.',
                date: new Date('2024-09-20T09:00:00Z'),
                end_time: new Date('2024-09-20T17:00:00Z'),
                location: 'Tech Center, San Francisco',
                pricing_info: 0,
                thumbnail_url: 'https://example.com/techexpo.jpg',
                capacity: 1000,
                categoryNames: ['Technology'],
            },
        ]);

        await createParticipants([
            { userUsername: 'john_doe', event_id: 1 },
            { userUsername: 'jane_smith', event_id: 2 },
        ]);

        // Uncomment these lines if you have data for notifications and user operations
        // await createNotifications([...]);
        // await createUserOperations([...]);

    } catch (error) {
        console.error('Error seeding data:', error);
        throw error;
    }
}

// Function to create users
async function createUsers(users: Prisma.UserCreateInput[]) {
    try {
        await prisma.user.createMany({
            data: users,
        });
    } catch (error) {
        console.error('Error creating users:', error);
        throw error;
    }
}

// Function to create categories
async function createCategories(categories: Prisma.CategoryCreateInput[]) {
    try {
        await prisma.category.createMany({
            data: categories,
        });
    } catch (error) {
        console.error('Error creating categories:', error);
        throw error;
    }
}

// Function to create events
async function createEvents(events: any[]) {
    try {
        const eventCreationPromises = events.map(async (event) => {
            const createdEvent = await prisma.event.create({
                data: {
                    user_id: event.user_id,
                    name: event.name,
                    description: event.description,
                    date: event.date,
                    end_time: event.end_time,
                    location: event.location,
                    pricing_info: event.pricing_info,
                    thumbnail_url: event.thumbnail_url,
                    capacity: event.capacity,
                },
            });

            await prisma.eventCategory.create({
                data: {
                    event_id: createdEvent.event_id,
                    category_id: 1,
                }
            }

            );
        });

        await Promise.all(eventCreationPromises);
    } catch (error) {
        console.error('Error creating events:', error);
        throw error;
    }
}

// Function to create participants
async function createParticipants(participants: any[]) {
    try {
        for (const participantData of participants) {
            const user = await prisma.user.findUnique({
                where: { username: participantData.userUsername },
            });
            if (!user) throw new Error(`User ${participantData.userUsername} not found`);

            const event = await prisma.event.findUnique({
                where: { event_id: participantData.event_id },
            });
            if (!event) throw new Error(`Event with id ${participantData.event_id} not found`);

            await prisma.participant.create({
                data: {
                    user_id: user.user_id,
                    event_id: event.event_id,
                    rsvp_date: new Date(),
                    payment_status: true,
                },
            });
        }
    } catch (error) {
        console.error('Error creating participants:', error);
        throw error;
    }
}

// Main function to start the seeding process
async function main() {
    try {
        await seedData();
    } catch (error) {
        console.error('Error during seed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
