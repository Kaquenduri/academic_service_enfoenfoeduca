import prisma from '../config/supabase.js';

export const createSection = async (req, res) => {
    try{
        const {
            id_period,
            name,
            grade
        } = req.body; 

        const section = await prisma.section.create({
            data: {
                id_period,
                name,
                grade
            }
        })

        res.status(201).json(section);

    }catch (error) {
        console.error("Error createSection: ", error);
        res.status(500).json({ error: error.message });
    }
}

export const getSection = async (req, res) => {
    try {
        const section = await prisma.section.findMany({
            include: {
                academicPeriod: true,
            }
        });
        res.status(200).json(section);
    } catch (error) {
        console.error("Error getSection: ", error);
        res.status(500).json({ error: error.message });
    }
}

export const getSectionById = async (req, res) => {
    try {
        const { id } = req.params;
        const section = await prisma.section.findUnique({
            where: { id_section: id },
            include: {
                academicPeriod: true,
            }
        }); 

        if (!section) {
            return res.status(404).json({ error: "Section not found" });
        }

        res.status(200).json(section);

    } catch (error) {
        console.error("Error getSectionById: ", error);
        res.status(500).json({ error: error.message });
    }
}

export const updateSection = async (req, res) => {
    try{
        const { id } = req.params;

        const section = await prisma.section.update({
            where: { id_section: id },
            data: req.body
        });

        res.status(200).json(section);

    }catch (error) {
        console.error("Error updateSection: ", error);
        res.status(500).json({ error: error.message });
    }
}

export const deleteSection = async (req, res) => {
    try{
        const { id } = req.params;

        await prisma.section.delete({
            where: { id_section: id }
        });
        res.json({
            message: "Section deleted successfully"
        })
    }catch (error) {
        console.error("Error deleteSection: ", error);
        res.status(500).json({ error: error.message });
    }
}


