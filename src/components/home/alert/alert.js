import './alert.css'

export function Alert({ title, message }) {

  return (
    <>
      <div id='screenblock'>

      </div>
      <div className="alertbody">
        <div className='components-title'>{title}</div>
        <div className='alert-message'>{message}</div>
        <button
          className='alertbutton-ok'
        >Continue</button>
      </div>
    </>
  )
}

export function Confirm({ title, message, onClose }) {

  return (
    <>
      <div id='screenblock'>

      </div>
      <div className="alertbody">
        <div className='components-title'>{title}</div>
        <div className='alert-message'>{message}</div>
        <button
          className='alertbutton-ok'
          onClick={() => onClose({ ok: true })}
        >Continue</button>
        <button
          className='alertbutton-cancel'
          onClick={() => onClose({ ok: false })}
        >Cancel</button>
      </div>
    </>
  )
}