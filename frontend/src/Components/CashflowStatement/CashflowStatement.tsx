import React, { useEffect, useState } from "react";
import { CompanyCashFlow } from "../../interfaces";
import { useOutletContext } from "react-router";
import { getCashflowStatement } from "../../Apis/StockApi";
import Table from "../Table/Table";
import Spinner from "../Spinner/Spinner";

type Props = {};

const configs = [
  {
    label: "Date",
    render: (company: CompanyCashFlow) => company.date,
  },
  {
    label: "Operating Cashflow",
    render: (company: CompanyCashFlow) => company.operatingCashFlow,
  },
  {
    label: "Investing Cashflow",
    render: (company: CompanyCashFlow) =>
      company.netCashUsedForInvestingActivites,
  },
  {
    label: "Financing Cashflow",
    render: (company: CompanyCashFlow) =>
      company.netCashUsedProvidedByFinancingActivities,
  },
  {
    label: "Cash At End of Period",
    render: (company: CompanyCashFlow) => company.cashAtEndOfPeriod,
  },
  {
    label: "CapEX",
    render: (company: CompanyCashFlow) => company.capitalExpenditure,
  },
  {
    label: "Issuance Of Stock",
    render: (company: CompanyCashFlow) => company.commonStockIssued,
  },
  {
    label: "Free Cash Flow",
    render: (company: CompanyCashFlow) => company.freeCashFlow,
  },
];

const CashflowStatement = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [cashflowStatement, setCashflowStatement] =
    useState<CompanyCashFlow[]>();

  useEffect(() => {
    const fetchCashflowStatement = async () => {
      const result = await getCashflowStatement(ticker);
      setCashflowStatement(result?.data);
    };

    fetchCashflowStatement();
  }, [ticker]);
  return <>
    {cashflowStatement ? (
        <Table configs={configs} data={cashflowStatement} />
    ) : (
        <Spinner />
    )}
  </>;
};

export default CashflowStatement;
