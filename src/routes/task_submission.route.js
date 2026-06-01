import { Router } from 'express';

import {
    getTaskSubmission,
    getTaskSubmissionById,
    createTaskSubmission, 
    updateTaskSubmission,
    deleteTaskSubmission
} from '../controllers/task_submission.controller.js'; 

import { verifyToken } from '../middleware/auth.middleware.js';

import { authorizeRoles } from '../middleware/role.middleware.js';

const router = Router();

// Rutas para Entregas de Tareas
router.get(
    '/submission',
    verifyToken,
    authorizeRoles('ADMIN', 'TEACHER', 'STUDENT', 'PARENT','DIRECTOR'),
    getTaskSubmission
);

router.get(
    '/submission/:id',
    verifyToken,
    authorizeRoles('ADMIN', 'TEACHER', 'STUDENT', 'PARENT','DIRECTOR'),
    getTaskSubmissionById
);

router.post(
    '/submission/create',
    verifyToken,
    authorizeRoles('STUDENT', 'TEACHER','STUDENT'),
    createTaskSubmission
);

router.put(
    '/submission/:id',
    verifyToken,
    authorizeRoles('STUDENT', 'TEACHER','STUDENT'),
    updateTaskSubmission
);

router.delete(
    '/submission/:id',
    verifyToken,
    authorizeRoles('STUDENT', 'TEACHER','STUDENT'),
    deleteTaskSubmission
);

export default router;
