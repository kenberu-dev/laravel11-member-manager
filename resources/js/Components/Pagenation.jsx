import { Link } from "@inertiajs/react";

export default function Pagenation({links, queryParams = {}}) {
  const getUrlParams = (queryParams) => {
    if(Object.keys(queryParams).length == 0) return "";

    const keys = Object.keys(queryParams);
    let urlParams = "";
    keys.forEach((key) => {
      if(key == "page") return
      urlParams += "&" + key + "=" + queryParams[key]
    })

    return urlParams;
  }
  const isPrevNext = (label) => {
    if(label == "pagination.previous"){
        return "< 前へ"
    } else if (label == "pagination.next") {
        return "次へ >";
    } else {
        return label;
    }
  }

  return (
    <nav className="text-center mt-4">
      {links.map(link => (
        <Link
        preserveScroll
        href={link.url ? link.url + getUrlParams(queryParams) : ""}
        key={link.label}
          className={
            "inline-block py-3 px-3 rounded-lg text-gray-400 text-xs " +
            (link.active ? "bg-gray-900 " : " ") +
            (!link.url ? "!text-gray-500 cursor-not-allowed " : "hover:bg-gray-950")
          }
        >
            {isPrevNext(link.label)}
        </Link>
      ))}
    </nav>
  );
}
