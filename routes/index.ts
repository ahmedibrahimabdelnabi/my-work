import express from 'express';
import accountRoutes from './api/account';

const router = express.Router();

router.use('/account', accountRoutes);

export default router;