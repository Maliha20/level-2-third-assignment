/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import TUser from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';


export const UserSchema = new Schema<TUser>({
  name: {
    type: String,
    required: [true, 'You must provide full name'],
    validate: {
      validator: function (value: string) {
        return value.split(' ').length >= 2;
      },
      message: (VALUE) =>
        `${VALUE.value} is not valid. First and last name is required`,
    },
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'] },
  address: { type: String ,
    required: true,
    validate: {validator: function(value: string){
        const addressFields = value.split(',');
        return addressFields.length === 3 && addressFields.every(field => field.trim().length>0)
    }}
    
  },
}, {timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
          delete ret.password
          return ret
        }
      }
});

UserSchema.pre('save', async function(next) {
    
    const user = this
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds)    
    )
    next()
})


UserSchema.post('save', async function (doc, next) {
    doc.password = ' ';
    next();
  });

// //passwordcheck

 
//   UserSchema.statics.isPasswordMatched = async function(plainTextPassoword, hashedPassword){
//     return await bcrypt.compare(plainTextPassoword, hashedPassword )
// }


  
export const User = model<TUser>('User', UserSchema);



  

  