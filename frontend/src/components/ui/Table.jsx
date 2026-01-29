const Table = ({ headers, children, className = '' }) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-700">
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700/50">
          {children}
        </tbody>
      </table>
    </div>
  );
};

const TableRow = ({ children, onClick, className = '' }) => {
  return (
    <tr
      className={`
        transition-colors duration-150
        hover:bg-slate-700/30
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

const TableCell = ({ children, className = '' }) => {
  return (
    <td className={`px-4 py-3 text-sm text-slate-300 ${className}`}>
      {children}
    </td>
  );
};

Table.Row = TableRow;
Table.Cell = TableCell;

export default Table;

