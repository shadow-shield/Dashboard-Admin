import UploadJsonFile from "../data/Base/datosEstudiantes";

const Configuracion = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white py-10">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-4 transition duration-500 ease-in-out transform hover:-translate-y-1">
        Universidad Popular del Cesar
      </h1>
      <h2 className="text-lg font-semibold text-gray-600 text-center mb-4 transition duration-500 ease-in-out transform hover:-translate-y-1">
        Reporte de Inscritos Admitidos - Ingeniería de Sistemas
      </h2>

      <div className="mt-4 p-6 bg-white border-4 border-green-400 rounded-lg shadow-lg transition duration-500 ease-in-out transform hover:shadow-2xl">
        <UploadJsonFile />
      </div>
    </div>
  );
};

export default Configuracion;
