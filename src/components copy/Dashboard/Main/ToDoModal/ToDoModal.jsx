const ToDoModal = () => {
  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Crear Tarea</h5>
            <button type="button" className="close">
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label>Título de la tarea</label>
                <input type="text" className="form-control" />
              </div>
              <div className="form-group">
                <label>Descripción de la tarea</label>
                <textarea className="form-control" />
              </div>
              <button type="submit" className="btn btn-primary">
                Crear
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDoModal;
