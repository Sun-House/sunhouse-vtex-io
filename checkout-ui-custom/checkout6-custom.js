// Fn - Highlight Bar Checkout

// Highlight Bar Checkout component
const CUPOM_CODE = 'MAESUN7';

// 1. Defina o bloco HTML atualizado com o botão "Usar cupom"
const htmlBlock = `
<div id="coupon-highlight-container" aria-label="Linha de sessão">
    <div>
        <div style="width: 100%;">
            <div id="coupon-info-text-container">
                <div>
                    <p>
                        Mês das Mães —
                        <span class="coupon-highlight_bold-text">7% OFF</span> em qualquer produto com o cupom 
                        <span class="coupon-highlight_bold-text" id="coupon-code-display">${CUPOM_CODE}</span> 
                        <button id="apply-coupon-button">Usar cupom <i class="bi bi-gift-fill"></i></button>
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
`;

/**
 * Função principal para injetar o bloco HTML.
 */
function injetarCupomHTML(selector, position = 'beforebegin') {
    const targetElement = document.querySelector(selector);

    if (targetElement) {
        targetElement.insertAdjacentHTML(position, htmlBlock);
        // console.log('HTML injetado. Tentando anexar o evento ao botão...');
        
        // 4. Anexa o ouvinte de evento após a injeção do HTML
        const applyButton = document.getElementById('apply-coupon-button');
        if (applyButton) {
            applyButton.addEventListener('click', aplicarCupomHandler);
            // console.log('Ouvinte de evento anexado ao botão de cupom.');
        }
    } else {
        console.error(`Erro: Elemento de destino não encontrado com o seletor: ${selector}`);
    }
}

/**
 * Função que lida com o clique do botão e aplica o cupom usando vtexjs.
 */
function aplicarCupomHandler(event) {
    const button = event.target;
    // O texto original para caso precise reverter (apenas em caso de erro)
    const originalText = 'Usar cupom <i class="bi bi-ticket-fill"></i>'; 
    
    // Bloqueia o botão e mostra "Aplicando..."
    button.disabled = true;
    button.textContent = 'Aplicando...';

    // Função auxiliar para voltar o botão ao normal (usada só em caso de erro)
    const reverterBotao = () => {
        setTimeout(() => {
            button.disabled = false;
            button.innerHTML = originalText; // Usa innerHTML para o ícone voltar
            button.style.backgroundColor = ''; 
            button.style.color = '';
        }, 4000); // 4 segundos para ler o erro antes de voltar
    };

    if (typeof vtexjs === 'undefined' || typeof vtexjs.checkout === 'undefined') {
        console.error('VTEX JS não está disponível.');
        button.textContent = 'Erro ao aplicar';
        reverterBotao(); // Reverte pois foi erro técnico
        return;
    }

    vtexjs.checkout.addDiscountCoupon(CUPOM_CODE)
        .done(function(orderForm) {
            const couponApplied = orderForm.marketingData 
                && orderForm.marketingData.coupon 
                && orderForm.marketingData.coupon.toUpperCase() === CUPOM_CODE;

            if (couponApplied) {
                // --- SUCESSO! ---
                // 1. Define a mensagem fixa com innerHTML
                button.innerHTML = `Cupom aplicado <i class="bi bi-check-circle-fill"></i>`;
                
                // 2. Define as cores fixas
                button.style.backgroundColor = 'green';
                button.style.color = 'white';
                
                // 3. NÃO CHAMAMOS reverterBotao(). 
                // O botão continua disabled=true e com o texto novo para sempre.
                
            } else {
                // O código rodou, mas o cupom não foi aceito (ex: valor mínimo não atingido)
                button.textContent = 'Cupom não aplicado ⚠️';
                reverterBotao(); // Reverte para a pessoa tentar de novo
            }
        })
        .fail(function(error) {
            console.error('Erro na aplicação do cupom:', error);
            button.textContent = 'Erro na aplicação ❌';
            reverterBotao(); // Reverte para a pessoa tentar de novo
        });
        // Removemos o bloco .always() que forçava o reset
}

document.addEventListener('DOMContentLoaded', function() {
    // ⬇️ LOCAL DE EXECUÇÃO: Adicione a chamada da sua função AQUI ⬇️
    // A função injetarCupomHTML só será chamada após o carregamento do DOM.
    
    // injetarCupomHTML('#seletorDoElementoDeDestino', 'afterbegin'); 
    injetarCupomHTML('.checkout-container', 'beforebegin');
    
    // ⬆️ FIM DO LOCAL DE EXECUÇÃO ⬆️
});


// Whatsapp Button Floating
(function() {
    // --- CONFIGURAÇÕES ---
    const whatsappLink = "https://api.whatsapp.com/send?phone=5511994877664"; 
    
    
    // Coloque aqui o caminho da sua imagem/logo do WhatsApp
    // Estou usando um ícone SVG genérico online para demonstração, substitua pelo seu arquivo.
    const whatsappIconUrl = "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg";
    // ---------------------

    // 1. Criar o estilo CSS
    const style = document.createElement('style');
    style.innerHTML = `
        /* Container principal do botão (Link) */
        #wa-widget-container {
            position: fixed;
            z-index: 99999;
            text-decoration: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            font-family: sans-serif;
            transition: all 0.3s ease;
        }

        /* --- ESTILO DESKTOP (Padrão) --- */
        /* Fixado na esquerda, centralizado verticalmente */
        #wa-widget-container {
            left: 0;
            top: 50%;
            transform: translateY(-50%);
        }

        /* Parte do Texto "Tenho uma dúvida" */
        .wa-text-bubble {
            background-color: #00a884; /* Verde WhatsApp */
            color: white;
            padding: 12px 15px 12px 20px; /* Mais padding na esquerda */
            /* font-weight: bold;
            font-size: 14px; */
            font-family: 'Bai Jamjuree', sans-serif;
            font-weight: 500;
            font-size: 16px;
            text-transform: uppercase;
            white-space: nowrap;
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
            display: block; /* Visível no desktop */
        }

        /* Container do Ícone (Bola verde) */
        .wa-icon-wrapper {
            background-color: #00a884;
            /* width: 50px;
            height: 50px; */
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
            margin-left: -10px; /* Sobrepõe levemente o texto para unir */
            position: relative;
            z-index: 2;
        }

        /* A imagem do logo em si */
        .wa-icon-wrapper img {
            width: 30px;
            height: 30px;
            object-fit: contain;
        }

        /* Efeito Hover (Desktop) */
        #wa-widget-container:hover {
            filter: brightness(1.1);
            transform: translateY(-50%) scale(1.05);
        }

        /* Estilo dos icones Bootstrap */
        #coupon-highlight-container i.bi {
            margin-left: 4px
        }

        /* --- ESTILO MOBILE (Telas menores que 768px) --- */
        @media (max-width: 768px) {
            /* Fixado na direita inferior */
            #wa-widget-container {
                left: auto; /* Remove alinhamento da esquerda */
                top: auto;  /* Remove alinhamento do topo */
                bottom: 20px;
                right: 20px;
                transform: none; /* Remove a centralização vertical */
            }

            /* Esconder o texto no mobile */
            .wa-text-bubble {
                display: none;
            }

            /* Ajustar o ícone para não ter margem negativa no mobile */
            .wa-icon-wrapper {
                margin-left: 0;
                width: 60px; /* Um pouco maior no mobile para toque */
                height: 60px;
            }

            .wa-icon-wrapper img {
                width: 35px;
                height: 35px;
            }
            
            /* Hover simples no mobile */
            #wa-widget-container:hover {
                transform: scale(1.1);
            }
        }

        /* --- ESTILO ESPECIAL PARA TELAS DESKTOP - Para nao quebrar layout (Telas menores que 1690px) --- */
        @media screen and (max-width: 1690px) {
            #wa-widget-container {
                left: -120px
            }

            #wa-widget-container:hover {
                left: 0
            }

            .wa-text-bubble {
                color: #ffffff38
            }

            #wa-widget-container:hover .wa-text-bubble {
                color: white
            }
        }
    `;

    // 2. Criar a estrutura HTML
    const container = document.createElement('a');
    container.id = 'wa-widget-container';
    container.href = whatsappLink;
    container.target = '_blank'; // Abre em nova aba

    // HTML interno (Texto + Icone)
    container.innerHTML = `
        <span class="wa-text-bubble">Tenho uma dúvida</span>
        <div class="wa-icon-wrapper">
            <img src="${whatsappIconUrl}" alt="WhatsApp Logo">
        </div>
    `;

    // 3. Injetar na página quando carregar
    function injectWidget() {
        document.head.appendChild(style);
        document.body.appendChild(container);
    }

    // Garante que o DOM esteja pronto antes de injetar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectWidget);
    } else {
        injectWidget();
    }

})();


// Fn - SkuName Adjustments

// 1. Função Principal
function adjustSkuNames(items) {
    if (!items || !items.length) return;

    $.each(items, function (index, item) {
        // Seleciona o elemento. IMPORTANTE: O seletor deve rodar aqui dentro para pegar o elemento "vivo"
        var $productNameElement = $("#product-name" + item.id);

        // Se o elemento não existir, aborta
        if ($productNameElement.length === 0) return;

        // --- APLICAÇÃO DO SKELETON ---
        // Forçamos a reinicialização visual
        $productNameElement
            .removeClass('sh-processed')     // Remove flag de concluído
            .addClass('sh-skeleton-loading') // Adiciona o efeito
            .css('color', 'transparent');    // Esconde o texto original da VTEX

        // --- VALIDAÇÃO ---
        var skuNameClean = (item.skuName || "").toLowerCase().trim();
        var termosProibidos = ["sun house", "sunhouse"];
        var ehProibido = termosProibidos.indexOf(skuNameClean) !== -1;

        // --- REVELAÇÃO (Com Delay Visual) ---
        setTimeout(function () {
            // Re-seleciona o elemento (caso a VTEX tenha recriado o DOM nesse meio tempo)
            var $el = $("#product-name" + item.id);
            
            if ($el.length > 0) {
                // Só altera o HTML se não for um termo proibido
                if (!ehProibido) {
                    var nomeProduto = item.productName || item.name;
                    var nomeSku = item.skuName;

                    var novoHtml =
                        '<span class="sh-product-name">' + nomeProduto + '</span>' +
                        '<span class="sh-sku-name">' + nomeSku + '</span>';

                    $el.html(novoHtml);
                }

                // Finaliza o processo visual
                $el.removeClass('sh-skeleton-loading')
                   .addClass('sh-processed')
                   .css('color', ''); // Restaura a cor
            }
        }, 600); // 600ms = Tempo que o skeleton fica rodando
    });
}

// 2. Executa ao carregar a página (Initial Load)
$(document).ready(function() {
    if (vtexjs && vtexjs.checkout && vtexjs.checkout.orderForm) {
        adjustSkuNames(vtexjs.checkout.orderForm.items);
    } else {
        vtexjs.checkout.getOrderForm().done(function(orderForm) {
            adjustSkuNames(orderForm.items);
        });
    }
});

// 3. Executa na atualização (Update) - COM CORREÇÃO DE RACE CONDITION
$(window).on('orderFormUpdated.vtex', function (_, orderForm) {
    // Adicionamos um delay de 200ms ANTES de chamar a função.
    // Isso dá tempo para a VTEX destruir e reconstruir o HTML da linha do produto.
    setTimeout(function() {
        adjustSkuNames(orderForm.items);
    }, 200); 
});
