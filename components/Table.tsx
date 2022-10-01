export function Table({
  columns,
  data,
}: {
  columns: { title: string; key: string }[];
  data: { [key: string]: any }[];
}) {
  return (
    <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
      <thead className="bg-gray-100 dark:bg-gray-700">
        <tr>
          {columns.map((c) => (
            <th
              key={c.key}
              scope="col"
              className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
            >
              {c.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
        {data.map((d, idx) => (
          <tr key={idx} className="hover:bg-gray-100 dark:hover:bg-gray-700">
            {columns.map((c) => (
              <td
                key={c.key}
                className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {d[c.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
