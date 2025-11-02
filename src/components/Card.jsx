export default function Card({ image, name, description }) {
  return (
    <div className="relative w-80 h-55 bg-white shadow-xl rounded-2xl overflow-hidden group">
      <img
        src={image}
        alt={name}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Frosted Glass Overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-center items-center p-4 text-center space-y-2 bg-white/60 backdrop-blur-md rounded-2xl">
        <h1 className="text-xl font-semibold text-black font-bold text-Poppins">{name}</h1>
        <p className="text-sm text-gray-700">{description}</p>
      </div>
    </div>
  );
}
