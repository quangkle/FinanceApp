import "./Card.css";

type Props = {}

const Card = (props: Props) => {
  return (
    <div className='card'>
        <img src='' alt='Image' />
        <div className='details'>
            <h2>AAPL</h2>
            <p>$100</p>
        </div>
        <p className='info'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid at tempora culpa quibusdam quod dolor aspernatur nihil ipsum sequi iste dolorem, in qui temporibus reprehenderit consequatur non? Optio, debitis voluptatibus!</p>
    </div>
  )
}

export default Card