"use client";
import React from 'react';

/**
 * CareerElevateLoader Component
 *
 * A loading animation that represents growth and elevation through ascending bars.
 * This is designed to align with the "CareerElevate" brand theme.
 *
 * @param {object} props - The component props.
 * @param {string} [props.text="Elevating your profile..."] - The text to display below the animation.
 * @param {string} [props.className] - Additional CSS classes for the container.
 * @returns {JSX.Element} A themed loading animation component.
 */
export default function App({ text = "Elevating your profile...", className = '' }) {
  return (
    <div className={`flex items-center justify-center min-h-screen bg-gray-100 font-sans ${className}`}>
      <div className="flex flex-col items-center justify-center p-8 text-center">
        {/* Container for the ascending bars animation */}
        <div className="flex items-end justify-center h-16 space-x-2">
          {/* Each div is a bar in the animation. The animation-delay creates the sequential growth effect. */}
          <div
            className="w-3 bg-indigo-600 rounded-t-full animate-grow"
            style={{ animationDelay: '0s' }}
          ></div>
          <div
            className="w-3 bg-indigo-600 rounded-t-full animate-grow"
            style={{ animationDelay: '0.15s' }}
          ></div>
          <div
            className="w-3 bg-indigo-600 rounded-t-full animate-grow"
            style={{ animationDelay: '0.3s' }}
          ></div>
          <div
            className="w-3 bg-indigo-600 rounded-t-full animate-grow"
            style={{ animationDelay: '0.45s' }}
          ></div>
        </div>

        {/* Loading Text */}
        <p className="mt-6 text-lg font-medium text-gray-700 tracking-wider">
          {text}
        </p>
      </div>

      {/* CSS for the custom 'grow' animation.
        - It uses `scaleY` to animate the height of the bars from 0% to 100%.
        - `transform-origin: bottom` ensures the bars grow upwards from their base.
      */}
      <style jsx>{`
        @keyframes grow {
          0%, 100% {
            transform: scaleY(0.1);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: scaleY(1.0);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
        .animate-grow {
          height: 100%;
          transform-origin: bottom;
          animation: grow 1.5s infinite;
        }
      `}</style>
    </div>
  );
}
