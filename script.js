document.addEventListener('DOMContentLoaded', () => {
    // Selecione todos os botões de adicionar ao carrinho
    const botoesAdicionar = document.querySelectorAll('.adicionar');

    // Adiciona um ouvinte de evento para cada botão
    botoesAdicionar.forEach(botao => {
        botao.addEventListener('click', () => {
            // Obtém os dados do botão
            const produto = botao.getAttribute('data-produto');
            const preco = parseFloat(botao.getAttribute('data-preco'));

            // Adiciona o item ao localStorage
            adicionarAoCarrinho(produto, preco);
        });
    });

    // Função para adicionar item ao carrinho
    function adicionarAoCarrinho(produto, preco) {
        // Obtém o carrinho do localStorage ou cria um novo
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        
        // Adiciona o novo item ao carrinho
        carrinho.push({ produto, preco });
        
        // Salva o carrinho atualizado no localStorage
        localStorage.setItem('carrinho', JSON.stringify(carrinho));

        // Atualiza a contagem de itens no carrinho
        atualizarCarrinho();
    }

    // Função para atualizar o carrinho
    function atualizarCarrinho() {
        // Obtém o carrinho do localStorage
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

        // Obtém o total e a lista de itens do carrinho
        const total = document.getElementById('total');
        const listaCarrinho = document.getElementById('lista-carrinho');

        // Limpa a lista
        listaCarrinho.innerHTML = '';

        // Calcula o total
        let totalPreco = 0;

        // Adiciona cada item à lista
        carrinho.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.produto} - R$ ${item.preco.toFixed(2)}`;
            listaCarrinho.appendChild(li);
            totalPreco += item.preco;
        });

        // Atualiza o total exibido
        total.textContent = `Total: R$ ${totalPreco.toFixed(2)}`;
    }

    // Função para finalizar a compra
    function finalizarCompra() {
        // Limpa o carrinho do localStorage
        localStorage.removeItem('carrinho');
        
        // Atualiza a página do carrinho
        atualizarCarrinho();
        
        // Exibe uma mensagem ou redireciona para uma página de confirmação, se desejar
        alert('Compra finalizada com sucesso!');
    }

    // Adiciona um ouvinte de evento ao botão de finalizar
    const botaoFinalizar = document.getElementById('finalizar');
    if (botaoFinalizar) {
        botaoFinalizar.addEventListener('click', finalizarCompra);
    }

    // Atualiza o carrinho ao carregar a página
    atualizarCarrinho();
});
