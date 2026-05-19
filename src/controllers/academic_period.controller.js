import prisma from '../config/supabase.js';

export const createAcademicPeriods = async (req, res) => {
    try{
        const {
            name,
            start_date,
            end_date,
        } = req.body; 

        const academicPeriod = await prisma.academicPeriod.create({
            data: {
                name,
                start_date,
                end_date
            }
        })

        res.status(201).json(academicPeriod);

    }catch (error) {
        console.error("Error createAcademicPeriods: ", error);
        res.status(500).json({ error: error.message });
    }
}

export const getAcademicPeriods = async (req, res) => {
    try {
        const academicPeriods = await prisma.academicPeriod.findMany();
        res.status(200).json(academicPeriods);
    } catch (error) {
        console.error("Error getAcademicPeriods: ", error);
        res.status(500).json({ error: error.message });
    }
}

export const getAcademicPeriodById = async (req, res) => {
    try {
        const { id } = req.params;
        const academicPeriod = await prisma.academicPeriod.findUnique({
            where: { period_id: id }
        }); 

        if (!academicPeriod) {
            return res.status(404).json({ error: "Academic period not found" });
        }

        res.status(200).json(academicPeriod);

    } catch (error) {
        console.error("Error getAcademicPeriodById: ", error);
        res.status(500).json({ error: error.message });
    }
}

export const updateAcademicPeriod = async (req, res) => {
    try{
        const { id } = req.params;

        const AcademicPeriod = await prisma.academicPeriod.update({
            where: { period_id: id },
            data: req.body
        });

        res.status(200).json(AcademicPeriod);

    }catch (error) {
        console.error("Error updateAcademicPeriod: ", error);
        res.status(500).json({ error: error.message });
    }
}

export const deleteAcademicPeriod = async (req, res) => {
    try{
        const { id } = req.params;

        await prisma.academicPeriod.delete({
            where: { period_id: id }
        });
        res.json({
            message: "Academic period deleted successfully"
        })
    }catch (error) {
        console.error("Error deleteAcademicPeriod: ", error);
        res.status(500).json({ error: error.message });
    }
}


