export type RegisteredEventListener = {
  type: string;
  listener: (e: Event) => void;
}

export type ComponentState = Record<string, any>;

export type Action = {
  type: string,
  payload: any,
}

export type Reducer = <T extends object>(state?: T, action?: Action) => T 

export type PersistConfig = {
  key: string;
  whitelist: string[];
}