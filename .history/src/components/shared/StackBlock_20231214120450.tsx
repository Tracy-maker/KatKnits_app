import React from "react";

interface StabBlockProps {
  value: string | number;
  label: string;
}

const StackBlock = ({ value, label }: StabBlockProps) => {
  return <div className="flex-center gap-2">
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-light-2"></p>
  </div>;
};

export default StackBlock;
