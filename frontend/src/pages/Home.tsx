import SectionCategories from "../components/SectionCategories";

function Home() {
  // const weekDays = [
  //   "Sunday",
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday",
  // ];

  // const today = new Date();
  // const day = today.getDay();
  // const dayName = weekDays[day];

  // const date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));

  // Request a weekday along with a long date
  // const options = {
  //   weekday: "long",
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  // };
  // console.log(date.toLocaleDateString("en-US", options));

  return (
    <div>
      <div>Slider Homepage</div>
      <SectionCategories />
    </div>
  );
}

export default Home;
