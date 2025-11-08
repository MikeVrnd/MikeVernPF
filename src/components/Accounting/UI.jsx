import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { currentPageAtom } from "../../atoms/currentPageAtom";
import { validateAssetPath } from "../../utils/security";

const pictures = [
  "1.Περιεχόμενα_1",
  "2.Περιεχόμενα_2",
  "3.ΓειαΕίμαιΟΜιχάλης",
  "4.ΛίγαΛόγιαΓιαΜένα",
  "5.ΑκαδημαϊκοίΤίτλοι",
  "6.ΕπαγγελματικοίΤίτλοι",
  "7.ΕργασιακήΕμπειρία_1",
  "8.ΕργασιακήΕμπειρία_2",
  "9.Εργοδότες",
  "10.Projects_1",
  "11.Projects_2",
  "12.Projects_3",
  "13.ΞένεςΓλώσσες",
  "14.Hobbies",
  "15.ΣτοιχείαΕπικοινωνίας",
  "16.Credits",
];

export const pageAtom = atom(0);
export const pages = [
  {
    front: "book-cover",
    back: pictures[0],
  },
];
for (let i = 1; i < pictures.length; i += 2) {
  pages.push({
    front: pictures[i],
    back: pictures[i + 1] || "book-back",
  });
}

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);

  // useEffect(() => {
  //   const audio = new Audio("/audios/page-flip-01a.mp3");
  //   audio.play();
  // }, [page]);
  useEffect(() => {
    const audioPath = "audios/page-flip-01a.mp3";
    if (!validateAssetPath(audioPath)) {
      console.error("Blocked unsafe audio path:", audioPath);
      return;
    }
    const audio = new Audio(audioPath);
    audio.play();
  }, [page]);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  return (
    <div className="fixed inset-0 pointer-events-none">
      <section
        className={`flex w-full h-full flex-col items-center justify-center 
      duration-500
      ${currentPage === "home" ? "" : "opacity-0"}`}
      >
        <div className="h-[66%]"></div>
        <button
          onClick={() => setCurrentPage("store")}
          className="pointer-events-auto py-4 px-8 bg-orange-400 text-white font-black rounded-full hover:bg-orange-600 cursor-pointer transition-colors duration-500"
        >
          ENTER
        </button>
      </section>
    </div>
  );
};
