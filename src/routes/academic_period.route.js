import { Router } from 'express';

import {
    createAcademicPeriods,
    getAcademicPeriods,
    getAcademicPeriodById,
    updateAcademicPeriod,
    deleteAcademicPeriod
  } from '../controllers/academic_period.controller.js';

import { verifyToken } from '../middleware/auth.middleware.js';

import { authorizeRoles } from '../middleware/role.middleware.js';

const router = Router();

router.get(
    '/',
    verifyToken,
    authorizeRoles('ADMIN', 'TEACHER', 'STUDENT', 'PARENT', "DIRECTOR"),
    getAcademicPeriods
  );
  
  router.get(
    '/:id',
    verifyToken,
    authorizeRoles('ADMIN', 'TEACHER', 'STUDENT', 'PARENT', "DIRECTOR"),
    getAcademicPeriodById
  );
  
  router.post(
    '/create',
    verifyToken,
    authorizeRoles('ADMIN'),
    createAcademicPeriods
  );
  
  router.put(
    '/:id',
    verifyToken,
    authorizeRoles('ADMIN'),
    updateAcademicPeriod
  );
  
  router.delete(
    '/:id',
    verifyToken,
    authorizeRoles('ADMIN'),
    deleteAcademicPeriod
  );
  
export default router;
  