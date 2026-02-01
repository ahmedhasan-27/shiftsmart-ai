import React, { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

const Approval = ({ scheduleData, approvalStatus, onApprove, onReject }) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleApprove = (shiftIndex) => {
    onApprove(shiftIndex);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleReject = (shiftIndex) => {
    onReject(shiftIndex);
  };

  if (!scheduleData || scheduleData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Review & Approve Schedule</h3>
        <p className="text-gray-600">No schedule available for review. Please generate a schedule first.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Review & Approve Schedule</h3>
        
        {showSuccessMessage && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
            <CheckCircle className="text-green-600 mt-0.5" size={20} />
            <div>
              <p className="font-semibold text-green-800">Shift Approved!</p>
              <p className="text-sm text-green-700">The shift has been approved and will be published.</p>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {scheduleData.map((shift, idx) => (
            <div key={idx} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-lg">{shift.shift}</h4>
                <div className="flex gap-2">
                  {approvalStatus[idx] === 'approved' && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm font-medium flex items-center gap-1">
                      <CheckCircle size={16} />
                      Approved
                    </span>
                  )}
                  {approvalStatus[idx] === 'rejected' && (
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm font-medium flex items-center gap-1">
                      <AlertCircle size={16} />
                      Rejected
                    </span>
                  )}
                  {!approvalStatus[idx] && (
                    <>
                      <button
                        onClick={() => handleApprove(idx)}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(idx)}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Registered Nurses (RN)</p>
                  {shift.RN.map(staff => (
                    <p key={staff.id} className="text-sm">{staff.name}</p>
                  ))}
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Licensed Practical Nurses (LPN)</p>
                  {shift.LPN.map(staff => (
                    <p key={staff.id} className="text-sm">{staff.name}</p>
                  ))}
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Certified Nursing Assistants (CNA)</p>
                  {shift.CNA.map(staff => (
                    <p key={staff.id} className="text-sm">{staff.name}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Approval;
