import express = require('express');
import bodyParser = require('body-parser');
import User from './routes/User';

const app = express();
  
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api/users/', User);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
