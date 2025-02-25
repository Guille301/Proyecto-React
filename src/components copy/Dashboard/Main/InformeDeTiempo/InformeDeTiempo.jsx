import TiempoDiario from "./TiempoDiario/index";
import TiempoTotal from "./TiempoTotal/index";



const Tiempo = () => {
  return (
    <div className="row my-3">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h5>Tiempo diario</h5>
              <div className="placeholder">
              <TiempoDiario/>
              </div>
            </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h5>Tiempo total</h5>
            <div className="placeholder">
              <TiempoTotal/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tiempo;
