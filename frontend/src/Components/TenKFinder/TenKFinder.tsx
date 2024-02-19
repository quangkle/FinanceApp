import React, { useEffect, useState } from "react";
import { CompanyTenK } from "../../interfaces";
import { getTenK } from "../../Apis/StockApi";
import TenKFinderItem from "./TenKFinderItem/TenKFinderItem";
import Spinner from "../Spinner/Spinner";

type Props = {
  ticker: string;
};

const TenKFinder = ({ ticker }: Props) => {
  const [companyTenK, setCompanyTenK] = useState<CompanyTenK[]>();

  useEffect(() => {
    const fetchTenK = async () => {
      const result = await getTenK(ticker);
      setCompanyTenK(result?.data);
    };
    fetchTenK();
  }, [ticker]);

  return (
    <div className="inline-flex rounded-md shadow-sm m-4">
      {companyTenK ? (
        companyTenK?.slice(0, 5).map((tenK) => <TenKFinderItem tenK={tenK} />)
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default TenKFinder;
