import prisma from '../config/supabase.js';

export const createCourse = async (req, res) => {
    try{
        const {
            name,
            description,
            period_id
        } = req.body; 

        const course = await prisma.course.create({
            data: {
                name,
                description,
                period_id
            }
        })

        res.status(201).json(course);

    }catch (error) {
        console.error("Error createCourse: ", error);
        res.status(500).json({ error: error.message });
    }
}

export const getCourse = async (req, res) => {
    try {
        const course = await prisma.course.findMany({
            include: {
                academicPeriod: true,
                sessions: true
            }
        });
        res.status(200).json(course);
    } catch (error) {
        console.error("Error getCourse: ", error);
        res.status(500).json({ error: error.message });
    }
}

export const getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await prisma.course.findUnique({
            where: { course_id: id },
            include: {
                academicperiod: true,
                sessions: true
            }
        }); 

        if (!course) {
            return res.status(404).json({ error: "course not found" });
        }

        res.status(200).json(course);

    } catch (error) {
        console.error("Error getCourseById: ", error);
        res.status(500).json({ error: error.message });
    }
}

export const updateCourse = async (req, res) => {
    try{
        const { id } = req.params;

        const course = await prisma.course.update({
            where: { course_id: id },
            data: req.body
        });

        res.status(200).json(course);

    }catch (error) {
        console.error("Error updateCourse: ", error);
        res.status(500).json({ error: error.message });
    }
}

export const deleteCourse = async (req, res) => {
    try{
        const { id } = req.params;

        await prisma.course.delete({
            where: { course_id: id }
        });
        res.json({
            message: "Course deleted successfully"
        })
    }catch (error) {
        console.error("Error deleteCourse: ", error);
        res.status(500).json({ error: error.message });
    }
}


