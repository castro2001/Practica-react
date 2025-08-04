interface IActionsModal {
  isOpen: boolean;
  onClose: () => void;
  modalbody: IActionModalBody;
}

interface IActionModalBody{
  title:string;
  content?: React.ReactNode;
  classNameContainer?:string;
  redirect?:string;
  redirect_Text:string;
}

interface IActionSideBar {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;

}

interface IActionsPanel {
 Open: boolean;
  setOpen: (open: boolean) => void;
}

interface ModalReutilizable{
    isOpen:boolean, 
   onClose: () => boolean;
  title:string, 
  children:React.ReactNode, 
  size:string
  showCloseButton? :boolean
  closeOnOverlayClick?:boolean
}