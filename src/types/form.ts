/**
 * Props for form components with generic data type support.
 * 
 * @interface FormProps
 * @template T - The type of form data. If void, the form has no data structure.
 * @property {T extends void ? () => void | Promise<void> : (data: T) => void | Promise<void>} onSubmit - Submit handler function. If T is void, takes no parameters; otherwise receives form data of type T.
 * @property {T extends void ? undefined : T} [defaultValues] - Optional default values for form fields. Only available when T is not void.
 */
export interface FormProps<T = void> {
  onSubmit: T extends void ? () => void | Promise<void> : (data: T) => void | Promise<void>;
  defaultValues?: T extends void ? undefined : T;
}
