import React from 'react'

import './CU.css'

export const ContactUs = () => {
  return (
    <>
    <div className='body'>
      <h1 className='head_CU'>Contact Us</h1>
      <div className='division'>
        <div>
          <h3 className='reach'>GET IN TOUCH</h3>
          <form className='form'>
            <div className='each_inp_c'>
              <label>Name</label>
              <input type="text" name="" id="" placeholder='Jane Smith' className='inp' required />  
            </div>
            <div className='each_inp_c'>
              <label>Email</label>
              <input type="email" name="" id="" placeholder='email@website.com' className='inp' required />  
            </div>
            <div className='each_inp_c'>
              <label>Phone Number</label>
              <input type="number" name="" id="" placeholder='555-555-5555' className='inp' required />  
            </div>
            <div className='each_inp_c'>
              <label>Message</label>
              <input type="text" name="" id="" placeholder='Write your message' className='inp' />
            </div>
            <div>
              <input type="checkbox" name="" id="" /> I allow this website to store my details for further use.
            </div>
            <div>
              <input type="button" value="SUBMIT" className='btn_sub_1' />
            </div>
          </form>
        </div>
        <div className='details_side'>
          <h3 className='reach'>REACH US</h3>
          <div className='details'>
            <div className='my_del'>
              <img src="https://www.iconpacks.net/icons/2/free-icon-mail-2544.png" height="20px" alt="" />
              <a href="mailto:mandalsoumyadip09@gmail.com">mandalsoumyadip09@gmail.com</a>
            </div>
            <div className='my_del'>
              <img src="https://www.iconpacks.net/icons/2/free-location-icon-2952-thumb.png" height="20px" alt="" />
              <a href="https://maps.app.goo.gl/GTwv9MbxtdfzBawU8">Kolkata, WB</a>
            </div>
          </div>
          <h3>HOURS</h3>
          <table border="2px" className='table'>
            <tr>
              <th>MONDAY</th>
              <td>9:00am - 10:00pm</td>
            </tr>
            <tr>
              <th>TUESDAY</th>
              <td>9:00am - 10:00pm</td>
            </tr>
            <tr>
              <th>WEDNESDAY</th>
              <td>6:00pm - 10:00pm</td>
            </tr>
            <tr>
              <th>THURSDAY</th>
              <td>9:00am - 10:00pm</td>
            </tr>
            <tr>
              <th>FRIDAY</th>
              <td>6:00pm - 10:00pm</td>
            </tr>
            <tr>
              <th>SATURDAY</th>
              <td>9:00am - 10:00pm</td>
            </tr>
            <tr>
              <th>SUNDAY</th>
              <td>9:00am - 10:00pm</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    </>
  )
}
