import { ExperienceItemPostRequest } from '@/app/interfaces/api/requests/experience/create';
import { ExperienceItemEditRequest } from '@/app/interfaces/api/requests/experience/edit';
import BaseResponse from '@/app/interfaces/api/response/baseResponse';
import { ExperienceFilter } from '@/app/interfaces/experience/ExperienceFilter';
import { ExperienceItem } from '@/app/interfaces/experience/ExperienceItem';
import { buildFiltersFromQuery } from '@/app/services/helpers/filterBuilder';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// GET: Retrieve all timeline items or a specific timeline item by ID
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url); // Get the URL search parameters
    const id = searchParams.get('id'); // Extract 'id' from the query string (if available)
    const filters: Partial<ExperienceFilter> = buildFiltersFromQuery(searchParams); // Extract filter parameters

    const request_type = 'GET';
    const call = '/api/experience';

    try {
        let data: ExperienceItem | ExperienceItem[] = [];

        if (id) {
            const experience = await prisma.experience.findUnique({
                where: { id: Number(id) }, // Convert 'id' to number
                include: {
                    type: true,
                },
            });

            if (!experience) {
                return NextResponse.json<BaseResponse<null>>({
                    request_type,
                    success: false,
                    code: 404,
                    call,
                    message: 'Experience not found',
                    error: 'Not Found',
                    data: null,
                });
            }

            data = experience;
        } else {
            const searchFilter: Record<string, unknown> = {};
            // Map the filter keys to Prisma's `where` clause
            if (filters.title) {
                searchFilter.hasFilter = true;
                searchFilter.title = {
                    contains: filters.title, 
                    mode: 'insensitive', 
                };
            }
            if (filters.company) {
                searchFilter.hasFilter = true;
                searchFilter.company = {
                    contains: filters.company,
                    mode: 'insensitive',
                };
            }

            if (filters.location) {
                searchFilter.hasFilter = true;
                searchFilter.location = {
                    contains: filters.location,
                    mode: 'insensitive',
                };
            }

            if (filters.startDate) {
                searchFilter.hasFilter = true;
                searchFilter.duration = {
                    contains: filters.startDate,
                    mode: 'insensitive',
                };
            }

            if (filters.endDate) {
                searchFilter.hasFilter = true;
                searchFilter.duration = {
                    contains: filters.endDate,
                    mode: 'insensitive',
                };
            }

            if (filters.techStack && filters.techStack.length > 0) {
                searchFilter.techStack = {
                    hasSome: filters.techStack,
                };
            }

            if (filters.typeId) {
                searchFilter.hasFilter = true;
                searchFilter.typeId = filters.typeId;
            }

            if (filters.isActive !== undefined) {
                searchFilter.hasFilter = true;
                searchFilter.isActive = filters.isActive;
            }

            if (searchFilter.hasFilter) {
                data = await prisma.experience.findMany({
                    where: searchFilter,
                    orderBy: {startDate: 'desc'},
                    include: {
                        type: true,
                    },
                });
            } else {
                data = await prisma.experience.findMany({
                    orderBy: {startDate: 'desc'},
                    include: {
                        type: true,
                    },
                });
            }
        }

        return NextResponse.json<BaseResponse<ExperienceItem | ExperienceItem[]>>({
            request_type,
            success: true,
            code: 200,
            call,
            message: 'Experiences retrieved successfully',
            error: null,
            data,
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json<BaseResponse<null>>({
            request_type,
            success: false,
            code: 500,
            call,
            message: 'Error retrieving experiences',
            error: errorMessage,
            data: null,
        });
    }
}

// POST: Create a new timeline item
export async function POST(req: Request) {
    const data: ExperienceItemPostRequest = await req.json(); // Use ExperienceItemPost interface for the request body
    const request_type = 'POST';
    const call = '/api/experience';

    try {
        const experienceType = await prisma.experienceType.findUnique({
            where: { id: data.typeId }, // Use typeId from the interface
        });

        if (!experienceType) {
            return NextResponse.json<BaseResponse<null>>({
                request_type,
                success: false,
                code: 400,
                call,
                message: 'Experience type not found',
                error: 'Experience type is invalid or not found',
                data: null,
            });
        }

        const newExperience = await prisma.experience.create({
            data: {
                title: data.title,
                company: data.company,
                location: data.location,
                description: data.description,
                techStack: data.techStack,
                isActive: data.isActive ?? true,
                startDate: data.startDate,
                endDate: data.endDate,
                type: {
                    connect: {
                        id: experienceType.id,
                    },
                },
            },
            include: {
                type: true,
            },
        });

        return NextResponse.json<BaseResponse<ExperienceItem>>({
            request_type,
            success: true,
            code: 201,
            call,
            message: 'Experience created successfully',
            error: null,
            data: newExperience,
        },
        );
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json<BaseResponse<null>>({
            request_type,
            success: false,
            code: 500,
            call,
            message: 'Error creating experience',
            error: errorMessage,
            data: null,
        });
    }
}


// PUT: Update an existing timeline item
export async function PUT(req: Request) {
    const data: ExperienceItemEditRequest = await req.json(); // Use ExperienceItemPut interface for the request body
    const request_type = 'PUT';
    const call = '/api/experience';

    try {
        const updatedExperience = await prisma.experience.update({
            where: { id: data.id },
            data: {
                title: data.title,
                company: data.company,
                location: data.location,
                description: data.description,
                techStack: data.techStack,
                isActive: data.isActive ?? true,
                startDate: data.startDate,
                endDate: data.endDate,
                type: {
                    connect: {
                        id: data.typeId,
                    },
                },
            },
            include: {
                type: true, // This ensures 'type' is included in the response
            },
        });

        return NextResponse.json<BaseResponse<ExperienceItem>>({
            request_type,
            success: true,
            code: 200,
            call,
            message: 'Experience updated successfully',
            error: null,
            data: updatedExperience,
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json<BaseResponse<null>>({
            request_type,
            success: false,
            code: 500,
            call,
            message: 'Error updating experience',
            error: errorMessage,
            data: null,
        });
    }
}

// DELETE: Delete a timeline item
export async function DELETE(req: Request) {
    const { id }: { id: number } = await req.json();
    const request_type = 'DELETE';
    const call = '/api/experience';

    try {
        await prisma.experience.delete({
            where: { id },
        });

        return NextResponse.json<BaseResponse<ExperienceItem>>({
            request_type,
            success: true,
            code: 200,
            call,
            message: 'Experience deleted successfully',
            error: null,
            data: null,
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json<BaseResponse<null>>({
            request_type,
            success: false,
            code: 500,
            call,
            message: 'Error deleting experience',
            error: errorMessage,
            data: null,
        });
    }
}

