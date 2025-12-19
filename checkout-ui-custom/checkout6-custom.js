// Highlight Bar Checkout component
const CUPOM_CODE = 'NATAL15';

// 1. Defina o bloco HTML atualizado com o botão "Usar cupom"
const htmlBlock = `
<div id="coupon-highlight-container" aria-label="Linha de sessão">
    <div>
        <div style="width: 100%;">
            <div id="coupon-info-text-container">
                <div>
                    <p>
                        Seu carrinho merece 
                        <span class="coupon-highlight_bold-text" id="">15% OFF</span> — Aplique
                        <span class="coupon-highlight_bold-text" id="coupon-code-display">${CUPOM_CODE}</span> 
                        abaixo e economize hoje! <button id="apply-coupon-button">Usar cupom 🎁</button>
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
        console.log('HTML injetado. Tentando anexar o evento ao botão...');
        
        // 4. Anexa o ouvinte de evento após a injeção do HTML
        const applyButton = document.getElementById('apply-coupon-button');
        if (applyButton) {
            applyButton.addEventListener('click', aplicarCupomHandler);
            console.log('Ouvinte de evento anexado ao botão de cupom.');
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
    const originalText = 'Usar cupom 🎁'; // Texto original do botão
    const revertDelay = 7000; // 7 segundos em milissegundos
    
    button.disabled = true;
    button.textContent = 'Aplicando...';

    if (typeof vtexjs === 'undefined' || typeof vtexjs.checkout === 'undefined') {
        console.error('VTEX JS não está disponível.');
        button.textContent = 'Erro ao aplicar';
        // Se houver erro de inicialização, habilita e reverte rapidamente
        setTimeout(() => {
            button.disabled = false;
            button.textContent = originalText;
            button.style.backgroundColor = ''; 
            button.style.color = '';
        }, 1000); 
        return;
    }

    vtexjs.checkout.addDiscountCoupon(CUPOM_CODE)
        .done(function(orderForm) {
            const couponApplied = orderForm.marketingData 
                && orderForm.marketingData.coupon 
                && orderForm.marketingData.coupon.toUpperCase() === CUPOM_CODE;

            if (couponApplied) {
                button.textContent = 'Cupom aplicado ✅';
                button.style.backgroundColor = 'green';
                button.style.color = 'white';
            } else {
                button.textContent = 'Cupom não aplicado ⚠️';
            }
        })
        .fail(function(error) {
            console.error('Erro na aplicação do cupom:', error);
            button.textContent = 'Erro na aplicação ❌';
        })
        .always(function() {
            // 🚨 AQUI ESTÁ A MUDANÇA: Revertendo o estado do botão após o delay
            setTimeout(() => {
                // Reverte para o estado original e o habilita, permitindo nova tentativa.
                button.disabled = false;
                button.textContent = originalText;
                button.style.backgroundColor = ''; // Remove a cor de fundo (verde/vermelho)
                button.style.color = '';          // Remove a cor do texto
            }, revertDelay);
        });
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
