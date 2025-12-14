// draggableNode.js
export const DraggableNode = ({ type, label, icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="group cursor-grab active:cursor-grabbing select-none flex-shrink-0"
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
    >
      <div className="flex flex-col items-center justify-center gap-2.5 px-4 py-3 w-20 h-20 rounded-lg border border-slate-200 bg-white transition-all duration-150 hover:border-slate-300 hover:shadow-lg hover:-translate-y-1 active:scale-95">
        {/* Icon */}
        <div className="text-2xl text-slate-600 leading-none group-hover:scale-110 group-hover:text-slate-800 transition-all">
          {icon}
        </div>

        {/* Label */}
        <span className="text-[10px] font-medium text-slate-700 text-center leading-tight">
          {label}
        </span>
      </div>
    </div>
  );
};
