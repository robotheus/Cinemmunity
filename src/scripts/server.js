const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'src')));

//-----------CONEXÃO COM O BANCO----------------------

mongoose.connect('mongodb://localhost:27017/cinemmunity', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado ao MongoDB');
}).catch(err => {
    console.error('Erro ao conectar ao MongoDB', err);
    process.exit();
});

//-----------TABELA USUARIO----------------------

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
    },
    filmes: {
        type: Number,
        default: 0
    },
    listas: {
        type: Number,
        default: 0
    }
});

//-----------ROTAS----------------------

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

app.post('/login', async (req, res) => {
    const { nickname, senha } = req.body;

    try {
        const user = await User.findOne({ nickname });
        console.log(user)

        if (!user) {
            res.status(404).send('Usuário não encontrado');
            return;
        }

        if (user.senha !== senha) {
            res.status(401).send('Senha incorreta');
            return;
        }

        res.status(200).send('Login bem-sucedido');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao fazer login');
    }
});

app.post('/buscar-usuario', async (req, res) => {
    const nickname = req.body.nickname;
    
    try {
        const usuario = await User.findOne({ nickname: nickname });
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/seguir-usuario', async (req, res) => {
    const followedUserNickname = req.body.followedUser;
    const followerUserId = req.body.followerUserId;

    try {
        const followedUser = await User.findOne({ nickname: followedUserNickname });
        const followerUser = await User.findOne({ nickname: followerUserId });

        if (!followedUser) {
            return res.status(404).json({ message: 'O usuário a ser seguido não foi encontrado.' });
        }

        if (!followerUser) {
            return res.status(404).json({ message: 'O usuário que está seguindo não foi encontrado.' });
        }

        followedUser.seguidores += 1;
        followerUser.seguindo += 1;

        await followedUser.save();
        await followerUser.save();

        return res.status(200).json({ message: 'Você seguiu com sucesso este usuário!' });
    } catch (error) {
        console.error('Erro ao seguir usuário:', error);
        return res.status(500).json({ message: 'Erro ao seguir usuário.' });
    }
});

app.post('/deixar-seguir-usuario', async (req, res) => {
    const followedUserNickname = req.body.followedUser;
    const followerUserId = req.body.followerUserId;

    try {
        const followedUser = await User.findOne({ nickname: followedUserNickname });
        const followerUser = await User.findOne({ nickname: followerUserId });

        if (!followedUser) {
            return res.status(404).json({ message: 'O usuário a ser seguido não foi encontrado.' });
        }

        if (!followerUser) {
            return res.status(404).json({ message: 'O usuário que está seguindo não foi encontrado.' });
        }

        followedUser.seguidores -= 1;
        followerUser.seguindo -= 1;

        await followedUser.save();
        await followerUser.save();

        return res.status(200).json({ message: 'Você deixou de seguir com sucesso este usuário!' });
    } catch (error) {
        console.error('Erro ao seguir usuário:', error);
        return res.status(500).json({ message: 'Erro ao deixar de seguir o usuário.' });
    }
});

app.get('/', (req, res) => {
    const indexPath = path.resolve(__dirname, '..', 'index.html');
    res.sendFile(indexPath);
});

app.get('/perfil', (req, res) => {
    const indexPath = path.resolve(__dirname, '..', 'perfil.html');
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

app.get('/styles/style_perfil.css', (req, res) => {
    res.type('text/css'); 
    res.sendFile(path.join(__dirname, '..', 'styles', 'style_perfil.css'));
});

app.use('/img', express.static(path.join(__dirname, '..', '..', 'img')));

app.use('/images', express.static(path.join(__dirname, '..', 'images')));

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
