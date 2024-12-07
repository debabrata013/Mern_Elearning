const StatsCard = ({ title, value, color }) => (
    <div className="bg-white p-6 rounded shadow-lg">
      <h3 className="text-lg font-medium">{title}</h3>
      <p className={`text-3xl ${color}`}>{value}</p>
    </div>
  );
  
  export default StatsCard;
  