import Pastel from "./GraficaMinutos/index";



const ChartContainer = () => {
  return (
    <div className="row my-3">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h5>Gráfico pastel</h5>
              <div className="placeholder">
              <Pastel/>
              </div>
            </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h5>Gráfico barras</h5>
            <div className="placeholder">GRAFICO AQUI</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartContainer;
