function Juego() {
  const [gameStarted, setGameStarted] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const gameAreaRef = React.useRef(null);
  const playerRef = React.useRef(null);

  // Iniciar juego
  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    spawnElixir();
    setInterval(spawnElixir, 3000);
  };

  // Movimiento del jugador (Rey)
  React.useEffect(() => {
    if (!gameStarted) return;

    const handleKeyDown = (e) => {
      const player = playerRef.current;
      const area = gameAreaRef.current;
      if (!player || !area) return;

      const step = 10;
      let x = parseInt(player.style.left);
      let y = parseInt(player.style.top);

      if (e.key === "ArrowUp") y -= step;
      if (e.key === "ArrowDown") y += step;
      if (e.key === "ArrowLeft") x -= step;
      if (e.key === "ArrowRight") x += step;

      x = Math.max(0, Math.min(area.clientWidth - 40, x));
      y = Math.max(0, Math.min(area.clientHeight - 40, y));

      player.style.left = `${x}px`;
      player.style.top = `${y}px`;

      collectElixir();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameStarted]);

  // Crear elixir (MONEDAS)
  const spawnElixir = () => {
    if (!gameStarted) return;

    const area = gameAreaRef.current;
    if (!area) return;

    const elixir = document.createElement("img");
    elixir.classList.add("elixir");
    elixir.src = "imagenes/coin.png"; // Ruta corregida
    elixir.style.position = "absolute";
    elixir.style.width = "30px";
    elixir.style.height = "30px";
    elixir.style.zIndex = "10";

    const x = Math.random() * (area.clientWidth - 30);
    const y = Math.random() * (area.clientHeight - 30);

    elixir.style.left = `${x}px`;
    elixir.style.top = `${y}px`;

    area.appendChild(elixir);

    setTimeout(() => {
      if (elixir.parentNode) elixir.remove();
    }, 5000);
  };

  // Colisiones
  const collectElixir = () => {
    const player = playerRef.current;
    const elixirs = document.querySelectorAll(".elixir");
    if (!player) return;

    const playerRect = player.getBoundingClientRect();

    elixirs.forEach((elixir) => {
      const elixirRect = elixir.getBoundingClientRect();

      const overlap =
        playerRect.x < elixirRect.x + elixirRect.width &&
        playerRect.x + playerRect.width > elixirRect.x &&
        playerRect.y < elixirRect.y + elixirRect.height &&
        playerRect.y + playerRect.height > elixirRect.y;

      if (overlap) {
        elixir.remove();
        setScore((prev) => prev + 1);
      }
    });
  };

  return (
    <div className="flex flex-col items-center text-white">
      <h1 className="text-3xl font-bold mb-4">Recolecta Elixir</h1>

      {!gameStarted ? (
        <button
          onClick={startGame}
          className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-full font-bold text-lg"
        >
          Iniciar Juego
        </button>
      ) : (
        <div className="text-xl mb-3">
          Puntaje: <span className="font-bold">{score}</span>
        </div>
      )}

      <div
        ref={gameAreaRef}
        className="relative bg-blue-200 border-4 border-blue-400 rounded-lg overflow-hidden mt-4"
        style={{ width: "700px", height: "400px" }}
      >
        {/* Jugador (Rey) */}
        <img
          ref={playerRef}
          src="imagenes/rey.png" // Ruta corregida
          alt="player"
          style={{
            position: "absolute",
            width: "40px",
            height: "40px",
            left: "50px",
            top: "50px",
          }}
        />
      </div>
    </div>
  );
}
