import React, { useEffect, useRef } from 'react'

import './Display.css';


const Display = (props) => {
  const resultRef = useRef();
  const expRef = useRef();

  useEffect(() => {
    resultRef.current.scrollIntoView({ behavior: "smooth" });
  }, [props.history]);

  useEffect(() => {
    expRef.current.scrollLeft = expRef.current.scrollWidth;
  }, [props.expression]);


  return (
    <div className="display custom-scroll">
      <div className='display_history'>
        {props.history &&
          props.history?.map((item) => (<p key={item + " " + Math.random() * 44}>{item}</p>))
        }
      </div>

      <div ref={expRef} className="display_expression custom-scroll">
        <p>{props.expression}</p>
      </div>
      <p ref={resultRef} className='display_result'>{props.result}</p>
    </div>
  )
}

export default Display