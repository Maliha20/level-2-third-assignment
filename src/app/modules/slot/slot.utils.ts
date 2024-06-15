import { TSlotSchedules } from "./slot.interface"

 
//checking if slot time conflicts
export const doesSlotConflict = (newExistingSlot: TSlotSchedules[], newSlot: TSlotSchedules)=>{
 
    for( const slot of newExistingSlot){
        const existingStartTime = new Date (`1997-09-01T${slot.startTime}`)
        const existingEndTime = new Date (`1997-09-01T${slot.endTime}`)
        const newStartTime =  new Date (`1997-09-01T${newSlot.startTime}`)
        const newEndTime =  new Date (`1997-09-01T${newSlot.endTime}`)
      
        if(newStartTime < existingEndTime && newEndTime > existingStartTime){
         return true
        }
    }
    
       return false
}

//converting minutes into 09:00 time format

export const convertMinutesIntoHour = (minutes: number)=>{
    const hour = Math.floor(minutes/60)
    const mins = minutes % 60
    return `${hour.toString().padStart(2,'0')}: ${mins.toString().padStart(2, '0')}`
}


// export const convertHourToMinutes = (startTime: string, endTime: string ,serviceDuration: number)=>{
    
//   const hourStartIntoMinutes =
//   parseInt(startTime.split(':')[0], 10) * serviceDuration;

//    const hourEndIntoMinutes =
//   parseInt(endTime.split(':')[0], 10) * serviceDuration;

//    const totalDuration = hourEndIntoMinutes - hourStartIntoMinutes;
//    const numberOfSlots = totalDuration / serviceDuration;
//    return numberOfSlots
// }