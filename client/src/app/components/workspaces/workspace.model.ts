export interface INewWorkspace {
  title: string;
  description: string;
}

export interface IWorkspace extends INewWorkspace {
  id: number;
  adminId: number;
}

export interface IWorkspaceResponse {
  tables: IWorkspace[];
}
