interface IActionsModal {
  isOpen: boolean;
  onClose: () => void;
  content?: React.ReactNode;
}

interface IActionSideBar {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}