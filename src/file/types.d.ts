interface File {
  id: number;
  openid: string;
  type: 'task' | 'avatar';
  taskId?: string;
  fileName: string;
  uploadTime: string;
}
