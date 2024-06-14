import express = require('express');
import bodyParser = require('body-parser');
import UserController from './routes/UserController';
import ItemController from './routes/ItemController';
import OrderController from './routes/OrderController';

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api/users/', UserController);
app.use('/api/', ItemController);
app.use('/api', OrderController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
