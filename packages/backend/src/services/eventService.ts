import { Prisma, PrismaClient, Event, Category } from '@prisma/client';
import { FilterEventsRequest } from '@types-server/index';

const prisma = new PrismaClient();

export class EventService {
    /**
     * Creates a new event.
     * @param data - The data for the event to be created.
     * @returns A promise that resolves to the created event.
     */
    static async createEvent(data: Prisma.EventCreateInput): Promise<Event> {
        const event = await prisma.event.create({ data });
        return event;
    }

    /**
     * Retrieves all events.
     * @returns A promise that resolves to an array of events.
     */
    static async getAllEvents(): Promise<Event[]> {
        const events = await prisma.event.findMany();
        return events;
    }

    /**
     * Retrieves an event by its ID.
     * @param eventId - The ID of the event to retrieve.
     * @returns A promise that resolves to the retrieved event, or null if not found.
     */
    static async getEventById(eventId: number): Promise<Event | null> {
        const event = await prisma.event.findUnique({ where: { event_id: eventId } });
        return event;
    }

    /**
     * Updates an event.
     * @param eventId - The ID of the event to update.
     * @param data - The updated data for the event.
     * @returns A promise that resolves to the updated event.
     */
    static async updateEvent(eventId: number, data: Prisma.EventUpdateInput): Promise<Event> {
        const event = await prisma.event.update({
            where: { event_id: eventId },
            data,
        });
        return event;
    }

    /**
     * Deletes an event.
     * @param eventId - The ID of the event to delete.
     * @returns A promise that resolves when the event is deleted.
     */
    static async deleteEvent(eventId: number): Promise<void> {
        await prisma.event.delete({ where: { event_id: eventId } });
    }

    /**
     * Publishes an event.
     * @param eventId - The ID of the event to publish.
     * @returns A promise that resolves to the published event.
     */
    static async publishEvent(eventId: number): Promise<Event> {
        const event = await prisma.event.update({
            where: { event_id: eventId },
            data: { state: 'PUBLISHED' },
        });
        return event;
    }

    /**
     * Sets an event as a draft.
     * @param eventId - The ID of the event to set as a draft.
     * @returns A promise that resolves to the draft event.
     */
    static async draftEvent(eventId: number): Promise<Event> {
        const event = await prisma.event.update({
            where: { event_id: eventId },
            data: { state: 'DRAFT' },
        });
        return event;
    }

    /**
     * Cancels an event.
     * @param eventId - The ID of the event to cancel.
     * @returns A promise that resolves to the cancelled event.
     */
    static async cancelEvent(eventId: number): Promise<Event> {
        const event = await prisma.event.update({
            where: { event_id: eventId },
            data: { state: 'CANCELLED' },
        });
        return event;
    }

    /**
     * Searches for events based on a keyword.
     * @param keyword - The keyword to search for.
     * @returns A promise that resolves to an array of matching events.
     */
    static async searchEvents(keyword?: string): Promise<Event[]> {
        const events = await prisma.event.findMany({
            where: {
                OR: [
                    {
                        name: {
                            search: keyword || '',
                        },
                    },
                    {
                        description: {
                            search: keyword || '',
                        },
                    },
                    {
                        location: {
                            search: keyword || '',
                        },
                    },
                ],
            },
        });
        return events;
    }

    /**
     * Filters events based on optional parameters.
     * @param categories - An array of category names to filter events by.
     * @param date - The date to filter events by.
     * @param location - The location to filter events by.
     * @param page - The page number for pagination (default: 1).
     * @param limit - The maximum number of events to return per page (default: 10).
     * @returns A promise that resolves to an array of filtered events.
     */
    static async filterEvents(
        categories?: string[],
        date?: string,
        location?: string,
        page: number = 1,
        limit: number = 10
    ): Promise<Event[]> {
        const skip = (page - 1) * limit;

        const dateFilter = date
            ? {
                date: {
                    gte: new Date(`${date}T00:00:00.000Z`),
                    lte: new Date(`${date}T23:59:59.999Z`),
                },
            }
            : {};

        const events = await prisma.event.findMany({
            where: {
                AND: [
                    categories?.length
                        ? {
                            categories: {
                                some: {
                                    category: {
                                        name: { in: categories },
                                    },
                                },
                            },
                        }
                        : {},
                    location ? { location: { contains: location } } : {},
                    dateFilter,
                ],
            },
            skip,
            take: limit,
        });
        return events;
    }
}
