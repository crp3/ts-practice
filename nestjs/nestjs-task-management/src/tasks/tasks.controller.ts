import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDTO } from './dto/update-task-status-dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  public getTasks(
    @Query() filterDTO: GetTasksFilterDTO,
  ): Task[]{
    if (Object.keys(filterDTO).length) {
      return this.tasksService.getTasksWithFilters(filterDTO);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Get(':taskId')
  public getTaskById(@Param('taskId') taskId: string): Task {
    return this.tasksService.getTaskById(taskId);
  }

  @Delete(':taskId')
  public deleteTaskById(@Param('taskId') taskId: string): void {
    this.tasksService.deleteTaskById(taskId);
  }

  @Post()
  public createTask(
    @Body() createTaskDTO: CreateTaskDTO,
  ): Task {
    return this.tasksService.createTask(
      createTaskDTO,
    );
  }

  @Patch(':taskId/status')
  public updateTaskStatus(
    @Param('taskId') taskId: string,
    @Body('new_status') updateTaskStatusDTO: UpdateTaskStatusDTO,
  ): Task {
    const { status } = updateTaskStatusDTO;
    return this.tasksService.updateTaskStatus(
      taskId, status
    )
  }

  
}
