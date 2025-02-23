import { useSelector } from "react-redux";

const Frase = () => {
  const MinutosFechas = useSelector((state) => state.userSlice.MinutosFechas);
  const Fechas = useSelector((state) => state.userSlice.Fechas);

  if (Fechas.length < 2 || MinutosFechas.length < 2) {
    return <div>No hay suficientes datos para comparar</div>;
  }

  // Obtener los minutos de ayer y hoy
  const minutosHoy = MinutosFechas[MinutosFechas.length - 1];
  const minutosAyer = MinutosFechas[MinutosFechas.length - 2];

  // Determinar la frase a mostrar
  const mensaje = minutosHoy > minutosAyer ? "Bien hecho" : "Que no decaiga";

  return (
    <div className="alert alert-info text-center">
      <h3>{mensaje}</h3>
    </div>
  );
};

export default Frase;
