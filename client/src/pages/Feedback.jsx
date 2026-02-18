import React, { useMemo, useState } from "react";
import { submitSurvey } from "../api.js";

function Likert({ value, onChange }) {
  const labels = ["Strongly disagree", "Disagree", "Neither", "Agree", "Strongly agree"];
  return (
    <div style={{ display: "grid", gap: 6 }}>
      {labels.map((lab, i) => {
        const v = i + 1;
        return (
          <label key={lab} style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input type="radio" checked={value === v} onChange={() => onChange(v)} />
            {lab}
          </label>
        );
      })}
    </div>
  );
}

export default function Feedback({ feedback, setFeedback, survey, onDone }) {
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");

  const isValid = useMemo(() => {
    return (
      feedback.accuracyImportance &&
      feedback.incorrectInfoOk &&
      feedback.admitDontKnowBest &&
      feedback.trustWhenAdmits
    );
  }, [feedback]);

  async function handleSubmit() {
    setTouched(true);
    setErr("");
    if (!isValid) return;

    setSubmitting(true);
    try {
      const payload = {
        meta: { ...survey.meta, finishedAt: new Date().toISOString() },
        participant: survey.participant,
        feedback: survey.feedback,
        answers: survey.answers.map((a) => ({
          trialId: a.trialId,
          shownOrder: a.shownOrder,
          chosenOptionId: a.chosenOptionId        }))

      };
      const res = await submitSurvey(payload);
      onDone(res.id);
    } catch (e) {
      setErr(e.message || "Submit failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 16 }}>
      <h2>Feedback</h2>

      <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8, display: "grid", gap: 18 }}>
        <div>
          <div><strong>
            Select the response that best represents your level of agreement with the statements below.
                  <br />
                  <br />
            I believe that it is important for ChatGPT (or similar models) to provide only accurate information.
            </strong></div>
          <Likert value={feedback.accuracyImportance} onChange={(v) => setFeedback({ accuracyImportance: v })} />
        </div>

        <div>
          <div><strong>I believe that it is important for ChatGPT (or similar models) to provide information even if it is incorrect.</strong></div>
          <Likert value={feedback.incorrectInfoOk} onChange={(v) => setFeedback({ incorrectInfoOk: v })} />
        </div>

        <div>
          <div><strong>I believe that it is best that ChatGPT (or similar models) admits it does not know rather than providing incorrect information.</strong></div>
          <Likert value={feedback.admitDontKnowBest} onChange={(v) => setFeedback({ admitDontKnowBest: v })} />
        </div>

        <div>
          <div><strong>When ChatGPT (or similar models) admits it does not know, it allows me to trust it better.</strong></div>
          <Likert value={feedback.trustWhenAdmits} onChange={(v) => setFeedback({ trustWhenAdmits: v })} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={{ marginBottom: 6 }}>
            <strong>
              
              I have significant experience using ChatGPT (or similar models).
            </strong>
          </div>

          <Likert
            value={feedback.chatgptExperience}
            onChange={(v) => setFeedback({ chatgptExperience: v })}
          />
        </div>


        {/* <div>
          <div><strong>If you have selected a false response throughout the experiment, please explain why you preferred it:</strong></div>
          <textarea
            rows={4}
            value={feedback.falsePreferenceExplain}
            onChange={(e) => setFeedback({ falsePreferenceExplain: e.target.value })}
            style={{ width: "100%" }}
          />
        </div> */}

        <div>
          <div><strong>Comments:</strong></div>
          <textarea
            rows={4}
            value={feedback.comments}
            onChange={(e) => setFeedback({ comments: e.target.value })}
            style={{ width: "100%" }}
          />
        </div>
      </div>

      {touched && !isValid && <p style={{ color: "crimson" }}>Please answer all 4 rating questions.</p>}
      {err && <p style={{ color: "crimson" }}>{err}</p>}

      <div style={{ marginTop: 16, display: "flex", justifyContent: "center" }}>
        <button onClick={handleSubmit} disabled={submitting}>
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
