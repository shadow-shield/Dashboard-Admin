import UploadJsonFile from "../data/Base/datosEstudiantes";

const Configuracion = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Universidad Popular del Cesar
      </h1>
      <h2 className="text-xl font-semibold text-center text-gray-600 mb-4">
        Reporte de Inscritos Admitidos - Ingeniería de Sistemas
      </h2>

      <div className="mt-8">
        <UploadJsonFile />
      </div>
    </div>
  );
};

export default Configuracion;
