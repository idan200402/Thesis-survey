import React, { useMemo, useState } from "react";

export default function About({ participant, setParticipant, onNext }) {
  const [touched, setTouched] = useState(false);

  const isValid = useMemo(() => {
    return (
      participant.prolificId.trim().length > 0 &&
      participant.consent &&
      participant.age !== "" &&
      participant.gender &&
      participant.education &&
      participant.country.trim().length > 0 
    );
  }, [participant]);

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 16 }}>
      <h2>About yourself</h2>

      <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8 }}>
        <div style={{ marginBottom: 12 }}>
          <label>Age</label><br />
          <input
            type="number"
            value={participant.age}
            onChange={(e) => setParticipant({ age: e.target.value })}
          />
        </div>
      {/*added prolific id field for better tracking of participants */}
      
        <div style={{ marginBottom: 12 }}>
          <label>Prolific ID</label><br />
          <input
            type="text"
            value={participant.prolificId}
            onChange={(e) => setParticipant({ prolificId: e.target.value })}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Gender</label><br />
          <select value={participant.gender} onChange={(e) => setParticipant({ gender: e.target.value })}>
            <option value="">Choose...</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="prefer_not">Prefer not to say</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Education</label><br />
          <select value={participant.education} onChange={(e) => setParticipant({ education: e.target.value })}>
            <option value="">Choose...</option>
            <option value="highschool">High school</option>
            <option value="bachelor">Bachelor</option>
            <option value="grad">graduate school</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Country</label><br />
          <input
            type="text"
            value={participant.country}
            onChange={(e) => setParticipant({ country: e.target.value })}
          />
        </div>
          

        {/* <div style={{ marginBottom: 20 }}>
              <div style={{ marginBottom: 6 }}>
                <strong>
                  Select the response that best represents your level of agreement with the statement below.
                  <br />
                  "I have significant experience using ChatGPT (or similar models)"
                </strong>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  { label: "Strongly disagree", value: 1 },
                  { label: "Disagree", value: 2 },
                  { label: "Neither", value: 3 },
                  { label: "Agree", value: 4 },
                  { label: "Strongly agree", value: 5 }
                ].map((opt) => (
                  <label key={opt.value} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <input
                      type="radio"
                      name="chatgptExperience"
                      checked={participant.chatgptExperience === opt.value}
                      onChange={() =>
                        setParticipant({ chatgptExperience: opt.value })
                      }
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div> */}
   

        


        <div style={{ borderTop: "1px solid #eee", paddingTop: 12 }}>
          <label>
            <input
              type="checkbox"
              checked={participant.consent}
              onChange={(e) => setParticipant({ consent: e.target.checked })}
            />
            {" "}I agree to participate in this survey
          </label>
        </div>
      </div>

      {touched && !isValid && (
        <p style={{ color: "crimson" }}>Please fill everything and agree to participate.</p>
      )}

      <div style={{ marginTop: 16, display: "flex", justifyContent: "center" }}>
        <button
          onClick={() => {
            setTouched(true);
            if (isValid) onNext();
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
