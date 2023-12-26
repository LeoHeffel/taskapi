import { Controller,Get,Post,Delete,Put, Body ,Param,ConflictException,NotFoundException, HttpCode} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from 'src/dto/create-task-dto';
import { UpdateTaskDto } from 'src/dto/update-task-dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskSevice:TasksService){}
    
    @Get()
    async findAll(){
        try{
            return await this.taskSevice.findAll()
        }catch(error){
            throw error
        }
        
    }

    @Get(":id")
   
    async findOne(@Param('id') id:string){
        try {
            const task =  await this.taskSevice.findOne(id)
            if(!task) throw new NotFoundException("Task not found")
            return task
        } catch (error) {
            throw error
        }
        
    }

    @Post()
    async create(@Body() body :CreateTaskDto){
        try {
             return  await this.taskSevice.create(body)
        } catch (error) {
            if(error.code === 11000){
                throw new ConflictException('Task already exist')
            }
            throw error
        }
       
    }

    @Delete(":id")
    @HttpCode(204)
    async delete(@Param('id') id:string){
        try {
            const task =  await this.taskSevice.delete(id)
            if(!task) throw new NotFoundException("Task not found")
            return task
        } catch (error) {
            throw error
        }
        
    }

    @Put(":id")
    async update(@Param('id') id:string,  @Body() body :UpdateTaskDto ){
        try {
            const task = await this.taskSevice.update(id,body)
            if(!task) throw new NotFoundException("Task not found")
            return task
        } catch (error) {
            throw error
        }
        
    }

}
