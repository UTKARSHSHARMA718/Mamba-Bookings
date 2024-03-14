export type ModalProps = {
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactNode;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  isOpen?: boolean;
  footer?: React.ReactElement;
};
