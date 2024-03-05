import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from "@nestjs/common";
import { TimeEntryService } from "./timeEntry.service";
import { TimeEntry } from "src/schemas/timeEntry.schema";
import { CreateTimeEntryDto } from "src/dto/create-timeEntry.dto";
import { UpdateTimeEntryDto } from "src/dto/update-timeEntry.dto";

@Controller('timeEntry')
export class TimeEntryController{
    constructor(private timeEntryService : TimeEntryService){}
    @Post('addTimeEntry')
    addTimeEntry(@Body() timeEntry: CreateTimeEntryDto): Promise<TimeEntry> {
        return  this.timeEntryService.create(timeEntry)

    }
    @Get('getAllTimeEntries')
    getAllTimeEntrys() : Promise<TimeEntry[]> {
        return  this.timeEntryService.findAll();
    }
    @Get('getTimeEntry/:id')
    getTimeEntryById(@Param('id') id:string) : Promise<TimeEntry> {
        return  this.timeEntryService.findById(id);
    }
    @Put('updateTimeEntry/:id')
    updateTimeEntry(@Param('id') id:string,@Body() timeEntry: UpdateTimeEntryDto): Promise<TimeEntry> {
        return  this.timeEntryService.updateById(id , timeEntry ) ;
    }

    @Delete('deleteTimeEntry/:id')
    deleteTimeEntryById(@Param('id') id:string) : Promise<TimeEntry> {
        return this.timeEntryService.deleteById(id);
    }
    @Get('getTimeEntriesByEmployee/:employee')
    async findByEmployee(@Param('employee') employee: string): Promise<TimeEntry[]> {
        return await this.timeEntryService.findByEmployee(employee);
    }

    @Put('updateTimeEntryByEmployeeDate')
    updateTimeEntryByEmployeeDate(@Body('employee') employee: string, @Body('date') date: Date,@Body() timeEntry: UpdateTimeEntryDto): Promise<TimeEntry> {
        return  this.timeEntryService.updateOneByEmployeeAndDate(employee,date, timeEntry ) ;
    }
}