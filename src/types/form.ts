/**
 * Base form props for forms without data structure.
 * Used when form doesn't require structured data (e.g., simple action forms).
 * Follows Liskov Substitution Principle by providing a clear, substitutable contract for void forms.
 * 
 * @interface FormPropsVoid
 */
export interface FormPropsVoid {
  onSubmit: () => void | Promise<void>;
  defaultValues?: undefined;
}

/**
 * Form props for forms with structured data.
 * Used when form requires typed data structure.
 * Follows Liskov Substitution Principle by providing a clear, substitutable contract for typed forms.
 * Any subtype of T can be safely substituted without breaking functionality.
 * 
 * @interface FormPropsWithData
 * @template T - The type of form data (must not be void)
 */
export interface FormPropsWithData<T> {
  onSubmit: (data: T) => void | Promise<void>;
  defaultValues?: T;
}

/**
 * Props for form components with generic data type support.
 * 
 * Follows Liskov Substitution Principle (LSP) by:
 * 1. Providing distinct, substitutable contracts for void and typed forms
 * 2. Ensuring that subtypes can be safely substituted without breaking functionality
 * 3. Using conditional types to maintain type safety while preserving interface compatibility
 * 
 * The conditional type ensures that:
 * - When T is void: onSubmit takes no parameters, defaultValues is undefined
 * - When T is not void: onSubmit receives data of type T, defaultValues is of type T
 * 
 * This design allows FormPropsVoid and FormPropsWithData<T> to be used as substitutable
 * implementations of FormProps<T>, satisfying LSP requirements.
 * 
 * @interface FormProps
 * @template T - The type of form data. If void, the form has no data structure.
 * 
 * @example
 * // Form without data structure - can be substituted with FormPropsVoid
 * const voidForm: FormProps<void> = {
 *   onSubmit: () => console.log('Submitted')
 * };
 * 
 * @example
 * // Form with data structure - can be substituted with FormPropsWithData<MyFormData>
 * interface MyFormData { name: string; email: string; }
 * const dataForm: FormProps<MyFormData> = {
 *   onSubmit: (data) => console.log(data.name),
 *   defaultValues: { name: 'John', email: 'john@example.com' }
 * };
 */
export interface FormProps<T = void> {
  onSubmit: T extends void ? () => void | Promise<void> : (data: T) => void | Promise<void>;
  defaultValues?: T extends void ? undefined : T;
}
