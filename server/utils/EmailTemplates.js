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

module.exports = {
    welcomeTemplate,
    accountDeletedTemplate,
    passwordUpdatedTemplate
}