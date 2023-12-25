let proximoIdProduto = 1;

function cadastrarProduto() {
    const nomeProduto = document.getElementById('nomeProduto').value;
    const valorProduto = document.getElementById('valorProduto').value;
    const descricaoProduto = document.getElementById('descricaoProduto').value;

    const produtoData = {
        id: proximoIdProduto,
        produto: nomeProduto,
        valor: valorProduto,
        descricao: descricaoProduto
    };

    fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(produtoData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.json.produto) {
            document.getElementById('feedback').innerText = 'Produto cadastrado com sucesso!';
            limparCampos();
            adicionarProdutoCadastrado(produtoData);
            proximoIdProduto++;
        } else {
            document.getElementById('feedback').innerText = 'Falha ao cadastrar o produto.';
        }
    })
    .catch((error) => {
        console.error('Erro na requisição:', error);
        document.getElementById('feedback').innerText = 'Erro ao processar a requisição.';
    });
}

function limparCampos() {
    document.getElementById('nomeProduto').value = '';
    document.getElementById('valorProduto').value = '';
    document.getElementById('descricaoProduto').value = '';
}

function adicionarProdutoCadastrado(produto) {
    const listaProdutos = document.getElementById('listaProdutos');
    const novoItem = document.createElement('li');
    novoItem.innerHTML = `<strong>ID ${produto.id}:</strong> ${produto.produto} - Valor: ${produto.valor} - ${produto.descricao}`;
    listaProdutos.prepend(novoItem);
}
