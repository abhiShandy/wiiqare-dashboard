import React from "react";

export default function Button(props: React.ButtonHTMLAttributes<any>) {
  return (
    <button
      className={`inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
