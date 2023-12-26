import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from 'src/schemas/task.scheema';
import { Model } from 'mongoose';
import { CreateTaskDto } from 'src/dto/create-task-dto';
import { UpdateTaskDto } from 'src/dto/update-task-dto';

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name)private taskModel: Model<Task>){
        
    }
    async findAll(){
      return await this.taskModel.find()
    }
    async create(createTask:CreateTaskDto){
       const newTask = new this.taskModel(createTask)
       return await newTask.save()
    }
    async findOne(id:string){
        return await this.taskModel.findById(id)
    }

    async delete(id:string){
        return await this.taskModel.findByIdAndDelete(id)
    }

    async update(id:string, task :UpdateTaskDto){
        return await this.taskModel.findByIdAndUpdate(id,task)
    }
}
