import prisma from '../config/supabase.js';

export const createSession = async (req, res) => {

    try {

        const {
            course_id,
            name,
            start_time,
            end_time
        } = req.body;

        const session = await prisma.session.create({
            data: {
                course_id,
                name,
                start_time,
                end_time
            }
        });

        res.status(201).json(session);

    } catch (error) {

        console.error("Error createSession: ", error);

        res.status(500).json({
            error: error.message
        });

    }

};

export const getSession = async (req, res) => {

    try {

        const session = await prisma.session.findMany({
            include: {
                course: true,
                attendances: true,
                materials: true,
                tasks: true
            }
        });

        res.status(200).json(session);

    } catch (error) {

        console.error("Error getSession: ", error);

        res.status(500).json({
            error: error.message
        });

    }

};

export const getSessionById = async (req, res) => {

    try {

        const { id } = req.params;

        const session = await prisma.session.findUnique({
            where: {
                session_id: id
            },
            include: {
                course: true,
                attendances: true,
                materials: true,
                tasks: true
            }
        });

        if (!session) {
            return res.status(404).json({
                error: "Session not found"
            });
        }

        res.status(200).json(session);

    } catch (error) {

        console.error("Error getSessionById: ", error);

        res.status(500).json({
            error: error.message
        });

    }

};

export const updateSession = async (req, res) => {

    try {

        const { id } = req.params;

        const session = await prisma.session.update({
            where: {
                session_id: id
            },
            data: req.body
        });

        res.status(200).json(session);

    } catch (error) {

        console.error("Error updateSession: ", error);

        res.status(500).json({
            error: error.message
        });

    }

};

export const deleteSession = async (req, res) => {

    try {

        const { id } = req.params;

        await prisma.session.delete({
            where: {
                session_id: id
            }
        });

        res.status(200).json({
            message: "Session deleted successfully"
        });

    } catch (error) {

        console.error("Error deleteSession: ", error);

        res.status(500).json({
            error: error.message
        });

    }

};