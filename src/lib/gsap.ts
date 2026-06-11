import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger only on the client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Config to work well with Lenis
ScrollTrigger.defaults({
  // Adding default properties that make scroll trigger smooth
  // when used with external smooth scroll libraries like lenis
});

export { gsap, ScrollTrigger };
