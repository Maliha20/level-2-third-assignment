import { Schema, model } from "mongoose";
import { TBooking} from "./booking.interface";
import { vehicleType } from "./booking.constant";

const bookingSchema = new Schema<TBooking>({
customer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
},
service: {
    type: Schema.Types.ObjectId,
     
      unique: true,
      ref: 'Service',
},
slot: {
    type: Schema.Types.ObjectId,
    ref: 'Slot'
},
vehicleType:  {
    type: String,
    enum: {
      values: vehicleType,
      message: '{VALUE} is not a valid vehicle.',
    },
  },
vehicleBrand: {
    type:String,
    required: true
},
vehicleModel:  {
    type:String,
    required: true
},
manufacturingYear:  {
    type:Number,
    required: true
},
registrationPlate:  {
    type:String,
    required: true,
    unique:true
},
},{timestamps:true
})


export const Booking = model<TBooking>('Booking', bookingSchema)