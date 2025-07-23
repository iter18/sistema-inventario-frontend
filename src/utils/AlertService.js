// src/utils/AlertService.js
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const AlertService = {
  success: (title = '¡Éxito!', text = '') => {
    return Swal.fire({
      title: `<span class="mt-1 text-2xl font-bold text-green-700">${title}</span>`,
      html: `<p class="text-base font-bold text-gray-700">${text}</p>`,
      icon: 'success',
      customClass: {
        popup: 'p-3 rounded-xl shadow-lg',
        confirmButton: 'bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded',
         icon: 'mt-2 text-xs', 
         htmlContainer: 'text-sm text-gray-700 mt-0'
      },
      buttonsStyling: false,
    });
  },

  error: (title = '¡Error!', text = '') => {
    return Swal.fire({
      title: `<span class="mt-1 text-2xl font-bold text-red-700">${title}</span>`,
      html: `<p class="text-base font-bold text-gray-700">${text}</p>`,
      icon: 'error',
      customClass: {
        popup: 'p-3 rounded-xl shadow-lg',
        confirmButton: 'bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded',
         icon: 'mt-2 text-xs', 
         htmlContainer: 'text-sm text-gray-700 mt-0'
      },
      buttonsStyling: false,
    });
  },

  warning: (title = 'Atención', text = '¿Estás seguro de continuar?') => {
    return Swal.fire({
      title: `<span class="text-2xl font-bold text-yellow-600">${title}</span>`,
      html: `<p class="text-base text-gray-700">${text}</p>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      customClass: {
        popup: 'p-6 rounded-xl shadow-lg',
        confirmButton: 'bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded mr-2',
        cancelButton: 'bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-6 py-2 rounded',
        icon: 'text-5xl',
      },
      buttonsStyling: false,
    });
  },

  info: (title = 'Información', text = '') => {
    return Swal.fire({
      title: `<span class="text-2xl font-bold text-blue-600">${title}</span>`,
      html: `<p class="text-base text-gray-700">${text}</p>`,
      icon: 'info',
      customClass: {
        popup: 'p-6 rounded-xl shadow-lg',
        confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded',
        icon: 'text-5xl',
      },
      buttonsStyling: false,
    });
  },
};

export default AlertService;
