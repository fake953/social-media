import ads from "../../assets/ads.jpg";
const Ads = () => {
  return (
    <section className="w-full bg-card  rounded-md p-4 flex flex-col gap-3">
      <div className="flex justify-between">
        <h1 className="text-lg ">Sponsored</h1>
        <h6 className="text-md font-thin">Ads</h6>
      </div>
      <div>
        <img className="rounded-md object-cover" src={ads} alt="ad " />
      </div>
      <div className="flex justify-between">
        <h1>Google Ads</h1>
        <h6 className="text-md font-thin">https://ads.google.com</h6>
      </div>
      <div>
        <h6 className="text-sm text-start font-thin text-gray-400">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima vel
          fuga harum! Praesentium, nulla veniam.
        </h6>
      </div>
    </section>
  );
};

export default Ads;
