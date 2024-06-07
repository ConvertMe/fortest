const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

let errorCount = 0


const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Michael' }
]

app.get('/api/users', (req, res) => {
    errorCount++
    if (errorCount === 6) {
        errorCount = 0
        return res.status(404).json({ error: 'Произошла ошибка повторите попытку позже' })
    }

    if (errorCount === 3) {
        setTimeout(() => {
            return res.json(users)
        }, 5000)
    } else return res.json(users)

});

app.post('/api/users', (req, res) => {
    errorCount++
    if (errorCount === 6) {
        errorCount = 0
        return res.status(404).json({ error: 'Произошла ошибка повторите попытку позже' });

    }
    const newUser = req.body;

    const newUserId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

    users.push({ id: newUserId, ...newUser });

    if (errorCount === 3) {
        setTimeout(() => {
            return res.json(users)
        }, 5000)
    } else return res.json(users)
})

app.get('/api/users/:id', (req, res) => {
    errorCount++
    if (errorCount === 6) {
        errorCount = 0
        return res.status(404).json({ error: 'Произошла ошибка повторите попытку позже' });

    }
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);

    if (user) {

        if (errorCount === 3) {
            setTimeout(() => {
                return res.json(user)
            }, 5000)
        } else return res.json(user)
    } else {
        res.status(404).json({ message: 'Пользователь не найден' });
    }
});

app.put('/api/users/:id', (req, res) => {
    errorCount++
    if (errorCount === 6) {
        errorCount = 0
        return res.status(404).json({ error: 'Произошла ошибка повторите попытку позже' });

    }
    const userId = parseInt(req.params.id)
    const updatedUser = req.body

    users.forEach(user => {
        if (user.id === userId) {
            user.name = updatedUser.name || user.name
        }
    });


    if (errorCount === 3) {
        setTimeout(() => {
            return res.json(users)
        }, 5000)
    } else return res.json(users)
})

app.delete('/api/users/:id', (req, res) => {
    errorCount++
    if (errorCount === 6) {
        errorCount = 0
        return res.status(404).json({ error: 'Произошла ошибка повторите попытку позже' });
    }
    const userId = parseInt(req.params.id);

    const idx = users.findIndex(user => user.id === userId)
    if (idx !== -1) {
        users.splice(idx, 1);

        if (errorCount === 3) {
            setTimeout(() => {
                return res.json(users)
            }, 5000)
        } else return res.json(users)
    } else {
        res.status(404).json({ message: 'Пользователь не найден' });
    }
});

app.listen(PORT, () => {
    console.log(`service started at http://localhost:${PORT}`)
})