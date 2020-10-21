import { SkillsInterface } from './skills';

export interface EmployeeInterface {
    id: number;
    fullName: string;
    email: string;
    phone: number;
    skills: SkillsInterface[];
}
