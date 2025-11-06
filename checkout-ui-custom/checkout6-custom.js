// (()=>{})();

// Highlight Bar Checkout component
const CUPOM_CODE = 'BLACKSUNHOUSE20';

// 1. Defina o bloco HTML atualizado com o botão "Usar cupom"
const htmlBlock = `
<div id="coupon-highlight-container" aria-label="Linha de sessão">
    <div>
        <div style="width: 100%;">
            <div id="coupon-info-text-container">
                <div>
                    <p>
                        Seu cupom de Black Friday é 
                        <span class="coupon-highlight_bold-text" id="coupon-code-display">${CUPOM_CODE}</span> 
                        — Garanta 
                        <span class="coupon-highlight_bold-text" id="">20% OFF</span> 
                        nos produtos abaixo! <button id="apply-coupon-button">Usar cupom 🎁</button>
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
