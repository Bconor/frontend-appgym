import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { verifyEmail } from '../utils/api';
// import { resendVerificationCode } from '../utils/api';

const VerifyEmail = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const navigate = useNavigate();

  const handleSubmitVerification = async (e) => {
    e.preventDefault();
    if (verificationCode.length !== 6 || !/^\d{6}$/.test(verificationCode)) {
      toast.error('Por favor, ingresa un código de 6 dígitos válido.');
      return;
    }
    setLoading(true);
    try {
      // const response = await verifyEmail(verificationCode);
      console.log('Simulando verificación con código:', verificationCode);
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = { success: true, message: 'Correo verificado con éxito. ¡Ya puedes iniciar sesión!' };
      if (response?.success) {
        toast.success(response.message || 'Verificación exitosa.');
        navigate('/');
      } else {
        throw new Error(response?.message || 'Código de verificación incorrecto o expirado.');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al verificar el correo.';
      toast.error(errorMessage);
      console.error('Error en la verificación:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
      setResending(true);
      try {
          // const response = await resendVerificationCode({ email: 'email_del_usuario' });
          console.log('Simulando reenvío de código.');
          await new Promise(resolve => setTimeout(resolve, 1000));
          const response = { success: true, message: 'Código reenviado. Revisa tu bandeja de entrada.' };
          if (response?.success) {
              toast.info(response.message || 'Código reenviado. Revisa tu bandeja de entrada.');
          } else {
              throw new Error(response?.message || 'No se pudo reenviar el código.');
          }
      } catch (error) {
           const errorMessage = error.response?.data?.message || 'Error al reenviar el código.';
           toast.error(errorMessage);
           console.error('Error al reenviar:', error);
      } finally {
          setResending(false);
      }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-10 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
            Verifica tu Correo Electrónico
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Hemos enviado un código de 6 dígitos a tu correo electrónico. Por favor, ingrésalo a continuación para verificar tu cuenta.
          </p>
        </div>

        <form onSubmit={handleSubmitVerification} className="mt-6 space-y-6">
          <div>
            <label htmlFor="verificationCode" className="block text-sm font-medium text-white">
              Código de Verificación
            </label>
            <div className="mt-2">
              <input
                id="verificationCode"
                name="verificationCode"
                type="text"
                value={verificationCode}
                onChange={(e) => {
                  const input = e.target.value;
                  if (/^\d{0,6}$/.test(input)) {
                    setVerificationCode(input);
                  }
                }}
                required
                maxLength="6"
                inputMode="numeric"
                pattern="\d{6}"
                className="block w-full rounded-md bg-gray-100 px-3 py-2 text-center text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500 tracking-widest text-xl"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || verificationCode.length !== 6}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-500"
            >
              {loading ? 'Verificando...' : 'Verificar'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
             ¿No recibiste el código?{' '}
             <button
                onClick={handleResendCode}
                disabled={resending}
                className="font-semibold text-indigo-400 hover:text-indigo-300 disabled:text-gray-600 disabled:cursor-not-allowed"
             >
                {resending ? 'Enviando...' : 'Reenviar código'}
             </button>
        </div>

         <p className="mt-4 text-center text-sm text-gray-400">
            <a href="/login" className="font-semibold text-indigo-400 hover:text-indigo-300">
               Volver al inicio de sesión
            </a>
         </p>
      </div>
    </div>
  );
};

export default VerifyEmail;