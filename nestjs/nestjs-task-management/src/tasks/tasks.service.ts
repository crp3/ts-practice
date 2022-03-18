import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    public getAllTasks(): Task[]{
        return this.tasks;
    }

    public deleteTaskById(taskId: string): void{
        this.tasks = this.tasks.filter(
            (task: Task) => 
                task.id !== taskId
        );
    }

    public createTask(createTaskDTO: CreateTaskDTO): Task {
        const { title, description } = createTaskDTO;

        const task: Task = {
            id: uuid(),
            title, 
            description,
            status: TaskStatus.OPEN,
        }

        this.tasks.push(task);
        return task;
    }

    public getTasksWithFilters(filterDto: GetTasksFilterDTO): Task[] {
        const { status, search } = filterDto;

        let tasks = this.getAllTasks();

        tasks = status ? 
            tasks.filter(
                (task: Task) => 
                    task.status === status
                ): tasks;

        
        tasks = search ?
            tasks.filter(
                (task: Task) =>
                    task.title.includes(search) || task.description.includes(search)
                ): tasks;

        return tasks;
    }

    public updateTaskStatus(taskId: string, newStatus: TaskStatus): Task {
        const taskIndex = this.tasks.findIndex(
            (task: Task) =>
                task.id === taskId
        );

        this.tasks[taskIndex].status = newStatus;
        return this.tasks[taskIndex];
    }

    public getTaskById(taskId: string): Task {
        return this.tasks.find(
            (task: Task) =>
                task.id === taskId
            );
    }
}
