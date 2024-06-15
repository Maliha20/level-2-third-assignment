
# Third Assignment -level-2 (Vehicle Service Booking System)

  
***
Introduction
***
This project is a Vehicle Service Booking System built using TypeScript, Express.js, and MongoDB with Mongoose as the Object Data Modeling (ODM) library. The system includes models for Users, Services, Slots, and Bookings, and provides RESTful API endpoints for managing these entities.

  ***
 # Technology Stack

  *   Technology Stack
      * Programming Language: TypeScript
      * Web Framework: Express.js
      * ODM Library: Mongoose
      * Database: MongoDB
      * cors
      * eslint
      * prettier
      * zod
    
  *   Project Structure

      * src/: Contains the source code
      * models/: Mongoose models for User, Service, Slot, and Booking
      * routes/: Express routes for API endpoints
      * controllers/: Logic for handling requests and responses
      * middlewares/: Middleware for authentication and error handling
      * utils/: Utility functions and constants
      * config/: Configuration files for environment variables and database connection
      * app.ts: Main application file
    
     
# Models
  * UserModel

      * name: Full name of the user
      * email: Email address used for communication and login
      * password: Securely hashed password for authentication
      * phone: Contact phone number for notifications and updates
      * role: Role of the user (admin or user)
      * address: Complete physical address for service delivery or correspondence
   
* Service Model

      * name: Title of the service
      * description: Brief description of what the service entails
      * price: Cost of the service in the local currency
      * duration: Duration of the service in minutes
      * isDeleted: Indicates whether the service is marked as deleted
   
*  Slot Model

      * service: Reference to the specific service being booked
      * date: Date of the booking
      * startTime: Start time of the slot
      * endTime: Approximate end time of the slot
      * Booked: Status of the slot (available, booked, canceled)
   
   
* Booking Model

      * customer: Reference to the user who made the booking
      * service: Reference to the service being booked 
      * slot: Reference to the booking slot
      * description: Brief description of what the service entails
      * vehicleType: Type of the vehicle  
      * vehicleBrand: Brand or manufacturer of the vehicle
      * vehicleModel: Model or variant of the vehicle
      * manufacturingYear: Manufacturing year of the vehicle
      * registrationPlate: Unique registration number assigned to the vehicle
   


   # Installation
     > npm i / npm install
    

   environment variables
   > open .env file and put database url, node env and port here

   Run the project
  > npm start:dev for development
  > npm start:prod for production

  

  live site link- https://level-2-second-assignment.vercel.app/