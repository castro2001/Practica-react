interface IActionsModal {
  isOpen: boolean;
  onClose: () => void;
  content?: React.ReactNode;
}
