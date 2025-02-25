import { useSelector } from "react-redux";

const Frase = () => {
   const registros = useSelector((state) => state.userSlice.ejercicios);
 



  const fechas = [];
  for (let i = 6; i >= 0; i--) {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() - i);
    fechas.push(fecha.toISOString().split("T")[0]); 
  }

  const minutosPorFecha = fechas.map((fecha) => {
    const registrosDelDia = registros.filter((item) => item.fecha === fecha);
    const totalMinutos = registrosDelDia.reduce((sum, item) => sum + item.tiempo, 0);
    return totalMinutos;
  });

  if (fechas.length < 2 || minutosPorFecha.length < 2) {
    return <div>No hay suficientes datos para comparar</div>;
  }

  const minutosHoy = minutosPorFecha[minutosPorFecha.length - 1];
  const minutosAyer = minutosPorFecha[minutosPorFecha.length - 2];

  const mensaje = minutosHoy > minutosAyer ? "Bien hecho" : "Que no decaiga";

  return (
    <div className="alert alert-info text-center">
      <h3>{mensaje}</h3>
    </div>
  );
};

export default Frase;
