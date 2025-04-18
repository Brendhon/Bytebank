export interface GeneralModalProps<T = void> {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: T extends void ? () => void | Promise<void> : (data: T) => void | Promise<void>;
  defaultValues?: T extends void ? undefined : T;
}
