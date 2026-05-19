import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'dotenv/config';

import academicPeriodRoutes from './routes/academic_period.route.js';
import assignmentRoutes from './routes/assignment.route.js';
import attendanceRoutes from './routes/attendance.route.js';
import courseRoutes from './routes/course_session_material.route.js';
import sectionRoutes from './routes/section.route.js';
import taskRoutes from './routes/task.route.js';
import { apiLimiter } from './middleware/rate_limit.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.set('trust proxy', 1);

app.use(apiLimiter);
app.use('/period', academicPeriodRoutes);
app.use('/assignments', assignmentRoutes);
app.use('/attendances', attendanceRoutes);
app.use('/courses', courseRoutes);
app.use('/sections', sectionRoutes);
app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});