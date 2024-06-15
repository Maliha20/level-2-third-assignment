import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import { authRoutes } from './app/modules/auth/auth.routes';
import { userRoutes } from './app/modules/users/user.route';
import { serviceRoutes } from './app/modules/service/service.route';
import { slotRoutes } from './app/modules/slot/slot.route';
import { bookingRoutes } from './app/modules/bookings/booking.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', serviceRoutes);
app.use('/api', slotRoutes);
app.use('/api', bookingRoutes);


app.get('/', (req : Request, res :Response) => {
  res.json({
    message: 'Hello world',
  });
});


//global error handler

app.use(globalErrorHandler);

//not found route

app.use(notFound)

export default app;
