// ================================
// DRAWER — abre painel lateral
// ================================

function openDrawer(contentHTML) {
    const drawer = document.getElementById("drawer");
    const drawerBody = document.getElementById("drawerBody");

    drawerBody.innerHTML = contentHTML;
    drawer.classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeDrawer() {
    const drawer = document.getElementById("drawer");
    drawer.classList.remove("open");
    document.body.style.overflow = "";
}

// Fechar ao clicar no overlay
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("drawerOverlay").addEventListener("click", closeDrawer);
});

// ================================
// SCROLL SUAVE
// ================================

function scrollToPackage() {
    document.getElementById("package").scrollIntoView({ behavior: "smooth" });
}

// ================================
// ACCORDION — hero
// ================================

function toggleHeroAccordion() {
    const accordion = document.getElementById("heroAccordion");
    accordion.classList.toggle("open");
}

// ================================
// ACCORDION — cards
// ================================

function toggleCardAccordion(id) {
    const allAccordions = document.querySelectorAll(".card-accordion");

    allAccordions.forEach(acc => {
        if (acc.id !== "accordion-" + id) {
            acc.classList.remove("open");
        }
    });

    const target = document.getElementById("accordion-" + id);
    target.classList.toggle("open");

    // Rola suavemente até o card
    if (target.classList.contains("open")) {
        setTimeout(() => {
            document.getElementById("card-" + id).scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 100);
    }
}

// ================================
// DESTINOS — drawer (mantido caso precise)
// ================================

function openModal(destination) {
    toggleCardAccordion(destination);
}

// ================================
// PAINEL INTERATIVO
// ================================

function showPopup(type) {

    const contents = {
        budget: `
            <h2>📋 Solicitar Orçamento</h2>
            <p>Preencha seus dados e nossa equipe entrará em contato em até 24 horas.</p>
            <br>
            <label>Nome completo</label>
            <input type="text" placeholder="Seu nome" />
            <label>E-mail</label>
            <input type="email" placeholder="seu@email.com" />
            <label>Telefone</label>
            <input type="tel" placeholder="(15) 99999-9999" />
            <label>Mensagem</label>
            <textarea placeholder="Conte-nos sobre o seu interesse..."></textarea>
            <button class="drawer-btn" onclick="closeDrawer()">Enviar Solicitação ✉️</button>
        `,
        specialist: `
            <h2>💬 Fale com um Especialista</h2>
            <p>Nosso consultor turístico está disponível para tirar dúvidas sobre roteiros personalizados.</p>
            <br>
            <div class="contact-item">📞 <strong>(15) 99999-9999</strong></div>
            <div class="contact-item">✉️ <strong>contato@raizeseaventuras.com</strong></div>
            <div class="contact-item">🕐 <strong>Seg–Sex, 8h às 18h</strong></div>
            <br>
            <button class="drawer-btn" onclick="closeDrawer()">Entendido!</button>
        `,
        availability: `
            <h2>📅 Ver Disponibilidade</h2>
            <p>Próximas datas disponíveis para o roteiro completo:</p>
            <br>
            <div class="date-item">📌 12 de Junho — <span class="badge green">Disponível</span></div>
            <div class="date-item">📌 18 de Junho — <span class="badge green">Disponível</span></div>
            <div class="date-item">📌 25 de Junho — <span class="badge orange">Últimas vagas</span></div>
            <div class="date-item">📌 03 de Julho — <span class="badge green">Disponível</span></div>
            <br>
            <button class="drawer-btn" onclick="showPopup('budget')">Reservar uma data 🗓️</button>
        `,
        faq: `
            <h2>❓ Perguntas Frequentes</h2>
            <br>
            <div class="faq-item">
                <strong>O passeio é guiado?</strong>
                <p>Sim! Contamos com monitores especializados em cada destino.</p>
            </div>
            <div class="faq-item">
                <strong>É indicado para famílias?</strong>
                <p>Sim, o roteiro é acessível para diferentes perfis de visitantes.</p>
            </div>
            <div class="faq-item">
                <strong>Inclui alimentação?</strong>
                <p>Depende do pacote escolhido. Consulte-nos para mais detalhes.</p>
            </div>
            <div class="faq-item">
                <strong>Quanto tempo dura o roteiro?</strong>
                <p>Em média 8 horas, incluindo deslocamento entre os pontos.</p>
            </div>
            <button class="drawer-btn" onclick="showPopup('specialist')">Falar com especialista 💬</button>
        `
    };

    openDrawer(contents[type] || "");
}

// ================================
// ANIMAÇÃO AO ROLAR
// ================================

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll(".card, .reasons, .interactive-panel").forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(50px)";
    section.style.transition = "all 1s ease";
    observer.observe(section);
});
