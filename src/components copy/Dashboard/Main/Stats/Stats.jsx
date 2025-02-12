import "./Stats.css";

const Stats = () => {
  return (
    <div className="row text-center">
      <div className="col-md-4">
        <div className={`card stats-info`}>
          <div className="card-body">
            <h2>Total</h2>
            <h3>0</h3>
            <p>X%</p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className={`card stats-info stats-success`}>
          <div className="card-body">
            <h2>Completos</h2>
            <h3>0</h3>
            <p>X%</p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className={`card stats-info stats-danger`}>
          <div className="card-body">
            <h2>Incompletos</h2>
            <h3>0</h3>
            <p>X%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
