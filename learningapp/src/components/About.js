import React from "react";

export default function About({ profile }) {
  return (
    <div>
      <h2>About</h2>
      <p>
        Welcome <strong>{profile.name}</strong>!  
        This platform helps you discover your skill level, set goals, and get a personalized learning path.
      </p>
    </div>
  );
}
