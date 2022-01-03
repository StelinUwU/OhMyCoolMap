export const Loading = () => {
  return (
    <section className="bg-medium-color w-screen h-screen flex justify-center items-center flex-col">
      <div className="text-white mb-5 text-center">
        <h3 className="text-2xl font-bold ">Set your location</h3>
        <p>Enable location sharing so your driver can see where you are</p>
      </div>

      <div className="sk-chase">
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
      </div>
    </section>
  );
};
