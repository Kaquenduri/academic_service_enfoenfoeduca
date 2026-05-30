import { Router } from 'express';

import {
  createCourse,
  getCourse,
  getCourseById,
  updateCourse,
  deleteCourse
  } from '../controllers/course.controller.js';

import {
  createSession,
  getSession,
  getSessionById,
  updateSession,
  deleteSession
} from '../controllers/session.controller.js'

import {
  createMaterial,
  getMaterial,
  getMaterialById,
  updateMaterial,
  deleteMaterial
} from '../controllers/material.controller.js'


import { verifyToken } from '../middleware/auth.middleware.js';

import { authorizeRoles } from '../middleware/role.middleware.js';

const router = Router();

// Rutas para Cursos
router.get(
  '/',
  verifyToken,
  authorizeRoles('ADMIN', 'TEACHER', 'STUDENT', 'PARENT','DIRECTOR'),
  getCourse
);
  
router.get(
  '/:id',
  verifyToken,
  authorizeRoles('ADMIN', 'TEACHER', 'STUDENT', 'PARENT','DIRECTOR'),
  getCourseById
);

router.post(
  '/create',
  verifyToken,
  authorizeRoles('ADMIN'),
  createCourse
);

router.put(
  '/:id',
  verifyToken,
  authorizeRoles('ADMIN'),
  updateCourse
);

router.delete(
  '/:id',
  verifyToken,
  authorizeRoles('ADMIN'),
  deleteCourse
);

// Rutas para Sesiones

router.get(
  '/sessions',
  verifyToken,
  authorizeRoles('ADMIN', 'TEACHER', 'STUDENT', 'PARENT','DIRECTOR'),
  getSession
);

router.get(
  '/sessions/:id',
  verifyToken,
  authorizeRoles('ADMIN', 'TEACHER', 'STUDENT', 'PARENT','DIRECTOR'),
  getSessionById
);

router.post(
  '/sessions/create',
  verifyToken,
  authorizeRoles('ADMIN', 'TEACHER'),
  createSession
);

router.put(
  '/sessions/:id',
  verifyToken,
  authorizeRoles('ADMIN', 'TEACHER'),
  updateSession
);

router.delete(
  '/sessions/:id',
  verifyToken,
  authorizeRoles('ADMIN', 'TEACHER'),
  deleteSession
);

// Rutas para Materiales
router.get(
  '/materials',
  verifyToken,
  authorizeRoles('ADMIN', 'TEACHER', 'STUDENT', 'PARENT','DIRECTOR'),
  getMaterial
);

router.get(
  '/materials/:id',
  verifyToken,
  authorizeRoles('ADMIN', 'TEACHER', 'STUDENT', 'PARENT','DIRECTOR'),
  getMaterialById
);

router.post(
  '/materials/create',
  verifyToken,
  authorizeRoles('ADMIN', 'TEACHER'),
  createMaterial
);

router.put(
  '/materials/:id',
  verifyToken,
  authorizeRoles('ADMIN', 'TEACHER'),
  updateMaterial
);

router.delete(
  '/materials/:id',
  verifyToken,
  authorizeRoles('ADMIN', 'TEACHER'),
  deleteMaterial
);

export default router;
  