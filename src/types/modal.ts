import { FormProps } from "./form";

export interface GeneralModalProps<T = void> extends FormProps<T> {
  isOpen: boolean;
  onClose: () => void;
}
