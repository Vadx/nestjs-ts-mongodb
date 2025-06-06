import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { User } from '../users/schemas/user.schema';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User) {
    return this.tasksService.create(createTaskDto, user._id.toString());
  }

  @Get()
  findAll(@GetUser() user: User, @Query() query: any) {
    return this.tasksService.findAll(user._id.toString(), query);
  }

  @Get('stats')
  getStats(@GetUser() user: User) {
    return this.tasksService.getTaskStats(user._id.toString());
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.tasksService.findOne(id, user._id.toString());
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @GetUser() user: User) {
    return this.tasksService.update(id, updateTaskDto, user._id.toString());
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.tasksService.remove(id, user._id.toString());
  }
}
