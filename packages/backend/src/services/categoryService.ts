import { Prisma, PrismaClient, Category } from '@prisma/client';

const prisma = new PrismaClient();

export class CategoryService {
    /**
     * Creates a new category.
     * @param data - The data for the category to be created.
     * @returns The created category.
     */
    static async createCategory(data: Prisma.CategoryCreateManyInput[]): Promise<Prisma.BatchPayload> {
        const category = await prisma.category.createMany({ data });
        return category;
    }

    /**
     * Updates a category by its ID.
     * @param categoryId - The ID of the category to be updated.
     * @param data - The updated data for the category.
     * @returns The updated category.
     */
    static async updateCategory(categoryId: number, data: Prisma.CategoryUpdateInput): Promise<Category> {
        const category = await prisma.category.update({
            where: { category_id: categoryId },
            data,
        });
        return category;
    }

    /**
     * Deletes a category by its ID.
     * @param categoryId - The ID of the category to be deleted.
     */
    static async deleteCategory(categoryId: number): Promise<void> {
        await prisma.category.delete({ where: { category_id: categoryId } });
    }

    /**
     * Retrieves a category by its ID.
     * @param categoryId - The ID of the category to be retrieved.
     * @returns The retrieved category, or null if not found.
     */
    static async getCategoryById(categoryId: number): Promise<Category | null> {
        const category = await prisma.category.findUnique({ where: { category_id: categoryId } });
        return category;
    }

    /**
     * Retrieves all categories.
     * @returns An array of all categories.
     */
    static async getAllCategories(): Promise<Category[]> {
        const categories = await prisma.category.findMany();
        return categories;
    }
}
