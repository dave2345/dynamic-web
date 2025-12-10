import { useState, useEffect } from "react";
import axios from "axios";

export default function ServicesCrud() {
  const [services, setServices] = useState([]);
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");

  useEffect(() => {
    axios.get("/api/services").then((res) => setServices(res.data));
  }, []);

  async function addService(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("summary", summary);
    if (file) formData.append("image", file);

    await axios.post("/api/services", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setName("");
    setSummary("");
    setFile(null);
    const res = await axios.get("/api/services");
    setServices(res.data);
  }

  async function deleteService(id) {
    if (!confirm("Delete service?")) return;
    await axios.delete(`/api/services/${id}`);
    setServices(services.filter((s) => s.id !== id));
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-dt-blue">Manage Services</h2>

      <form onSubmit={addService} className="space-y-4">
        <input
          className="w-full border rounded p-2"
          placeholder="Service name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="w-full border rounded p-2"
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button className="bg-dt-blue text-white px-4 py-2 rounded hover:bg-dt-purple">
          Add Service
        </button>
      </form>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s) => (
          <div
            key={s.id}
            className="border rounded p-4 shadow hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-dt-purple">{s.name}</h3>
            <p className="text-sm text-gray-600">{s.summary}</p>
            {s.image_path && (
              <img
                src={`/storage/${s.image_path}`}
                className="w-full h-32 object-cover rounded mt-2"
              />
            )}
            <button
              onClick={() => deleteService(s.id)}
              className="mt-3 text-sm text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
