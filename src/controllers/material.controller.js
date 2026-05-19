import prisma from '../config/supabase.js';

export const createMaterial = async (req, res) => {

    try {

        const {
            session_id,
            title,
            file_type,
            file_url,
            description
        } = req.body;

        const material = await prisma.material.create({
            data: {
                session_id,
                title,
                file_type,
                file_url,
                description
            }
        });

        res.status(201).json(material);

    } catch (error) {

        console.error("Error createMaterial: ", error);

        res.status(500).json({
            error: error.message
        });

    }

};

export const getMaterial = async (req, res) => {

    try {

        const material = await prisma.material.findMany({
            include: {
                session: true
            }
        });

        res.status(200).json(material);

    } catch (error) {

        console.error("Error getMaterial: ", error);

        res.status(500).json({
            error: error.message
        });

    }

};

export const getMaterialById = async (req, res) => {

    try {

        const { id } = req.params;

        const material = await prisma.material.findUnique({
            where: {
                material_id: id
            },
            include: {
                session: true
            }
        });

        if (!material) {

            return res.status(404).json({
                error: "Material not found"
            });

        }

        res.status(200).json(material);

    } catch (error) {

        console.error("Error getMaterialById: ", error);

        res.status(500).json({
            error: error.message
        });

    }

};

export const updateMaterial = async (req, res) => {

    try {

        const { id } = req.params;

        const material = await prisma.material.update({
            where: {
                material_id: id
            },
            data: req.body
        });

        res.status(200).json(material);

    } catch (error) {

        console.error("Error updateMaterial: ", error);

        res.status(500).json({
            error: error.message
        });

    }

};

export const deleteMaterial = async (req, res) => {

    try {

        const { id } = req.params;

        await prisma.material.delete({
            where: {
                material_id: id
            }
        });

        res.status(200).json({
            message: "Material deleted successfully"
        });

    } catch (error) {

        console.error("Error deleteMaterial: ", error);

        res.status(500).json({
            error: error.message
        });

    }

};