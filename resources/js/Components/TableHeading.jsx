import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

export default function TableHeading ({
  name,
  sortable=true,
  sort_field=null,
  sort_direction=null,
  sortChanged = () => {},
  children,
}) {
  return (
    <th onClick={e => sortChanged(name)} className="px-3 py-2">
      <div className="flex items-center justify-between gap-1 cursor-pointer">
        {children}
        {sortable &&(
          <div>
            <ChevronUpIcon
              className={
                "w-4 " +
                (sort_field === name &&
                  sort_direction === "asc"
                    ? "text-black"
                    : "text-gray-400")
              }
            />
            <ChevronDownIcon
              className={
                "w-4 -mt-2 " +
                (sort_field === name &&
                  sort_direction === "desc"
                    ? "text-black"
                    : "text-gray-400")
              }
            />
          </div>
        )}
      </div>
    </th>
  );
}
