import prisma from '../config/supabase.js';

export const createTaskSubmission = async (req, res) => {

    try {

        const {
            task_id,
            student_id,
            file_url,
            note,
            comments,
            state
        } = req.body;

        const taskSubmission = await prisma.taskSubmission.create({
            data: {
                task_id,
                student_id,
                file_url,
                note,
                comments,
                state
            }
        });

        res.status(201).json(taskSubmission);

    } catch (error) {

        console.error("Error createTaskSubmission: ", error);

        res.status(500).json({
            error: error.message
        });

    }

};

export const getTaskSubmission = async (req, res) => {

    try {

        const taskSubmission = await prisma.taskSubmission.findMany({
            include: {
                task: true
            }
        });

        res.status(200).json(taskSubmission);

    } catch (error) {

        console.error("Error getTaskSubmission: ", error);

        res.status(500).json({
            error: error.message
        });

    }

};

export const getTaskSubmissionById = async (req, res) => {

    try {

        const { id } = req.params;

        const taskSubmission = await prisma.taskSubmission.findUnique({
            where: {
                submission_id: id
            },
            include: {
                task: true
            }
        });

        if (!taskSubmission) {

            return res.status(404).json({
                error: "Task submission not found"
            });

        }

        res.status(200).json(taskSubmission);

    } catch (error) {

        console.error("Error getTaskSubmissionById: ", error);

        res.status(500).json({
            error: error.message
        });

    }

};

export const updateTaskSubmission = async (req, res) => {

    try {

        const { id } = req.params;

        const taskSubmission = await prisma.taskSubmission.update({
            where: {
                submission_id: id
            },
            data: req.body
        });

        res.status(200).json(taskSubmission);

    } catch (error) {

        console.error("Error updateTaskSubmission: ", error);

        res.status(500).json({
            error: error.message
        });

    }

};

export const deleteTaskSubmission = async (req, res) => {

    try {

        const { id } = req.params;

        await prisma.taskSubmission.delete({
            where: {
                submission_id: id
            }
        });

        res.status(200).json({
            message: "Task submission deleted successfully"
        });

    } catch (error) {

        console.error("Error deleteTaskSubmission: ", error);

        res.status(500).json({
            error: error.message
        });

    }

};

