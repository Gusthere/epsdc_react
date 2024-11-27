//por alguna razon estos no se usan para las alertas como tal pero se usan en app.js en las props de navigating
// alertConfigs.js
export const alertConfigs = {
    recuperar_cuenta: {
      emptyInput: {
        title: 'Campo vacío',
        message: 'Por favor, introduce un correo electrónico.',
      },
      success: {
        title: ' Exito',
        message: 'Se ha enviado un correo a: {input}',
      },
    },
    codigo: {
      emptyInput: {
        title: 'Campo vacío',
        message: 'Por favor, introduce el código de recuperación.',
      },
      success: {
        title: 'Éxito',
        message: 'Código verificado: {input}',
      },
    },
  };
  