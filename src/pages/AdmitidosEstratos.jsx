import GraficaEstratos from "../components/GraficaEstratos";



const ReportEstratos = () => {
    return (
        <div>
            <h1 className="text-4xl font-bold text-center text-green-800 mt-8 mb-4">
                ADMITIDOS CLASIFICADOS POR ESTRATO SOCIAL
            </h1>
            <div style={{ marginTop: "2rem" }}>
                <GraficaEstratos

                />
            </div>



        </div>
    );
};

export default ReportEstratos;
