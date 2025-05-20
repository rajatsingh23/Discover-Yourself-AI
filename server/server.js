
const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv');
app.use(cors())
app.use(express.json())
dotenv.config()
dotenv.config({ path: './config/.env' });

const { GoogleGenerativeAI } = require('@google/generative-ai')


const genAI = new GoogleGenerativeAI(process.env.API_KEY)

app.post('/gemini', async (req, res) => {
  try {
    const { history, message, guide } = req.body;



    // Format the history messages as per Google Generative AI requirements:
    const formattedHistory = history.map(msg => ({
      role: msg.role === 'user' ? msg.role: 'model',
      parts: [{text: msg.content}]
    }));

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const chat = model.startChat({
      history: formattedHistory
    });

    // Send the new message from user
    const result = await chat.sendMessage(message);

    const response = await result.response;
    const text = response.text();
    
    res.send(text);

  } catch (error) {
    console.error("Error in /gemini:", error);
    res.status(500).send("Internal Server Error");
  }
});



app.listen(process.env.PORT, () => console.log(`listning on ${process.env.PORT}`))

