import nodemailer from 'nodemailer'

export const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  //Informacion email
  const info = await transport.sendMail({
    from: ' "UpTask - Adminastrodor de Proyectos" <cuentas@uptask.com>',
    to: email,
    subject: "UpTask - Compurba tu cuenta ",
    text: "Comprueba tu cuenta en UpTask",
    html: `<p> Hola: ${nombre} Comprueba tu cuenta en UpTask</p>
        <p>Tu Cuenta esta casi lista, solo debes comprobarla en el siguiente enlace:
        <a href="${process.env.FRONTED_URL}/confirmar/${token}">Comprobar Cuenta</a>
        
        <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        
        `

  })
}


export const emailOlvidePassword = async (datos) => {
  const { email, nombre, token } = datos

  // TODO: mover hacia variables de entorno
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  //Informacion email
  const info = await transport.sendMail({
    from: ' "UpTask - Adminastrodor de Proyectos" <cuentas@uptask.com>',
    to: email,
    subject: "UpTask - Reestablece tu Password ",
    text: "Reestablece tu Password",
    html: `<p> Hola: ${nombre} has solicitado reestablecer tu Password </p>
      <p>Sigue el siguiente enlace para generar un nuevo Password:
      <a href="${process.env.FRONTED_URL}/olvide-password/${token}">Reetablecer</a>
      
      <p>Si tu no solisitaste este email, puedes ignorar este mensaje</p>
      
      `

  })
}