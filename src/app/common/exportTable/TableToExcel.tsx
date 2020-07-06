import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

interface IProps {
  table: string;
}

const TableToExcel: React.FC<IProps> = ({ table }) => {
  return (
    <ReactHTMLTableToExcel
      id='test-table-xls-button'
      className='ui positive button'
      table={table}
      filename='exportXls'
      sheet='exportXls'
      buttonText='Export to File'
    />
  );
};

export default TableToExcel;
