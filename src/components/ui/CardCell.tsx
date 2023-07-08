interface Props {
  value: any;
  xIndex: number;
  yIndex: number;
  xIsSize: boolean;
  yIsSize: boolean;
}

/**
 *
 * A[0,*], x-0
 * A[*,0], y-0
 * A[size,*], x-size
 * A[*,size], y-size
 *
 */
export default function CardCell({
  value,
  xIndex,
  yIndex,
  xIsSize,
  yIsSize,
}: Props) {
  return (
    <div
      className={`border-2

     ${xIndex === 0 ? "border-t-0" : ""}
     ${yIndex === 0 ? "border-l-0" : ""}
     ${xIsSize ? "border-b-0" : ""}
     ${yIsSize ? "border-r-0" : ""}
       
      flex h-14 w-14 items-center justify-center rounded-md border-[0.5px] border-gray-700 bg-yellow-500 text-lg font-semibold 
       sm:h-24 sm:w-24 sm:text-3xl`}
    >
      <input
        type="text"
        disabled={true}
        className={`h-full w-full bg-yellow-500 text-center font-bold text-black focus:h-16 focus:w-16 focus:rounded-full focus:bg-gradient-to-br focus:from-yellow-300 focus:to-yellow-800 focus:text-xl focus:shadow-xl focus:shadow-yellow-800 focus:outline-none
        ${
          xIndex === 2 && yIndex === 2
            ? "h-20 w-20 -rotate-12 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-800 text-2xl font-extrabold text-green-900 shadow-xl shadow-yellow-800 outline-none drop-shadow-lg"
            : "drop-shadow-none"
        }
        `}
        value={xIndex === 2 && yIndex === 2 ? "BINGO" : value}
      />
    </div>
  );
}
