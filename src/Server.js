import express from 'express';
import cors from 'cors';
import { google } from 'googleapis';
const app = express();
const port = 9000;

app.use(cors({
    origin: 'https://localhost:*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

async function fetchData() {
    const auth = new google.auth.GoogleAuth({
        keyFile: import.meta.env.GOOGLE_KEY_FILE,
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
    });

    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });
    const spreadsheetId = import.meta.env.GOOGLE_SHEET_ID;
    const range = 'Sheet1!A1:B2';

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
    });

    console.log("response from google\n", response.data.values);
    return response.data.values;
}

app.get('/api/data', async (req, res) => {
    try {
        const data = await fetchData();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.toString());
    }
});

app.listen(port, () => {
    console.log(`Server running on https://localhost:${port}`);
})