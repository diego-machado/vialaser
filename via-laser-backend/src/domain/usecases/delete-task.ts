export interface DeleteTaskModel {
  id: string
}

export interface DeleteTask {
  delete (data: DeleteTaskModel): Promise<void>
}
