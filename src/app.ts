import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/users/user.route';
import { authRoutes } from './app/modules/auth/auth.routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { serviceRoutes } from './app/modules/service/service.route';
import { slotRoutes } from './app/modules/slot/slot.route';
import { bookingRoutes } from './app/modules/bookings/booking.route';
import notFound from './app/middlewares/notFound';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', serviceRoutes);
app.use('/api/services', slotRoutes);
app.use('/api', bookingRoutes);

app.get('/', (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
});

//global error handler

app.use(globalErrorHandler);

//not found route

app.use(notFound)

export default app;
