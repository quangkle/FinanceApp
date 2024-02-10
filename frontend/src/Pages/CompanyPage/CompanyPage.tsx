import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CompanyProfile } from "../../interfaces";
import { getCompanyProfile } from "../../Apis/StockApi";
import SideBar from "../../Components/SideBar/SideBar";
import CompanyDashboard from "../../Components/CompanyDashboard/CompanyDashboard";

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
  }, []);

  return (
    <>
      {company ? (
        <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
          <SideBar />
          <CompanyDashboard />
        </div>
      ) : (
        <div>Company not found!</div>
      )}
    </>
  );
};

export default CompanyPage;
