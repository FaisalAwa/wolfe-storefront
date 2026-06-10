interface CollectionHeaderProps {
  title: string;
  description: string;
}

export default function CollectionHeader({ title, description }: CollectionHeaderProps) {
  return (
    <div className="bg-[#111111] border-b border-[#2A2A2A] px-5 md:px-[80px] py-10 md:py-16 text-center">
      <span className="font-body text-[11px] font-semibold tracking-[3px] uppercase text-brand-primary block mb-3">Premium Collection</span>
      <h1 className="font-heading font-black text-[36px] md:text-[56px] text-white uppercase leading-[1.0] mb-3">
        {title}
      </h1>
      {description && (
        <p className="font-body text-[14px] text-[#9A9A9A] leading-[1.6] max-w-[500px] mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
