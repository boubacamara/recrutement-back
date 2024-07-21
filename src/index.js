const app = require('./app');

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.info(`Listening on PORT: ${PORT}`, `\nFollow this link (http://localhost:${PORT})`));