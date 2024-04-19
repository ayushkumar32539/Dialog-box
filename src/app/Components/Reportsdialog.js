"use client";
import { useEffect, useState } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';

const ReportsDialog = ({ onClose }) => {
  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(3); 

  useEffect(() => {
    const fetchData = async () => {
      const { default: dummyReports } = await import('../data/dummyReports');
      // Filter reports for the last 30 days
      const filteredReports = dummyReports.filter(report => {
        const reportDate = new Date(report.date);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return reportDate >= thirtyDaysAgo;
      });
      setReports(filteredReports);
    };
    fetchData();
  }, []);

  // Calculate total number of pages
  const totalPages = Math.ceil(reports.length / rowsPerPage);

  // Get current reports to display based on pagination
  const indexOfLastReport = currentPage * rowsPerPage;
  const indexOfFirstReport = indexOfLastReport - rowsPerPage;
  const currentReports = reports.slice(indexOfFirstReport, indexOfLastReport);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle rows per page change
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className='main-container'>
      <div className="reports-dialog">
        <h2>Recently Generated Reports</h2>
        <div className='buttons'>
          <button className='close'><FilterAltOutlinedIcon/></button>
          <button className='close' onClick={onClose}><CloseOutlinedIcon/></button>
        </div>
        <table className="reports-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Report Name</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {currentReports.map(report => (
              <tr key={report.id}>
                <td>
                  <div className='date'>{report.date}</div>
                  <div className='time'>{report.time}</div>
                </td>
                <td>{report.name}</td>
                <td><button className='download'><DownloadIcon/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
            <option value={3}>3 per page</option>
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
          </select>
          <button className='comm-btn' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            <ArrowBackIosNewOutlinedIcon/>
          </button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
            className='comm-btn'
              key={index}
              onClick={() => handlePageChange(index + 1)}
              style={{ backgroundColor: currentPage === index + 1 ? 'red' : '' }}
            >
              {index + 1}
            </button>
          ))}
          <button className='comm-btn' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            <ArrowForwardIosOutlinedIcon/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsDialog;
