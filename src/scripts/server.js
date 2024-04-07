const express = require('express');
const mongoose = require('mongoose');
const app_aux = express();
const path = require('path');

mongoose.connect('mongodb://localhost:27017/cinemmunity', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado ao MongoDB');
}).catch(err => {
    console.error('Erro ao conectar ao MongoDB', err);
    process.exit();
});

const app = express();
app.use(express.json());

const User = mongoose.model('User', {
    nickname: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    seguidores: {
        type: Number,
        default: 0
    },
    seguindo: {
        type: Number,
        default: 0
    }
});

app.post('/cadastro', async (req, res) => {
    try {
        const { nickname, senha, email } = req.body;
        const user = new User({ nickname, senha, email });
        await user.save();
        res.status(201).send('Usuário cadastrado com sucesso');
    } catch (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
            res.status(400).send('Nickname já está em uso');
        } else {
            console.error(err);
            res.status(500).send('Erro ao cadastrar usuário');
        }
    }
});

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    const indexPath = path.resolve(__dirname, '..', 'index.html');
    res.sendFile(indexPath);
});

app.get('/scripts/script.js', (req, res) => {
    res.type('text/javascript');
    res.sendFile(path.join(__dirname, 'script.js'));
});

app.get('/styles/style_home.css', (req, res) => {
    res.type('text/css'); 
    res.sendFile(path.join(__dirname, '..', 'styles', 'style_home.css'));
});

app.use('/img', express.static(path.join(__dirname, '..', '..', 'img')));

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
