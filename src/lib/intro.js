import { createContext, useContext, useState, createElement } from "react";

const IntroCtx = createContext({ done: true, finish: () => {} });

export const IntroProvider = ({ children }) => {
  const [done, setDone] = useState(() => sessionStorage.getItem("sanibha-intro") === "1");
  const finish = () => { sessionStorage.setItem("sanibha-intro", "1"); setDone(true); };
  return createElement(IntroCtx.Provider, { value: { done, finish } }, children);
};

export const useIntro = () => useContext(IntroCtx);

export const ease = [0.76, 0, 0.24, 1];
export const easeOut = [0.16, 1, 0.3, 1];
