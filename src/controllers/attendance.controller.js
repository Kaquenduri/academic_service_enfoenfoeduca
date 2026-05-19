import prisma from '../config/supabase.js';

export const createAttendance = async (req, res) => {

    try {

        const {
            session_id,
            student_id,
            status,
            period_id
        } = req.body;

        const attendance = await prisma.attendance.create({
            data: {
                session_id,
                student_id,
                status,
                period_id
            }
        });

        res.status(201).json(attendance);

    } catch (error) {

        console.error("Error createAttendance: ", error);

        res.status(500).json({
            error: error.message
        });

    }

};

export const getAttendance = async (req, res) => {

    try {

        const attendance = await prisma.attendance.findMany({
            include: {
                session: true,
                academicPeriod: true
            }
        });

        res.status(200).json(attendance);

    } catch (error) {

        console.error("Error getAttendance: ", error);

        res.status(500).json({
            error: error.message
        });

    }

};

export const getAttendanceById = async (req, res) => {

    try {

        const { id } = req.params;

        const attendance = await prisma.attendance.findUnique({
            where: {
                attendance_id: id
            },
            include: {
                session: true,
                academicPeriod: true
            }
        });

        if (!attendance) {

            return res.status(404).json({
                error: "Attendance not found"
            });

        }

        res.status(200).json(attendance);

    } catch (error) {

        console.error("Error getAttendanceById: ", error);

        res.status(500).json({
            error: error.message
        });

    }

};

export const updateAttendance = async (req, res) => {

    try {

        const { id } = req.params;

        const attendance = await prisma.attendance.update({
            where: {
                attendance_id: id
            },
            data: req.body
        });

        res.status(200).json(attendance);

    } catch (error) {

        console.error("Error updateAttendance: ", error);

        res.status(500).json({
            error: error.message
        });

    }

};

export const deleteAttendance = async (req, res) => {

    try {

        const { id } = req.params;

        await prisma.attendance.delete({
            where: {
                attendance_id: id
            }
        });

        res.status(200).json({
            message: "Attendance deleted successfully"
        });

    } catch (error) {

        console.error("Error deleteAttendance: ", error);

        res.status(500).json({
            error: error.message
        });

    }

};