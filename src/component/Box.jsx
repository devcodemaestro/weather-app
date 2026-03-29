import "./Box.css";

const Box = (props) => {
  const getBorderColor = () => {
    if (props.result === "Win") {
      return "win-border";
    } else if (props.result === "Lose") {
      return "lose-border";
    } else {
      return "tie-border";
    }
  };
  return (
    <div className={`box ${getBorderColor()} `}>
      <h1>{props.title}</h1>
      {/* eslint-disable-next-line */}
      <img className="item-img" src={props.item && props.item.img} />
      <h2>{props.result}</h2>
    </div>
  );
};

export default Box;
