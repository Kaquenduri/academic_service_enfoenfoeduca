import { Router } from 'express';

import {
    getTask,
    getTaskById,
    createTask, 
    updateTask,
    deleteTask
} from '../controllers/task.controller.js';

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

// Rutas para Tareas
router.get(
    '/',
    verifyToken,
    authorizeRoles('ADMIN', 'TEACHER', 'STUDENT', 'PARENT','DIRECTOR'),
    getTask
);

router.get(
    '/:id',
    verifyToken,
    authorizeRoles('ADMIN', 'TEACHER', 'STUDENT', 'PARENT','DIRECTOR'),
    getTaskById
);

router.post(
    '/create',
    verifyToken,
    authorizeRoles('ADMIN', 'TEACHER','STUDENT'),
    createTask
);

router.put(
    '/:id',
    verifyToken,
    authorizeRoles('ADMIN', 'TEACHER','STUDENT'),
    updateTask
);

router.delete(
    '/:id',
    verifyToken,
    authorizeRoles('ADMIN', 'TEACHER','STUDENT'),
    deleteTask
);

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
  