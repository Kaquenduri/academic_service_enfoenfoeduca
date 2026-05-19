import prisma from '../config/supabase.js';

export const createAssignment = async (req, res) => {

    try {

        const {
            id_section,
            course_id,
            period_id,
            teacher_id
        } = req.body;

        const assignment = await prisma.assignment.create({
            data: {
                id_section,
                course_id,
                period_id,
                teacher_id
            }
        });

        res.status(201).json(assignment);

    } catch (error) {

        console.error("Error createAssignment: ", error);

        res.status(500).json({
            error: error.message
        });

    }

};

export const getAssignment = async (req, res) => {

    try {

        const assignment = await prisma.assignment.findMany({
            include: {
                section: true,
                course: true,
                academicperiod: true
            }
        });

        res.status(200).json(assignment);

    } catch (error) {

        console.error("Error getAssignment: ", error);

        res.status(500).json({
            error: error.message
        });

    }

};

export const getAssignmentById = async (req, res) => {

    try {

        const {
            id_section,
            course_id,
            teacher_id,
            period_id
        } = req.params;

        const assignment = await prisma.assignment.findUnique({
            where: {
                id_section_course_id_teacher_id_period_id: {
                    id_section,
                    course_id,
                    teacher_id,
                    period_id
                }
            },
            include: {
                section: true,
                course: true,
                academicperiod: true
            }
        });

        if (!assignment) {

            return res.status(404).json({
                error: "Assignment not found"
            });

        }

        res.status(200).json(assignment);

    } catch (error) {

        console.error("Error getAssignmentById: ", error);

        res.status(500).json({
            error: error.message
        });

    }

};

export const updateAssignment = async (req, res) => {

    try {

        const {
            id_section,
            course_id,
            teacher_id,
            period_id
        } = req.params;

        const assignment = await prisma.assignment.update({
            where: {
                id_section_course_id_teacher_id_period_id: {
                    id_section,
                    course_id,
                    teacher_id,
                    period_id
                }
            },
            data: req.body
        });

        res.status(200).json(assignment);

    } catch (error) {

        console.error("Error updateAssignment: ", error);

        res.status(500).json({
            error: error.message
        });

    }

};

export const deleteAssignment = async (req, res) => {

    try {

        const {
            id_section,
            course_id,
            teacher_id,
            period_id
        } = req.params;

        await prisma.assignment.delete({
            where: {
                id_section_course_id_teacher_id_period_id: {
                    id_section,
                    course_id,
                    teacher_id,
                    period_id
                }
            }
        });

        res.status(200).json({
            message: "Assignment deleted successfully"
        });

    } catch (error) {

        console.error("Error deleteAssignment: ", error);

        res.status(500).json({
            error: error.message
        });

    }

};
