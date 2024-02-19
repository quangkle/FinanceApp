import { useEffect, useState } from 'react'
import { CompanyCompData } from '../../interfaces';
import { getCompData } from '../../Apis/StockApi';
import CompFinderItem from './CompFinderItem/CompFinderItem';

type Props = {
    ticker: string;
}

const CompFinder = ({ticker}: Props) => {
    const [companyCompData, setCompanyCompData] = useState<CompanyCompData>();
    useEffect(() => {
        const fetchCompData = async () => {
            var result = await getCompData(ticker);
            setCompanyCompData(result![0]);
        }

        fetchCompData();
    }, [ticker]);

  return (
    <div className='inline-flex rounded-md shadow-sm m-4'>
        {companyCompData?.peersList.map((ticker) => (
            <CompFinderItem ticker={ticker} />
        ))}
    </div>
  )
}

export default CompFinder