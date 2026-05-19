import { Router } from 'express';

import {  
    createAttendance,
    getAttendance,
    getAttendanceById,
    updateAttendance,
    deleteAttendance
  } from '../controllers/attendance.controller.js';

import { verifyToken } from '../middleware/auth.middleware.js';

import { authorizeRoles } from '../middleware/role.middleware.js';

const router = Router();

router.get(
    '/',
    verifyToken,
    authorizeRoles('ADMIN', 'TEACHER', 'STUDENT', 'PARENT'),
    getAttendance
  );
  
  router.get(
    '/:id',
    verifyToken,
    authorizeRoles('ADMIN', 'TEACHER', 'STUDENT', 'PARENT'),
    getAttendanceById
  );
  
  router.post(
    '/create',
    verifyToken,
    authorizeRoles('ADMIN', 'TEACHER'),
    createAttendance
  );
  
  router.put(
    '/:id',
    verifyToken,
    authorizeRoles('ADMIN', 'TEACHER'),
    updateAttendance
  );
  
  router.delete(
    '/:id',
    verifyToken,
    authorizeRoles('ADMIN'),
    deleteAttendance
  );
  
export default router;
  