import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Post()
  createTask(@Body() task: Task) {
    return this.taskService.createTask(task);
  }

  @Get()
  getAll() {
    return this.taskService.getAllTasks();
  }
  // @Get()
  // getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.taskService.getTasksWithFilter(filterDto);
  //   } else {
  //     return this.taskService.getAllTasks();
  //   }
  // }

  // @UsePipes(ValidationPipe)
  // @Post('/')
  // createTask(@Body() createTaskDto: CreateTaskDto) {
  //   return this.taskService.createTask(createTaskDto);
  // }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.getTaskById(id);
  }
  // O

  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  // ) {
  //   return this.taskService.updateStatus(id, status);
  // }
}
