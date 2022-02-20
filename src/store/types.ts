import { ILoginState } from "./login/types";
export interface IRootState {
  name: string;
  age: number;
}

export interface IRootWhitModule {
  login: ILoginState;
}

export type IStoreType = IRootState & IRootWhitModule;
