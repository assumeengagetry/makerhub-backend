// 用户角色枚举
export enum UserRole {
    HUIYUAN = 'hui_yuan',       
    BUZHANG = 'bu_zhang',       
    HUIZHANG = 'hui_zhang',    
    CHAOJIHUIZHANG = 'chao_ji_hui_zhang' 
}

// 项目状态枚举
export enum ProjectStatus {
    PLANNING = 'planning',
    ONGOING = 'ongoing',
    COMPLETED = 'completed'
}

// 用户接口
export interface User {
    id?: number;
    username: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt?: Date;
    updatedAt?: Date;
}

// 项目接口
export interface Project {
    id: number;
    name: string;
    description: string;
    status: ProjectStatus;
    leader: string;
    members: string[];
    tech_stack: string[];
    progress: number;
    start_date: string;
    deadline: string;
    budget: number;
    equipment: string[];
    achievements: string[];
}

// 事件接口
export interface Event {
    id: number;
    title: string;
    type: string;
    date: string;
    location: string;
    description: string;
    capacity: number;
    registered: number;
    status: string;
    organizer: string;
    requirements: string[];
    materials: string[];
}

// 成员接口
export interface Member {
    id: number;
    name: string;
    role: string;
    skills: string[];
    join_date: string;
    projects: number[];
}

// 设备接口
export interface Equipment {
    id: number;
    name: string;
    type: string;
    status: string;
    location: string;
    last_maintenance: string;
    next_maintenance: string;
    responsible_member: string;
}

// 验证错误接口
export interface ValidationError {
    loc: (string | number)[];
    msg: string;
    type: string;
}

// HTTP 验证错误接口
export interface HTTPValidationError {
    detail?: ValidationError[];
}