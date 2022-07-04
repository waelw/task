import React from 'react'

const HighlightText = ({ text = "", highlight = "" }) => {
    if (!highlight.trim()) {
      return <p className="option">{text}</p>;
    }
    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);
    return (
      <p className="option">
        {parts.filter(String).map((part, i) => {
          return regex.test(part) ? (
            <span className="highlight" key={i}>{part}</span>
          ) : (
            <span key={i}>{part}</span>
          )
        })}
      </p>
    )
  }

export default HighlightText;