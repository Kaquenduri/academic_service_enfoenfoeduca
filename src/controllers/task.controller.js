import prisma from '../config/supabase.js';

export const createTask = async (req, res) => {

    try {

        const {
            session_id,
            title,
            description,
            start_date,
            due_date
        } = req.body;

        const task = await prisma.task.create({
            data: {
                session_id,
                title,
                description,
                start_date,
                due_date
            }
        });

        res.status(201).json(task);

    } catch (error) {

        console.error("Error createTask: ", error);

        res.status(500).json({
            error: error.message
        });

    }

};

export const getTask = async (req, res) => {

    try {

        const task = await prisma.task.findMany({
            include: {
                session: true,
                task_submissions: true
            }
        });

        res.status(200).json(task);

    } catch (error) {

        console.error("Error getTask: ", error);

        res.status(500).json({
            error: error.message
        });

    }

};

export const getTaskById = async (req, res) => {

    try {

        const { id } = req.params;

        const task = await prisma.task.findUnique({
            where: {
                task_id: id
            },
            include: {
                session: true,
                task_submissions: true
            }
        });

        if (!task) {

            return res.status(404).json({
                error: "Task not found"
            });

        }

        res.status(200).json(task);

    } catch (error) {

        console.error("Error getTaskById: ", error);

        res.status(500).json({
            error: error.message
        });

    }

};

export const updateTask = async (req, res) => {

    try {

        const { id } = req.params;

        const task = await prisma.task.update({
            where: {
                task_id: id
            },
            data: req.body
        });

        res.status(200).json(task);

    } catch (error) {

        console.error("Error updateTask: ", error);

        res.status(500).json({
            error: error.message
        });

    }

};

export const deleteTask = async (req, res) => {

    try {

        const { id } = req.params;

        await prisma.task.delete({
            where: {
                task_id: id
            }
        });

        res.status(200).json({
            message: "Task deleted successfully"
        });

    } catch (error) {

        console.error("Error deleteTask: ", error);

        res.status(500).json({
            error: error.message
        });

    }

};