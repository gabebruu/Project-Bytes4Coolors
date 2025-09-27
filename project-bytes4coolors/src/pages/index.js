import dynamic from "next/dynamic";

const Bytes4Coolors = dynamic(() => import("../components/Bytes4Coolors"), {
  ssr: false
});

export default function Home() {
  return (
    <div>
      <Bytes4Coolors />
    </div>
  );
}

