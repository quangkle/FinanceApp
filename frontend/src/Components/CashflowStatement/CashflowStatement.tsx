import React, { useEffect, useState } from "react";
import { CompanyCashFlow } from "../../interfaces";
import { useOutletContext } from "react-router";
import { getCashflowStatement } from "../../Apis/StockApi";
import Table from "../Table/Table";
import Spinner from "../Spinner/Spinner";
import { formatLargeMonetaryNumber } from "../../Helpers/NumberFormatting";

type Props = {};

const configs = [
    {
      label: "Date",
      render: (company: CompanyCashFlow) => company.date,
    },
    {
      label: "Operating Cashflow",
      render: (company: CompanyCashFlow) =>
        formatLargeMonetaryNumber(company.operatingCashFlow),
    },
    {
      label: "Investing Cashflow",
      render: (company: CompanyCashFlow) =>
        formatLargeMonetaryNumber(company.netCashUsedForInvestingActivites),
    },
    {
      label: "Financing Cashflow",
      render: (company: CompanyCashFlow) =>
        formatLargeMonetaryNumber(
          company.netCashUsedProvidedByFinancingActivities
        ),
    },
    {
      label: "Cash At End of Period",
      render: (company: CompanyCashFlow) =>
        formatLargeMonetaryNumber(company.cashAtEndOfPeriod),
    },
    {
      label: "CapEX",
      render: (company: CompanyCashFlow) =>
        formatLargeMonetaryNumber(company.capitalExpenditure),
    },
    {
      label: "Issuance Of Stock",
      render: (company: CompanyCashFlow) =>
        formatLargeMonetaryNumber(company.commonStockIssued),
    },
    {
      label: "Free Cash Flow",
      render: (company: CompanyCashFlow) =>
        formatLargeMonetaryNumber(company.freeCashFlow),
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
