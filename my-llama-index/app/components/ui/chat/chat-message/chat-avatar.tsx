import React from "react";

export default function ChatAvatar({ role }: { role: string }) {
  const commonClasses = "flex h-8 w-8 shrink-0 select-none items-center justify-center";

  if (role === "user") {
    return (
      <div className={`${commonClasses} text-2xl`}>
        •
      </div>
    );
  }

  return (
    <div className={`${commonClasses} rounded-md bg-[#F5F5DC] text-black text-base border border-black`} style={{ fontFamily: "'Playfair Display', serif" }}>
      A|E
    </div>
  );
}
