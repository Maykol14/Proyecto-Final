function Contacto() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
    pais: "peru",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = `
📩 *Nuevo mensaje recibido*
━━━━━━━━━━━━━━
👤 *Nombre:* ${formData.name}
📧 *Correo:* ${formData.email}
🌎 *País:* ${formData.pais}
💬 *Mensaje:* 
${formData.message}
`.trim();

    try {
      await fetch(
        "https://api.telegram.org/bot7408826522:AAHZPiLYG82xN-QfjWASsr12sQCgpF0Ha4I/sendMessage",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: "-1002279631794",
            text: text,
            parse_mode: "Markdown",
          }),
        }
      );

      alert("Gracias por contactarnos, " + formData.name + "!");
      setFormData({ name: "", email: "", message: "", pais: "peru" });
    } catch (error) {
      console.error(error);
      alert("Hubo un error al enviar el mensaje.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* FORMULARIO */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-white bg-clip-text text-transparent">
              Déjanos tus datos
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
              <div>
                <label className="text-sm text-gray-300">Nombre:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 mt-1 border rounded-lg dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">
                  Correo Electrónico:
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 mt-1 border rounded-lg dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">Mensaje:</label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 mt-1 border rounded-lg dark:bg-gray-700 dark:text-white"
                ></textarea>
              </div>

              <div>
                <label className="text-sm text-gray-300">País:</label>
                <select
                  name="pais"
                  value={formData.pais}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-1 border rounded-lg dark:bg-gray-700 dark:text-white"
                >
                  <option value="peru">Perú</option>
                  <option value="colombia">Colombia</option>
                  <option value="mexico">México</option>
                  <option value="argentina">Argentina</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg shadow-md"
              >
                Enviar
              </button>
            </form>
          </div>

          {/* INFORMACIÓN Y MAPA */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Información de Contacto
              </h3>
              <p className="text-gray-300">📞 +51 984 123 435</p>
              <p className="text-gray-300 mt-2">📍 Av. Helsinki, Finlandia</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <iframe
                src="https://maps.google.com/maps?q=La%20Molina%20Lima&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="300"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
