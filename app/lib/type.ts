export interface Tasktype {
    id: number;
    title: string;
    userId: string;
    createdAt: Date; 
    updatedAt: Date | null;  
} 

export type typedata = {
    data: Error | Tasktype[] 
}
  