import { Request, Response, NextFunction } from 'express';
import { CategoryService } from '../services/categoryService';
import { Category, Prisma } from '@prisma/client';
import { validationResult } from 'express-validator';
import CustomError from '../utils/customError';
import { handlePrismaError } from '../utils/prismaErrorHandler';
import { CreateCategoryRequest } from '@types-server/index';

export class CategoryController {
    static async createCategory(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        try {
            const categoryNames = req.body.categories;
            const categories = categoryNames.map((name: string) => ({ name }));
            const category = await CategoryService.createCategory(categories);
            res.status(201).json(category);
        } catch (error) {
            console.log(error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                next(handlePrismaError(error));
            } else {
                next(new CustomError('Failed to create category', 400));
            }
        }
    }

    static async updateCategory(
        req: Request<{ category_id: number }, {}, Prisma.CategoryUpdateInput>,
        res: Response,
        next: NextFunction
    ) {
        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        try {
            const category = await CategoryService.updateCategory(Number(req.params.category_id), req.body);
            res.status(200).json(category);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                next(handlePrismaError(error));
            } else if (error instanceof Error) {
                switch (error.message) {
                    case 'Category not found':
                        next(new CustomError('Category not found', 404));
                        break;
                    default:
                        next(new CustomError('Failed to update category', 400));
                        break;
                }
            } else {
                next(new CustomError('Failed to update category', 400));
            }
        }
    }

    static async deleteCategory(
        req: Request<{ category_id: number }>,
        res: Response,
        next: NextFunction
    ) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        try {
            await CategoryService.deleteCategory(Number(req.params.category_id));
            res.status(204).send();
        } catch (error) {
            next(new CustomError(`Failed to delete category with id ${req.params.category_id}`, 400));
        }
    }

    static async getCategoryById(
        req: Request<{ category_id: number }>,
        res: Response,
        next: NextFunction
    ) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        try {
            const category = await CategoryService.getCategoryById(Number(req.params.category_id));
            if (!category) {
                next(new CustomError(`Category not found for id ${req.params.category_id}`, 404));
            } else {
                res.status(200).json(category);
            }
        } catch (error) {
            next(new CustomError(`Failed to fetch category with id ${req.params.category_id}`, 400));
        }
    }

    static async getAllCategories(
        req: Request<{}, {}, {}>,
        res: Response,
        next: NextFunction
    ) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        try {
            const categories = await CategoryService.getAllCategories();
            res.status(200).json(categories);
        } catch (error) {
            next(new CustomError('Failed to retrieve categories', 400));
        }
    }
}
