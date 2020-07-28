export interface User {
  email: string;
  password: string;
  login?: string;
  firstName?: string;
  lastName?: string;
}

export interface Todo {
  title: string;
  text: string;
  deadline: Date;
  createdAt?: Date;
  active: boolean;
  archive: boolean;
  _id?: string;
}
