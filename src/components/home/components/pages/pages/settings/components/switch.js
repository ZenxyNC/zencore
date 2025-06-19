import React from 'react';
import styled from 'styled-components';

const Switch = ({ value, onInput }) => {
  const handleChange = (e) => {
    if (onInput) {
      onInput(e.target.checked);
    }
  };

  return (
    <StyledWrapper>
      <label className="switch">
        <input 
          type="checkbox" 
          checked={value}
          onChange={handleChange}
        />
        <span className="slider" />
      </label>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* The switch - the box around the slider */
  .switch {
    font-size: 17px;
    position: absolute;
    display: inline-block;
    width: 3rem;
    height: 1.6em;
    right: 0px;
    margin-top: -1.2em
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgb(245, 245, 245, 0.4);
    border: 1px solid rgb(245, 245, 245, 0);
    transition: .4s;
    border-radius: 30px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 1em;
    width: 1em;
    border-radius: 20px;
    left: 0.27em;
    bottom: 0.25em;
    background-color: rgb(245, 245, 245, 1);
    transition: .4s;
  }

  input:checked + .slider {
    background-color: #007AFF;
    border: 1px solid #007AFF;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #007AFF;
  }

  input:checked + .slider:before {
    transform: translateX(1.2em);
    background-color: rgb(245, 245, 245, 1);
  }`;

export default Switch;