export interface INewWorkspace {
  title: string;
  description: string;
}

export interface IWorkspace extends INewWorkspace {
  id: number;
  adminId: number;
  Folders?: IWorkspaceFolder[];
}
export interface IWorkspaceResponse {
  tables: IWorkspace[];
}

export interface IWorkspaceByIdResponse {
  table: IWorkspace;
}

/** Folders */
export interface IWorkspaceFolder {
  id: number;
  position: number;
  title: string;
  Tasks: any[];
}

export interface INewTask {
  title: string;
  description: string;
}