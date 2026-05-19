import { Router } from 'express';

import {
    createAssignment,
    getAssignment,
    getAssignmentById,
    updateAssignment,
    deleteAssignment
  } from '../controllers/assignment.controller.js';

import { verifyToken } from '../middleware/auth.middleware.js';

import { authorizeRoles } from '../middleware/role.middleware.js';

const router = Router();

router.get(
    '/',
    verifyToken,
    authorizeRoles('ADMIN', 'TEACHER', 'STUDENT', 'PARENT'),
    getAssignment
  );
  
  router.get(
    '/:id',
    verifyToken,  
    authorizeRoles('ADMIN', 'TEACHER', 'STUDENT', 'PARENT'),
    getAssignmentById
  );
  
  router.post(
    '/create',
    verifyToken,
    authorizeRoles('ADMIN'),
    createAssignment
  );
  
  router.put(
    '/:id',
    verifyToken,
    authorizeRoles('ADMIN'),
    updateAssignment
  );
  
  router.delete(
    '/:id',
    verifyToken,
    authorizeRoles('ADMIN'),
    deleteAssignment
  );
  
export default router;
  