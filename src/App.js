import React, { useState } from 'react';
import './App.css';

function App() {
  const [projectDescription, setProjectDescription] = useState('');
  const [sections, setSections] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateDocument = async () => {
    setLoading(true);
    try {
      const response = await fetch('/generate-document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          project_description: projectDescription,
          project_id: "demo123"
        }),
      });

      // Assuming the response is a JSON object with a 'sections' property
      const data = await response.json();
      setSections(data.sections);
    } catch (error) {
      alert("Error generating document: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>AI-Assisted Architecture Document Generator</h1>
      <textarea
        placeholder="Describe your project..."
        value={projectDescription}
        onChange={(e) => setProjectDescription(e.target.value)}
      />
      <button onClick={generateDocument} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Document'}
      </button>

      {sections && (
        <div className="document-preview">
          <h2>Document Preview</h2>
          {Object.entries(sections).map(([section, data]) => (
            <div className="section" key={section}>
              <h3>{section}</h3>
              <pre>{data.text}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
