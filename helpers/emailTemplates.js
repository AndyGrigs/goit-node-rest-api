// helpers/emailTemplates.js

/**
 * Шаблон листа для верифікації email
 * @param {string} verificationToken - Токен для верифікації
 * @param {string} baseUrl - Базова URL сервера
 */
export const verificationEmailTemplate = (verificationToken, baseUrl) => {
  const verificationLink = `${baseUrl}/api/auth/verify/${verificationToken}`;
  
  return `
    <!DOCTYPE html>
    <html lang="uk">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Верифікація Email</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .container {
          background-color: #f4f4f4;
          border-radius: 10px;
          padding: 30px;
        }
        .header {
          background-color: #4CAF50;
          color: white;
          padding: 20px;
          border-radius: 10px 10px 0 0;
          text-align: center;
        }
        .content {
          background-color: white;
          padding: 30px;
          border-radius: 0 0 10px 10px;
        }
        .button {
          display: inline-block;
          padding: 12px 30px;
          background-color: #4CAF50;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          margin: 20px 0;
        }
        .button:hover {
          background-color: #45a049;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          color: #666;
        }
        .link {
          word-break: break-all;
          color: #666;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Підтвердження Email</h1>
        </div>
        <div class="content">
          <h2>Вітаємо!</h2>
          <p>Дякуємо за реєстрацію. Для завершення реєстрації, будь ласка, підтвердіть вашу електронну адресу.</p>
          
          <p>Натисніть на кнопку нижче, щоб верифікувати ваш email:</p>
          
          <div style="text-align: center;">
            <a href="${verificationLink}" class="button">Підтвердити Email</a>
          </div>
          
          <p>Або скопіюйте і вставте це посилання у ваш браузер:</p>
          <p class="link">${verificationLink}</p>
          
          <p><strong>Важливо:</strong> Це посилання дійсне тільки для одноразового використання.</p>
          
          <p>Якщо ви не реєструвалися на нашому сайті, просто проігноруйте цей лист.</p>
        </div>
        <div class="footer">
          <p>З повагою,<br>Команда вашого додатку</p>
        </div>
      </div>
    </body>
    </html>
  `;
};