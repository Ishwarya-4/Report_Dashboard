export const KPICard = ({ title, value }) => {
  return (
    <div className="bg-primary rounded-lg p-3 text-center shadow-[0_2px_6px_rgba(0,0,0,0.1)] hover:shadow-[0_3px_8px_rgba(0,0,0,0.15)] transition-shadow duration-200">
      <h3 className="text-primary-foreground font-semibold text-xs mb-1.5 whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </h3>
      <p className="text-primary-foreground text-lg font-bold">
        {value.toLocaleString()}
      </p>
    </div>
  );
};
