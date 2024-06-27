import {Outlet} from 'react-router-dom'
import Modal from 'react-modal'
import Sidebar from '../Components/Sidebar'
import Summary from '../Components/Summary'
import useQuiosco from '../hooks/useQiosco'
import ModalProducto from '../Components/ModalProducto'

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement('#root');

export default function Layout() {
  const {modal, handleClickModal, producto} = useQuiosco();  

  return (
    <>
      <div className='md:flex'>
        <Sidebar/>
        <main className='flex-1 h-screen overflow-y-scroll bg-gray-100 p-3'>        
          <Outlet/>  
        </main>
        <Summary/> 
      </div>

        <Modal 
          isOpen={modal}
          style={customStyles}
          onRequestClose={handleClickModal}
        >
          <ModalProducto/>
        </Modal>
    </>
  )
}