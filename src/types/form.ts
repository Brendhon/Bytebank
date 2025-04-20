export interface FormProps<T = void> {
  onSubmit: T extends void ? () => void | Promise<void> : (data: T) => void | Promise<void>;
  defaultValues?: T extends void ? undefined : T;
}
