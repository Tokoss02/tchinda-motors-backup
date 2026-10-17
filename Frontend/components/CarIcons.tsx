// components/CarIcons.tsx

export function TransmissionIcon({
  className = "w-5 h-5",
}: {
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 77.56 122.88"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M13.41,39.22V58H34V39.22a8.67,8.67,0,1,1,9.51,0V58H64.15V39.22a8.66,8.66,0,1,1,9.51,0V62.07a4.49,4.49,0,0,1,0,.64,4.58,4.58,0,0,1,0,.64V85.1a8.66,8.66,0,1,1-9.51,0V67.46H43.53V85.1a8.66,8.66,0,1,1-9.51,0V67.46H13.41V85.1a8.66,8.66,0,1,1-9.51,0V39.22a8.66,8.66,0,1,1,9.51,0Zm49.35,83.66v-16H69.6a7,7,0,0,1,1.94.26,3.64,3.64,0,0,1,1.53.87,4,4,0,0,1,1,1.65,9.33,9.33,0,0,1,.19,4.34,4.59,4.59,0,0,1-.47,1.24,3.06,3.06,0,0,1-.69.85,5.72,5.72,0,0,1-.85.61L75,122.88H70.78l-2.24-5.52h-1.6v5.52ZM66.94,114h1.9a1.8,1.8,0,0,0,.6-.09,1,1,0,0,0,.45-.32,1.35,1.35,0,0,0,.27-.55,3.69,3.69,0,0,0-.08-.81,3.5,3.5,0,0,0-.08-.79,1,1,0,0,0-.72-.78,1.8,1.8,0,0,0-.6-.09h-1.9V114Z"
      />
    </svg>
  );
}

export function MileageIcon({
  className = "w-5 h-5",
}: {
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M5 20a7 7 0 1 1 14 0" />
      <path d="M12 13l4-4" />
      <path d="M12 3v2" />
      <path d="M4.9 5.1l1.4 1.4" />
      <path d="M19.1 5.1l-1.4 1.4" />
    </svg>
  );
}

export function FuelIcon({
  className = "w-5 h-5",
}: {
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M6 20V4a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16" />
      <path d="M6 20h11" />
      <path d="M9 6h5v4H9z" />
      <path d="M17 7h2l2 3v7a2 2 0 0 1-4 0" />
    </svg>
  );
}

export function SeatIcon({
  className = "w-5 h-5",
}: {
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 4v7a4 4 0 0 0 4 4h4" />
      <path d="M10 4h3a3 3 0 0 1 3 3v4" />
      <path d="M14 15h3a3 3 0 0 1 3 3v2" />
      <path d="M5 20h15" />
    </svg>
  );
}