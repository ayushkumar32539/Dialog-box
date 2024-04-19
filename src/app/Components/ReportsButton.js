// components/ReportsButton.js
"use client";
import { useState } from 'react';
import ReportsDialog from './ReportsDialog';

const ReportsButton = () => {
  const [showDialog, setShowDialog] = useState(false);

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  return (
    <div className='report-button'>
      {!showDialog && <button className='show-reports-button' onClick={() => setShowDialog(true)}>Show Reports</button>}
      {showDialog && <ReportsDialog onClose={handleDialogClose} />}
    </div>
  );
};

export default ReportsButton;
