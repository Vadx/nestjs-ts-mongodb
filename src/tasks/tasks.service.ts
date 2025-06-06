import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(
    createTaskDto: CreateTaskDto,
    userId: string,
  ): Promise<TaskDocument> {
    const task = new this.taskModel({
      ...createTaskDto,
      userId,
    });
    return task.save();
  }

  async findAll(userId: string, query: any = {}): Promise<TaskDocument[]> {
    const filter = { userId, ...query };
    return this.taskModel.find(filter).exec();
  }

  async findOne(id: string, userId: string): Promise<TaskDocument> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    if (task.userId.toString() !== userId) {
      throw new ForbiddenException('Access denied');
    }
    return task;
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    userId: string,
  ): Promise<TaskDocument> {
    const task = await this.findOne(id, userId);
    Object.assign(task, updateTaskDto);
    return task.save();
  }

  async remove(id: string, userId: string): Promise<void> {
    await this.findOne(id, userId); // Verify ownership
    await this.taskModel.findByIdAndDelete(id).exec();
  }

  async getTaskStats(userId: string) {
    const tasks = await this.taskModel.find({ userId }).exec();
    const total = tasks.length;
    const completed = tasks.filter((task) => task.isCompleted).length;
    const pending = total - completed;

    const byStatus = tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {});

    const byPriority = tasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    }, {});

    return {
      total,
      completed,
      pending,
      byStatus,
      byPriority,
    };
  }
}
