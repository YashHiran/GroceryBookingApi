import express = require('express');
import bodyParser = require('body-parser');
import User from './routes/User';
import Item from './routes/Item';

const app = express();
  
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api/users/', User);
app.use('/api/', Item);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
