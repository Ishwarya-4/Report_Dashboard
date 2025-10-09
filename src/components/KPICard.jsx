export const KPICard = ({ title, value }) => {
  return (
    <div className="bg-primary rounded-xl p-4 text-center shadow-md hover:shadow-lg transition-shadow duration-200">
      <h3 className="text-primary-foreground font-semibold text-sm mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </h3>
      <p className="text-primary-foreground text-2xl font-bold">
        {value.toLocaleString()}
      </p>
    </div>
  );
};
