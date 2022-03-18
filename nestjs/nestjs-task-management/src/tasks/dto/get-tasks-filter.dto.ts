import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from "../task.model";

export class GetTasksFilterDTO {
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search?: string;
}
