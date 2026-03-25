const express = require('express')
const pool = require('./db')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Funcionando')
})

//Listar todos os usuários
app.get('/usuarios', async (req, res) => {
    try{
        const result = await pool.query("SELECT id, nome FROM usuarios")
        res.json(result.rows)
    } catch(err){
        console.error(err)
        res.status(500).send('Erro interno do servidor')
    }
})

//Exibir um usuário específico
app.get('/usuarios/:id', async (req, res) => {
    try{
        const result = await pool.query(
            `SELECT id, nome, email, criado_em 
            FROM usuarios 
            WHERE id = $1`, 
            [req.params.id])
        res.json(result.rows[0])
    } catch(err){
        console.error(err)
        res.status(500).send('Erro interno do servidor')
    }
})

//Incluir um usuário
app.post('/usuarios', async (req, res) => {
    const {nome, email, senha} = req.body

    try{
        const result = await pool.query(
            `INSERT INTO usuarios 
            (nome, email, senha) 
            VALUES
            ($1, $2, $3) RETURNING id, nome, email`, 
            [nome, email, senha]
        )
        
        res.json(result.rows[0])
    } catch(err){
        console.error(err)
        res.status(500).send('Erro interno do servidor')
    }
})

//Excluir um usuário
app.delete('/usuarios/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const result = await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);

        if (result.rowCount > 0) {
        res.json({ message: 'Usuário excluído com sucesso!' });
        } else {
        res.status(404).json({ message: 'Usuário não encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao excluir usuário.' });
    }
});

app.listen(3000, () => {
    console.log('Funcionando na porta 3000')
})
