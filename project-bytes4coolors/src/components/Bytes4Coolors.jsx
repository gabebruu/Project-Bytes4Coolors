import { useState, useEffect } from "react";

// Função que retorna uma string com uma cor aleatória em hexadecimal 
function randomHexColor() {
    return (
        "#" +
        Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, "0")
    );
}

export default function Bytes4Coolors() {
    const [paleta, setPaleta] = useState([
        { hex: randomHexColor(), locked: false },
        { hex: randomHexColor(), locked: false },
        { hex: randomHexColor(), locked: false },
        { hex: randomHexColor(), locked: false },
        { hex: randomHexColor(), locked: false }
    ]);

    const [cogumeloPulando, setCogumeloPulando] = useState(false); // Estado para controlar o pulo do cogumelo

    // Injeta a animação CSS do pulo do cogumelo
    useEffect(() => {
        const style = document.createElement("style");
        style.innerHTML = `
            @keyframes puloCogumelo {
                0% { transform: translateX(-50%) translateY(0); opacity: 1; }
                50% { transform: translateX(-50%) translateY(-60px); opacity: 1; }
                100% { transform: translateX(-50%) translateY(0); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }, []);

    // Gera nova paleta respeitando cores bloqueadas
    function gerarNovaPaleta() {
        setPaleta((coresAtuais) =>
            coresAtuais.map((cor) =>
                cor.locked ? cor : { hex: randomHexColor(), locked: false }
            )
        );
        setCogumeloPulando(true); // Ativa o pulo do cogumelo
        setTimeout(() => setCogumeloPulando(false), 600); // Duração da animação
    }

    // Alterna o estado locked de uma cor
    function toggleLock(index) {
        setPaleta((coresAtuais) =>
            coresAtuais.map((cor, i) =>
                i === index ? { ...cor, locked: !cor.locked } : cor
            )
        );
    }

    // Copia o código hex para a área de transferência
    function copiarHex(hex) {
        navigator.clipboard.writeText(hex);
        alert(`Cor ${hex} copiada!`);
    }

    // Listener para barra de espaço gerar nova paleta
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === "Space") {
                e.preventDefault(); // previne scroll
                gerarNovaPaleta();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (

        <div style={{ height: "100vh", display: "flex", flexDirection: "column", position: "relative" }}>
            {/* Título centralizado sobre a paleta */}
            <div
                style={{
                    fontFamily: "'Silkscreen', sans-serif", // Fonte pixelada para o título
                    fontSize: "8rem",
                    fontWeight: 700,
                    letterSpacing: "2px",
                    color: "#000000ff",
                    textAlign: "center",
                    padding: "1rem 2rem",
                    borderRadius: "12px",
                    position: "absolute",
                    top: "10%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 10,
                    textShadow: "2px 2px 0 #3c8d6eff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #0d8013ff" // contorno 
                }}
            >
                BYTES4COOLORS
            </div>

            {/* Paleta de cores ocupando a tela inteira */}
            <div style={{ display: "flex", flex: 1 }}>
                {paleta.map((cor, index) => (
                    <div

                        key={index}
                        style={{
                            backgroundColor: cor.hex,
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                            cursor: "pointer",
                        }}
                    >

                        {/* Mostrar apenas os 6 dígitos do hex, em CAPS, preto e fonte delicada */}
                        <p
                            style={{
                                color: "#000",
                                fontSize: "2rem",
                                fontWeight: 400,
                                fontFamily: "'Libertinus Keyboard', serif", // Fonte técnica para os códigos hex
                                letterSpacing: "1px"
                            }}
                        >
                            {cor.hex.toUpperCase()}
                        </p>

                        {/* Botões com ícones via link */}
                        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                            <button onClick={() => copiarHex(cor.hex)} style={{ border: "none", background: "transparent", cursor: "pointer" }}>
                                <img
                                    src="https://cdn.jsdelivr.net/npm/feather-icons/dist/icons/copy.svg"
                                    alt="Copiar"
                                    width="24"
                                    height="24"
                                />
                            </button>

                            <button onClick={() => toggleLock(index)} style={{ border: "none", background: "transparent", cursor: "pointer" }}>
                                <img
                                    src={cor.locked
                                        ? "https://cdn.jsdelivr.net/npm/feather-icons/dist/icons/lock.svg"
                                        : "https://cdn.jsdelivr.net/npm/feather-icons/dist/icons/unlock.svg"}
                                    alt={cor.locked ? "Bloquear" : "Desbloquear"}
                                    width="24"
                                    height="24"
                                />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Imagem do cogumelo pulando sobre o botão */}
            {cogumeloPulando && (
                <img
                    src="https://www.pngarts.com/files/3/Mario-Mushroom-PNG-Pic.png"
                    alt="Cogumelo do Mario"
                    style={{
                        position: "absolute",
                        bottom: "80px", // altura acima do botão
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "80px",
                        animation: "puloCogumelo 0.6s ease-out"
                    }}
                />
            )}

            {/* Botão flutuante transparente*/}
            <button
                onClick={gerarNovaPaleta}
                style={{
                    position: "absolute",
                    bottom: "25px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    padding: "12px 24px",
                    fontSize: "1rem",
                    borderRadius: "12px",
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    color: "#fdc1daff",
                    fontWeight: "bold",
                    fontFamily: "'Silkscreen', sans-serif", // Fonte pixelada para o botão
                    border: "2px solid #fab9b9ff",
                    transition: "0.3s",
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#0001"} // leve efeito no hover
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
            >
                #GERARNOVAPALETA
            </button>
        </div>
    );
}
