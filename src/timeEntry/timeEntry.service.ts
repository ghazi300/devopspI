import { Injectable, NotFoundException, Req } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { User } from "src/schemas/User.schema";
import { TimeEntry } from "src/schemas/timeEntry.schema";

@Injectable()
export class TimeEntryService{
    constructor(
        @InjectModel(TimeEntry.name)
        private TimeEntryModel : mongoose.Model<TimeEntry>,
    ){}
   async findAll(): Promise<TimeEntry[]> {
        const  timeEntry = await this.TimeEntryModel.find()
        return timeEntry;
    }
    // async create(timeEntry: TimeEntry): Promise<TimeEntry> {
    //     const  newTimeEntry = await this.TimeEntryModel.create(timeEntry);
    //     return  newTimeEntry;
    // }
    // async create(@Req() request: any, timeEntry: TimeEntry): Promise<TimeEntry> {
    //     timeEntry.employee = request.user._id; // Assign user ID from request object
    //     const newTimeEntry = await this.TimeEntryModel.create(timeEntry);
    //     return newTimeEntry;
    // }
    async create( timeEntry: TimeEntry): Promise<TimeEntry> {
        const newTimeEntry = await this.TimeEntryModel.create(timeEntry);
        return newTimeEntry;
    }
   
     async findById(id: string): Promise<TimeEntry> {
        const  newTimeEntry = await this.TimeEntryModel.findById(id);
        if(!newTimeEntry){
                throw new NotFoundException('This timeEntry does not exist');
        }
        return  newTimeEntry;
    }
    
    async updateById(id: string,updateTimeEntry:TimeEntry): Promise<TimeEntry> {
        return await this.TimeEntryModel.findByIdAndUpdate(id,updateTimeEntry,{
            new:true,
            runValidators:true
        });
       
    }
    async deleteById(id: string): Promise<TimeEntry> {
        return await this.TimeEntryModel.findByIdAndDelete(id);
       
    }
    async findByEmployee(employee: string): Promise<TimeEntry[]> {  
         return await this.TimeEntryModel.find({employee: employee });
    }

    async updateOneByEmployeeAndDate(employee:string,date: Date,updateTimeEntry:TimeEntry):Promise<TimeEntry>{
    let ponitage=await this.TimeEntryModel.findOne({employee , date});
    let id=ponitage.id
        return await this.TimeEntryModel.findByIdAndUpdate(id,updateTimeEntry,{
            new:true,
            runValidators:true
        });
    }
    async findByEmployeeAndDate(employee:string,date: Date) :Promise <TimeEntry[]>{
        
       let allEntries= await this.TimeEntryModel.find({employee , date});
       return allEntries;
   }
}