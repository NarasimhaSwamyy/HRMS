// src/DashboardContent/AddProfileForm.js

import React, { useState } from 'react';
import './AddProfileForm.css'; // Import your CSS styles here

const AddProfileForm = () => {
  // State variables for form fields
  const [date, setDate] = useState('');
  const [recruiter, setRecruiter] = useState('Active');
  const [domain, setDomain] = useState('HTML/css');
  const [candidate, setCandidate] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('0');
  const [ctc, setCtc] = useState('2-3L.P.A');
  const [ectc, setEctc] = useState('2-3L.P.A');
  const [noticePeriod, setNoticePeriod] = useState('Immediate');
  const [remarks, setRemarks] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Function to handle form submission
  const submitForm = () => {
    // Perform form validation
    const errorMessages = [];
    // ... (your validation logic)

    if (errorMessages.length === 0) {
      // Use the state variables in your logic
      const formData = {
        date,
        recruiter,
        domain,
        candidate,
        mobile,
        email,
        experience,
        ctc,
        ectc,
        noticePeriod,
        remarks,
      };

      // Retrieve existing form submissions from storage
      const formSubmissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];

      // Add the current submission to the array
      formSubmissions.push(formData);

      // Save the updated array back to storage
      localStorage.setItem('formSubmissions', JSON.stringify(formSubmissions));

      // Reset form fields
      resetForm();

      // Set success message
      setSuccessMessage('Form submitted successfully!');
    } else {
      // Show error messages
      alert(errorMessages.join('\n'));
    }
  };

  // Function to reset form fields
  const resetForm = () => {
    setDate('');
    setRecruiter('Active');
    setDomain('HTML/css');
    setCandidate('');
    setMobile('');
    setEmail('');
    setExperience('0');
    setCtc('2-3L.P.A');
    setEctc('2-3L.P.A');
    setNoticePeriod('Immediate');
    setRemarks('');
  };

  return (
    <div className="form-container">
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center h-100">
        <div className="card col-md-12" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', width: '80vw', height: '70vh', marginLeft: '10px' }}>
          <div className="card-body">
            {/* Row 1: Date, Recruiter, Domain */}
            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="recruiter">Recruiter</label>
                <select
                  id="recruiter"
                  className="form-control"
                  value={recruiter}
                  onChange={(e) => setRecruiter(e.target.value)}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="domain">Domain</label>
                <select
                  id="domain"
                  className="form-control"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                >
                  <option value="HTML/css">HTML/css</option>
                  <option value="javascript">JavaScript</option>
                </select>
              </div>
            </div>

            {/* Row 2: Candidate, Mobile, Email */}
            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="candidate">Candidate</label>
                <input
                  type="text"
                  className="form-control"
                  id="candidate"
                  value={candidate}
                  onChange={(e) => setCandidate(e.target.value)}
                />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="mobile">Mobile</label>
                <input
                  type="text"
                  className="form-control"
                  id="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="Email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Row 3: Experience, CTC, ECTC */}
            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="experience">Experience</label>
                <select
                  id="experience"
                  className="form-control"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                >
                  <option value="0">0</option>
                  <option value="1 year">1 year</option>
                  <option value="2.5 years">2.5 years</option>
                  <option value="3 years">3 years</option>
                  <option value="4.5 years">4.5 years</option>
                  <option value="5 years">5 years</option>
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="ctc">CTC</label>
                <select
                  id="ctc"
                  className="form-control"
                  value={ctc}
                  onChange={(e) => setCtc(e.target.value)}
                >
                  <option value="2-3L.P.A">2-3L.P.A</option>
                  <option value="3-4.5L.P.A">3-4.5L.P.A</option>
                  <option value="4.5-6L.P.A">4.5-6L.P.A</option>
                  <option value="6-7L.P.A">6-7L.P.A</option>
                  <option value="8L.P.A">8L.P.A</option>
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="ectc">ECTC</label>
                <select
                  id="ectc"
                  className="form-control"
                  value={ectc}
                  onChange={(e) => setEctc(e.target.value)}
                >
                  <option value="2-3L.P.A">2-3L.P.A</option>
                  <option value="3-4.5L.P.A">3-4.5L.P.A</option>
                  <option value="4.5-6L.P.A">4.5-6L.P.A</option>
                  <option value="6-7L.P.A">6-7L.P.A</option>
                  <option value="8L.P.A">8L.P.A</option>
                </select>
              </div>
            </div>

            {/* Row 4: Notice Period, Remarks */}
            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="noticePeriod">Notice period</label>
                <select
                  id="noticePeriod"
                  className="form-control"
                  value={noticePeriod}
                  onChange={(e) => setNoticePeriod(e.target.value)}
                >
                  <option value="Immediate">Immediate</option>
                  <option value="15days">15 days</option>
                  <option value="1month">1 month</option>
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="remarks">Remarks</label>
                <input
                  type="text"
                  className="form-control"
                  id="remarks"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>
              <div className="col-md-4 mb-3">
                <div className="form-group">
                  <label htmlFor="fileUpload">Resume:</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="fileUpload"
                    name="fileUpload"
                  />
                </div>
              </div>
            </div>

            {/* Row 5: Success Message */}
            <div className="row">
              <div className="col-md-12 mb-3" id="successContainer">
                {successMessage && <div className="text-success">{successMessage}</div>}
              </div>
            </div>

            {/* Row 6: Submit Button */}
            <div className="row">
              <div className="col-md-12 mb-3">
                <button className="btn btn-primary btn-block" onClick={submitForm}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AddProfileForm;
