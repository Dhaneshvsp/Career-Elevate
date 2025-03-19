import { useEffect, useRef } from "react";

const Avatar = ({ isSpeaking }) => {
  const mouthRef = useRef(null);

  useEffect(() => {
    const mouth = mouthRef.current;
    if (mouth) {
      if (isSpeaking) {
        mouth.classList.add("active");
        console.log("Added active class, isSpeaking:", isSpeaking);
      } else {
        mouth.classList.remove("active");
        console.log("Removed active class, isSpeaking:", isSpeaking);
      }
    }
  }, [isSpeaking]);

  return (
    <svg width="150" height="150" viewBox="0 0 100 100" className="mx-auto">
      {/* Face (square with rounded corners for a robotic look) */}
      <rect
        x="15"
        y="15"
        width="70"
        height="70"
        rx="10"
        fill="#C0C0C0" /* Silver metallic color */
        stroke="#666"
        strokeWidth="2"
      />
      {/* Glowing Eyes */}
      <circle cx="35" cy="40" r="6" fill="#00FF00" /* Neon green glow */>
        <animate
          attributeName="opacity"
          values="1;0.5;1"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="65" cy="40" r="6" fill="#00FF00">
        <animate
          attributeName="opacity"
          values="1;0.5;1"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </circle>
      {/* Antennae */}
      <line
        x1="50"
        y1="15"
        x2="50"
        y2="5"
        stroke="#666"
        strokeWidth="2"
      />
      <circle cx="50" cy="5" r="3" fill="#FF0000" /* Red tip for antenna */ />
      {/* Mouth (animated with transform) */}
      <rect
        ref={mouthRef}
        x="35"
        y="60"
        width="30"
        height="10"
        rx="2" /* Slightly rounded for a robotic look */
        fill="#333"
        className="mouth-animation"
      />
      {/* Add some bolts for a robotic effect */}
      <circle cx="25" cy="25" r="3" fill="#666" />
      <circle cx="75" cy="25" r="3" fill="#666" />
      <circle cx="25" cy="75" r="3" fill="#666" />
      <circle cx="75" cy="75" r="3" fill="#666" />
    </svg>
  );
};

export default Avatar;