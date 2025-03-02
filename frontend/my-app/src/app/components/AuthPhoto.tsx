import Image from 'next/image';

export default function Photos() {
  return (
      <div className="relative w-full md:w-1/2 h-64 md:h-screen">
        {/* Left side - Construction Image */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10" />
    <Image
      src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070"
      alt="Construction Site"
      fill
      className="object-cover"
      priority
    />
    <div className="absolute z-20 bottom-8 left-8 text-white">
      <h1 className="text-4xl font-bold mb-2">BuildTrack Pro</h1>
      <p className="text-xl opacity-90">Construction Management Excellence</p>
    </div>
  </div>
  );
}