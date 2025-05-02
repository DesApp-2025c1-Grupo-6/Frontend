import Button from "@/src/components/Button";
import Plus from "@/src/icons/Plus";
import React from "react";

function SectionTable({
  titulo,
  children,
  textButton,
}: {
  titulo: string;
  children: React.ReactNode;
  textButton: string;
}) {
  const handleClick = () => {
    const modal = document.getElementById("modal") as HTMLDivElement;
    modal?.classList.toggle("hidden");
    modal?.classList.toggle("flex");
  };
  return (
    <section className="flex flex-col p-10 h-screen bg-gray-chateau-100">
      <div className="flex justify-between py-5">
        <h1 className="text-3xl font-semibold">{titulo}</h1>
        <Button onClick={handleClick} Icon={Plus} text={textButton} />
      </div>
      {children}
    </section>
  );
}

export default SectionTable;
