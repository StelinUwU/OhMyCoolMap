interface Props {
  time: number;
  distance: number;
}

export const TripInformation = ({ time, distance }: Props) => {
  return (
    <div className="fixed bottom-8 sm:bottom-16 left-2 sm:left-10 bg-hard-color p-2 rounded-xl text-white ">
      <div>
        <i className="fas fa-road"></i> Distance: {distance} km
      </div>
      <div>
        <i className="far fa-clock"></i> Estimated arrival time: {time} min
      </div>
    </div>
  );
};
