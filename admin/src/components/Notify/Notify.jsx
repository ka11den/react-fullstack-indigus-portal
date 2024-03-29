import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = (boolean) => {
  if (boolean) {
    toast.success('✅ Успешно!', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  } else {
    toast.error('❌ Ошибка!', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }  
}  