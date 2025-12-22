import React from "react";

export default function Contact() {
  return (
    <div>
      <h2>Feedback</h2>
      <textarea placeholder="Enter your feedback..." rows="4" style={{ width: "100%" }}></textarea>
      <button style={{ marginTop: "10px" }}>Submit Feedback</button>
    </div>
  );
}
