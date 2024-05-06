import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  getAllTasks() {
    return this.taskRepository.find();
  }

  createTask(task: Task) {
    const taskCreated = this.taskRepository.create(task);
    return this.taskRepository.save(taskCreated);
  }

  // getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;

  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }

  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //   return tasks;
  // }

  // createTask(createTaskDto: CreateTaskDto) {
  //   // const { title, description } = createTaskDto;
  //   // const task: Task = {
  //   //   id: uuid(),
  //   //   title,
  //   //   description,
  //   //   status: TaskStatus.OPEN,
  //   // };
  //   // this.tasks.push(task);

  //   return task;
  // }

  getTaskById(id: string): Promise<Task> {
    const found = this.taskRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`task with ID "${id}" not found`);
    }
    return found;
  }

  // deleteTask(id: string) {
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((t) => t.id !== found.id);
  // }
  // updateStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
