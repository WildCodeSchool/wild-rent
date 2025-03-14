import { ReactNode, useCallback, useEffect, useState } from "react";
import { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { DotButton, useDotButton } from "./DotButtons";

const Carousel = ({ children }: { children: ReactNode }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start" });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  // Function to check if possible to scroll in each direction and set state of arrow button accordingly. UseCallBack to memoise function and avoid unnecessary re-renders.
  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  // When component mounts check if caroussel is scrollable and set up event listener to re-do the check evey time the user interacts with the carousel
  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  // Functions to scroll the carousel left or right using embla API methods
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="embla w-full flex flex-col">
      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex my-2 mr-4">{children}</div>
      </div>

      <div className="flex px-4 gap-4 items-center w-full justify-center mt-8">
        <button
          className="embla__prev cursor-pointer disabled:cursor-default text-green disabled:text-green/20 hover:text-green/50 text-3xl lg:text-4xl pointer"
          onClick={scrollPrev}
          disabled={prevBtnDisabled}
        >
          <IoIosArrowDropleftCircle />
        </button>
        <div className="flex px-2 gap-2">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`w-2 lg:w-2.5 lg:h-2.5 h-2 rounded-full transition-all duration-300 ease-out  ${
                index === selectedIndex ? " bg-green w-4 lg:w-4" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
        <button
          className="embla__next cursor-pointer disabled:cursor-default text-green pointer disabled:text-green/20 hover:text-green/50 text-3xl lg:text-4xl pointer"
          onClick={scrollNext}
          disabled={nextBtnDisabled}
        >
          <IoIosArrowDroprightCircle />
        </button>
      </div>
    </section>
  );
};

export default Carousel;
