import { toast } from 'react-toastify';

const errorHandler = (errors) => {
    errors.forEach((error) => {
        toast.error(`${error}`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    });
};

export default errorHandler;
