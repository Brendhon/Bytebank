import { FormProps } from "./form";

/**
 * Props for modal components that can contain forms.
 * 
 * @interface GeneralModalProps
 * @template T - The type of form data. If void, the modal contains a form with no data structure.
 * @extends {FormProps<T>}
 * @property {boolean} isOpen - Whether the modal is currently visible
 * @property {() => void} onClose - Callback function to close the modal
 */
export interface GeneralModalProps<T = void> extends FormProps<T> {
  isOpen: boolean;
  onClose: () => void;
}
