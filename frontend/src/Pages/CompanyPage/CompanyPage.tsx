import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CompanyProfile } from "../../interfaces";
import { getCompanyProfile } from "../../Apis/StockApi";
import SideBar from "../../Components/SideBar/SideBar";
import CompanyDashboard from "../../Components/CompanyDashboard/CompanyDashboard";
import Tile from "../../Components/Tile/Tile";
import Spinner from "../../Components/Spinner/Spinner";
import CompFinder from "../../Components/CompFinder/CompFinder";
import TenKFinder from "../../Components/TenKFinder/TenKFinder";
import { formatLargeMonetaryNumber } from "../../Helpers/NumberFormatting";

type Props = {};

const CompanyPage = (props: Props) => {
  const { ticker } = useParams();
  const [company, setCompany] = useState<CompanyProfile>();

  useEffect(() => {
    const getProfileInit = async () => {
      const result = await getCompanyProfile(ticker || "");
      setCompany(result?.data[0]);
    };

    getProfileInit();
  }, [ticker]);

  return (
    <>
      {company ? (
        <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
          <SideBar />
          <CompanyDashboard ticker={ticker!}>
            <Tile title="Company Name" subTitle={company.companyName} />
            <Tile title="Price" subTitle={formatLargeMonetaryNumber(company.price)} />
            <Tile title="Sector" subTitle={company.sector || "N/A"} />
            <Tile title="DCF" subTitle={formatLargeMonetaryNumber(company.dcf)} />
            <CompFinder ticker={company.symbol} />
            <TenKFinder ticker={company.symbol} />

            <p className="bg-white shadow rounded text-medium font-medium text-gray-900 p-3 mt-1 m-4">
              {company.description}
            </p>
          </CompanyDashboard>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default CompanyPage;
