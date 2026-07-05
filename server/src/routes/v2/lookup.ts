import { Router, Request, Response } from 'express';
import { JOB_CATEGORIES, EMPLOYMENT_TYPES, EXPERIENCE_LEVELS, COUNTIES } from '../../constants';

const router = Router();

router.get('/job-categories', (_req: Request, res: Response) => res.json({ categories: JOB_CATEGORIES }));
router.get('/employment-types', (_req: Request, res: Response) => res.json({ types: EMPLOYMENT_TYPES }));
router.get('/experience-levels', (_req: Request, res: Response) => res.json({ levels: EXPERIENCE_LEVELS }));
router.get('/counties', (_req: Request, res: Response) => res.json({ counties: COUNTIES }));

export default router;
