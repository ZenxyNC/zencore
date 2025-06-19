import './editdetails.css'

export default function EditDetails() {

  return (
    <>
      <div className="componentbody" id="editDetails-body">
        <div className='components-title'>Edit Account Details</div>
        <div id='editDetails-captions'>
          Change Lucas Harel’s account information, including credentials and personal informations.
          <br/>
          <br/>Old informations <span style={{color:'rgb(255, 57, 61, 0.4)'}}>will not</span> be saved.
        </div>
        <button
          id='editDetails-button'
        >
          Edit
        </button>
      </div>
    </>
  )
}