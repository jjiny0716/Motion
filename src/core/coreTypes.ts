export type RegisteredEventListener = {
  type: string;
  listener: (e: Event) => void;
};

export type ComponentState = Record<string, any>;

export type Action = {
  type: any;
  payload: any;
};

export type Reducer<S = any, A extends Action = Action> = (
  state: S | undefined, 
  action: A | undefined,
) => S;

export type ReducersMapObject<S = any, A extends Action = Action> = {
  [K in keyof S]: Reducer<S[K], A>
}

export type PersistConfig = {
  key: string;
  whitelist: string[];
};
