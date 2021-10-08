const PORT = process.env.PORT || 8080;

const express = require('express');
const axios = require('axios')

var app = express();

app.get('/assets/:id', async (req, res) => {
    let id = req.params?.id
    if(!id) {
        return res.status(403).json({ error: "Did not provide asset id", })
    }

    try {
        id = encodeURIComponent(id)
        const response = await axios.get(`https://assetdelivery.roblox.com/v1/asset?id=${id}`)
        return res
            .status(response.status)
            .header(response.headers)
            .send(response.data)
    } catch (ex) {
        return res.status(500).json({ error: 'Error occured while making asset request', message: ex.message })
    }
})

app.get('/', (req, res) => {
    res.json({ status: "OK" })
})

app.listen(PORT, () => {
    console.log("Proxy is listening on port: ", PORT)
})