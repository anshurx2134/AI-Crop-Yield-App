import { useState } from "react";
import "./CropYield.css";

const CropYield: React.FC = () => {
  const [formData, setFormData] = useState({
    rainfall: "",
    fertilizer: "",
    temperature: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
  });

  const [yieldField, setYieldField] = useState<number | null>(null);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    setFormData({ ...formData, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/predict/?rainfall=${formData.rainfall}&fertilizer=${formData.fertilizer}&temperature=${formData.temperature}&nitrogen=${formData.nitrogen}&phosphorus=${formData.phosphorus}&potassium=${formData.potassium}`
      );
      if (!response.ok) {
        throw new Error("Failed to load API");
      }
      const data = await response.json();
      setYieldField(data["Predicted yield = "]);
    } catch (error) {
      console.error("Failed to load API");
      alert("An error occured... Please try again later.");
    }
  };

  return (
    <div className="content">
      <h1>
        {" "}
        <strong>
          <i>AI Crop Yield Predictor</i>
        </strong>
      </h1>
      <form onSubmit={handleSubmit}>
        <label>
          <strong>Rain Fall</strong>
          <input
            placeholder="(in cm)"
            type="text"
            value={formData.rainfall}
            onChange={(e) => handleInputChange(e, "rainfall")}
          ></input>
        </label>
        <label>
          <strong>Fertilizer</strong>
          <input
            placeholder="(in fert. units)"
            type="text"
            value={formData.fertilizer}
            onChange={(e) => handleInputChange(e, "fertilizer")}
          ></input>
        </label>
        <label>
          <strong>Temperature</strong>
          <input
            placeholder="(in deg. Celsius)"
            type="text"
            value={formData.temperature}
            onChange={(e) => handleInputChange(e, "temperature")}
          ></input>
        </label>
        <label>
          <strong>Nitrogen</strong>
          <input
            placeholder="(in scf)"
            type="text"
            value={formData.nitrogen}
            onChange={(e) => handleInputChange(e, "nitrogen")}
          ></input>
        </label>
        <label>
          <strong>Phosphorus</strong>
          <input
            placeholder="(in mmol/L)"
            type="text"
            value={formData.phosphorus}
            onChange={(e) => handleInputChange(e, "phosphorus")}
          ></input>
        </label>
        <label>
          <strong>Potassium</strong>
          <input
            placeholder="(in mmol/L)"
            type="text"
            value={formData.potassium}
            onChange={(e) => handleInputChange(e, "potassium")}
          ></input>
        </label>
        <button type="submit">
          <strong>Predict</strong>
        </button>
      </form>
      {yieldField !== null && (
        <div className="output">
          {" "}
          <strong>Yield: {yieldField} Q/Acres</strong>
        </div>
      )}
    </div>
  );
};

export default CropYield;
