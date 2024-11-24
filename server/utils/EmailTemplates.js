const welcomeTemplate = {
    subject: '¡Bienvenido a Dividilo!',
    html: `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
    </head>
    <body style="font-family: sans-serif;">
        <div style="max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2c3e50;">¡Bienvenido a Dividilo!</h1>
            <p>Nos alegra tenerte como parte de nuestra comunidad. Con Dividilo vas a poder:</p>
            <ul>
                <li>📊 Organizar tus gastos grupales</li>
                <li>💰 Dividir cuentas fácilmente</li>
                <li>👥 Gestionar grupos de gastos</li>
            </ul>
        </div>
    </body>
    </html>`
};

const passwordUpdatedTemplate = {
    subject: 'Tu contraseña ha sido actualizada',
    html: `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
    </head>
    <body style="font-family: sans-serif;">
        <div style="max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2c3e50;">Contraseña Actualizada</h1>
            <p>Hola,</p>
            <p>La contraseña de tu cuenta de Dividilo ha sido actualizada exitosamente.</p>
            <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px;">
                <p>🔐 Si no realizaste este cambio:</p>
                <ol>
                    <li>Cambia tu contraseña inmediatamente</li>
                    <li>Contacta con nuestro soporte</li>
                </ol>
            </div>
        </div>
    </body>
    </html>`
};

const accountDeletedTemplate = {
    subject: 'Tu cuenta ha sido eliminada',
    html: `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
    </head>
    <body style="font-family: sans-serif;">
        <div style="max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2c3e50;">Cuenta Eliminada</h1>
            <p>Hola,</p>
            <p>Tu cuenta de Dividilo ha sido eliminada exitosamente.</p>
            <ul>
                <li>🗑️ Tus datos personales han sido eliminados</li>
                <li>📊 El historial de grupos y gastos no estará disponible</li>
                <li>↩️ Podes crear una nueva cuenta cuando lo desees</li>
            </ul>
        </div>
    </body>
    </html>`
};

const inviteToProjectTemplate = (password) => ({
    subject: 'Te han invitado a un proyecto en Dividilo',
    html: `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
    </head>
    <body style="font-family: sans-serif;">
        <div style="max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2c3e50;">¡Fuiste invitado a un proyecto!</h1>
            <p>Hola,</p>
            <p>Alguien te agregó como participante en un proyecto de <b>Dividilo</b>, pero notamos que aún no tenés una cuenta.</p>
            <p>Para poder unirte y gestionar el proyecto, necesitas registrarte en nuestra plataforma:</p>
            <div style="text-align: center; margin: 20px 0;">
                <a href="http://localhost:3000/login" 
                   style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #3498db; border-radius: 5px; text-decoration: none;">
                   Crear mi cuenta
                </a>
            </div>
            <p>Además, generamos una contraseña temporal para vos:</p>
            <div style="background-color: #ecf0f1; padding: 10px; border-radius: 5px; text-align: center;">
                <b>${password}</b>
            </div>
            <p>Recordá cambiar esta contraseña una vez que ingreses por primera vez.</p>
            <p>Si no esperabas este mensaje, simplemente ignoralo.</p>
            <p style="color: #95a5a6;">El equipo de Dividilo</p>
        </div>
    </body>
    </html>`
});


module.exports = {
    welcomeTemplate,
    accountDeletedTemplate,
    passwordUpdatedTemplate,
    inviteToProjectTemplate
}