const express = require('express')
const app = express()
const port = 3000

app.use(express.json())  // Usando o middleware embutido para JSON

const compras = [
    { id: 1, descricao: 'PlayStation 5', preco: 5000.00 },
    { id: 2, descricao: 'Camisa do Grêmio', preco: 250.99 },
    { id: 3, descricao: 'Coxinha do Araújo', preco: 7.65 },
]

// Endpoint para listar todas as compras
app.get('/compras', (req, res) => {
    res.json(compras)
})

// Endpoint para cadastrar uma nova compra
app.post('/cadastrar-compra', (req, res) => {
    const { id, descricao, preco } = req.body
    if (!id || !descricao || !preco) {
        return res.status(400).json({ error: 'Todos os campos (id, descricao, preco) são obrigatórios' })
    }
    compras.push({ id, descricao, preco })
    res.status(201).json({ message: 'Compra cadastrada com sucesso' })
})

// Endpoint para deletar uma compra
app.delete('/deletar-compra', (req, res) => {
    const { id } = req.body
    const index = compras.findIndex(compra => compra.id === id)
    if (index === -1) {
        return res.status(404).json({ error: 'Compra não encontrada' })
    }
    compras.splice(index, 1)
    res.json({ message: 'Compra removida com sucesso' })
})

// Endpoint para consultar o valor total de todas as compras
app.get('/valor-total', (req, res) => {
    const valorTotal = compras.reduce((total, compra) => total + compra.preco, 0);
    const valorTotalFormatado = valorTotal.toFixed(2); // Formata o número para 2 casas decimais
    res.json({ valorTotal: parseFloat(valorTotalFormatado) }); // Retorna o número formatado como float
});

app.listen(port, () => {
    console.log(`Servidor express rodando na porta ${port}`)
})
