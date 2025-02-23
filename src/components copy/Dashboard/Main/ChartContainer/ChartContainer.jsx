import Pastel from "./GraficaMinutos/index";
import Barras from "./GraficaSemana/index";



const ChartContainer = () => {
  return (
    <div className="row my-3">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h5>Gráfico de sesiones por actividad</h5>
              <div className="placeholder">
              <Pastel/>
              </div>
            </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h5>Gráfico de minutos de los ultimos siete dias</h5>
            <div className="placeholder">
              <Barras/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartContainer;
