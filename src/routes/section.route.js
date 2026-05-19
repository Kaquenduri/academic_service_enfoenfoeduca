import { Router } from 'express';

import {
    createSection,
    getSection,
    getSectionById,
    updateSection,
    deleteSection    
  } from '../controllers/section.controller.js';

import { verifyToken } from '../middleware/auth.middleware.js';

import { authorizeRoles } from '../middleware/role.middleware.js';

const router = Router();

router.get(
    '/',
    verifyToken,
    authorizeRoles('ADMIN', 'TEACHER', 'STUDENT', 'PARENT'),
    getSection
  );
  
  router.get(
    '/:id',
    verifyToken,
    authorizeRoles('ADMIN', 'TEACHER', 'STUDENT', 'PARENT'),
    getSectionById
  );
  
  router.post(
    '/create',
    verifyToken,
    authorizeRoles('ADMIN'),
    createSection
  );
  
  router.put(
    '/:id',
    verifyToken,
    authorizeRoles('ADMIN'),
    updateSection
  );
  
  router.delete(
    '/:id',
    verifyToken,
    authorizeRoles('ADMIN'),
    deleteSection
  );
  
export default router;
  