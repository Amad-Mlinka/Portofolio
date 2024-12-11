import ExperienceTypePostRequest from '@/app/interfaces/api/requests/experienceType/create';
import ExperienceTypeEditRequest from '@/app/interfaces/api/requests/experienceType/edit';
import BaseResponse from '@/app/interfaces/api/response/baseResponse';
import ExperienceType from '@/app/interfaces/experience/ExperienceType';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// GET: Retrieve all experience types or a specific one by ID
export async function GET(req: Request) {
    const { id }: { id?: number } = await req.json(); // Get the ID from the request body (if available)
    const request_type = 'GET';
    const call = '/api/experienceType';

    try {
        let data: ExperienceType | ExperienceType[] | null = null;

        if (id) {
            const experienceType = await prisma.experienceType.findUnique({
                where: { id },
            });

            if (!experienceType) {
                return NextResponse.json<BaseResponse<null>>({
                    request_type,
                    success: false,
                    code: 404,
                    call,
                    message: 'Experience Type not found',
                    error: 'Not Found',
                    data: null,
                });
            }

            data = experienceType;
        } else {
            data = await prisma.experienceType.findMany();  // Fetch all experience types
        }

        return NextResponse.json<BaseResponse<ExperienceType | ExperienceType[]>>({
            request_type,
            success: true,
            code: 200,
            call,
            message: 'Experience Types retrieved successfully',
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
            message: 'Error retrieving experience types',
            error: errorMessage,
            data: null,
        });
    }
}

// POST: Create a new experience type
export async function POST(req: Request) {
    const data: ExperienceTypePostRequest = await req.json();  
    const request_type = 'POST';
    const call = '/api/experienceType';

    try {
        const newExperienceType = await prisma.experienceType.create({
            data: {
                name: data.name,
                isActive: true,
            },
        });

        return NextResponse.json<BaseResponse<ExperienceType>>({
            request_type,
            success: true,
            code: 201,
            call,
            message: 'Experience Type created successfully',
            error: null,
            data: newExperienceType,
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json<BaseResponse<null>>({
            request_type,
            success: false,
            code: 500,
            call,
            message: 'Error creating experience type',
            error: errorMessage,
            data: null,
        });
    }
}

// PUT: Update an existing experience type
export async function PUT(req: Request) {
    const data: ExperienceTypeEditRequest = await req.json();  // Use ExperienceTypeEditRequest interface
    const request_type = 'PUT';
    const call = '/api/experienceType';

    try {
        const updatedExperienceType = await prisma.experienceType.update({
            where: { id: data.id },
            data: {
                name: data.name,
                isActive: data.isActive,
            },
        });

        return NextResponse.json<BaseResponse<ExperienceType>>({
            request_type,
            success: true,
            code: 200,
            call,
            message: 'Experience Type updated successfully',
            error: null,
            data: updatedExperienceType,
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json<BaseResponse<null>>({
            request_type,
            success: false,
            code: 500,
            call,
            message: 'Error updating experience type',
            error: errorMessage,
            data: null,
        });
    }
}

// DELETE: Delete an experience type
export async function DELETE(req: Request) {
    const { id }: { id: number } = await req.json();
    const request_type = 'DELETE';
    const call = '/api/experienceType';

    try {
        const deletedExperienceType = await prisma.experienceType.delete({
            where: { id },
        });

        return NextResponse.json<BaseResponse<ExperienceType>>({
            request_type,
            success: true,
            code: 200,
            call,
            message: 'Experience Type deleted successfully',
            error: null,
            data: deletedExperienceType,
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json<BaseResponse<null>>({
            request_type,
            success: false,
            code: 500,
            call,
            message: 'Error deleting experience type',
            error: errorMessage,
            data: null,
        });
    }
}
