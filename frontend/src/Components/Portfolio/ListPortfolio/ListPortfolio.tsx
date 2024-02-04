import CardPortfolio from '../CardPortfolio/CardPortfolio';

type Props = {
    portfolioValues: string[];
}

const ListPortfolio = ({ portfolioValues }: Props) => {
  return (
    <>
        <h3>My Portfolio</h3>
        <ul>
            {portfolioValues && portfolioValues.map((portfolioValue) => (
                <CardPortfolio portfolioValue={portfolioValue} />
            ))}
        </ul>
    </>
  )
}

export default ListPortfolio