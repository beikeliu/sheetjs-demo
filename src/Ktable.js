import './ktable.css';
const Ktable = ({ rowKey, data, option }) => {
  return (
    <>
      <table className="k-table">
        <thead>
          <tr>
            {option.map((op) => (
              <th key={op.title}>{op.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((dt, index) => (
            <tr key={dt[rowKey]}>
              {option.map((op) => (
                <td key={op.title}>
                  {op.render
                    ? op.render(op.in ? dt[op.in] : null, dt, index)
                    : op.in
                      ? dt[op.in]
                      : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default Ktable;